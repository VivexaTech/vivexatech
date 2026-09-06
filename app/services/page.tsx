import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import JsonLd from "../components/JsonLd";
import { getPublicServices, groupServices } from "@/lib/services";
import { SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Website design, development, branding, UX/UI, SEO, security, and landing pages from Vivexa Tech in Gurugram.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getPublicServices();
  const groups = groupServices(services);

  return (
    <PageShell>
      <JsonLd
        data={webPageSchema({
          name: "Vivexa Tech services",
          description:
            "Website design, development, branding, UX/UI, SEO, security, and landing pages from Vivexa Tech in Gurugram.",
          path: "/services",
          type: "CollectionPage",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Vivexa Tech services",
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/services/${service.slug}`,
            name: service.name,
          })),
        }}
      />
      <main id="main">
        <PageHero
          eyebrow="Services"
          title="Everything your brand needs to grow — under one roof."
          description="Design, development, SEO, and security for startups that need a professional site without a bloated process."
        />

        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-site space-y-14">
            {groups.map((group) => (
              <div key={group.group}>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  {group.group}
                </p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((service, index) => (
                    <Reveal key={service.slug} delay={index * 0.04}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group surface-card flex h-full flex-col rounded-3xl p-6 transition-transform motion-safe:hover:-translate-y-1 md:p-8"
                      >
                        <h2 className="font-heading text-2xl font-semibold text-ink group-hover:text-accent-strong">
                          {service.name}
                        </h2>
                        <p className="mt-3 flex-1 text-muted leading-relaxed">
                          {service.shortDescription}
                        </p>
                        <span className="mt-6 text-sm font-semibold text-ink">
                          Explore →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CtaBanner />
      </main>
    </PageShell>
  );
}
