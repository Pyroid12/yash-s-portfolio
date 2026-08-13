import React from "react";
import { cn } from "../../lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("py-10 md:py-14 px-6 md:px-8", className)}>
      <div className="mx-auto max-w-5xl flex flex-col gap-3">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
