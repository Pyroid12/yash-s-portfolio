// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\types\leetcode.ts

/** Accepted-submission counts per difficulty bucket from LeetCode GraphQL. */
export interface LeetcodeDifficultyStat {
  difficulty: "All" | "Easy" | "Medium" | "Hard" | string;
  count: number;
  submissions: number;
}

export interface LeetcodePublicStats {
  username: string;
  profileUrl: string;
  fetchedAt: string;
  /** Total problems solved (difficulty === "All"). Null when unavailable. */
  totalSolved: number | null;
  easy: number | null;
  medium: number | null;
  hard: number | null;
}

export interface LeetcodeFetchResult {
  ok: boolean;
  stats?: LeetcodePublicStats;
  error?: string;
  cacheStatus?: "fresh" | "stale" | "fallback";
}
