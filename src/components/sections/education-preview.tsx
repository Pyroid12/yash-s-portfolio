"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Calendar } from "lucide-react";
import SectionHeader from "../shared/section-header";
import { educationData } from "../../data/education";

export default function EducationPreview() {
  const btech = educationData.find((e) => e.id === "dkte-btech");

  if (!btech) return null;

  return (
    <section
      id="education"
      className="py-14 md:py-20 px-6 md:px-8 scroll-mt-20 bg-card/30 border-y border-border/40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Education" title="Current Degree" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
        >
          <div className="md:col-span-12 p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm group hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground">
                  {btech.degree}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {btech.institution}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs sm:text-sm">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {btech.period}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                    CGPA {btech.cgpa}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-border/60 flex justify-end">
              <Link
                href="/about#education"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                View Education &amp; About
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
