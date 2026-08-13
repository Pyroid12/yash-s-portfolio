import { personalData } from "../data/personal";
import { getSiteUrl } from "./site";

export function buildPersonJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalData.name,
    jobTitle: personalData.headline,
    email: `mailto:${personalData.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: personalData.location,
    },
    sameAs: [
      personalData.socials.linkedin,
      personalData.socials.github,
      personalData.socials.leetcode,
    ],
    ...(siteUrl ? { url: siteUrl } : {}),
  };
}

export function buildWebsiteJsonLd() {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personalData.name} Portfolio`,
    url: siteUrl,
    author: {
      "@type": "Person",
      name: personalData.name,
    },
  };
}

export function buildProjectJsonLd(project: {
  title: string;
  description?: string;
  shortDescription?: string;
  slug: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
}) {
  const siteUrl = getSiteUrl();
  const projectUrl = siteUrl ? `${siteUrl}/projects/${project.slug}` : undefined;
  const description =
    project.description ?? project.shortDescription ?? project.title;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description,
    programmingLanguage: project.technologies.slice(0, 8),
    codeRepository: project.githubUrl,
    ...(project.liveUrl ? { url: project.liveUrl } : {}),
    ...(projectUrl ? { mainEntityOfPage: projectUrl } : {}),
    author: {
      "@type": "Person",
      name: personalData.name,
    },
  };
}
