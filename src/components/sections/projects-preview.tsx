"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../shared/section-header";
import { projectsData } from "../../data/projects";
import ProjectCard from "../projects/project-card";
import FeaturedProjectCard from "../projects/featured-project-card";

export default function ProjectsPreview() {
  const sorted = [...projectsData].sort((a, b) => a.order - b.order);
  const featured = sorted.find((p) => p.featured);
  const others = sorted.filter((p) => !p.featured).slice(0, 2);

  return (
    <section
      id="projects"
      className="py-16 md:py-20 px-6 md:px-8 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeader
            eyebrow="Projects"
            title="Selected Work"
            description="Real-world projects built to explore AI, full-stack development, and recommendation systems."
            className="mb-0"
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors self-start sm:self-end"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <FeaturedProjectCard project={featured} />
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {others.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
