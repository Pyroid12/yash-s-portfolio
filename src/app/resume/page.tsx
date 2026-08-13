import type { Metadata } from "next";
import { FileText, Download, ExternalLink } from "lucide-react";
import PageHeader from "../../components/shared/page-header";
import { resumeConfig } from "../../data/resume";
import { personalData } from "../../data/personal";
import {
  getResumeFilePath,
  getResumeDownloadFilename,
  resumeFileExists,
} from "../../lib/resume";
import { createPageMetadata } from "../../lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Resume | ${personalData.name}`,
  description: `Resume of ${personalData.name} — ${personalData.headline}.`,
  path: "/resume",
});

export default function ResumePage() {
  const pdfAvailable = resumeFileExists();
  const filePath = getResumeFilePath();
  const downloadFilename = getResumeDownloadFilename();

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Resume"
        title={resumeConfig.pageTitle}
        description={`Professional resume for ${personalData.name}.`}
      />

      <div className="mx-auto max-w-5xl px-6 md:px-8 flex flex-col gap-6">
        {pdfAvailable ? (
          <>
            <div className="flex flex-wrap gap-3">
              <a
                href={filePath}
                download={downloadFilename}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-all text-sm shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={`${resumeConfig.downloadLabel} (${downloadFilename})`}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                {resumeConfig.downloadLabel}
              </a>
              <a
                href={filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border bg-card hover:bg-muted text-foreground font-semibold px-5 py-2.5 rounded-full transition-all text-sm focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={resumeConfig.openLabel}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                {resumeConfig.openLabel}
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              <iframe
                src={filePath}
                title={`${personalData.name} resume PDF`}
                className="w-full h-[70vh] min-h-[420px] sm:min-h-[520px] bg-background"
              />
            </div>
          </>
        ) : (
          <div
            className="rounded-2xl border border-dashed border-border bg-card/60 p-8 sm:p-12 text-center flex flex-col items-center gap-4"
            role="status"
            aria-live="polite"
          >
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
              <FileText className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="max-w-md space-y-2">
              <h2 className="text-lg font-bold text-foreground">
                Resume PDF not yet available
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Place your resume at{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                  public{resumeConfig.filePath}
                </code>{" "}
                and it will appear here automatically after the next build.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
