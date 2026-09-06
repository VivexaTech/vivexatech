import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import FaqAccordion from "../components/FaqAccordion";
import CtaBanner from "../components/CtaBanner";
import Reveal from "../components/Reveal";
import { faqs } from "../data/home";
import JsonLd from "../components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Vivexa Tech services, SEO, security, and launch timelines.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <main id="main">
        <PageHero
          eyebrow="FAQ"
          title="Frequently asked questions."
          description="Straight answers about how we work, what things cost, and how long a launch actually takes."
        />

        <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto grid max-w-site gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:sticky lg:top-32">
                Still deciding if we are the right studio?
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={0.06}>
              <FaqAccordion faqs={faqs} />
            </Reveal>
          </div>
        </section>

        <CtaBanner title="Have a question that isn't here?" />
      </main>
    </PageShell>
  );
}
