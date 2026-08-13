// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\app\coding\page.tsx
import type { Metadata } from "next";
import PageHeader from "../../components/shared/page-header";
import GithubStatsCard from "../../components/coding/github-stats-card";
import LeetcodeStatsCard from "../../components/coding/leetcode-stats-card";
import GithubActivityGraph from "../../components/coding/github-activity-graph";
import { createPageMetadata } from "../../lib/site";
import { personalData } from "../../data/personal";
import {
  fetchGithubPublicStats,
  fetchGithubActivityCalendar,
  GITHUB_USERNAME,
} from "../../lib/github";
import { fetchLeetcodePublicStats } from "../../lib/leetcode";

export const revalidate = 3600;
export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: `Coding | ${personalData.name}`,
  description: `Coding profiles for ${personalData.name} — live GitHub and LeetCode public statistics.`,
  path: "/coding",
});

export default async function CodingPage() {
  // Fetch stats + activity calendar in parallel. The activity call uses the
  // public events endpoint (no auth) and degrades to a friendly fallback if
  // the network/GitHub rate-limit blocks it — never breaks the page.
  const [githubFetch, githubActivityFetch, leetcodeFetch] = await Promise.all([
    fetchGithubPublicStats(GITHUB_USERNAME),
    fetchGithubActivityCalendar(GITHUB_USERNAME),
    fetchLeetcodePublicStats(),
  ]);

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Coding"
        title="Coding & Problem Solving"
        description="Live GitHub and LeetCode public stats (server-fetched, cached for ~1 hour). No fabricated numbers; no repo cards."
      />

      <div className="mx-auto max-w-5xl px-6 md:px-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GithubStatsCard fetchResult={githubFetch} index={0} />
          <LeetcodeStatsCard fetchResult={leetcodeFetch} index={1} />
        </div>

        {/* Phase 5.3: Public activity contribution-calendar style heatmap */}
        <GithubActivityGraph fetchResult={githubActivityFetch} index={2} />

        {/* Footer note */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card/60 text-xs sm:text-sm text-muted-foreground space-y-1.5">
          <p className="font-semibold text-foreground/85">
            Data sources & refresh policy
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-semibold text-foreground/85">GitHub</span>
              {" · "}fetched server-side from the public REST API (no token). User
              profile stats are real; yearly total contributions are reliably
              unavailable without authentication and are therefore not shown.
            </li>
            <li>
              <span className="font-semibold text-foreground/85">LeetCode</span>
              {" · "}solve counts fetched server-side from the public GraphQL
              endpoint (unofficial third-party source). Only accepted
              submission totals by difficulty are shown — no fabricated stats.
            </li>
            <li>
              Cached with Next.js revalidation — target refresh approximately
              every 1 hour.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
