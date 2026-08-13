"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import SectionHeader from "../shared/section-header";
import { exploringData } from "../../data/exploring";

export default function ExploringSection() {
  if (!exploringData.length) return null;

  return (
    <section id="exploring" className="scroll-mt-20">
      <SectionHeader eyebrow="Currently" title="Currently Exploring" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {exploringData.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-background/50 hover:border-primary/25 hover:bg-primary/5 transition-all"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15 text-primary flex items-center justify-center">
                <Sparkle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-foreground/90 leading-tight">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
