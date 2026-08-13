// c:\Users\Lenovo\OneDrive\Desktop\Portfolio\src\components\sections\coding-preview.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../shared/section-header";
import PlatformCard from "../coding/platform-card";
import LeetcodeStatsCard from "../coding/leetcode-stats-card";
import { codingPlatforms } from "../../data/coding";
import { fetchLeetcodePublicStats } from "../../lib/leetcode";

export default async function CodingPreview() {
  const github = codingPlatforms.find((p) => p.id === "github");
  const leetcodeFetch = await fetchLeetcodePublicStats();

  return (
    <section
      id="coding"
      className="py-16 md:py-20 px-6 md:px-8 scroll-mt-20 bg-card/30 border-y border-border/40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeader
            eyebrow="Coding"
            title="Coding Profiles"
            description="Where I write code and practice problem-solving."
            className="mb-0"
          />
          <Link
            href="/coding"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors self-start sm:self-end"
          >
            View Coding Page
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {github && <PlatformCard platform={github} index={0} compact />}
          <LeetcodeStatsCard fetchResult={leetcodeFetch} index={1} compact />
        </div>
      </div>
    </section>
  );
}
