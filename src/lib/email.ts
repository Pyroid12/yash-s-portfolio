import { Resend } from "resend";
import { ContactFormFields } from "../types/contact";
import { personalData } from "../data/personal";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildContactEmailHtml(data: ContactFormFields): string {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Subject", data.subject],
    ["Message", data.message],
  ];

  const bodyRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;vertical-align:top;border-bottom:1px solid #e5e7eb;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#111827;white-space:pre-wrap;border-bottom:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Portfolio Contact</title></head>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;background:#f9fafb;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    <div style="padding:20px 24px;background:#1e3a5f;color:#ffffff;">
      <h1 style="margin:0;font-size:18px;font-weight:700;">New portfolio message</h1>
      <p style="margin:6px 0 0;font-size:13px;opacity:0.9;">From ${escapeHtml(personalData.name)} portfolio contact form</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${bodyRows}</table>
  </div>
</body>
</html>`;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
}

export async function sendContactEmail(
  data: ContactFormFields
): Promise<{ ok: true } | { ok: false }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return { ok: false };
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from,
      to: personalData.email,
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      html: buildContactEmailHtml(data),
      text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
    });

    if (result.error) return { ok: false };
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
