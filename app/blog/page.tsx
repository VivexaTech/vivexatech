import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import { blogPosts } from "../data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Vivexa Tech on launching websites, SEO, and web security for startups.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="Journal"
          title="Notes on launching well."
          description="Practical writing from the studio — process, search, and the unglamorous work that makes a site feel trustworthy."
        />

        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto grid max-w-site gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group surface-card flex h-full flex-col rounded-3xl p-6 md:p-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong">
                    {post.category} · {post.date}
                  </p>
                  <h2 className="mt-4 font-heading text-2xl font-semibold text-ink group-hover:text-accent-strong">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-ink">
                    Read →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBanner />
      </main>
    </PageShell>
  );
}
