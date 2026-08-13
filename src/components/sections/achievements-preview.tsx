import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeader from "../shared/section-header";
import { achievementsData } from "../../data/achievements";

export default function AchievementsPreview() {
  const latest = achievementsData.slice(0, 2);

  return (
    <section
      id="achievements"
      className="py-16 md:py-20 px-6 md:px-8 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeader
            eyebrow="Achievements"
            title="Milestones"
            description="A growing record of awards and recognitions."
            className="mb-0"
          />
          <Link
            href="/achievements"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors self-start sm:self-end focus-visible:outline-2 focus-visible:outline-primary rounded"
          >
            View Achievements
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {latest.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {latest.map((item) => (
              <li
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm"
              >
                <h3 className="text-sm font-bold text-foreground sm:text-base">
                  {item.title}
                </h3>
                {item.organization && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.organization}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8 flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center"
              aria-hidden="true"
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Building, learning, and collecting milestones
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                New achievements will appear here as the journey continues.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
