import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import { ButtonLink } from "../components/Button";
import { getWorkProjects, type ProjectKind } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Work",
  description: "Selected website design and UX/UI work from Vivexa Tech.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Vivexa Tech",
    description: "Selected website design and UX/UI work from Vivexa Tech.",
    url: `${SITE_URL}/work`,
  },
};

const filters: { id: string; label: string; kind?: ProjectKind }[] = [
  { id: "all", label: "All work" },
  { id: "webdesign", label: "Web Design", kind: "webdesign" },
  { id: "uiux", label: "UX/UI Design", kind: "uiux" },
];

function readType(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const type = readType(params.type);
  const projects = await getWorkProjects();
  const active = filters.find((filter) => filter.id === type) ?? filters[0];
  const visible = active.kind
    ? projects.filter((project) => project.kinds.includes(active.kind!))
    : projects;

  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="Selected work"
          title="Companies that closed the perception gap."
          description="A look at the websites and interfaces we have shaped — and the numbers they now lead with."
        />

        <section className="bg-background px-4 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-site">
            <div className="mb-10 flex flex-wrap gap-2">
              {filters.map((filter) => {
                const href = filter.kind ? `/work?type=${filter.id}` : "/work";
                const isActive = active.id === filter.id;
                return (
                  <Link
                    key={filter.id}
                    href={href}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-ink bg-ink text-white"
                        : "border-ink/10 text-muted hover:border-ink/25 hover:text-ink"
                    }`}
                  >
                    {filter.label}
                  </Link>
                );
              })}
            </div>

            {visible.length === 0 ? (
              <p className="rounded-3xl bg-white px-6 py-12 text-center text-muted">
                No projects in this category yet.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {visible.map((project, index) => (
                  <Reveal key={project.slug} delay={index * 0.05}>
                    <Link
                      href={project.href}
                      className="group surface-card block overflow-hidden rounded-3xl"
                    >
                      <div className="relative aspect-video overflow-hidden bg-navy">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover motion-safe:group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : null}
                      </div>
                      <div className="p-6 md:p-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong">
                          {project.category}
                        </p>
                        <h2 className="mt-3 font-heading text-2xl font-semibold text-ink">
                          {project.title}
                        </h2>
                        <p className="mt-3 line-clamp-3 text-muted leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <ButtonLink href="/contact" variant="outline">
                Start a project
              </ButtonLink>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
    </PageShell>
  );
}
