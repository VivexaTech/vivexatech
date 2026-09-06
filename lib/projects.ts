import "server-only";
import { unstable_cache } from "next/cache";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDb } from "./firebase";

export type PublicProject = {
  id: string;
  slug: string;
  name: string;
  description: string;
  location: string;
  country: string;
  growth: string;
  focus: string;
  target: string;
  websiteUrl: string;
  tags: string[];
  image: string;
  category: string;
};

export const fallbackProjects: PublicProject[] = [
  {
    id: "local-cafe",
    slug: "local-cafe",
    name: "Local Cafe Website",
    description:
      "A startup business website for a local cafe — built to help a new hospitality brand look established online.",
    location: "Gurugram",
    country: "India",
    growth: "Local reach",
    focus: "Hospitality",
    target: "New cafes",
    websiteUrl: "",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "",
    category: "Local Business",
  },
  {
    id: "the-corner-store",
    slug: "the-corner-store",
    name: "The Corner Store",
    description:
      "A small e-commerce site for a local retailer, with product pages and a familiar shopping flow.",
    location: "Gurugram",
    country: "India",
    growth: "Online sales",
    focus: "Retail",
    target: "Local shoppers",
    websiteUrl: "",
    tags: ["WooCommerce", "WordPress", "E-commerce"],
    image: "",
    category: "E-commerce",
  },
  {
    id: "kr-global-school",
    slug: "kr-global-school",
    name: "KR Global School",
    description:
      "A school website with a clear information architecture, gallery, and motion for a more inviting first impression.",
    location: "India",
    country: "India",
    growth: "Admissions",
    focus: "Education",
    target: "Parents",
    websiteUrl: "",
    tags: ["UI/UX", "Gallery", "Animations"],
    image: "",
    category: "Education",
  },
  {
    id: "apex-cricket",
    slug: "apex-cricket",
    name: "Apex Cricket",
    description:
      "A cricket academy website designed to present programmes, facilities, and enquiry paths clearly.",
    location: "India",
    country: "India",
    growth: "Enquiries",
    focus: "Sports",
    target: "Athletes",
    websiteUrl: "",
    tags: ["UI/UX", "Gallery", "Animations"],
    image: "",
    category: "Sports",
  },
  {
    id: "synergyfit",
    slug: "synergyfit",
    name: "SynergyFit",
    description:
      "A gym website with CMS-managed content, on-page SEO, and a contact path for memberships.",
    location: "India",
    country: "India",
    growth: "Memberships",
    focus: "Fitness",
    target: "Gym-goers",
    websiteUrl: "",
    tags: ["CMS", "SEO", "Contact Form"],
    image: "",
    category: "Health & Fitness",
  },
  {
    id: "shiksha-jyoti-school",
    slug: "shiksha-jyoti-school",
    name: "Shiksha Jyoti School",
    description:
      "A school website focused on admissions information, animations, and search-friendly structure.",
    location: "India",
    country: "India",
    growth: "Admissions",
    focus: "Education",
    target: "Families",
    websiteUrl: "",
    tags: ["Animations", "SEO", "Contact Form"],
    image: "",
    category: "Education",
  },
  {
    id: "energy-in-motion",
    slug: "energy-in-motion",
    name: "Energy in Motion",
    description:
      "A dance-class website with contact capture, animation, and SEO for local discovery.",
    location: "India",
    country: "India",
    growth: "Class bookings",
    focus: "Performing arts",
    target: "Students",
    websiteUrl: "",
    tags: ["SEO", "Animations", "Contact Form"],
    image: "",
    category: "Local Business",
  },
];

function mapProject(id: string, data: Record<string, unknown>): PublicProject | null {
  if (data.status && data.status !== "published") return null;
  const name = String(data.name ?? "").trim();
  const slug = String(data.slug ?? id).trim();
  if (!name || !slug) return null;
  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag).trim()).filter(Boolean).slice(0, 3)
    : [];
  return {
    id,
    slug,
    name,
    description: String(data.description ?? "").trim(),
    location: String(data.location ?? "").trim(),
    country: String(data.country ?? "").trim(),
    growth: String(data.growth ?? "").trim(),
    focus: String(data.focus ?? "").trim(),
    target: String(data.target ?? "").trim(),
    websiteUrl: String(data.websiteUrl ?? "").trim(),
    tags,
    image: String(data.image ?? "").trim(),
    category: String(data.category ?? "Website").trim(),
  };
}

async function fetchPublishedProjects(): Promise<PublicProject[]> {
  const snapshot = await getDocs(
    query(collection(getDb(), "projects"), where("status", "==", "published")),
  );
  return snapshot.docs
    .map((doc) => mapProject(doc.id, doc.data() as Record<string, unknown>))
    .filter((item): item is PublicProject => Boolean(item));
}

const loadProjects = unstable_cache(
  async () => fetchPublishedProjects(),
  ["public-projects-v2"],
  { revalidate: 300 },
);

export async function getPublicProjects(): Promise<PublicProject[]> {
  try {
    const remote = await loadProjects();
    return remote.length ? remote : fallbackProjects;
  } catch (error) {
    console.error("Failed to load public projects:", error);
    return fallbackProjects;
  }
}

export async function getPublicProject(
  slug: string,
): Promise<PublicProject | null> {
  const projects = await getPublicProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export type ProjectKind = "webdesign" | "uiux";

export type WorkProject = {
  category: string;
  title: string;
  slug: string;
  kinds: ProjectKind[];
  href: string;
  description: string;
  stats: { value: string; label: string }[];
  image: string;
  alt: string;
  websiteUrl: string;
};

export function toWorkProject(project: PublicProject): WorkProject {
  const haystack = `${project.tags.join(" ")} ${project.category}`.toLowerCase();
  const kinds: ProjectKind[] = ["webdesign"];
  if (/\bui\b|\bux\b|ui\/ux|ux\/ui/.test(haystack)) {
    kinds.push("uiux");
  }

  return {
    category:
      [project.location, project.country].filter(Boolean).join(", ") ||
      project.category,
    title: project.name,
    slug: project.slug,
    kinds,
    href: `/projects/web-design/${project.slug}`,
    description: project.description,
    stats: [
      { value: project.growth || "—", label: "Growth" },
      { value: project.focus || "—", label: "Focus" },
      { value: project.target || "—", label: "Target" },
    ],
    image: project.image,
    alt: `${project.name} project preview`,
    websiteUrl: project.websiteUrl,
  };
}

export async function getWorkProjects(): Promise<WorkProject[]> {
  const projects = await getPublicProjects();
  return projects.map(toWorkProject);
}

export async function getWorkProject(
  slug: string,
): Promise<WorkProject | null> {
  const project = await getPublicProject(slug);
  return project ? toWorkProject(project) : null;
}
