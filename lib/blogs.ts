import "server-only";
import { unstable_cache } from "next/cache";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDb } from "./firebase";

export type PublicBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  category: string;
  tags: string[];
  author: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
};

function toIso(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return "";
}

function asList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function mapBlog(
  id: string,
  data: Record<string, unknown>,
): PublicBlog | null {
  if (data.status !== "published") return null;
  const title = String(data.title ?? "").trim();
  const slug = String(data.slug ?? id).trim();
  if (!title || !slug) return null;
  return {
    id,
    title,
    slug,
    excerpt: String(data.excerpt ?? "").trim(),
    featuredImage: String(data.featuredImage ?? "").trim(),
    featuredImageAlt: String(data.featuredImageAlt ?? "").trim(),
    category: String(data.category ?? "Company").trim(),
    tags: asList(data.tags),
    author: String(data.author ?? "Vivexa Tech").trim() || "Vivexa Tech",
    content: String(data.content ?? ""),
    publishedAt: toIso(data.publishedAt).slice(0, 10),
    updatedAt: toIso(data.updatedAt) || toIso(data.publishedAt),
    seoTitle: String(data.seoTitle ?? "").trim(),
    seoDescription: String(data.seoDescription ?? "").trim(),
    focusKeyword: String(data.focusKeyword ?? "").trim(),
    canonicalUrl: String(data.canonicalUrl ?? "").trim(),
  };
}

async function fetchPublishedBlogs(): Promise<PublicBlog[]> {
  const snapshot = await getDocs(
    query(collection(getDb(), "blogs"), where("status", "==", "published")),
  );
  return snapshot.docs
    .map((item) => mapBlog(item.id, item.data() as Record<string, unknown>))
    .filter((item): item is PublicBlog => Boolean(item))
    .sort((a, b) => (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt));
}

const loadBlogs = unstable_cache(
  async () => fetchPublishedBlogs(),
  ["public-blogs-v1"],
  { revalidate: 60 },
);

export async function getPublicBlogs(): Promise<PublicBlog[]> {
  try {
    return await loadBlogs();
  } catch (error) {
    console.error("Failed to load public blogs:", error);
    return [];
  }
}

export async function getPublicBlog(slug: string): Promise<PublicBlog | null> {
  try {
    const snapshot = await getDocs(
      query(collection(getDb(), "blogs"), where("slug", "==", slug)),
    );
    const posts = snapshot.docs
      .map((item) => mapBlog(item.id, item.data() as Record<string, unknown>))
      .filter((item): item is PublicBlog => Boolean(item));
    return posts[0] ?? null;
  } catch (error) {
    console.error("Failed to load public blog:", error);
    return null;
  }
}

export function formatBlogDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function resolveBlogCanonical(post: Pick<PublicBlog, "slug" | "canonicalUrl">) {
  if (post.canonicalUrl.startsWith("http")) return post.canonicalUrl;
  if (post.canonicalUrl.startsWith("/")) return post.canonicalUrl;
  return `/blog/${post.slug}`;
}
