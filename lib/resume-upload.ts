import "server-only";
import { createHash } from "crypto";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function assertResumeFile(file: File) {
  if (file.size > MAX_RESUME_BYTES) {
    throw new Error("Resume must be under 5MB");
  }
  const name = file.name.toLowerCase();
  const allowedName =
    name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx");
  if (!allowedName && !ALLOWED_TYPES.has(file.type)) {
    throw new Error("Resume must be a PDF or Word document");
  }
}

export async function uploadResumeToCloudinary(file: File): Promise<string> {
  assertResumeFile(file);

  const folder = "vivexa/resumes";
  const bytes = Buffer.from(await file.arrayBuffer());
  const mime = file.type || "application/pdf";
  const dataUri = `data:${mime};base64,${bytes.toString("base64")}`;
  const publicId = `resume-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName) {
    throw new Error(
      "Resume storage is not configured. Add Cloudinary credentials to the website environment.",
    );
  }

  const form = new FormData();
  form.append("file", dataUri);
  form.append("folder", folder);
  form.append("public_id", publicId);

  if (apiKey && apiSecret) {
    const timestamp = Math.round(Date.now() / 1000);
    const toSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = createHash("sha1").update(toSign).digest("hex");
    form.append("api_key", apiKey);
    form.append("timestamp", String(timestamp));
    form.append("signature", signature);
  } else if (uploadPreset) {
    form.append("upload_preset", uploadPreset);
  } else {
    throw new Error(
      "Resume storage is not configured. Add Cloudinary API keys or an unsigned upload preset.",
    );
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
    { method: "POST", body: form },
  );
  const payload = (await response.json()) as {
    secure_url?: string;
    error?: { message?: string };
  };

  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message || "Resume upload failed");
  }

  return payload.secure_url;
}

