// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\components\coding\github-stats-card.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  MapPin,
  Users,
  GitBranch,
  CalendarDays,
  AlertCircle,
  FileText,
} from "lucide-react";
import { GithubFetchResult } from "../../types/github";
import { cn } from "../../lib/utils";
import GithubIcon from "../shared/github-icon";
import { GITHUB_PROFILE_URL } from "../../lib/github";

interface GithubStatsCardProps {
  fetchResult: GithubFetchResult;
  index?: number;
  compact?: boolean;
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/8 text-primary flex items-center justify-center">
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

export default function GithubStatsCard({
  fetchResult,
  index = 0,
  compact = false,
}: GithubStatsCardProps) {
  const { ok, stats, error, cacheStatus } = fetchResult;
  const hasLiveUser = ok && !!stats?.user;
  const profileUrl =
    (stats?.user?.html_url as string | undefined) || GITHUB_PROFILE_URL;
  const displayUsername = stats?.username ?? "Pyroid12";

  // Compact variant (homepage preview) — minimal, safe, always works
  if (compact) {
    return (
      <motion.a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit GitHub profile — ${displayUsername} (opens in a new tab)`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
        className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-primary/25 ring-1 ring-primary/10 bg-card shadow-sm hover:shadow-md hover:shadow-primary/10 transition-all duration-300"
      >
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <GithubIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-foreground leading-tight">
              GitHub
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary font-semibold">
              @{displayUsername}
            </span>
            {hasLiveUser && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground font-semibold">
                {stats?.user?.public_repos ?? 0} repos
              </span>
            )}
          </div>
        </div>
        <ExternalLink className="flex-shrink-0 w-4 h-4 text-muted-foreground/70 group-hover:text-foreground transition-colors" />
      </motion.a>
    );
  }

  // Full variant (Coding page)
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className="group relative overflow-hidden h-full rounded-3xl border border-primary/25 ring-1 ring-primary/10 bg-card shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      {/* Subtle blue accent glow (Tech Marble) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-primary/15 via-secondary/8 to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative flex flex-col h-full gap-5 p-6 sm:p-8">
        {/* Header: Icon + CTA */}
        <div className="flex items-start justify-between gap-4">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open GitHub profile for ${displayUsername} (opens in a new tab)`}
            className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-sm hover:bg-primary/15 transition-colors"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors"
          >
            View on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Title + username */}
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl leading-tight">
            GitHub
          </h3>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold">
              @{displayUsername}
            </span>
            {hasLiveUser && stats?.user?.name && (
              <span className="text-sm font-semibold text-foreground/80">
                {stats.user.name}
              </span>
            )}
            {cacheStatus && cacheStatus !== "fresh" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground text-[11px] font-semibold">
                {cacheStatus === "fallback" ? "Fallback link" : "Cached"}
              </span>
            )}
          </div>
        </div>

        {/* Live / fallback state */}
        {hasLiveUser ? (
          <>
            {/* Bio */}
            {stats?.user?.bio && (
              <p className="text-sm leading-relaxed text-foreground/85 border-l-2 border-primary/30 pl-3 italic">
                {stats.user.bio}
              </p>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <Stat
                icon={GitBranch}
                label="Public Repos"
                value={stats!.user!.public_repos.toLocaleString()}
              />
              <Stat
                icon={Users}
                label="Followers"
                value={stats!.user!.followers.toLocaleString()}
              />
              <Stat
                icon={FileText}
                label="Following"
                value={stats!.user!.following.toLocaleString()}
              />
              <Stat
                icon={CalendarDays}
                label="Joined"
                value={new Date(stats!.user!.created_at).toLocaleDateString(
                  undefined,
                  { year: "numeric", month: "short" }
                )}
              />
            </div>

            {stats!.user!.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{stats!.user!.location}</span>
              </div>
            )}

            {/* Activity footer */}
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
              {stats!.contributionsLastYear != null && (
                <span className="text-primary/80">
                  {stats!.contributionsLastYear.toLocaleString()} contributions
                  (1y)
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Graceful fallback: show description + profile link only */}
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Live GitHub statistics were not available for this page render.
              The public profile link below is still fully functional — visit
              GitHub for the latest contribution activity and repo details.
            </p>

            <div className="flex items-start gap-3 p-4 rounded-2xl border border-border/80 bg-background/50 text-sm">
              <AlertCircle className="flex-shrink-0 w-4 h-4 mt-0.5 text-muted-foreground/80" />
              <div className="text-foreground/80 leading-relaxed">
                {error ? (
                  <span className="block font-semibold text-foreground/85 mb-1">
                    Status · {error}
                  </span>
                ) : (
                  <span className="block font-semibold text-foreground/85 mb-1">
                    No live data cached yet
                  </span>
                )}
                <span className="text-muted-foreground">
                  Stats refresh approximately every hour when the GitHub
                  public API is available.
                </span>
              </div>
            </div>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-all text-sm shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-primary self-start"
            >
              <GithubIcon className="w-4 h-4" />
              Open GitHub Profile
            </a>

            <div className="pt-4 border-t border-border/60 text-[11px] uppercase tracking-widest text-muted-foreground/70 font-semibold">
              Fallback mode · profile link preserved
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}