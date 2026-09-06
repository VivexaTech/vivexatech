import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import PageHero from "../../components/PageHero";
import CtaBanner from "../../components/CtaBanner";
import { blogBodies, blogPosts } from "../../data/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  const body = blogBodies[slug];
  if (!post || !body) notFound();

  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow={`${post.category} · ${post.date}`}
          title={post.title}
          description={post.excerpt}
        />
        <article className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-[760px] space-y-6 text-lg leading-relaxed text-muted">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="pt-8">
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
