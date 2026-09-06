import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublicProjects } from "@/lib/projects";
import { getPublicServices } from "@/lib/services";
import { getPublicBlogs } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, blogs] = await Promise.all([
    getPublicProjects(),
    getPublicServices(),
    getPublicBlogs(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/team",
    "/careers",
    "/work",
    "/projects",
    "/services",
    "/blog",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/web-design/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blogs.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
