export interface ResumeConfig {
  /** Public path to the PDF under /public (e.g. "/resume/Yash_Rendalkar_Resume.pdf") */
  filePath: string;
  /** Primary CTA label used across the site */
  label: string;
  /** Resume page heading */
  pageTitle: string;
  /** Download button label */
  downloadLabel: string;
  /** Open-in-new-tab button label */
  openLabel: string;
}
