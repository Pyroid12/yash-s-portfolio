"use client";

import React from "react";
import Link from "next/link";
import { Project } from "../../types/project";
import { ArrowUpRight, Eye, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import GithubIcon from "../shared/github-icon";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const hasLive = !!(project.liveUrl && project.liveUrl.trim() !== "");

  return (
    <article
      className={cn(
        "group relative flex flex-col h-full p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300",
        className
      )}
    >
      {/* Top bar */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Title + desc */}
      <h3 className="text-lg font-bold text-foreground sm:text-xl leading-snug mb-2">
        {project.title}
      </h3>
      {project.shortDescription && (
        <p className="text-sm leading-relaxed text-muted-foreground mb-4 line-clamp-3">
          {project.shortDescription}
        </p>
      )}

      {/* Tech tags */}
      {project.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full border border-border bg-muted/40 text-[11px] font-medium text-foreground/80"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="px-2.5 py-1 rounded-full border border-border bg-muted/40 text-[11px] font-medium text-foreground/60">
              +{project.technologies.length - 6}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto pt-4 border-t border-border/60 flex flex-wrap items-center gap-2.5">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-primary/30 hover:bg-primary/5 hover:text-primary text-sm font-medium text-foreground/85 transition-all"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-secondary/30 hover:bg-secondary/5 hover:text-secondary text-sm font-medium text-foreground/85 transition-all"
          >
            <ArrowUpRight className="w-4 h-4" />
            Live Demo
          </a>
        )}

        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View details for ${project.title}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/15 text-primary text-sm font-semibold transition-colors ml-auto"
        >
          <Eye className="w-4 h-4" />
          View Project
        </Link>
      </div>
    </article>
  );
}
