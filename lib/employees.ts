import "server-only";
import { unstable_cache } from "next/cache";
import { collection, getDocs } from "firebase/firestore";
import { getDb } from "./firebase";

export const FOUNDER_EMPLOYEE_ID = "12701";

export type PublicEmployee = {
  docId: string;
  employeeId: string;
  name: string;
  designation: string;
  profilePhoto: string;
  linkedin: string;
  employeeType: string;
  status: string;
  joinedDate: string;
  endDate: string;
};

export type TeamDirectory = {
  founder: PublicEmployee | null;
  heads: PublicEmployee[];
  executives: PublicEmployee[];
  others: PublicEmployee[];
  interns: PublicEmployee[];
  error: string | null;
};

function asString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function pick(data: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = asString(data[key]);
    if (value) return value;
  }
  return "";
}

function toIso(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }
  if (typeof value === "object") {
    const record = value as {
      toDate?: () => Date;
      seconds?: number;
    };
    if (typeof record.toDate === "function") {
      return record.toDate().toISOString();
    }
    if (typeof record.seconds === "number") {
      return new Date(record.seconds * 1000).toISOString();
    }
  }
  return "";
}

function isLinkedInUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.replace(/^www\./, "").endsWith("linkedin.com")
    );
  } catch {
    return false;
  }
}

function includesInsensitive(value: string, term: string) {
  return value.toLowerCase().includes(term.toLowerCase());
}

export function formatTeamDate(iso: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function displayName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "";
  if (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) {
    return trimmed
      .toLowerCase()
      .replace(/\b([a-z])/g, (letter) => letter.toUpperCase());
  }
  return trimmed;
}

function normalizeEmployee(
  docId: string,
  raw: Record<string, unknown>,
): PublicEmployee {
  const employeeId = pick(raw, ["employeeId"]) || docId;
  const linkedinRaw = pick(raw, [
    "linkedin",
    "linkedIn",
    "linkedinUrl",
    "linkedInUrl",
    "linkedinProfile",
    "linkedInProfile",
  ]);

  return {
    docId,
    employeeId,
    name: pick(raw, ["name"]),
    designation: pick(raw, ["designation"]),
    profilePhoto:
      pick(raw, ["profilePhotoOriginal"]) || pick(raw, ["profilePhoto"]),
    linkedin: isLinkedInUrl(linkedinRaw) ? linkedinRaw : "",
    employeeType: pick(raw, ["employeeType"]),
    status: pick(raw, ["status"]),
    joinedDate: toIso(raw.joinedDate),
    endDate: toIso(
      raw.endDate ??
        raw.internshipEndDate ??
        raw.lastWorkingDate ??
        raw.completedAt,
    ),
  };
}

function isFounder(employee: PublicEmployee) {
  return (
    employee.employeeId === FOUNDER_EMPLOYEE_ID ||
    employee.docId === FOUNDER_EMPLOYEE_ID
  );
}

function isIntern(employee: PublicEmployee) {
  return (
    includesInsensitive(employee.employeeType, "intern") ||
    includesInsensitive(employee.designation, "intern")
  );
}

function isHead(employee: PublicEmployee) {
  return includesInsensitive(employee.designation, "head");
}

function isExecutive(employee: PublicEmployee) {
  return includesInsensitive(employee.designation, "executive");
}

function sortByName(employees: PublicEmployee[]) {
  return [...employees].sort((a, b) =>
    displayName(a.name).localeCompare(displayName(b.name)),
  );
}

function categorize(employees: PublicEmployee[]): Omit<TeamDirectory, "error"> {
  const used = new Set<string>();
  const take = (predicate: (employee: PublicEmployee) => boolean) => {
    const matches = employees.filter(
      (employee) => !used.has(employee.docId) && predicate(employee),
    );
    matches.forEach((employee) => used.add(employee.docId));
    return sortByName(matches);
  };

  const founder =
    employees.find(
      (employee) => isFounder(employee) && employee.status === "Active",
    ) ?? null;
  if (founder) used.add(founder.docId);

  const heads = take(
    (employee) => employee.status === "Active" && isHead(employee),
  );
  const executives = take(
    (employee) => employee.status === "Active" && isExecutive(employee),
  );
  const interns = take(isIntern);
  const others = take((employee) => employee.status === "Active");

  return { founder, heads, executives, interns, others };
}

async function fetchEmployees(): Promise<PublicEmployee[]> {
  const snapshot = await getDocs(collection(getDb(), "employees"));
  return snapshot.docs
    .map((doc) =>
      normalizeEmployee(doc.id, doc.data() as Record<string, unknown>),
    )
    .filter((employee) => employee.name && employee.employeeId);
}

const loadEmployees = unstable_cache(
  async () => fetchEmployees(),
  ["public-team-directory-v2"],
  { revalidate: 300 },
);

export async function getPublicTeam(): Promise<TeamDirectory> {
  try {
    const employees = await loadEmployees();
    return { ...categorize(employees), error: null };
  } catch (error) {
    console.error("Failed to load public employees:", error);
    return {
      founder: null,
      heads: [],
      executives: [],
      others: [],
      interns: [],
      error: "unavailable",
    };
  }
}
