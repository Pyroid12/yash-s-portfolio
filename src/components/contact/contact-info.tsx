import React from "react";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { personalData } from "../../data/personal";
import GithubIcon from "../shared/github-icon";

function LeetcodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M14.5 3.5L4 14a2.12 2.12 0 003 3L17.5 6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 19.5h10.5a1.5 1.5 0 001.5-1.5v-3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const socialLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: personalData.socials.linkedin,
    icon: ExternalLink,
  },
  {
    id: "github",
    label: "GitHub",
    href: personalData.socials.github,
    icon: GithubIcon,
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: personalData.socials.leetcode,
    icon: LeetcodeIcon,
  },
] as const;

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Let&apos;s connect
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
          Have a project, opportunity, or question? I&apos;d be happy to hear
          from you.
        </p>
      </div>

      <ul className="flex flex-col gap-4" aria-label="Contact details">
        <li className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"
            aria-hidden="true"
          >
            <Mail className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email
            </p>
            <a
              href={`mailto:${personalData.email}`}
              className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors break-all focus-visible:outline-2 focus-visible:outline-primary rounded"
            >
              {personalData.email}
            </a>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center"
            aria-hidden="true"
          >
            <Phone className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Phone
            </p>
            <span className="text-sm sm:text-base font-semibold text-foreground">
              {personalData.phone}
            </span>
          </div>
        </li>
      </ul>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Social
        </p>
        <ul className="flex flex-col gap-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/85 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded py-1"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {link.label}
                  <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
