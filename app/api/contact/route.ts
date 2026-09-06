import { NextResponse } from "next/server";
import {
  assertNotSpam,
  FormValidationError,
  getClientIp,
  isValidEmail,
  normalizeIndianPhone,
  readFormString,
  sanitizeText,
  verifyTurnstile,
} from "@/lib/form-security";
import { createContactInquiry } from "@/lib/inquiries";
import { emailConfigured, sendNotificationEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const honeypot = readFormString(formData, "website");
    const startedAt = readFormString(formData, "startedAt");
    const name = sanitizeText(readFormString(formData, "name"), 120);
    const email = sanitizeText(readFormString(formData, "email"), 200).toLowerCase();
    const phoneRaw = readFormString(formData, "phone");
    const company = sanitizeText(readFormString(formData, "company"), 160);
    const subject = sanitizeText(readFormString(formData, "subject"), 160);
    const message = sanitizeText(readFormString(formData, "message"), 4000);
    const budget = sanitizeText(readFormString(formData, "budget"), 40);
    const services = sanitizeText(readFormString(formData, "services"), 400)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 8);
    const turnstileToken = readFormString(formData, "cf-turnstile-response");

    assertNotSpam({
      honeypot,
      startedAt,
      userAgent: request.headers.get("user-agent"),
      ip: getClientIp(request),
      scope: "contact",
    });
    await verifyTurnstile(turnstileToken);

    if (name.length < 2) {
      throw new FormValidationError("Please enter your full name.");
    }
    if (!isValidEmail(email)) {
      throw new FormValidationError("Please enter a valid email address.");
    }
    const phone = normalizeIndianPhone(phoneRaw);
    if (!phone) {
      throw new FormValidationError(
        "Please enter a valid 10-digit Indian mobile number.",
      );
    }
    if (subject.length < 2) {
      throw new FormValidationError("Please add a subject.");
    }
    if (message.length < 10) {
      throw new FormValidationError("Please tell us a little more in your message.");
    }

    const inquiry = {
      name,
      email,
      phone,
      company,
      subject,
      message,
      services,
      budget,
    };

    let stored = false;
    try {
      await createContactInquiry(inquiry);
      stored = true;
    } catch (error) {
      console.error("Contact inquiry store failed:", error);
    }

    let emailed = false;
    if (emailConfigured()) {
      try {
        await sendNotificationEmail({
          subject: `New enquiry: ${subject}`,
          title: "New website enquiry",
          replyTo: email,
          entries: [
            ["Name", name],
            ["Email", email],
            ["Phone", phone],
            ["Company", company],
            ["Subject", subject],
            ["Services", services.join(", ")],
            ["Budget", budget],
            ["Message", message],
          ],
        });
        emailed = true;
      } catch (error) {
        console.error("Contact email failed:", error);
      }
    }

    if (!stored && !emailed) {
      throw new Error(
        "We could not send your message right now. Please email info@vivexatech.in.",
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof FormValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("Contact form failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "We could not send your message. Please try again.",
      },
      { status: 500 },
    );
  }
}
