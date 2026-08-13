import fs from "fs";
import path from "path";
import { resumeConfig } from "../data/resume";

/** Public URL path to the configured resume PDF. */
export function getResumeFilePath(): string {
  return resumeConfig.filePath;
}

/** Download filename derived from the configured path (never hardcoded separately). */
export function getResumeDownloadFilename(): string {
  const segments = resumeConfig.filePath.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "resume.pdf";
}

/** Whether the configured PDF exists on disk under public/. */
export function resumeFileExists(): boolean {
  const relative = resumeConfig.filePath.replace(/^\//, "");
  const absolute = path.join(process.cwd(), "public", relative);
  try {
    return fs.existsSync(absolute) && fs.statSync(absolute).isFile();
  } catch {
    return false;
  }
}
