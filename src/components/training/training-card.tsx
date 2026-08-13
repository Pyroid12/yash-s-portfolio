"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Check } from "lucide-react";
import { TrainingEntry } from "../../types/training";
import SectionHeader from "../shared/section-header";
import { trainingData } from "../../data/training";

export default function TrainingSection() {
  if (!trainingData.length) return null;

  return (
    <section id="training" className="scroll-mt-20">
      <SectionHeader eyebrow="Experience & Training" title="Training" />
      <div className="space-y-5">
        {trainingData.map((t) => (
          <TrainingCard key={t.id} entry={t} />
        ))}
      </div>
    </section>
  );
}

function TrainingCard({ entry }: { entry: TrainingEntry }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground leading-snug">
            {entry.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-1.5 text-xs sm:text-sm">
            <span className="text-muted-foreground font-medium">
              {entry.organization}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {entry.period}
            </span>
          </div>
        </div>
      </div>

      {entry.description && (
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          {entry.description}
        </p>
      )}

      {entry.points && entry.points.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
          {entry.points.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-foreground/85"
            >
              <Check className="flex-shrink-0 mt-0.5 w-4 h-4 text-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
