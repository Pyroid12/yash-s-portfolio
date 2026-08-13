"use client";

import React from "react";
import Link from "next/link";
import { Project } from "../../types/project";
import { ArrowUpRight, Eye, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import GithubIcon from "../shared/github-icon";

interface FeaturedProjectCardProps {
  project: Project;
  className?: string;
}

export default function FeaturedProjectCard({
  project,
  className,
}: FeaturedProjectCardProps) {
  const hasLive = !!(project.liveUrl && project.liveUrl.trim() !== "");

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-card shadow-md hover:shadow-xl transition-all duration-300",
        "border-primary/20 dark:border-primary/15",
        className
      )}
    >
      {/* Decorative gradient accent */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-70"
      />

      <div className="relative p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left column: Title + info */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 text-primary text-xs font-bold border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Project
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-foreground sm:text-2xl md:text-3xl tracking-tight leading-tight mb-3">
            {project.title}
          </h3>

          {project.shortDescription && (
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base mb-5 max-w-2xl">
              {project.shortDescription}
            </p>
          )}

          {/* Tech tags */}
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.slice(0, 9).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full border border-border/80 bg-background/60 text-[11px] sm:text-xs font-medium text-foreground/80"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 9 && (
                <span className="px-2.5 py-1 rounded-full border border-border/80 bg-background/60 text-[11px] sm:text-xs font-medium text-foreground/60">
                  +{project.technologies.length - 9}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-sm font-semibold text-foreground/85 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>

            {hasLive && (
              <a
                href={project.liveUrl!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title} (opens in a new tab)`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-secondary/40 hover:bg-secondary/5 hover:text-secondary text-sm font-semibold text-foreground/85 transition-all"
              >
                <ArrowUpRight className="w-4 h-4" />
                Live Demo
              </a>
            )}

            <Link
              href={`/projects/${project.slug}`}
              aria-label={`View full details for ${project.title}`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-all text-sm shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-primary ml-auto"
            >
              <Eye className="w-4 h-4" />
              View Project Details
            </Link>
          </div>
        </div>

        {/* Right column: Key features preview (3 bullets) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="p-5 sm:p-6 rounded-2xl border border-border/70 bg-background/50 backdrop-blur-sm">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Highlights
            </h4>
            <ul className="space-y-2.5">
              {(project.features || []).slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-secondary" />
                  <span className="text-foreground/85 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
