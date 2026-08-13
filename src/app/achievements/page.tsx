import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import PageHeader from "../../components/shared/page-header";
import { achievementsData } from "../../data/achievements";
import { createPageMetadata } from "../../lib/site";
import { personalData } from "../../data/personal";

export const metadata: Metadata = createPageMetadata({
  title: `Achievements | ${personalData.name}`,
  description: `Verified achievements and milestones by ${personalData.name}.`,
  path: "/achievements",
});

export default function AchievementsPage() {
  const hasAchievements = achievementsData.length > 0;

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Achievements"
        title="Achievements"
        description="Verified achievements and milestones will appear here as the journey continues."
      />

      <div className="mx-auto max-w-3xl px-6 md:px-8">
        {hasAchievements ? (
          <ul className="flex flex-col gap-4" aria-label="Achievement list">
            {achievementsData.map((item) => (
              <li
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm"
              >
                <h2 className="text-base font-bold text-foreground sm:text-lg">
                  {item.title}
                </h2>
                {item.organization && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.organization}
                  </p>
                )}
                {item.description && (
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                    {item.description}
                  </p>
                )}
                {item.date && (
                  <p className="mt-2 text-xs text-muted-foreground font-medium">
                    {item.date}
                  </p>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm font-semibold text-primary hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-primary rounded"
                  >
                    Learn more
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="rounded-3xl border border-border bg-card/60 p-10 sm:p-14 text-center flex flex-col items-center gap-5"
            role="status"
            aria-live="polite"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/8 text-primary flex items-center justify-center">
              <Sparkles className="w-8 h-8" aria-hidden="true" />
            </div>
            <div className="max-w-md">
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Verified achievements and milestones will appear here as the
                journey continues.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
