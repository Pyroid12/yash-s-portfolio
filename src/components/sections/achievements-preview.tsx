import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../shared/section-header";
import { achievementsData } from "../../data/achievements";

export default function AchievementsPreview() {
  const latest = achievementsData.slice(0, 2);

  return (
    <section
      id="achievements"
      className="py-14 md:py-20 px-6 md:px-8 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeader
            eyebrow="Achievements"
            title="Milestones"
            description="Milestones and achievements will appear here as the journey continues."
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

        {latest.length > 0 && (
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
        )}
      </div>
    </section>
  );
}
