// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\lib\github.ts
import {
  GithubActivityCalendar,
  GithubActivityDay,
  GithubActivityFetchResult,
  GithubFetchResult,
  GithubPublicEvent,
  GithubPublicUser,
  GithubPublicStats,
} from "../types/github";
import { codingPlatforms } from "../data/coding";

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const REVALIDATE_SECONDS = 3600; // ~1 hour as required

const githubPlatform = codingPlatforms.find((p) => p.id === "github");
export const GITHUB_USERNAME = githubPlatform?.username ?? "Pyroid12";
export const GITHUB_PROFILE_URL =
  githubPlatform?.url ?? `https://github.com/${GITHUB_USERNAME}`;

/**
 * Build default "fallback" stats when the API is unreachable.
 * Never fake numeric stats — numbers are null, only link/profile metadata survives.
 */
function buildFallbackStats(username: string): GithubPublicStats {
  return {
    username,
    fetchedAt: new Date().toISOString(),
    user: null,
    contributionsLastYear: null,
  };
}

/**
 * Safely fetch JSON, always resolve into a GithubFetchResult never throw.
 * Uses anonymous (unauthenticated) GitHub API — 60 req/hour rate limit per IP.
 * Revalidation handled by Next.js via revalidate / fetch tags.
 */
export async function fetchGithubPublicStats(
  username: string = GITHUB_USERNAME
): Promise<GithubFetchResult> {
  const safeUsername = (username || GITHUB_USERNAME).trim();

  try {
    const userUrl = `${GITHUB_API_BASE}/users/${encodeURIComponent(safeUsername)}`;

    // 1-hour cache, stale-while-revalidate handled by Next ISR
    const userRes = await fetch(userUrl, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "yash-rendalkar-portfolio",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["github-user", `github-user-${safeUsername.toLowerCase()}`],
      },
      // Do NOT set Authorization header — we use public API unauthenticated
    });

    if (!userRes.ok) {
      // e.g. rate-limited (403), not found (404), network errors upstream
      return {
        ok: false,
        error: `GitHub user endpoint ${userRes.status}`,
        stats: buildFallbackStats(safeUsername),
        cacheStatus: "fallback",
      };
    }

    const user = (await userRes.json()) as GithubPublicUser;

    // Try contribution activity via REST: /events doesn't give yearly totals reliably.
    // GraphQL token-free is not supported. So we capture what is reliably available
    // from REST (user-level stats) and explicitly mark contributions as null unless
    // reliably derivable. This keeps us honest — no fake numbers.
    //
    // In a future phase with a token, swap in a GraphQL contributionsCollection query.

    const stats: GithubPublicStats = {
      username: user.login ?? safeUsername,
      fetchedAt: new Date().toISOString(),
      user: {
        login: user.login ?? safeUsername,
        name: user.name ?? null,
        avatar_url: user.avatar_url ?? "",
        html_url: user.html_url ?? GITHUB_PROFILE_URL,
        bio: user.bio ?? null,
        public_repos: Number.isFinite(user.public_repos) ? user.public_repos : 0,
        public_gists: Number.isFinite(user.public_gists) ? user.public_gists : 0,
        followers: Number.isFinite(user.followers) ? user.followers : 0,
        following: Number.isFinite(user.following) ? user.following : 0,
        created_at: user.created_at ?? new Date(0).toISOString(),
        updated_at: user.updated_at ?? new Date(0).toISOString(),
        location: user.location ?? null,
        company: user.company ?? null,
        blog: user.blog ?? null,
        hireable: user.hireable ?? null,
      },
      contributionsLastYear: null, // not reliably from unauthenticated REST
    };

    return {
      ok: true,
      stats,
      cacheStatus: "fresh",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown fetch error";
    return {
      ok: false,
      error: message,
      stats: buildFallbackStats(safeUsername),
      cacheStatus: "fallback",
    };
  }
}

// ------------------------------
// Phase 5.3: Public activity calendar (no fabrication)
// ------------------------------

const EVENTS_PER_PAGE = 100;
const MAX_EVENT_PAGES = 3;
const CALENDAR_DAYS = 52 * 7;

function toDateKey(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function buildEmptyCalendar(todayUtc: Date): {
  days: GithubActivityDay[];
  windowStartDate: string;
  windowEndDate: string;
} {
  const endDate = new Date(
    Date.UTC(
      todayUtc.getUTCFullYear(),
      todayUtc.getUTCMonth(),
      todayUtc.getUTCDate()
    )
  );
  const startDate = new Date(endDate);
  startDate.setUTCDate(endDate.getUTCDate() - (CALENDAR_DAYS - 1));

  const days: GithubActivityDay[] = [];
  const cursor = new Date(startDate);
  for (let i = 0; i < CALENDAR_DAYS; i++) {
    days.push({
      date: toDateKey(cursor),
      eventCount: 0,
      byType: {},
    });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return {
    days,
    windowStartDate: toDateKey(startDate),
    windowEndDate: toDateKey(endDate),
  };
}

function isActivityEventType(t: string): boolean {
  return (
    t === "PushEvent" ||
    t === "PullRequestEvent" ||
    t === "PullRequestReviewEvent" ||
    t === "PullRequestReviewCommentEvent" ||
    t === "IssuesEvent" ||
    t === "IssueCommentEvent" ||
    t === "CreateEvent" ||
    t === "DeleteEvent" ||
    t === "CommitCommentEvent" ||
    t === "ReleaseEvent" ||
    t === "GollumEvent" ||
    t === "PublicEvent"
  );
}

export async function fetchGithubActivityCalendar(
  username: string = GITHUB_USERNAME
): Promise<GithubActivityFetchResult> {
  const safeUsername = (username || GITHUB_USERNAME).trim();
  const todayUtc = new Date();
  const fallbackCalendar = (): GithubActivityCalendar => {
    const built = buildEmptyCalendar(todayUtc);
    return {
      days: built.days,
      totalEvents: 0,
      oldestEventDate: null,
      newestEventDate: null,
      windowEndDate: built.windowEndDate,
      windowStartDate: built.windowStartDate,
    };
  };

  try {
    const baseUrl = `${GITHUB_API_BASE}/users/${encodeURIComponent(
      safeUsername
    )}/events/public`;
    const allEvents: GithubPublicEvent[] = [];
    let pagesFetched = 0;
    let httpStatus = 0;
    let httpStatusText = "";
    let fetchAbortedEarly = false;

    for (let page = 1; page <= MAX_EVENT_PAGES; page++) {
      const url = `${baseUrl}?per_page=${EVENTS_PER_PAGE}&page=${page}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "yash-rendalkar-portfolio",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: [
            "github-activity",
            `github-activity-${safeUsername.toLowerCase()}`,
          ],
        },
      });

      pagesFetched++;
      httpStatus = res.status;
      httpStatusText = res.statusText;
      if (!res.ok) {
        fetchAbortedEarly = true;
        break;
      }

      const batch = (await res.json()) as GithubPublicEvent[];
      if (!Array.isArray(batch) || batch.length === 0) break;
      allEvents.push(...batch);
      if (batch.length < EVENTS_PER_PAGE) break;
    }

    // CASE 1 — First page itself failed (rate limit / network block).
    // Return failure so the FallbackPanel renders. Showing an all-zero grid
    // would mislead the user into thinking the account has no activity.
    if (fetchAbortedEarly && allEvents.length === 0) {
      const error =
        httpStatus === 403
          ? `GitHub rate-limited (403). The unauthenticated public API allows 60 requests/hr per IP; this build hit that limit. Please retry in ~1 hour or deploy the site with outbound internet access.`
          : httpStatus >= 400
            ? `GitHub API returned HTTP ${httpStatus}${httpStatusText ? ` (${httpStatusText})` : ""}`
            : `GitHub activity fetch failed at page ${pagesFetched} (HTTP ${httpStatus})`;
      return {
        ok: false,
        error,
        calendar: fallbackCalendar(),
        pagesFetched,
        rawEventCount: 0,
        cacheStatus: "fallback",
      };
    }

    const built = buildEmptyCalendar(todayUtc);
    const dayIndex = new Map<string, GithubActivityDay>();
    for (const d of built.days) dayIndex.set(d.date, d);

    let totalEvents = 0;
    let oldest: Date | null = null;
    let newest: Date | null = null;

    for (const ev of allEvents) {
      if (!ev || !ev.created_at || !ev.type) continue;
      if (!isActivityEventType(ev.type)) continue;

      const createdAt = new Date(ev.created_at);
      if (Number.isNaN(createdAt.getTime())) continue;
      const key = toDateKey(createdAt);
      const bucket = dayIndex.get(key);
      if (bucket) {
        bucket.eventCount += 1;
        bucket.byType[ev.type] = (bucket.byType[ev.type] ?? 0) + 1;
        totalEvents += 1;
      }
      if (!oldest || createdAt < oldest) oldest = createdAt;
      if (!newest || createdAt > newest) newest = createdAt;
    }

    // CASE 2 — We got some events but a later fetch died mid-pagination.
    // Honest cacheStatus "partial" so the UI can tell the user the heatmap
    // might undercount activity in the oldest ~90-day tail.
    // CASE 3 — First page(s) returned OK but contained 0 matching events.
    // Possible for a brand new account with no public repos. cacheStatus = stale.
    const cacheStatus = fetchAbortedEarly
      ? "partial"
      : totalEvents > 0
        ? "fresh"
        : "stale";

    return {
      ok: true,
      calendar: {
        days: built.days,
        totalEvents,
        oldestEventDate: oldest ? toDateKey(oldest) : null,
        newestEventDate: newest ? toDateKey(newest) : null,
        windowEndDate: built.windowEndDate,
        windowStartDate: built.windowStartDate,
      },
      pagesFetched,
      rawEventCount: allEvents.length,
      cacheStatus,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown fetch error";
    return {
      ok: false,
      error: `Network exception during GitHub public-activity fetch: ${message}`,
      calendar: fallbackCalendar(),
      cacheStatus: "fallback",
    };
  }
}

export { REVALIDATE_SECONDS };