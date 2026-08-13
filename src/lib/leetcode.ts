// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\lib\leetcode.ts
import {
  LeetcodeDifficultyStat,
  LeetcodeFetchResult,
  LeetcodePublicStats,
} from "../types/leetcode";
import { codingPlatforms } from "../data/coding";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";
const REVALIDATE_SECONDS = 3600; // ~1 hour as required

const leetcodePlatform = codingPlatforms.find((p) => p.id === "leetcode");
export const LEETCODE_USERNAME =
  leetcodePlatform?.username ?? "Gamer_2007";
export const LEETCODE_PROFILE_URL =
  leetcodePlatform?.url ??
  `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

interface LeetcodeGraphQLResponse {
  data?: {
    matchedUser?: {
      submitStats?: {
        acSubmissionNum?: LeetcodeDifficultyStat[];
      } | null;
    } | null;
  };
  errors?: Array<{ message?: string }>;
}

function buildFallbackStats(username: string): LeetcodePublicStats {
  return {
    username,
    profileUrl: LEETCODE_PROFILE_URL,
    fetchedAt: new Date().toISOString(),
    totalSolved: null,
    easy: null,
    medium: null,
    hard: null,
  };
}

function countForDifficulty(
  rows: LeetcodeDifficultyStat[] | undefined,
  difficulty: string
): number | null {
  if (!rows?.length) return null;
  const row = rows.find((r) => r.difficulty === difficulty);
  if (!row || !Number.isFinite(row.count)) return null;
  return row.count;
}

/**
 * Fetch public LeetCode solve stats via the unofficial-but-public GraphQL
 * endpoint (third-party data source — not an official documented API).
 * Never fabricates numbers; returns null counts on failure.
 */
export async function fetchLeetcodePublicStats(
  username: string = LEETCODE_USERNAME
): Promise<LeetcodeFetchResult> {
  const safeUsername = (username || LEETCODE_USERNAME).trim();
  const profileUrl =
    codingPlatforms.find((p) => p.username === safeUsername)?.url ??
    `https://leetcode.com/u/${encodeURIComponent(safeUsername)}/`;

  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "yash-rendalkar-portfolio",
      },
      body: JSON.stringify({
        query: USER_PROFILE_QUERY,
        variables: { username: safeUsername },
      }),
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: [
          "leetcode-user",
          `leetcode-user-${safeUsername.toLowerCase()}`,
        ],
      },
    });

    if (!res.ok) {
      return {
        ok: false,
        error: `LeetCode GraphQL HTTP ${res.status}`,
        stats: { ...buildFallbackStats(safeUsername), profileUrl },
        cacheStatus: "fallback",
      };
    }

    const payload = (await res.json()) as LeetcodeGraphQLResponse;

    if (payload.errors?.length) {
      return {
        ok: false,
        error: payload.errors[0]?.message ?? "LeetCode GraphQL error",
        stats: { ...buildFallbackStats(safeUsername), profileUrl },
        cacheStatus: "fallback",
      };
    }

    const acRows = payload.data?.matchedUser?.submitStats?.acSubmissionNum;
    if (!acRows?.length) {
      return {
        ok: false,
        error: "No solve stats returned for user",
        stats: { ...buildFallbackStats(safeUsername), profileUrl },
        cacheStatus: "fallback",
      };
    }

    const totalSolved = countForDifficulty(acRows, "All");
    const easy = countForDifficulty(acRows, "Easy");
    const medium = countForDifficulty(acRows, "Medium");
    const hard = countForDifficulty(acRows, "Hard");

    const hasAnyStat =
      totalSolved != null || easy != null || medium != null || hard != null;

    if (!hasAnyStat) {
      return {
        ok: false,
        error: "Solve stats could not be parsed",
        stats: { ...buildFallbackStats(safeUsername), profileUrl },
        cacheStatus: "fallback",
      };
    }

    return {
      ok: true,
      stats: {
        username: safeUsername,
        profileUrl,
        fetchedAt: new Date().toISOString(),
        totalSolved,
        easy,
        medium,
        hard,
      },
      cacheStatus: "fresh",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown fetch error";
    return {
      ok: false,
      error: message,
      stats: { ...buildFallbackStats(safeUsername), profileUrl },
      cacheStatus: "fallback",
    };
  }
}

export { REVALIDATE_SECONDS };
