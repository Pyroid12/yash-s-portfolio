import Link from "next/link";
import { personalData } from "../../data/personal";

export default function SiteFooter() {
  return (
    <footer className="w-full py-8 border-t border-border bg-card/50 text-center text-xs text-muted-foreground/80 z-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <p>
          © {new Date().getFullYear()} {personalData.name}. All rights reserved.
        </p>
        <span className="hidden sm:inline text-border" aria-hidden="true">
          ·
        </span>
        <Link
          href="/privacy"
          className="font-medium hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
