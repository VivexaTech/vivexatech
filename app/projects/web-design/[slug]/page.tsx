import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageShell from "../../../components/PageShell";
import PageHero from "../../../components/PageHero";
import CtaBanner from "../../../components/CtaBanner";
import { ButtonLink } from "../../../components/Button";
import JsonLd from "../../../components/JsonLd";
import { fallbackProjects, getWorkProject } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, organizationRef } from "@/lib/schema";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return fallbackProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getWorkProject(slug);
  if (!project) return { title: "Project", robots: { index: false } };
  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/web-design/${project.slug}`,
    image: project.image || undefined,
    imageAlt: project.alt,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getWorkProject(slug);
  if (!project) notFound();

  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `${SITE_URL}/projects/web-design/${project.slug}`,
          image: project.image || undefined,
          creator: organizationRef(),
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/projects/web-design/${project.slug}` },
        ])}
      />
      <main id="main">
        <PageHero
          eyebrow={project.category}
          title={project.title}
          description={project.description}
        />

        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-site space-y-10">
            <div className="overflow-hidden rounded-3xl bg-navy p-2.5 md:rounded-[2rem] md:p-3">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-navy-deep" />
                )}
              </div>
            </div>

            <div className="grid gap-6 rounded-3xl bg-white p-6 sm:grid-cols-3 md:p-10">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl font-semibold text-ink md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/work" variant="outline">
                All projects
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                Services
              </ButtonLink>
            </div>
          </div>
        </section>

        <CtaBanner title="Want a site that reads this clearly?" />
      </main>
    </PageShell>
  );
}
