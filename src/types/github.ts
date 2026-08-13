// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\types\github.ts
export interface GithubPublicUser {
  login: string;
  name?: string | null;
  avatar_url: string;
  html_url: string;
  bio?: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  location?: string | null;
  company?: string | null;
  blog?: string | null;
  hireable?: boolean | null;
}

export interface GithubContributionWeek {
  contributionDays: Array<{
    contributionCount: number;
    date: string;
    weekday: number;
  }>;
}

export interface GithubContributionCalendar {
  totalContributions: number;
  weeks: GithubContributionWeek[];
}

export interface GithubContributionData {
  contributionCalendar: GithubContributionCalendar;
}

export interface GithubPublicStats {
  username: string;
  fetchedAt: string;
  user: GithubPublicUser | null;
  contributionsLastYear: number | null;
  // Only show reliably-available public data. Never fabricate fields.
}

export interface GithubFetchResult {
  ok: boolean;
  stats?: GithubPublicStats;
  error?: string;
  cacheStatus?: "stale" | "fresh" | "partial" | "fallback";
}

// ---- Phase 5.3: Public Events Activity Calendar ----
// Public Events REST API returns a subset of what the authenticated
// contribution calendar shows. To remain honest we label these as
// "public activity events", never "contributions".

export type GithubPublicEventType =
  | "PushEvent"
  | "PullRequestEvent"
  | "PullRequestReviewEvent"
  | "PullRequestReviewCommentEvent"
  | "IssuesEvent"
  | "IssueCommentEvent"
  | "CreateEvent"
  | "DeleteEvent"
  | "ForkEvent"
  | "WatchEvent"
  | "ReleaseEvent"
  | "PublicEvent"
  | "MemberEvent"
  | "GollumEvent"
  | "CommitCommentEvent"
  | string;

export interface GithubPublicEvent {
  id: string;
  type: GithubPublicEventType;
  created_at: string;
  repo?: { name?: string };
}

/** Daily bucket of public activity for the heatmap. */
export interface GithubActivityDay {
  /** ISO date YYYY-MM-DD (UTC-normalised from event timestamps) */
  date: string;
  /** Number of public events on this day. Never fabricated. */
  eventCount: number;
  /** Breakdown by event type (useful for tooltips) */
  byType: Partial<Record<GithubPublicEventType, number>>;
}

export interface GithubActivityCalendar {
  /** 52 weeks × 7 days grid (364 days trailing from today). */
  days: GithubActivityDay[];
  /** Total public events captured in the grid window. */
  totalEvents: number;
  /** Date of the oldest event we observed in the API responses. */
  oldestEventDate: string | null;
  /** Date of the newest event we observed. */
  newestEventDate: string | null;
  /** Window end date (the grid's last day, i.e. "today" at build time). */
  windowEndDate: string;
  /** Window start date (364 days before windowEndDate). */
  windowStartDate: string;
}

export interface GithubActivityFetchResult {
  ok: boolean;
  calendar?: GithubActivityCalendar;
  error?: string;
  /** How many API pages were fetched (1..N). 0 means no requests tried. */
  pagesFetched?: number;
  /** Total raw events ingested from the API. */
  rawEventCount?: number;
  cacheStatus?: "stale" | "fresh" | "partial" | "fallback";
}