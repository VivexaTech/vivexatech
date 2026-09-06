import "server-only";
import { unstable_cache } from "next/cache";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDb } from "./firebase";

export type PublicService = {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  shortDescription: string;
  detailedDescription: string;
  image: string;
  category: string;
  features: string[];
  sortOrder?: number;
};

export const fallbackServices: PublicService[] = [
  {
    id: "web-dev",
    slug: "web-dev",
    name: "Website Development",
    eyebrow: "Core service",
    shortDescription:
      "Fast, secure, and fully responsive websites tailored to your business, across every device.",
    detailedDescription:
      "Vivexa Tech was founded to make professional, high-quality websites affordable for new businesses.\n\nWe build responsive marketing sites and custom pages that look established from day one — clean structure, fast loads, and a path to enquiry that is easy to trust.",
    image: "",
    category: "Core Services",
    features: [
      "Responsive websites for startups and local businesses",
      "Clean, crawler-friendly code",
      "Typical landing pages launch in about 1–2 weeks",
    ],
  },
  {
    id: "website-design",
    slug: "website-design",
    name: "Website Design",
    eyebrow: "Core service",
    shortDescription:
      "Visual systems that make a new business look as considered as the work behind it.",
    detailedDescription:
      "Design is how the market reads your ambition. We shape layout, type, color, and motion so your brand feels sharp without looking theatrical.\n\nEvery composition is built to convert: clear hierarchy, generous spacing, and calls to action that feel inevitable rather than loud.",
    image: "",
    category: "Design",
    features: [
      "Brand-aligned visual language",
      "Desktop and mobile compositions",
      "A design system your site can grow with",
    ],
  },
  {
    id: "ux-ui",
    slug: "ux-ui",
    name: "UI/UX Design",
    eyebrow: "Product design",
    shortDescription:
      "Intuitive, visually appealing interfaces that help people understand and act.",
    detailedDescription:
      "We create interfaces that enhance user experience, boost engagement, and leave a lasting impression.\n\nWe map how someone arrives, understands, and acts — then design screens that reduce friction at every step, on every device.",
    image: "",
    category: "Design",
    features: [
      "User flows and clear page hierarchy",
      "High-fidelity UI",
      "Accessible interaction patterns",
    ],
  },
  {
    id: "seo",
    slug: "seo",
    name: "Digital Marketing & SEO",
    eyebrow: "Core service",
    shortDescription:
      "Search fundamentals baked into the build so new businesses can be found, not retrofitted later.",
    detailedDescription:
      "We optimize websites and implement SEO from the development phase — keyword research, titles, descriptions, speed, and a crawler-friendly structure.\n\nThe goal is durable organic reach for startups that cannot buy every click.",
    image: "",
    category: "Growth",
    features: [
      "On-page SEO and metadata",
      "Technical structure and speed",
      "Keyword-informed page copy",
    ],
  },
  {
    id: "website-maintenance",
    slug: "website-maintenance",
    name: "Website Maintenance",
    eyebrow: "Support",
    shortDescription:
      "Ongoing support, updates, and security monitoring so your site stays fast and reliable.",
    detailedDescription:
      "A launched website still needs care. We provide ongoing support, updates, and security monitoring to keep your website running smoothly, safely, and efficiently.\n\nThis is the practical follow-through after launch — not a separate agency you have to find later.",
    image: "",
    category: "Support",
    features: [
      "Updates and routine checks",
      "Security monitoring",
      "Help keeping content and forms working",
    ],
  },
  {
    id: "security",
    slug: "security",
    name: "Web Security",
    eyebrow: "Core service",
    shortDescription:
      "Practical hardening so visitors can trust the site and owners have fewer obvious risks.",
    detailedDescription:
      "Web security is one of our priorities. We apply hardening practices during build and launch so pages are safer by default.\n\nThat includes protecting assets, reducing casual source inspection, and keeping the browsing experience clean for your users.",
    image: "",
    category: "Core Services",
    features: [
      "Secure defaults at launch",
      "Asset and source-code protections",
      "Safer visitor experience",
    ],
  },
  {
    id: "branding",
    slug: "branding",
    name: "Branding",
    eyebrow: "Growth",
    shortDescription:
      "Identity work that helps a new business feel coherent across the website, decks, and social.",
    detailedDescription:
      "We build identities that can live on a landing page today and a product tomorrow — distinctive without becoming theatrical.\n\nThe work includes positioning language, logo usage, color, type, and the small rules that keep a young brand from looking improvised.",
    image: "",
    category: "Design",
    features: [
      "Logo and identity direction",
      "Color, type, and usage guidance",
      "Website-ready brand application",
    ],
  },
  {
    id: "landing-page",
    slug: "landing-page",
    name: "Landing Pages",
    eyebrow: "Growth",
    shortDescription:
      "Single-page sites that explain the offer clearly, then make the next step easy.",
    detailedDescription:
      "A landing page should do one job with elegance: make the offer obvious and the next step easy.\n\nWe write and design around that job, then build a fast page you can typically launch in about one to two weeks.",
    image: "",
    category: "Growth",
    features: [
      "Campaign and launch pages",
      "Clear offer hierarchy",
      "Fast, mobile-first builds",
    ],
  },
];

function mapService(
  id: string,
  data: Record<string, unknown>,
): (PublicService & { sortOrder: number }) | null {
  if (data.status && data.status !== "published") return null;
  const name = String(data.name ?? "").trim();
  const slug = String(data.slug ?? id).trim();
  if (!name || !slug) return null;
  const features = Array.isArray(data.features)
    ? data.features.map((item) => String(item).trim()).filter(Boolean)
    : [];
  return {
    id,
    slug,
    name,
    eyebrow: String(data.eyebrow ?? "").trim() || "Service",
    shortDescription: String(data.shortDescription ?? "").trim(),
    detailedDescription: String(data.detailedDescription ?? "").trim(),
    image: String(data.image ?? "").trim(),
    category: String(data.category ?? "Core Services").trim(),
    features,
    sortOrder: Number(data.sortOrder ?? 0),
  };
}

async function fetchPublishedServices(): Promise<PublicService[]> {
  const snapshot = await getDocs(
    query(collection(getDb(), "services"), where("status", "==", "published")),
  );
  return snapshot.docs
    .map((doc) => mapService(doc.id, doc.data() as Record<string, unknown>))
    .filter((item): item is PublicService & { sortOrder: number } => Boolean(item))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name));
}

const loadServices = unstable_cache(
  async () => fetchPublishedServices(),
  ["public-services-v1"],
  { revalidate: 300 },
);

export async function getPublicServices(): Promise<PublicService[]> {
  try {
    const remote = await loadServices();
    return remote.length ? remote : fallbackServices;
  } catch (error) {
    console.error("Failed to load public services:", error);
    return fallbackServices;
  }
}

export async function getPublicService(
  slug: string,
): Promise<PublicService | null> {
  const services = await getPublicServices();
  return services.find((service) => service.slug === slug) ?? null;
}

export function groupServices(services: PublicService[]) {
  const groups = new Map<string, PublicService[]>();
  for (const service of services) {
    const key = service.category || "Services";
    const list = groups.get(key) ?? [];
    list.push(service);
    groups.set(key, list);
  }
  return Array.from(groups.entries()).map(([group, items]) => ({
    group,
    items,
  }));
}
