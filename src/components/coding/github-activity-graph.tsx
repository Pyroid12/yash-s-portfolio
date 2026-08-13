// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\components\coding\github-activity-graph.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Activity, ExternalLink } from "lucide-react";
import type {
  GithubActivityCalendar,
  GithubActivityDay,
  GithubActivityFetchResult,
  GithubPublicEventType,
} from "../../types/github";
import { cn } from "../../lib/utils";
import GithubIcon from "../shared/github-icon";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "../../lib/github";

interface GithubActivityGraphProps {
  fetchResult: GithubActivityFetchResult;
  index?: number;
}

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function weekdayOf(dateKey: string): number {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1)).getUTCDay();
}

function prettyDate(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

const EVENT_LABEL: Partial<Record<GithubPublicEventType, string>> = {
  PushEvent: "pushes",
  PullRequestEvent: "PRs",
  PullRequestReviewEvent: "PR reviews",
  PullRequestReviewCommentEvent: "PR comments",
  IssuesEvent: "issues",
  IssueCommentEvent: "issue comments",
  CreateEvent: "creates",
  DeleteEvent: "deletes",
  CommitCommentEvent: "commit comments",
  ReleaseEvent: "releases",
  GollumEvent: "wiki edits",
  PublicEvent: "open-sourced",
};

function describeEventBreakdown(d: GithubActivityDay): string {
  if (d.eventCount === 0) return "No public activity recorded";
  const entries = Object.entries(d.byType)
    .filter(([, v]) => (v ?? 0) > 0)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0));
  if (entries.length === 0)
    return `${d.eventCount} event${d.eventCount === 1 ? "" : "s"}`;
  const parts = entries.map(([k, v]) => {
    const label = EVENT_LABEL[k as GithubPublicEventType] ?? k.toLowerCase();
    return `${v} ${label}`;
  });
  return parts.slice(0, 3).join(" · ");
}

function intensityOf(day: GithubActivityDay): 0 | 1 | 2 | 3 | 4 {
  const n = day.eventCount;
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (n <= 3) return 2;
  if (n <= 7) return 3;
  return 4;
}

interface GridCell {
  day: GithubActivityDay | null;
}
interface GridWeek {
  cells: GridCell[];
  monthLabel?: string;
}

function buildGrid(cal: GithubActivityCalendar): GridWeek[] {
  const { days } = cal;
  if (days.length === 0) return [];

  const reversed = [...days].reverse();
  const cols: GridWeek[] = [];
  let ri = 0;
  while (ri < reversed.length) {
    const col: (GithubActivityDay | null)[] = [
      null, null, null, null, null, null, null,
    ];
    const newest = reversed[ri];
    const wkday = weekdayOf(newest.date);
    col[wkday] = newest;
    ri++;
    for (let w = wkday - 1; w >= 0 && ri < reversed.length; w--, ri++) {
      col[w] = reversed[ri];
    }
    cols.unshift({ cells: col.map((d) => ({ day: d })) });
  }

  let lastMonthSeen: number | null = null;
  for (const col of cols) {
    const first = col.cells.find((c) => c.day != null)?.day;
    if (!first) continue;
    const m = Number(first.date.slice(5, 7)) - 1;
    if (lastMonthSeen == null || m !== lastMonthSeen) {
      col.monthLabel = MONTH_SHORT[m];
      lastMonthSeen = m;
    }
  }

  return cols;
}

const LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-muted/60 border border-border/60 hover:border-border",
  1: "bg-primary/15 border border-primary/25 hover:border-primary/50",
  2: "bg-primary/35 border border-primary/45 hover:border-primary/70",
  3: "bg-secondary/55 border border-secondary/60 hover:border-secondary/85",
  4: "bg-gradient-to-br from-primary via-secondary to-secondary border border-secondary/80 hover:ring-2 hover:ring-secondary/60",
};

export default function GithubActivityGraph({
  fetchResult,
  index = 0,
}: GithubActivityGraphProps) {
  const { ok, calendar, error, cacheStatus } = fetchResult;
  const hasCalendar = !!calendar && calendar.days.length > 0;
  const totalEvents = calendar?.totalEvents ?? 0;

  const grid = useMemo(
    () => (hasCalendar ? buildGrid(calendar!) : []),
    [calendar, hasCalendar]
  );
  const [hovered, setHovered] = useState<GithubActivityDay | null>(null);

  // Show FallbackPanel whenever the heatmap would mislead the user:
  //   - fetch failed entirely (ok === false)
  //   - no calendar shape at all
  //   - calendar has 364 zero-value days because the API returned OK but
  //     with zero events (virtually always a silent rate-limit / upstream
  //     block that wasn't a hard 403). Avoids showing a "Pyroid12 did"
  //     nothing in a year" chart which is clearly wrong information.
  const emptyHonestZeroWindow =
    cacheStatus === "fresh" && hasCalendar && totalEvents === 0;
  const showFallback =
    !ok ||
    !hasCalendar ||
    (hasCalendar && totalEvents === 0 && cacheStatus !== "fresh");
  const gridId = useMemo(() => `gh-act-grid-${index}`, [index]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-3xl border border-primary/20 ring-1 ring-primary/10 bg-card shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-primary/12 via-secondary/8 to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
      />

      <div className="relative p-5 sm:p-6 md:p-7 lg:p-8">
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 md:mb-6">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
              <Activity
                className="w-5 h-5 sm:w-6 sm:h-6"
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl leading-tight">
                Public Activity Calendar
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Real public events from the unauthenticated GitHub REST API for{" "}
                <span className="font-semibold text-primary/90">
                  @{GITHUB_USERNAME}
                </span>{" "}
                — last 52 weeks. Intensity encodes daily event count; empty
                cells mean no public activity captured (no fabrication).
              </p>
            </div>
          </div>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all text-sm shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary self-start sm:self-auto"
            aria-label="Open GitHub profile for Pyroid12 (opens in a new tab)"
          >
            <GithubIcon className="w-4 h-4" aria-hidden="true" />
            View Profile
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </header>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4 md:mb-5 text-xs sm:text-sm">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold">
            <Activity className="w-3.5 h-3.5" aria-hidden="true" />
            {showFallback
              ? "— events"
              : `${totalEvents.toLocaleString()} public event${totalEvents === 1 ? "" : "s"}`}
          </div>
          {hasCalendar && (
            <div className="text-[11px] sm:text-xs uppercase tracking-widest text-muted-foreground/80 font-semibold">
              {prettyDate(calendar!.windowStartDate)} →{" "}
              {prettyDate(calendar!.windowEndDate)}
            </div>
          )}
          {cacheStatus && cacheStatus !== "fresh" && (
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold",
                cacheStatus === "fallback"
                  ? "bg-muted/70 text-muted-foreground"
                  : cacheStatus === "partial"
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25"
                    : "bg-muted/50 text-muted-foreground/90"
              )}
            >
              {cacheStatus === "fallback"
                ? "Fallback display"
                : cacheStatus === "partial"
                  ? "Partial window (may undercount oldest days)"
                  : "Cached data"}
            </span>
          )}
        </div>

        {showFallback ? (
          <FallbackPanel error={error} />
        ) : (
          <div className="relative">
            <p id={`${gridId}-sr`} className="sr-only">
              GitHub public activity heatmap, 52 weeks by 7 days.{" "}
              {totalEvents.toLocaleString()} total public events in the
              window. Day cells are grouped 52 columns (weeks) by 7 rows
              (Sunday to Saturday), with intensity tiers 0 through 4
              reflecting how many public events occurred each day.
            </p>

            <div
              className="grid grid-cols-[auto_1fr] gap-x-2 sm:gap-x-3 gap-y-1"
              role="img"
              aria-labelledby={`${gridId}-sr`}
            >
              <div
                aria-hidden="true"
                className="grid grid-rows-[repeat(7,min-content)] gap-y-[3px] sm:gap-y-[2.5px] pt-[18px]"
              >
                {WEEKDAY_SHORT.map((w, i) => (
                  <div
                    key={w}
                    className={cn(
                      "flex items-center justify-end text-[10px] leading-none text-muted-foreground/80 font-semibold select-none",
                      "h-[8px] sm:h-[10px] md:h-[12px] lg:h-[14px]",
                      i % 2 === 1
                        ? "opacity-100"
                        : "opacity-0 sm:opacity-0 md:opacity-100"
                    )}
                  >
                    <span className="md:hidden">{w.charAt(0)}</span>
                    <span className="hidden md:inline">{w.slice(0, 3)}</span>
                  </div>
                ))}
              </div>

              <div className="min-w-0">
                <div
                  aria-hidden="true"
                  className="grid gap-x-[3px] sm:gap-x-[2.5px] mb-[3px] h-[18px] items-end"
                  style={{
                    gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
                    gridAutoFlow: "column",
                  }}
                >
                  {grid.map((col, ci) => (
                    <div
                      key={ci}
                      className="overflow-hidden text-[9px] sm:text-[10px] leading-none font-semibold text-muted-foreground/70 whitespace-nowrap text-left"
                    >
                      {col.monthLabel ?? ""}
                    </div>
                  ))}
                </div>

                <div
                  className={cn(
                    "max-w-full overflow-x-auto overflow-y-hidden rounded-xl",
                    "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
                  )}
                >
                  <div
                    className="grid gap-x-[3px] gap-y-[3px] sm:gap-x-[2.5px] sm:gap-y-[2.5px] w-max"
                    style={{
                      gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
                      gridTemplateRows: "repeat(7, min-content)",
                      gridAutoFlow: "column",
                    }}
                  >
                    {grid.map((col, ci) =>
                      col.cells.map((cell, ri) => {
                        if (!cell.day) {
                          return (
                            <div
                              key={`${ci}-${ri}`}
                              className="rounded-[3px] opacity-0"
                              style={{ width: "8px", height: "8px" }}
                            />
                          );
                        }
                        const day = cell.day;
                        const lvl = intensityOf(day);
                        const tooltipText = `${prettyDate(day.date)}: ${day.eventCount.toLocaleString()} event${day.eventCount === 1 ? "" : "s"} — ${describeEventBreakdown(day)}`;
                        return (
                          <button
                            key={`${ci}-${ri}`}
                            type="button"
                            tabIndex={0}
                            title={tooltipText}
                            aria-label={tooltipText}
                            onMouseEnter={() => setHovered(day)}
                            onFocus={() => setHovered(day)}
                            onBlur={() => setHovered(null)}
                            onMouseLeave={() =>
                              setHovered((h) => (h === day ? null : h))
                            }
                            className={cn(
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-1 focus-visible:ring-offset-card rounded-[3px] transition-[box-shadow,transform] duration-150 ease-out active:scale-95",
                              "w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[12px] md:h-[12px] lg:w-[14px] lg:h-[14px]",
                              LEVEL_CLASS[lvl]
                            )}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-4 min-h-[64px]">
              {hovered ? (
                <motion.div
                  key={hovered.date}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.12 }}
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "absolute left-0 sm:left-1/2 sm:-translate-x-1/2 pointer-events-none select-none",
                    "px-3 py-2 rounded-xl border border-border bg-popover/95 backdrop-blur shadow-xl",
                    "text-[11px] sm:text-xs leading-snug font-medium text-popover-foreground",
                    "min-w-[180px] max-w-[320px]"
                  )}
                >
                  <div className="font-bold text-foreground">
                    {prettyDate(hovered.date)}
                  </div>
                  <div className="mt-0.5 text-primary/90 font-semibold">
                    {hovered.eventCount.toLocaleString()} public event
                    {hovered.eventCount === 1 ? "" : "s"}
                  </div>
                  {hovered.eventCount > 0 && (
                    <div className="mt-1 text-muted-foreground/90">
                      {describeEventBreakdown(hovered)}
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="text-[11px] sm:text-xs text-muted-foreground/80 italic px-1">
                  Hover or focus a cell to see that day&apos;s public activity.
                </div>
              )}
            </div>

            <div className="mt-2 md:mt-3 flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[10px] sm:text-xs text-muted-foreground font-semibold">
              <span className="uppercase tracking-wider">Less</span>
              {[0, 1, 2, 3, 4].map((lvl) => (
                <span
                  key={lvl}
                  className={cn(
                    "inline-block rounded-[3px] border shadow-sm",
                    LEVEL_CLASS[lvl as 0 | 1 | 2 | 3 | 4],
                    "w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]"
                  )}
                  aria-hidden="true"
                />
              ))}
              <span className="uppercase tracking-wider">More</span>
            </div>

            <div className="mt-4 md:mt-5 p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/60 text-[11px] sm:text-xs text-muted-foreground space-y-1.5">
              <p className="font-semibold text-foreground/85">About this chart</p>
              <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                <li>
                  Source · GitHub public <code>/events/public</code> REST
                  endpoint — no token, 60 requests/hr IP-level rate limit,
                  cached with Next.js revalidate (~1 hour).
                </li>
                <li>
                  Scope · Activity shown is limited to public repos only and
                  the last ~90 days reliably returned by the endpoint. Earlier
                  cells in the 52-week window are genuinely empty — never
                  invented.
                </li>
                <li>
                  Event types counted · pushes, PRs, PR reviews + comments,
                  issues, issue comments, creates/deletes, releases, wiki
                  edits, commit comments, open-sourced. Excludes inbound
                  WatchEvent/ForkEvent from third parties.
                </li>
                <li>
                  Timezone · Daily buckets are grouped by UTC (the public API
                  does not expose the local timezone set in your GitHub
                  account). Depending on when you code, individual cells may
                  shift <strong>±1 day</strong> relative to the native GitHub
                  contribution calendar on your profile — the totals and
                  7-day trends are still accurate.
                </li>
                <li>
                  Intensity tiers reflect event count, not commits · 0 events
                  (tier 0), 1 (tier 1), 2–3 (tier 2), 4–7 (tier 3), 8+
                  (tier 4 — primary→secondary gradient). Never padded or
                  fabricated.
                </li>
              </ul>
              {emptyHonestZeroWindow && (
                <p className="mt-2 pt-2 border-t border-border/70 font-semibold text-amber-700 dark:text-amber-400">
                  Note · API returned no public events in this window for @
                  {GITHUB_USERNAME}. If you can see contributions on your real
                  GitHub profile, the public endpoint is being rate-limited
                  from this build environment — a clean rebuild or a deploy
                  with stable outbound access will populate the grid.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

function FallbackPanel({ error }: { error?: string }) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-5 md:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
          <AlertCircle className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex-1 space-y-2 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground/90">
            Activity chart is temporarily unavailable for this build.
          </p>
          {error && (
            <p className="font-semibold text-foreground/80">
              Status · <span className="font-normal">{error}</span>
            </p>
          )}
          <p>
            The heatmap needs data from the public GitHub REST API which is
            rate-limited per IP (60 requests/hour) and can also be blocked by
            outbound network rules. Your profile link to the right still works
            perfectly — the real calendar on GitHub itself always shows the
            latest, widest view.
          </p>
          <ul className="list-disc pl-5 space-y-0.5 text-xs sm:text-sm">
            <li>
              Nothing was fabricated — the page simply omits the visualization
              when live data isn&apos;t available.
            </li>
            <li>
              Retry in a few minutes, or deploy to a server with stable
              outbound access to see the chart populate.
            </li>
          </ul>
        </div>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-secondary/90 hover:bg-secondary text-secondary-foreground font-semibold px-4 sm:px-5 py-2 rounded-full transition-all text-sm shadow-lg shadow-secondary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary self-start sm:self-center"
          aria-label="Open GitHub profile for Pyroid12 to view real contribution calendar (opens in a new tab)"
        >
          <GithubIcon className="w-4 h-4" aria-hidden="true" />
          See Real Calendar
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
