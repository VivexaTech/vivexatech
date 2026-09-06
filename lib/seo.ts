import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  index?: boolean;
  follow?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  index = true,
  follow = true,
  publishedTime,
  modifiedTime,
  authors,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const canonical = path.startsWith("http") ? path : path || "/";
  const url = absoluteUrl(canonical);
  const ogTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
  const images = image
    ? [{ url: image, alt: imageAlt || title }]
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    robots: {
      index,
      follow,
      googleBot: {
        index,
        follow,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type,
      siteName: SITE_NAME,
      locale: "en_IN",
      images,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export const DEFAULT_META_DESCRIPTION = SITE_DESCRIPTION;
