import React from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import SectionHeader from "../shared/section-header";
import { personalData } from "../../data/personal";

export default function ContactPreview() {
  return (
    <section
      id="contact"
      className="py-16 md:py-20 px-6 md:px-8 scroll-mt-20 bg-card/30 border-t border-border/40"
    >
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-6">
        <SectionHeader
          eyebrow="Contact"
          title="Get in Touch"
          description="Open to internships, collaborations, and learning opportunities."
          align="center"
          className="mb-0"
        />
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all text-sm shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-primary min-h-[44px]"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          Contact Me
        </Link>
        <p className="text-sm text-muted-foreground">
          Or email directly:{" "}
          <a
            href={`mailto:${personalData.email}`}
            className="font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
          >
            {personalData.email}
          </a>
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
        >
          Learn more about me
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
