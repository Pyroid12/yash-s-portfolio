import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-20 text-center">
      <p className="text-6xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent motion-safe:animate-none">
        404
      </p>
      <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-all text-sm shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-primary min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Go Home
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 border border-border bg-card hover:bg-muted text-foreground font-semibold px-5 py-2.5 rounded-full transition-all text-sm focus-visible:outline-2 focus-visible:outline-primary min-h-[44px]"
        >
          <FolderKanban className="w-4 h-4" aria-hidden="true" />
          View Projects
        </Link>
      </div>
    </div>
  );
}
