import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import { formatBlogDate, getPublicBlogs } from "@/lib/blogs";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Vivexa Tech on launching websites, SEO, and web security for startups.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog · Vivexa Tech",
    description:
      "Notes from Vivexa Tech on launching websites, SEO, and web security for startups.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog · Vivexa Tech",
    description:
      "Notes from Vivexa Tech on launching websites, SEO, and web security for startups.",
  },
};

const PAGE_SIZE = 9;

function readPage(value: string | string[] | undefined) {
  const raw = typeof value === "string" ? Number(value) : 1;
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const posts = await getPublicBlogs();
  const page = readPage(params.page);
  const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = posts.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="Journal"
          title="Notes on launching well."
          description="Practical writing from the studio — process, search, and the unglamorous work that makes a site feel trustworthy."
        />

        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-site">
            {posts.length === 0 ? (
              <div className="surface-card mx-auto max-w-2xl rounded-3xl px-8 py-16 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong">
                  Journal
                </p>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-ink">
                  No published articles yet
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  When a piece is ready, it will appear here. Drafts stay in the
                  studio until they are published.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {visible.map((post, index) => (
                    <Reveal key={post.id} delay={index * 0.05}>
                      <article className="group surface-card flex h-full flex-col overflow-hidden rounded-3xl">
                        <Link href={`/blog/${post.slug}`} className="block">
                          <div className="relative aspect-[16/10] overflow-hidden bg-[#0a1628]">
                            {post.featuredImage ? (
                              <Image
                                src={post.featuredImage}
                                alt={post.featuredImageAlt || post.title}
                                fill
                                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            ) : (
                              <div className="flex h-full items-end p-6">
                                <p className="font-heading text-lg text-white/80">
                                  {post.category}
                                </p>
                              </div>
                            )}
                          </div>
                        </Link>
                        <div className="flex flex-1 flex-col p-6 md:p-8">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong">
                            {post.category}
                            {post.publishedAt
                              ? ` · ${formatBlogDate(post.publishedAt)}`
                              : ""}
                          </p>
                          <h2 className="mt-4 font-heading text-2xl font-semibold text-ink group-hover:text-accent-strong">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>
                          <p className="mt-3 flex-1 leading-relaxed text-muted">
                            {post.excerpt}
                          </p>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="mt-6 text-sm font-semibold text-ink"
                          >
                            Read more →
                          </Link>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
                {pageCount > 1 ? (
                  <div className="mt-12 flex items-center justify-center gap-3">
                    {current > 1 ? (
                      <Link
                        href={current === 2 ? "/blog" : `/blog?page=${current - 1}`}
                        className="rounded-full border border-ink/10 px-5 py-2.5 text-sm font-semibold text-muted hover:border-ink/25 hover:text-ink"
                      >
                        Previous
                      </Link>
                    ) : null}
                    <p className="text-sm text-muted">
                      Page {current} of {pageCount}
                    </p>
                    {current < pageCount ? (
                      <Link
                        href={`/blog?page=${current + 1}`}
                        className="rounded-full border border-ink/10 px-5 py-2.5 text-sm font-semibold text-muted hover:border-ink/25 hover:text-ink"
                      >
                        Next
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>

        <CtaBanner />
      </main>
    </PageShell>
  );
}
