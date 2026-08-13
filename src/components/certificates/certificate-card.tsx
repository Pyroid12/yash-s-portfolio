import React from "react";
import { Award } from "lucide-react";
import { Certificate } from "../../types/certificate";
import { cn } from "../../lib/utils";

interface CertificateCardProps {
  certificate: Certificate;
  className?: string;
}

export default function CertificateCard({
  certificate,
  className,
}: CertificateCardProps) {
  return (
    <article
      className={cn(
        "p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow flex items-start gap-4",
        className
      )}
    >
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent/80 text-accent-foreground flex items-center justify-center"
        aria-hidden="true"
      >
        <Award className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-bold text-foreground sm:text-lg leading-snug">
          {certificate.title}
        </h2>
        {certificate.issuer && (
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {certificate.issuer}
          </p>
        )}
        {certificate.description && (
          <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
            {certificate.description}
          </p>
        )}
      </div>
    </article>
  );
}
