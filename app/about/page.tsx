import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import { ButtonLink } from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Vivexa Tech is a Gurugram web studio helping new businesses and startups launch professional, budget-friendly websites.",
  path: "/about",
});

const values = [
  {
    title: "Clarity over theatrics",
    text: "A website should make your value obvious. We design for hierarchy, not decoration.",
  },
  {
    title: "Premium, without the premium tax",
    text: "Startups deserve a site that looks established. We keep the work sharp and the pricing honest.",
  },
  {
    title: "Built to be found",
    text: "SEO, speed, and structure are part of the first build — not a later apology.",
  },
  {
    title: "Security as a default",
    text: "We treat the site as a public storefront: safer for visitors, tidier for the people who own it.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        data={webPageSchema({
          name: "About Vivexa Tech",
          description:
            "Gurugram web studio helping new businesses and startups launch professional, budget-friendly websites.",
          path: "/about",
          type: "AboutPage",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <main id="main">
        <PageHero
          eyebrow="About us"
          title="You know your value. We help the market see it."
          description="We are Gurugram-based web designers dedicated to helping new businesses launch their online journey with sites that look considered, load quickly, and can actually be found."
        />

        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-site">
            <Reveal className="surface-card grid gap-10 overflow-hidden rounded-3xl p-6 sm:p-10 md:grid-cols-2 md:rounded-[2rem] md:p-14 lg:gap-16">
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  A studio for companies still introducing themselves.
                </h2>
              </div>
              <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
                <p>
                  We believe every business, no matter how small, deserves a
                  powerful online presence. We don&apos;t just build websites;
                  we craft digital experiences that translate your vision into
                  reality.
                </p>
                <p>
                  Typical landing pages and portfolios take about one to two
                  weeks. Larger work with custom functionality, SEO, and
                  security configuration can take three to six. We will tell you
                  which one you are actually buying.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ButtonLink href="/team">Meet the team</ButtonLink>
                  <ButtonLink href="/work" variant="outline">
                    Selected work
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-background px-4 pb-16 md:px-8 md:pb-24 lg:px-10">
          <div className="mx-auto max-w-site">
            <SectionHeading
              eyebrow="How we work"
              title="Four principles we will not trade for a faster mock-up."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value, index) => (
                <Reveal key={value.title} delay={index * 0.05}>
                  <article className="surface-card h-full rounded-3xl p-6 md:p-8">
                    <p className="font-mono text-sm text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-muted leading-relaxed">{value.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto flex max-w-site flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-lg text-muted">
              Want the people behind the work? See who is currently active at
              Vivexa Tech, or browse open roles.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link
                href="/team"
                className="font-semibold text-ink underline-offset-4 hover:underline"
              >
                Our team →
              </Link>
              <Link
                href="/careers"
                className="font-semibold text-ink underline-offset-4 hover:underline"
              >
                Careers →
              </Link>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
    </PageShell>
  );
}
