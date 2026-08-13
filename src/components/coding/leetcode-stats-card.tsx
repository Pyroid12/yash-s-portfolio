// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\components\coding\leetcode-stats-card.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  CheckCircle2,
  CircleDot,
  Target,
  Flame,
} from "lucide-react";
import { LeetcodeFetchResult } from "../../types/leetcode";
import { cn } from "../../lib/utils";
import { LEETCODE_PROFILE_URL } from "../../lib/leetcode";

interface LeetcodeStatsCardProps {
  fetchResult: LeetcodeFetchResult;
  index?: number;
  compact?: boolean;
}

function LeetcodeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.5 3.5L4 14a2.12 2.12 0 003 3L17.5 6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 19.5h10.5a1.5 1.5 0 001.5-1.5v-3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accentClass,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  accentClass?: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          accentClass ?? "bg-secondary/8 text-secondary"
        )}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground/80 font-semibold">
          {label}
        </p>
        <p className="text-sm font-bold text-foreground leading-tight mt-0.5 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function LeetcodeStatsCard({
  fetchResult,
  index = 0,
  compact = false,
}: LeetcodeStatsCardProps) {
  const { ok, stats } = fetchResult;
  const profileUrl = stats?.profileUrl ?? LEETCODE_PROFILE_URL;
  const displayUsername = stats?.username ?? "Gamer_2007";
  const hasLiveStats =
    ok &&
    stats != null &&
    (stats.totalSolved != null ||
      stats.easy != null ||
      stats.medium != null ||
      stats.hard != null);

  if (compact) {
    return (
      <motion.a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit LeetCode profile — ${displayUsername} (opens in a new tab)`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
        className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-secondary/25 ring-1 ring-secondary/10 bg-card shadow-sm hover:shadow-md hover:shadow-secondary/10 transition-all duration-300"
      >
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
          <LeetcodeIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-foreground leading-tight">
              LeetCode
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full border border-secondary/20 bg-secondary/10 text-secondary font-semibold">
              @{displayUsername}
            </span>
            {hasLiveStats && stats?.totalSolved != null && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground font-semibold">
                {stats.totalSolved} solved
              </span>
            )}
          </div>
        </div>
        <ExternalLink className="flex-shrink-0 w-4 h-4 text-muted-foreground/70 group-hover:text-foreground transition-colors" />
      </motion.a>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className="group relative overflow-hidden h-full rounded-3xl border border-secondary/25 ring-1 ring-secondary/10 bg-card shadow-sm hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-secondary/15 via-primary/8 to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative flex flex-col h-full gap-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open LeetCode profile for ${displayUsername} (opens in a new tab)`}
            className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shadow-sm hover:bg-secondary/15 transition-colors"
          >
            <LeetcodeIcon className="w-6 h-6" />
          </a>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors"
          >
            View LeetCode Profile
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl leading-tight">
            LeetCode
          </h3>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-secondary/20 bg-secondary/10 text-secondary text-xs font-bold">
              @{displayUsername}
            </span>
            {hasLiveStats && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground text-[11px] font-semibold">
                Third-party public data
              </span>
            )}
          </div>
        </div>

        {hasLiveStats ? (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Problem-solving practice focused on core data structures and
              algorithms. Stats are fetched from LeetCode&apos;s public GraphQL
              endpoint — unofficial, server-cached for ~1 hour.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {stats!.totalSolved != null && (
                <Stat
                  icon={CheckCircle2}
                  label="Problems Solved"
                  value={stats!.totalSolved.toLocaleString()}
                  accentClass="bg-secondary/8 text-secondary"
                />
              )}
              {stats!.easy != null && (
                <Stat
                  icon={CircleDot}
                  label="Easy"
                  value={stats!.easy.toLocaleString()}
                  accentClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                />
              )}
              {stats!.medium != null && (
                <Stat
                  icon={Target}
                  label="Medium"
                  value={stats!.medium.toLocaleString()}
                  accentClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                />
              )}
              {stats!.hard != null && (
                <Stat
                  icon={Flame}
                  label="Hard"
                  value={stats!.hard.toLocaleString()}
                  accentClass="bg-rose-500/10 text-rose-600 dark:text-rose-400"
                />
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-border/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-widest text-muted-foreground/70 font-semibold">
              <span>
                Last data sync ·{" "}
                {new Date(stats!.fetchedAt).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Problem-solving practice focused on core data structures and
              algorithms covered during CDAC Sunbeam DSA training. Live stats
              were not available for this render — visit LeetCode for the latest
              solve counts.
            </p>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-5 py-2.5 rounded-full transition-all text-sm shadow-lg shadow-secondary/20 focus-visible:outline-2 focus-visible:outline-secondary self-start"
            >
              <LeetcodeIcon className="w-4 h-4" />
              View LeetCode Profile
            </a>

            <div className="pt-4 border-t border-border/60 text-[11px] uppercase tracking-widest text-muted-foreground/70 font-semibold">
              Profile link · stats refresh ~hourly when available
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}
