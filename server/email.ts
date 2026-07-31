import nodemailer, { type Transporter } from "nodemailer";

/* Email is a notification layer only — the dashboard/database is always the
   source of truth for a submission. Nothing in this file should ever throw
   in a way that stops a form submission from being saved: every entry point
   here catches its own errors and logs a warning instead. */

type MailFields = { label: string; value?: string | null }[];

export type NotificationEmail = {
  subject: string;
  heading: string;
  fields: MailFields;
  footerNote: string;
};

function smtpConfigured() {
  const enabled = process.env.SMTP_ENABLED === "true";
  if (!enabled) return false;

  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "COMPANY_EMAIL_TO"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.warn(
      `[email] SMTP_ENABLED is true but missing required variable(s): ${missing.join(", ")}. Skipping email send.`,
    );
    return false;
  }
  return true;
}

let cachedTransporter: Transporter | undefined;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return cachedTransporter;
}

function renderTextBody(fields: MailFields, footerNote: string): string {
  const lines = fields.map(({ label, value }) => `${label}: ${value && value.trim() ? value : "-"}`);
  return `${lines.join("\n")}\n\n${footerNote}`;
}

function renderHtmlBody(heading: string, fields: MailFields, footerNote: string): string {
  const rows = fields
    .map(
      ({ label, value }) => `
      <tr>
        <td style="padding:6px 12px 6px 0;color:#6b7280;font:13px sans-serif;vertical-align:top;white-space:nowrap;">${label}</td>
        <td style="padding:6px 0;color:#111827;font:14px sans-serif;">${(value && value.trim() ? value : "-").replace(/\n/g, "<br/>")}</td>
      </tr>`,
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="font:600 20px sans-serif;color:#111827;margin:0 0 16px;">${heading}</h2>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      <p style="margin-top:20px;color:#9ca3af;font:12px sans-serif;">${footerNote}</p>
    </div>`;
}

/**
 * Sends a notification email if SMTP is fully configured and enabled.
 * Safe to call unconditionally — resolves quietly (with a logged warning)
 * whenever SMTP isn't ready, instead of throwing.
 */
export async function sendNotificationEmail(email: NotificationEmail): Promise<void> {
  if (!smtpConfigured()) return;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.COMPANY_EMAIL_TO,
      subject: email.subject,
      text: renderTextBody(email.fields, email.footerNote),
      html: renderHtmlBody(email.heading, email.fields, email.footerNote),
    });
  } catch (error) {
    console.warn("[email] Failed to send notification email:", error);
  }
}
