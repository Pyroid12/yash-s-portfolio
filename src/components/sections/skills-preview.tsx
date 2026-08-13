"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wrench } from "lucide-react";
import SectionHeader from "../shared/section-header";
import { skillsData } from "../../data/skills";

export default function SkillsPreview() {
  const allSkills = skillsData.flatMap((cat) => cat.skills);

  return (
    <section
      id="skills"
      className="py-16 md:py-20 px-6 md:px-8 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Skills" title="Tools I Work With" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                Technical Skills
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Languages, web fundamentals, and developer tools.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-border bg-muted/40 text-sm font-medium text-foreground/85"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-border/60 flex justify-end">
            <Link
              href="/about#skills"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View Skills / About
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
