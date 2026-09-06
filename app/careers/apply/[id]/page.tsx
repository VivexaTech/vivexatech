import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../../components/PageShell";
import PageHero from "../../../components/PageHero";
import CareerApplyForm from "../../../components/CareerApplyForm";
import { ButtonLink } from "../../../components/Button";
import { formatDeadline, getPublicCareer } from "@/lib/careers";
import { formatINR } from "@/lib/money";

export const dynamic = "force-dynamic";

type ApplyPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ApplyPageProps): Promise<Metadata> {
  const { id } = await params;
  const opportunity = await getPublicCareer(id);
  if (!opportunity) {
    return { title: "Apply" };
  }
  return {
    title: `Apply · ${opportunity.title}`,
    description: `Apply for the ${opportunity.title} ${opportunity.type.toLowerCase()} at Vivexa Tech.`,
    robots: { index: false, follow: false },
  };
}

export default async function CareerApplyPage({ params }: ApplyPageProps) {
  const { id } = await params;
  const opportunity = await getPublicCareer(id);
  if (!opportunity) notFound();

  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow={opportunity.type}
          title={`Apply for ${opportunity.title}.`}
          description={`${opportunity.department} · ${opportunity.location} · ${opportunity.workType}`}
        />
        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto grid max-w-site gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="surface-card h-fit rounded-3xl p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong">
                {opportunity.type}
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-ink">
                {opportunity.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {opportunity.shortDescription}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted">
                <li>{opportunity.department}</li>
                <li>
                  {opportunity.location} · {opportunity.workType}
                </li>
                {opportunity.employmentType ? (
                  <li>{opportunity.employmentType}</li>
                ) : null}
                {opportunity.duration ? (
                  <li>Duration · {opportunity.duration}</li>
                ) : null}
                {opportunity.stipend ? (
                  <li>Stipend · {formatINR(opportunity.stipend)}</li>
                ) : null}
                {opportunity.deadline ? (
                  <li>
                    Deadline · {formatDeadline(opportunity.deadline)}
                    {opportunity.keepOpen ? " · still open" : ""}
                  </li>
                ) : null}
              </ul>
              <Link
                href="/careers"
                className="mt-8 inline-block text-sm font-semibold text-ink underline-offset-4 hover:underline"
              >
                Back to careers
              </Link>
            </aside>
            <div className="surface-card rounded-3xl p-6 md:p-10">
              <CareerApplyForm opportunity={opportunity} />
            </div>
          </div>
        </section>
        <div className="px-4 pb-16 md:px-8 lg:px-10">
          <div className="mx-auto max-w-site">
            <ButtonLink href="/careers" variant="outline">
              View all openings
            </ButtonLink>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
