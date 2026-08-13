"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { personalData } from "../../data/personal";
import { resumeConfig } from "../../data/resume";
import { ArrowRight, FileText } from "lucide-react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(90vh-4rem)] items-center justify-center py-8 md:py-10 px-6 md:px-8 overflow-hidden"
    >
      {/* Background accents (subtle blue and violet glows) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">

        {/* Left Column: Text content */}
        <motion.div
          className="md:col-span-7 flex flex-col items-start text-left gap-6 order-2 md:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open to opportunities
          </motion.div>

          {/* Name & Headline */}
          <div className="flex flex-col gap-1.5">
            <motion.h1
              variants={itemVariants}
              className="text-2xl font-extrabold tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.95rem] leading-tight"
            >
              <span className="text-xl sm:text-[1.7rem] lg:text-[2.2rem] font-medium text-foreground/80">Hi, I&apos;m </span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{personalData.name}</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg font-bold text-foreground/80 sm:text-xl"
            >
              {personalData.headline}
            </motion.p>
          </div>

          {/* Professional verified intro */}
          <motion.p
            variants={itemVariants}
            className="text-base leading-relaxed text-muted-foreground max-w-lg"
          >
            B.Tech student in AI &amp; Data Science at DKTE. Building real-world projects and AI-powered applications with modern technologies.
          </motion.p>

          {/* Call to action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-primary w-full sm:w-auto text-sm shadow-lg shadow-primary/20"
            >
              View My Projects
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/resume"
              className="inline-flex items-center justify-center gap-2 border border-border bg-card hover:bg-muted text-foreground font-semibold px-6 py-3 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-primary w-full sm:w-auto text-sm"
            >
              <FileText className="w-4 h-4 opacity-75" />
              {resumeConfig.label}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Profile photo presentation */}
        <motion.div
          className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {/* Subtle marble-inspired portrait frame */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] p-1.5 rounded-3xl bg-gradient-to-tr from-primary/10 via-border/50 to-secondary/15 shadow-xl dark:shadow-neutral-950/50 group">
            {/* Soft background glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity blur-lg pointer-events-none" />

            {/* Inner frame */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card border border-border">
              <Image
                src="/images/profile/profile-photo.jpg"
                alt={personalData.name}
                fill
                priority
                sizes="(max-width: 768px) 300px, 350px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
