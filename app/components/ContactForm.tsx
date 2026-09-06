"use client";

import { useState } from "react";
import { Button } from "./Button";
import FormGuard from "./FormGuard";
import { budgets, contactServices } from "../data/home";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isIndianPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const national =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  return national.length === 10 && /^[6-9]/.test(national);
}

type FieldName =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "subject"
  | "message";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>(
    {},
  );

  const validateField = (name: FieldName, value: string) => {
    if (name === "company") return "";
    if (!value.trim()) return "This field is required.";
    if (name === "email" && !EMAIL_RE.test(value.trim())) {
      return "Enter a valid email address.";
    }
    if (name === "phone" && !isIndianPhone(value)) {
      return "Enter a valid 10-digit Indian mobile number.";
    }
    if (name === "message" && value.trim().length < 10) {
      return "Please add a little more detail.";
    }
    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const field = name as FieldName;
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as FieldName;
    setFieldErrors((prev) => ({
      ...prev,
      [field]: validateField(field, e.target.value),
    }));
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: Partial<Record<FieldName, string>> = {};
    (Object.keys(formData) as FieldName[]).forEach((key) => {
      const message = validateField(key, formData[key]);
      if (message) nextErrors[key] = message;
    });
    setFieldErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      setError("Please correct the highlighted fields.");
      return;
    }

    const form = e.currentTarget;
    const payload = new FormData(form);
    payload.set("services", selectedServices.join(", "));
    if (selectedBudget) payload.set("budget", selectedBudget);

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We could not send your message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="flex min-h-[360px] flex-col items-center justify-center rounded-[1.5rem] border border-ink/6 bg-background/80 px-6 py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-accent shadow-[0_12px_28px_-16px_rgba(10,22,40,0.7)]">
          <svg
            className="h-7 w-7"
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
          Message received
        </h3>
        <p className="mt-3 max-w-md text-muted leading-relaxed">
          Thank you. We typically reply within one working day with a clear
          next step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9 md:gap-11" noValidate>
      <FormGuard />
      {error ? (
        <p
          className="rounded-2xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <fieldset className="space-y-7">
        <legend className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Your details
        </legend>
        <div className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
          <Field
            id="name"
            name="name"
            label="Full Name"
            autoComplete="name"
            required
            value={formData.name}
            error={fieldErrors.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <Field
            id="company"
            name="company"
            label="Company / Business (optional)"
            autoComplete="organization"
            value={formData.company}
            error={fieldErrors.company}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <Field
            id="email"
            name="email"
            type="email"
            label="Email Address"
            autoComplete="email"
            required
            value={formData.email}
            error={fieldErrors.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <Field
            id="phone"
            name="phone"
            type="tel"
            label="Indian Phone Number"
            autoComplete="tel"
            inputMode="numeric"
            required
            value={formData.phone}
            error={fieldErrors.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-7">
        <legend className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Project
        </legend>
        <Field
          id="subject"
          name="subject"
          label="Subject"
          required
          value={formData.subject}
          error={fieldErrors.subject}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <div>
          <p className="mb-3.5 text-sm font-semibold text-ink">
            I&apos;m interested in...
          </p>
          <div className="flex flex-wrap gap-2.5">
            {contactServices.map((service) => {
              const isActive = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`min-h-11 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-ink bg-ink text-white shadow-sm"
                      : "border-ink/10 bg-transparent text-muted hover:border-ink/25 hover:bg-background"
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3.5 text-sm font-semibold text-ink">Project budget</p>
          <div className="flex flex-wrap gap-2.5">
            {budgets.map((budget) => {
              const isActive = selectedBudget === budget;
              return (
                <button
                  key={budget}
                  type="button"
                  onClick={() => setSelectedBudget(budget)}
                  className={`min-h-11 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-ink bg-ink text-white shadow-sm"
                      : "border-ink/10 bg-transparent text-muted hover:border-ink/25 hover:bg-background"
                  }`}
                >
                  {budget}
                </button>
              );
            })}
          </div>
        </div>

        <Field
          id="message"
          name="message"
          label="Message"
          required
          multiline
          value={formData.message}
          error={fieldErrors.message}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" className="px-10 py-4" disabled={submitting}>
          {submitting ? "Sending…" : "Submit request"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 transition-transform duration-300"
            aria-hidden="true"
          >
            <line x1="5" y1="19" x2="19" y2="5" />
            <polyline points="12 5 19 5 19 12" />
          </svg>
        </Button>
        <p className="text-sm text-muted">We reply within one working day.</p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  inputMode,
  required,
  multiline,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "email" | "tel" | "text";
  required?: boolean;
  multiline?: boolean;
}) {
  const fieldClass = `peer w-full bg-transparent border-b py-3.5 text-[15px] text-ink placeholder-transparent transition-colors focus:outline-none ${
    error
      ? "border-red-400 focus:border-red-500"
      : "border-ink/12 focus:border-ink"
  }`;
  const labelClass =
    "absolute left-0 top-3.5 cursor-text text-[15px] font-medium text-muted transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-ink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-muted";

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          name={name}
          id={id}
          rows={4}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${fieldClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={fieldClass}
        />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
