"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import SectionHeader from "../shared/section-header";
import { interestsData } from "../../data/interests";

export default function InterestsSection() {
  if (!interestsData.length) return null;

  return (
    <section id="interests" className="scroll-mt-20">
      <SectionHeader eyebrow="Personal" title="Personal Interests" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-card/60 shadow-sm"
      >
        <div className="flex flex-wrap gap-2">
          {interestsData.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/30 text-xs sm:text-sm font-medium text-muted-foreground"
            >
              <Heart className="w-3 h-3 text-muted-foreground/70" />
              {item.title}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
