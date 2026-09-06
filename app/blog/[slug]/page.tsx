import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import PageHero from "../../components/PageHero";
import CtaBanner from "../../components/CtaBanner";
import JsonLd from "../../components/JsonLd";
import {
  formatBlogDate,
  getPublicBlog,
  resolveBlogCanonical,
} from "@/lib/blogs";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";
import { ORGANIZATION, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlog(slug);
  if (!post) return { title: "Article", robots: { index: false, follow: false } };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const canonical = resolveBlogCanonical(post);
  const canonicalAbs = canonical.startsWith("http")
    ? canonical
    : `${SITE_URL}${canonical}`;
  const image = post.featuredImage || undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} · Vivexa Tech`,
      description,
      url: canonicalAbs,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || undefined,
      authors: [post.author],
      images: image ? [{ url: image, alt: post.featuredImageAlt || title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${title} · Vivexa Tech`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublicBlog(slug);
  if (!post) notFound();

  const canonical = resolveBlogCanonical(post);
  const canonicalAbs = canonical.startsWith("http")
    ? canonical
    : `${SITE_URL}${canonical}`;
  const safeHtml = sanitizeBlogHtml(post.content);
  const publishedLabel = formatBlogDate(post.publishedAt);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    author: {
      "@type": post.author === "Vivexa Tech" ? "Organization" : "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalAbs,
    },
    url: canonicalAbs,
  };

  if (post.featuredImage) {
    schema.image = [post.featuredImage];
  }
  if (post.publishedAt) {
    schema.datePublished = post.publishedAt;
  }
  if (post.updatedAt) {
    schema.dateModified = post.updatedAt.slice(0, 10);
  }

  return (
    <PageShell>
      <JsonLd data={schema} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${SITE_URL}/blog`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: canonicalAbs,
            },
          ],
        }}
      />
      <main id="main">
        <PageHero
          eyebrow={`${post.category}${publishedLabel ? ` · ${publishedLabel}` : ""}`}
          title={post.title}
          description={post.excerpt}
        />
        <article className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-[760px]">
            {post.featuredImage ? (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-[#0a1628]">
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt || post.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 760px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <p className="text-sm text-muted">
              Written by <span className="font-semibold text-ink">{post.author}</span>
              {publishedLabel ? ` · ${publishedLabel}` : ""}
            </p>
            <div
              className="blog-article mt-8"
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
            <p className="pt-10">
              <Link href="/blog" className="font-semibold text-ink hover:underline">
                ← All articles
              </Link>
            </p>
          </div>
        </article>
        <CtaBanner />
      </main>
    </PageShell>
  );
}
