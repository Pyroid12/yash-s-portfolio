import type { Metadata } from "next";

/** Centralized site configuration — update NEXT_PUBLIC_SITE_URL for production. */
export const siteConfig = {
  name: "Yash Rendalkar",
  title: "Yash Rendalkar | AI & Data Science Student | Software Developer",
  description:
    "Portfolio of Yash Rendalkar — B.Tech AI & Data Science student and software developer. Projects, GitHub and LeetCode activity, resume, and contact.",
  locale: "en_US",
  author: "Yash Rendalkar",
} as const;

/** Resolves the public site URL for canonical links, sitemap, and OG. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "";
}

export function getMetadataBase(): URL | undefined {
  const url = getSiteUrl();
  if (!url) return undefined;
  try {
    return new URL(url);
  } catch {
    return undefined;
  }
}

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

/** Builds consistent page metadata with Open Graph and Twitter cards. */
export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = "",
  noIndex = false,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ?? siteConfig.title;
  const base = getMetadataBase();
  const canonicalPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const canonical = base && canonicalPath ? `${base.href.replace(/\/$/, "")}${canonicalPath}` : undefined;

  return {
    title: pageTitle,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      title: pageTitle,
      description,
      ...(base ? { url: canonical ?? base.href } : {}),
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
