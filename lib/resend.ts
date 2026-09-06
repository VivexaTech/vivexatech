import "server-only";
import { Resend } from "resend";
import { CONTACT, SITE_NAME } from "./site";

function getClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function fromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL ||
    `${SITE_NAME} <noreply@${CONTACT.email.split("@")[1]}>`
  );
}

function notifyAddress() {
  return process.env.CONTACT_NOTIFICATION_EMAIL || CONTACT.supportEmail;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rows(entries: [string, string][]) {
  return entries
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#5c6b7c;width:160px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#0a1628">${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`,
    )
    .join("");
}

function template(title: string, entries: [string, string][]) {
  return `<!DOCTYPE html><html><body style="font-family:Geist,Arial,sans-serif;background:#f3f1ec;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
    <div style="background:#0a1628;color:#fff;padding:20px 24px">
      <p style="margin:0;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#00c2e0">${SITE_NAME}</p>
      <h1 style="margin:8px 0 0;font-size:22px">${escapeHtml(title)}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;padding:8px">${rows(entries)}</table>
  </div>
  </body></html>`;
}

export async function sendNotificationEmail(input: {
  subject: string;
  title: string;
  replyTo?: string;
  entries: [string, string][];
}) {
  const client = getClient();
  if (!client) {
    throw new Error(
      "Email is not configured. Add RESEND_API_KEY on the website server.",
    );
  }

  const { error } = await client.emails.send({
    from: fromAddress(),
    to: notifyAddress(),
    replyTo: input.replyTo,
    subject: input.subject,
    html: template(input.title, input.entries),
  });

  if (error) {
    throw new Error(error.message || "Email delivery failed");
  }
}

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}
