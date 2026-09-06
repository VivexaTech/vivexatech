import { NextResponse } from "next/server";
import {
  createCareerApplication,
  getPublicCareer,
} from "@/lib/careers";
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
import { emailConfigured, sendNotificationEmail } from "@/lib/resend";
import { uploadResumeToCloudinary } from "@/lib/resume-upload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const opportunityId = sanitizeText(
      readFormString(formData, "opportunityId"),
      80,
    );
    const name = sanitizeText(readFormString(formData, "name"), 120);
    const email = sanitizeText(readFormString(formData, "email"), 200).toLowerCase();
    const location = sanitizeText(readFormString(formData, "location"), 120);
    const portfolioUrl = sanitizeText(
      readFormString(formData, "portfolioUrl"),
      300,
    );
    const coverLetter = sanitizeText(
      readFormString(formData, "coverLetter"),
      4000,
    );
    const resume = formData.get("resume");
    const turnstileToken = readFormString(formData, "cf-turnstile-response");

    assertNotSpam({
      honeypot: readFormString(formData, "website"),
      startedAt: readFormString(formData, "startedAt"),
      userAgent: request.headers.get("user-agent"),
      ip: getClientIp(request),
      scope: "career-apply",
    });
    await verifyTurnstile(turnstileToken);

    if (!opportunityId) {
      throw new FormValidationError("This opportunity is no longer available.");
    }
    if (name.length < 2) {
      throw new FormValidationError("Please enter your full name.");
    }
    if (!isValidEmail(email)) {
      throw new FormValidationError("Please enter a valid email address.");
    }
    const phone = normalizeIndianPhone(readFormString(formData, "phone"));
    if (!phone) {
      throw new FormValidationError(
        "Please enter a valid 10-digit Indian mobile number.",
      );
    }
    if (location.length < 2) {
      throw new FormValidationError("Please enter your location.");
    }
    if (portfolioUrl && !/^https?:\/\//i.test(portfolioUrl)) {
      throw new FormValidationError(
        "Portfolio or LinkedIn URL must start with http:// or https://.",
      );
    }
    if (!(resume instanceof File) || resume.size === 0) {
      throw new FormValidationError("Please attach your resume.");
    }

    const opportunity = await getPublicCareer(opportunityId);
    if (!opportunity) {
      throw new FormValidationError(
        "This opportunity is not accepting applications.",
        409,
      );
    }

    const resumeUrl = await uploadResumeToCloudinary(resume);

    await createCareerApplication({
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      opportunityType: opportunity.type,
      name,
      email,
      phone,
      location,
      resumeUrl,
      portfolioUrl,
      coverLetter,
    });

    if (emailConfigured()) {
      try {
        await sendNotificationEmail({
          subject: `New ${opportunity.type.toLowerCase()} application: ${opportunity.title}`,
          title: "New career application",
          replyTo: email,
          entries: [
            ["Applicant", name],
            ["Email", email],
            ["Phone", phone],
            ["Location", location],
            ["Position", opportunity.title],
            ["Opportunity type", opportunity.type],
            ["Department", opportunity.department],
            ["Portfolio / LinkedIn", portfolioUrl],
            ["Cover letter", coverLetter],
            ["Resume", resumeUrl],
          ],
        });
      } catch (error) {
        console.error("Application email failed:", error);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof FormValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("Career application failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "We could not submit your application. Please try again.",
      },
      { status: 500 },
    );
  }
}
