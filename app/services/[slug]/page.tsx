import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import PageHero from "../../components/PageHero";
import CtaBanner from "../../components/CtaBanner";
import { ButtonLink } from "../../components/Button";
import JsonLd from "../../components/JsonLd";
import { fallbackServices, getPublicService } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return fallbackServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublicService(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} · Vivexa Tech`,
      description: service.shortDescription,
      url: `${SITE_URL}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getPublicService(slug);
  if (!service) notFound();

  const paragraphs = service.detailedDescription
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.name,
          description: service.shortDescription,
          provider: {
            "@type": "Organization",
            name: "Vivexa Tech",
            url: SITE_URL,
          },
          areaServed: "Gurugram, India",
          url: `${SITE_URL}/services/${service.slug}`,
        }}
      />
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
              name: "Services",
              item: `${SITE_URL}/services`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: service.name,
              item: `${SITE_URL}/services/${service.slug}`,
            },
          ],
        }}
      />
      <main id="main">
        <PageHero
          eyebrow={service.eyebrow}
          title={service.name}
          description={service.shortDescription}
        />

        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto grid max-w-site gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="surface-card rounded-3xl p-6 md:p-10">
              <h2 className="font-heading text-2xl font-semibold text-ink">
                {service.name}
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted md:text-lg">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10">
                <ButtonLink href="/contact">Start a project</ButtonLink>
              </div>
            </div>
            <aside className="rounded-3xl bg-navy-deep p-6 text-white md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                What you leave with
              </p>
              <ul className="mt-6 space-y-4">
                {service.features.map((item) => (
                  <li key={item} className="flex gap-3 text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/services" variant="ghost" className="mt-10">
                All services
              </ButtonLink>
            </aside>
          </div>
        </section>

        <CtaBanner />
      </main>
    </PageShell>
  );
}
