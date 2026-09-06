import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import SectionHeading from "../components/SectionHeading";
import { ButtonLink } from "../components/Button";
import {
  formatDeadline,
  getPublicCareersResult,
  type PublicCareer,
} from "@/lib/careers";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import JsonLd from "../components/JsonLd";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Join Vivexa Tech in Gurugram. Full-time roles and internships in design and web development.",
  path: "/careers",
});

function RoleCard({ career }: { career: PublicCareer }) {
  const skills = career.requirements.slice(0, 4);
  return (
    <article className="surface-card flex h-full flex-col justify-between rounded-3xl p-6 md:p-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong">
          {career.type}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-semibold text-ink">
          {career.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">
          {career.shortDescription}
        </p>
        <div className="mt-5 space-y-1.5 text-sm text-muted">
          {career.department ? <p>{career.department}</p> : null}
          <p>
            {[career.location, career.workType].filter(Boolean).join(" · ")}
          </p>
          {career.type === "Internship" && career.duration ? (
            <p>Duration · {career.duration}</p>
          ) : null}
          {career.deadline ? (
            <p>
              Deadline · {formatDeadline(career.deadline)}
              {career.keepOpen ? " · still open" : ""}
            </p>
          ) : null}
        </div>
        {skills.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-ink/10 px-3 py-1 text-xs font-medium text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-8">
        <ButtonLink href={`/careers/apply/${career.id}`} variant="outline">
          Apply Now
        </ButtonLink>
      </div>
    </article>
  );
}

function EmptyOpenings({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-ink/12 bg-white/70 px-6 py-12 text-center">
      <p className="text-muted">{message}</p>
    </div>
  );
}

export default async function CareersPage() {
  const { careers, error } = await getPublicCareersResult();
  const jobs = careers.filter((career) => career.type === "Job");
  const internships = careers.filter((career) => career.type === "Internship");

  return (
    <PageShell>
      <JsonLd
        data={webPageSchema({
          name: "Vivexa Tech careers",
          description:
            "Join Vivexa Tech in Gurugram. Full-time roles and internships in design and web development.",
          path: "/careers",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <main id="main">
        <PageHero
          eyebrow="Careers"
          title="Come make websites that feel expensive."
          description="We are a small Gurugram studio. If you care about craft, speed, and startups, you will like the work."
        />

        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-site">
            <SectionHeading
              eyebrow="Open roles"
              title="Full-time positions."
            />
            {error ? (
              <EmptyOpenings message={error} />
            ) : jobs.length === 0 ? (
              <EmptyOpenings message="No open roles right now. Check internships below, or send a note anyway." />
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {jobs.map((career, index) => (
                  <Reveal key={career.id} delay={index * 0.05}>
                    <RoleCard career={career} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        <section
          id="internship"
          className="scroll-mt-24 bg-white px-4 py-16 md:px-8 md:py-24 lg:px-10"
        >
          <div className="mx-auto max-w-site">
            <SectionHeading
              eyebrow="Internship"
              title="Learn the studio the way we actually work."
            />
            {error ? (
              <EmptyOpenings message={error} />
            ) : internships.length === 0 ? (
              <EmptyOpenings message="No internship openings right now. We still welcome a short introduction." />
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {internships.map((career, index) => (
                  <Reveal key={career.id} delay={index * 0.05}>
                    <RoleCard career={career} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-background px-4 pb-4 md:px-8 lg:px-10">
          <div className="mx-auto flex max-w-site flex-wrap gap-5">
            <Link
              href="/about"
              className="font-semibold text-ink underline-offset-4 hover:underline"
            >
              About the studio →
            </Link>
            <Link
              href="/team"
              className="font-semibold text-ink underline-offset-4 hover:underline"
            >
              Meet the team →
            </Link>
          </div>
        </section>
        <CtaBanner
          title="Don't see the right seat?"
          description="Send a short note anyway. We hire for taste and follow-through more than a perfect title."
        />
      </main>
    </PageShell>
  );
}
