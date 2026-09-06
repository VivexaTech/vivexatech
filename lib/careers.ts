import "server-only";
import { unstable_cache } from "next/cache";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { getDb } from "./firebase";

export type PublicCareer = {
  id: string;
  title: string;
  type: "Job" | "Internship";
  department: string;
  location: string;
  workType: string;
  employmentType: string;
  shortDescription: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  openings: number;
  deadline: string;
  keepOpen: boolean;
  duration: string;
  stipend: string;
  status: string;
};

function asList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function mapCareer(id: string, data: Record<string, unknown>): PublicCareer {
  return {
    id,
    title: String(data.title ?? "").trim(),
    type: data.type === "Internship" ? "Internship" : "Job",
    department: String(data.department ?? "").trim(),
    location: String(data.location ?? "").trim(),
    workType: String(data.workType ?? "").trim(),
    employmentType: String(data.employmentType ?? "").trim(),
    shortDescription: String(data.shortDescription ?? "").trim(),
    fullDescription: String(data.fullDescription ?? "").trim(),
    responsibilities: asList(data.responsibilities),
    requirements: asList(data.requirements),
    openings: Number(data.openings ?? 1) || 1,
    deadline: String(data.deadline ?? "").slice(0, 10),
    keepOpen: Boolean(data.keepOpen),
    duration: String(data.duration ?? "").trim(),
    stipend: String(data.stipend ?? "").trim(),
    status: String(data.status ?? ""),
  };
}

export function isCareerAcceptingApplications(career: PublicCareer) {
  if (career.status !== "published") return false;
  if (!career.deadline) return true;
  if (career.keepOpen) return true;
  const deadline = new Date(`${career.deadline}T23:59:59`);
  return !Number.isNaN(deadline.getTime()) && deadline.getTime() >= Date.now();
}

async function fetchPublishedCareers(): Promise<PublicCareer[]> {
  const snapshot = await getDocs(
    query(
      collection(getDb(), "careerOpportunities"),
      where("status", "==", "published"),
    ),
  );
  return snapshot.docs
    .map((item) => mapCareer(item.id, item.data() as Record<string, unknown>))
    .filter((item) => item.title && isCareerAcceptingApplications(item));
}

const loadCareers = unstable_cache(
  async () => fetchPublishedCareers(),
  ["public-careers-v1"],
  { revalidate: 120 },
);

export async function getPublicCareers(): Promise<PublicCareer[]> {
  const result = await getPublicCareersResult();
  return result.careers;
}

export async function getPublicCareersResult(): Promise<{
  careers: PublicCareer[];
  error: string | null;
}> {
  try {
    return { careers: await loadCareers(), error: null };
  } catch (error) {
    console.error("Failed to load careers:", error);
    return {
      careers: [],
      error: "Unable to load openings right now. Please try again shortly.",
    };
  }
}

export async function getPublicCareer(
  id: string,
): Promise<PublicCareer | null> {
  try {
    const snapshot = await getDoc(doc(getDb(), "careerOpportunities", id));
    if (!snapshot.exists()) return null;
    const career = mapCareer(
      snapshot.id,
      snapshot.data() as Record<string, unknown>,
    );
    return isCareerAcceptingApplications(career) ? career : null;
  } catch (error) {
    console.error("Failed to load career:", error);
    return null;
  }
}

export async function createCareerApplication(data: {
  opportunityId: string;
  opportunityTitle: string;
  opportunityType: "Job" | "Internship";
  name: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  portfolioUrl: string;
  coverLetter: string;
}) {
  await addDoc(collection(getDb(), "careerApplications"), {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function formatDeadline(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
