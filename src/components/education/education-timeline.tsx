"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Percent,
  Gauge,
} from "lucide-react";
import { EducationEntry } from "../../types/education";
import { cn } from "../../lib/utils";

interface EducationTimelineProps {
  entries: EducationEntry[];
}

function EntryCard({
  entry,
  isPrimary,
}: {
  entry: EducationEntry;
  isPrimary: boolean;
}) {
  const isBTech = entry.id === "dkte-btech";
  const hasTenth = !!entry.tenthPercentage;
  const hasTwelfth = !!entry.twelfthPercentage;
  const hasCet = !!entry.mhtCetPercentile;
  const scoreLabel = hasTenth
    ? `${entry.tenthPercentage}`
    : hasTwelfth
    ? `${entry.twelfthPercentage}`
    : hasCet
    ? `Percentile ${entry.mhtCetPercentile}`
    : null;
  const ScoreIcon = hasTenth || hasTwelfth ? Percent : Gauge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative p-5 sm:p-6 rounded-2xl border bg-card shadow-sm",
        isPrimary
          ? "border-primary/25 ring-1 ring-primary/10 shadow-md"
          : "border-border"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center",
            isBTech
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isBTech ? (
            <GraduationCap className="w-5 h-5" />
          ) : (
            <BookOpen className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-bold leading-snug",
              isPrimary ? "text-lg sm:text-xl" : "text-base"
            )}
          >
            {entry.degree}
          </h3>
          {entry.institution && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {entry.institution}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs sm:text-sm">
            {entry.period && (
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {entry.period}
              </span>
            )}
            {entry.cgpa && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                CGPA {entry.cgpa}
              </span>
            )}
            {scoreLabel && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-xs",
                  "bg-muted text-foreground/80"
                )}
              >
                <ScoreIcon className="w-3 h-3" />
                {scoreLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EducationTimeline({ entries }: EducationTimelineProps) {
  const orderWeight: Record<string, number> = {
    "dkte-btech": 0,
    "12th": 1,
    "10th": 2,
    "mht-cet": 3,
  };
  const sorted = [...entries].sort(
    (a, b) => (orderWeight[a.id] ?? 99) - (orderWeight[b.id] ?? 99)
  );

  return (
    <div id="education-entries" className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {sorted.length > 0 && sorted[0].id === "dkte-btech" ? (
        <>
          <div className="md:col-span-2">
            <EntryCard entry={sorted[0]} isPrimary={true} />
          </div>
          {sorted.slice(1).map((entry) => (
            <EntryCard key={entry.id} entry={entry} isPrimary={false} />
          ))}
        </>
      ) : (
        sorted.map((entry) => (
          <EntryCard key={entry.id} entry={entry} isPrimary={entry.id === "dkte-btech"} />
        ))
      )}
    </div>
  );
}
