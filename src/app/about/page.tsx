import type { Metadata } from "next";
import PageHeader from "../../components/shared/page-header";
import SectionHeader from "../../components/shared/section-header";
import ProfileCard from "../../components/about/profile-card";
import ExploringSection from "../../components/about/exploring-section";
import InterestsSection from "../../components/about/interests-section";
import EducationTimeline from "../../components/education/education-timeline";
import TrainingSection from "../../components/training/training-card";
import SkillsGrid from "../../components/skills/skills-grid";
import { createPageMetadata } from "../../lib/site";
import { personalData } from "../../data/personal";
import { educationData } from "../../data/education";

export const metadata: Metadata = createPageMetadata({
  title: `About | ${personalData.name}`,
  description: `About ${personalData.name} — ${personalData.headline} based in ${personalData.location}. Education, skills, and interests.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="About"
        title={`About ${personalData.name}`}
        description={`${personalData.headline} based in ${personalData.location}. Learning, building, and growing through hands-on projects.`}
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8 space-y-16">
        {/* Intro + Profile Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-20" id="about-top">
          {/* Intro text */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <SectionHeader
              eyebrow="Introduction"
              title="Short Professional Introduction"
              className="mb-4"
            />
            <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
              I&apos;m a B.Tech student in Artificial Intelligence &amp; Data
              Science at DKTE Society&apos;s Textile &amp; Engineering Institute,
              Ichalkaranji (2024–2028). I enjoy software development and
              building practical, real-world projects.
            </p>

            <SectionHeader
              eyebrow="Focus"
              title="Software Development &amp; AI Interests"
              className="mb-4 mt-6"
            />
            <p className="text-base leading-relaxed text-muted-foreground sm:text-base">
              I&apos;m especially interested in AI-powered applications and
              modern web technology stacks. I explore how AI can be combined
              with everyday software — from translating medical reports into
              plain language to generating creative assets and powering
              recommendation systems.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-base">
              Beyond specific tools, I&apos;m working on my foundational
              problem-solving skills: writing clean code, thinking through
              complexity, and learning from each project I build.
            </p>
          </div>

          {/* Profile sidebar */}
          <div className="lg:col-span-4">
            <ProfileCard />
          </div>
        </section>

        {/* Currently Exploring */}
        <ExploringSection />

        {/* Interests */}
        <InterestsSection />

        {/* Education */}
        <section className="scroll-mt-20" id="education">
          <SectionHeader
            eyebrow="Education"
            title="Academic Background"
            description="Verified academic history. School names for 10th and 12th are omitted as they are not available in the current source material."
          />
          <EducationTimeline entries={educationData} />
        </section>

        {/* Training */}
        <TrainingSection />

        {/* Skills */}
        <SkillsGrid />
      </div>
    </div>
  );
}
