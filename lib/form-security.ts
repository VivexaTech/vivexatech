import "server-only";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const MIN_SUBMIT_MS = 2000;

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

export class FormValidationError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function sanitizeText(value: string, max = 4000) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, max);
}

export function isValidEmail(value: string) {
  return EMAIL_RE.test(value) && value.length <= 200;
}

export function normalizeIndianPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  let national = digits;
  if (digits.length === 12 && digits.startsWith("91")) {
    national = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    national = digits.slice(1);
  }
  if (national.length !== 10 || !/^[6-9]/.test(national)) {
    return null;
  }
  return `+91 ${national.slice(0, 5)} ${national.slice(5)}`;
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function assertNotSpam(input: {
  honeypot: string;
  startedAt: string;
  userAgent: string | null;
  ip: string;
  scope: string;
}) {
  if (input.honeypot) {
    throw new FormValidationError("Unable to submit this form.", 400);
  }
  if (!input.userAgent || input.userAgent.length < 10) {
    throw new FormValidationError("Unable to submit this form.", 400);
  }

  const started = Number(input.startedAt);
  if (!Number.isFinite(started) || Date.now() - started < MIN_SUBMIT_MS) {
    throw new FormValidationError("Please take a moment and try again.", 400);
  }
  if (Date.now() - started > 8 * 60 * 60 * 1000) {
    throw new FormValidationError("This form expired. Refresh the page and try again.");
  }

  const key = `${input.scope}:${input.ip}`;
  const now = Date.now();
  const existing = rateBuckets.get(key);
  if (!existing || existing.resetAt < now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return;
  }
  if (existing.count >= RATE_LIMIT) {
    throw new FormValidationError(
      "Too many submissions. Please wait a few minutes and try again.",
      429,
    );
  }
  existing.count += 1;
}

export async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!secret || !siteKey) return;
  if (!token) {
    throw new FormValidationError("Please complete the verification step.");
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  const payload = (await response.json()) as { success?: boolean };
  if (!payload.success) {
    throw new FormValidationError("Verification failed. Please try again.");
  }
}

export function readFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}
