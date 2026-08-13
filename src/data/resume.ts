import { ResumeConfig } from "../types/resume";

/**
 * Centralized resume configuration.
 * To update the resume: replace the PDF in public/resume/ and change filePath
 * here if the filename changed. No component edits required.
 */
export const resumeConfig: ResumeConfig = {
  filePath: "/resume/Yash_Rendalkar_Resume.pdf",
  label: "View Resume",
  pageTitle: "Resume",
  downloadLabel: "Download Resume",
  openLabel: "Open PDF in New Tab",
};
