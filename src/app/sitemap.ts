import type { MetadataRoute } from "next";
import { getSiteUrl } from "../lib/site";
import { projectsData } from "../data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  if (!base) return [];

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/coding",
    "/certificates",
    "/achievements",
    "/resume",
    "/contact",
    "/privacy",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projectsData.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
