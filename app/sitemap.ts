import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublicProjects } from "@/lib/projects";
import { getPublicServices } from "@/lib/services";
import { getPublicBlogs } from "@/lib/blogs";

function safeDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, blogs] = await Promise.all([
    getPublicProjects(),
    getPublicServices(),
    getPublicBlogs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/work", priority: 0.8 },
    { path: "/team", priority: 0.7 },
    { path: "/careers", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority,
  }));

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/web-design/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blogs.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: safeDate(post.updatedAt) || safeDate(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
