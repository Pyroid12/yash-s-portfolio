// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\components\coding\platform-card.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, UserRound } from "lucide-react";
import { CodingPlatform } from "../../types/coding";
import { cn } from "../../lib/utils";
import GithubIcon from "../shared/github-icon";

interface PlatformCardProps {
  platform: CodingPlatform;
  index?: number;
  compact?: boolean;
}

function PlatformIcon({ id }: { id: string }) {
  if (id === "github") {
    return <GithubIcon className="w-5 h-5" />;
  }
  if (id === "leetcode") {
    // Minimal custom LeetCode-style mark (no external icon dependency)
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
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
  return <UserRound className="w-5 h-5" />;
}

export default function PlatformCard({
  platform,
  index = 0,
  compact = false,
}: PlatformCardProps) {
  const isPrimary = platform.accent === "primary";
  const accentRing = isPrimary
    ? "ring-primary/10 border-primary/25 hover:shadow-primary/10"
    : "ring-secondary/10 border-secondary/25 hover:shadow-secondary/10";
  const accentBadge = isPrimary
    ? "bg-primary/10 text-primary border-primary/20"
    : "bg-secondary/10 text-secondary border-secondary/20";
  const accentIcon = isPrimary
    ? "bg-primary/10 text-primary"
    : "bg-secondary/10 text-secondary";

  if (compact) {
    return (
      <motion.a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${platform.name} profile — ${platform.username} (opens in a new tab)`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
        className={cn(
          "group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all duration-300",
          accentRing
        )}
      >
        <div
          className={cn(
            "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center",
            accentIcon
          )}
        >
          <PlatformIcon id={platform.id} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-foreground leading-tight">
              {platform.name}
            </h3>
            <span
              className={cn(
                "text-[11px] px-2 py-0.5 rounded-full border font-semibold",
                accentBadge
              )}
            >
              @{platform.username}
            </span>
          </div>
        </div>
        <ExternalLink className="flex-shrink-0 w-4 h-4 text-muted-foreground/70 group-hover:text-foreground transition-colors" />
      </motion.a>
    );
  }

  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${platform.name} profile — ${platform.username} (opens in a new tab)`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className={cn(
        "group relative overflow-hidden h-full p-6 sm:p-8 rounded-3xl border bg-card shadow-sm hover:shadow-xl transition-all duration-300",
        accentRing
      )}
    >
      {/* Subtle accent glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500",
          isPrimary
            ? "bg-gradient-to-br from-primary/15 to-transparent"
            : "bg-gradient-to-br from-secondary/15 to-transparent"
        )}
      />

      <div className="relative flex flex-col h-full gap-5">
        {/* Header: Icon + CTA */}
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm",
              accentIcon
            )}
          >
            <PlatformIcon id={platform.id} />
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
            Open profile
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Title + username */}
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl leading-tight">
            {platform.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold",
                accentBadge
              )}
            >
              @{platform.username}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {platform.description}
        </p>

        <div className="mt-auto pt-4 border-t border-border/60">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground/70 font-semibold">
            Visit profile for full activity
          </p>
        </div>
      </div>
    </motion.a>
  );
}