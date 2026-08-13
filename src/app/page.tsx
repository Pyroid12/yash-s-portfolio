import type { Metadata } from "next";
import Hero from "../components/sections/hero";
import AboutPreview from "../components/sections/about-preview";
import ProjectsPreview from "../components/sections/projects-preview";
import SkillsPreview from "../components/sections/skills-preview";
import CodingPreview from "../components/sections/coding-preview";
import EducationPreview from "../components/sections/education-preview";
import CertificatesPreview from "../components/sections/certificates-preview";
import AchievementsPreview from "../components/sections/achievements-preview";
import ContactPreview from "../components/sections/contact-preview";
import { createPageMetadata } from "../lib/site";

export const metadata: Metadata = createPageMetadata({
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ProjectsPreview />
      <SkillsPreview />
      <CodingPreview />
      <EducationPreview />
      <CertificatesPreview />
      <AchievementsPreview />
      <ContactPreview />
    </>
  );
}
