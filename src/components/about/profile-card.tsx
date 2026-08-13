"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, GraduationCap } from "lucide-react";
import { personalData } from "../../data/personal";

export default function ProfileCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm h-full flex flex-col items-center text-center gap-4"
    >
      {/* Photo */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 p-1 rounded-2xl bg-gradient-to-tr from-primary/10 via-border/50 to-secondary/15 shadow-md">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-border">
          <Image
            src="/images/profile/profile-photo.jpg"
            alt={personalData.name}
            fill
            sizes="192px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-foreground">
          {personalData.name}
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
          {personalData.headline}
        </p>
      </div>

      <div className="w-full border-t border-border/60 pt-4 space-y-2.5 text-left">
        <p className="flex items-start gap-2.5 text-xs sm:text-sm">
          <MapPin className="flex-shrink-0 w-4 h-4 mt-0.5 text-primary" />
          <span className="text-foreground/85">{personalData.location}</span>
        </p>
        <p className="flex items-start gap-2.5 text-xs sm:text-sm">
          <GraduationCap className="flex-shrink-0 w-4 h-4 mt-0.5 text-primary" />
          <span className="text-foreground/85">
            Expected graduation {personalData.expectedGraduation}
          </span>
        </p>
        <p className="flex items-start gap-2.5 text-xs sm:text-sm break-all">
          <Mail className="flex-shrink-0 w-4 h-4 mt-0.5 text-primary" />
          <a
            href={`mailto:${personalData.email}`}
            className="text-primary hover:underline underline-offset-2"
          >
            {personalData.email}
          </a>
        </p>
      </div>
    </motion.aside>
  );
}
