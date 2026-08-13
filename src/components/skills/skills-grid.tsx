"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillCategory } from "../../types/skills";
import SectionHeader from "../shared/section-header";
import { skillsData } from "../../data/skills";

const iconMap: Record<string, string> = {
  languages: "💻",
  web: "🌐",
  tools: "🛠️",
};

export default function SkillsGrid() {
  if (!skillsData.length) return null;

  return (
    <section id="skills" className="scroll-mt-20">
      <SectionHeader eyebrow="Skills" title="My Skill Set" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {skillsData.map((cat, idx) => (
          <CategoryCard key={cat.id} category={cat} index={idx} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
      className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow h-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl">
          {iconMap[category.id] ?? "📁"}
        </div>
        <h3 className="text-base font-bold text-foreground">
          {category.name}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-border bg-muted/40 text-sm font-medium text-foreground/85"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
