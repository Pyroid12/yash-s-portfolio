"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Blocks,
  Link2,
  Sparkles,
} from "lucide-react";
import { Project } from "../../types/project";
import PageHeader from "../shared/page-header";
import { cn } from "../../lib/utils";
import GithubIcon from "../shared/github-icon";

interface ProjectDetailProps {
  project: Project;
}

function InfoBlock({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
      </div>
      <div className="text-sm leading-relaxed text-foreground/85 sm:text-base">
        {children}
      </div>
    </motion.section>
  );
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const hasLive = !!(project.liveUrl && project.liveUrl.trim() !== "");

  return (
    <article>
      <PageHeader
        eyebrow={project.featured ? "Featured Project" : "Project"}
        title={project.title}
        description={project.description}
      />

      {/* Back + primary actions bar */}
      <div className="mx-auto max-w-5xl px-6 md:px-8 -mt-4 mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all projects
          </Link>

          <div className="flex-1" />

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
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-all text-sm shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ArrowUpRight className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 md:px-8 pb-20 space-y-6">
        {/* Metadata summary strip */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
          className="p-4 sm:p-5 rounded-2xl border border-border bg-card/70 shadow-sm flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 text-primary text-xs font-bold border border-primary/20">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full border border-border bg-muted/40 text-[11px] font-medium text-foreground/80"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-2.5 py-1 rounded-full border border-border bg-muted/40 text-[11px] font-medium text-foreground/60">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          )}
        </motion.section>

        <InfoBlock icon={Lightbulb} title="Overview">
          <p>{project.description}</p>
        </InfoBlock>

        {project.problem && (
          <InfoBlock icon={AlertTriangle} title="Problem">
            <p>{project.problem}</p>
          </InfoBlock>
        )}

        {project.features && project.features.length > 0 && (
          <InfoBlock icon={CheckCircle2} title="Key Features">
            <ul className="space-y-2.5">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="flex-shrink-0 mt-0.5 w-4 h-4 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </InfoBlock>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <InfoBlock icon={Blocks} title="Technology Stack">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1.5 rounded-full border border-border bg-muted/40 text-sm font-medium text-foreground/85"
                >
                  {tech}
                </span>
              ))}
            </div>
          </InfoBlock>
        )}

        <InfoBlock icon={Link2} title="Links">
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2.5">
              <GithubIcon className="flex-shrink-0 w-4 h-4 text-foreground/60" />
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline underline-offset-2 font-medium break-all"
              >
                {project.githubUrl}
              </a>
            </li>
            {hasLive && (
              <li className="flex items-center gap-2.5">
                <ArrowUpRight className="flex-shrink-0 w-4 h-4 text-foreground/60" />
                <a
                  href={project.liveUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-2 font-medium break-all"
                >
                  {project.liveUrl}
                </a>
              </li>
            )}
          </ul>
        </InfoBlock>
      </div>
    </article>
  );
}
