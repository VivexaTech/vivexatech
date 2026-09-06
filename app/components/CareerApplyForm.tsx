"use client";

import { useState } from "react";
import { Button } from "./Button";
import FormGuard from "./FormGuard";

const fieldClass =
  "peer w-full bg-transparent border-b border-ink/15 py-3 text-ink placeholder-transparent focus:outline-none focus:border-ink transition-colors";
const labelClass =
  "absolute left-0 top-3 text-muted cursor-text font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-ink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-muted";

export default function CareerApplyForm({
  opportunity,
}: {
  opportunity: { id: string; title: string };
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("opportunityId", opportunity.id);

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Submission failed");
      }
      setSubmitted(true);
      form.reset();
      setResumeName("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We could not submit your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl bg-background/70 px-6 py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-accent">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-semibold text-ink">
          Application received
        </h3>
        <p className="mt-3 max-w-md text-muted leading-relaxed">
          Thanks for applying for {opportunity.title}. We will review your
          profile and get back to you if there is a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10">
      <FormGuard />
      {error ? (
        <p
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 md:gap-y-10">
        <div className="relative">
          <input
            type="text"
            name="name"
            id="name"
            required
            autoComplete="name"
            placeholder=" "
            className={fieldClass}
          />
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            placeholder=" "
            className={fieldClass}
          />
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
        </div>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            autoComplete="tel"
            inputMode="numeric"
            placeholder=" "
            className={fieldClass}
          />
          <label htmlFor="phone" className={labelClass}>
            Indian Phone Number
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="location"
            id="location"
            required
            autoComplete="address-level2"
            placeholder=" "
            className={fieldClass}
          />
          <label htmlFor="location" className={labelClass}>
            Location
          </label>
        </div>
      </div>

      <div className="relative">
        <input
          type="url"
          name="portfolioUrl"
          id="portfolioUrl"
          autoComplete="url"
          placeholder=" "
          className={fieldClass}
        />
        <label htmlFor="portfolioUrl" className={labelClass}>
          Portfolio or LinkedIn URL (optional)
        </label>
      </div>

      <div>
        <label
          htmlFor="resume"
          className="mb-3 block text-sm font-semibold text-ink"
        >
          Resume / CV
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(event) =>
            setResumeName(event.target.files?.[0]?.name ?? "")
          }
          className="block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-white"
        />
        <p className="mt-2 text-sm text-muted">
          {resumeName || "PDF or Word document, up to 5MB."}
        </p>
      </div>

      <div className="relative">
        <textarea
          name="coverLetter"
          id="coverLetter"
          rows={4}
          placeholder=" "
          className={`${fieldClass} resize-none`}
        />
        <label
          htmlFor="coverLetter"
          className="absolute left-0 top-3 cursor-text font-medium text-muted transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-ink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-muted"
        >
          Cover letter or message (optional)
        </label>
      </div>

      <div>
        <Button type="submit" className="px-10 py-4" disabled={submitting}>
          {submitting ? "Sending…" : "Submit application"}
        </Button>
      </div>
    </form>
  );
}
