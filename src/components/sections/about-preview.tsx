"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../shared/section-header";
import { personalData } from "../../data/personal";

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="py-16 md:py-20 px-6 md:px-8 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="About" title="Who I Am" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center"
        >
          {/* Photo */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 p-1 rounded-2xl bg-gradient-to-tr from-primary/10 via-border/50 to-secondary/15 shadow-lg overflow-hidden">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-card border border-border">
                <Image
                  src="/images/profile/profile-photo.jpg"
                  alt={personalData.name}
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-8 flex flex-col gap-5">
            <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
              I&apos;m a B.Tech student in Artificial Intelligence &amp; Data
              Science at DKTE Society&apos;s Textile &amp; Engineering Institute,
              Ichalkaranji. I enjoy building practical software projects and
              exploring AI-powered applications with modern technologies.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-base">
              I&apos;m focused on developing my problem-solving skills and
              learning through hands-on work — from full-stack web apps to
              machine-learning-based recommendation systems.
            </p>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-all text-sm shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-primary"
              >
                View About
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
