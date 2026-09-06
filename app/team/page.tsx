import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import CtaBanner from "../components/CtaBanner";
import SectionHeading from "../components/SectionHeading";
import {
  ExecutiveCard,
  FounderFeature,
  InternCard,
  LeadershipCard,
  MemberCard,
} from "../components/team/TeamCards";
import { getPublicTeam } from "../../lib/employees";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, ORGANIZATION_ID, webPageSchema } from "@/lib/schema";
import JsonLd from "../components/JsonLd";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Our Team",
  description:
    "Meet the Vivexa Tech studio in Gurugram — leadership, delivery, and internships behind the websites we ship.",
  path: "/team",
});

export const revalidate = 300;

export default async function TeamPage() {
  const { founder, heads, executives, others, interns, error } =
    await getPublicTeam();
  const hasPeople =
    Boolean(founder) ||
    heads.length > 0 ||
    executives.length > 0 ||
    others.length > 0 ||
    interns.length > 0;

  return (
    <PageShell>
      <JsonLd
        data={webPageSchema({
          name: "Vivexa Tech team",
          description:
            "Meet the Vivexa Tech studio in Gurugram — leadership, delivery, and internships behind the websites we ship.",
          path: "/team",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
        ])}
      />
      {hasPeople ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Vivexa Tech team",
            itemListElement: [founder, ...heads, ...executives, ...others, ...interns]
              .filter(Boolean)
              .map((person, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Person",
                  name: person!.name,
                  jobTitle: person!.designation,
                  worksFor: { "@id": ORGANIZATION_ID },
                  ...(person!.linkedin
                    ? { sameAs: [person!.linkedin] }
                    : {}),
                },
              })),
          }}
        />
      ) : null}
      <main id="main">
        <PageHero
          eyebrow="Our team"
          title="The people behind the work."
          description="A Gurugram studio organised by how we actually work — leadership, delivery, and the intern programme."
        />

        {error ? (
          <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
            <div className="mx-auto max-w-[760px] rounded-3xl border border-ink/8 bg-white px-6 py-12 text-center md:px-12">
              <h2 className="font-heading text-2xl font-semibold text-ink">
                The team list is briefly unavailable
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                We couldn&apos;t load employee profiles just now. The rest of
                the site is working — please try this page again in a moment.
              </p>
            </div>
          </section>
        ) : !hasPeople ? (
          <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
            <div className="mx-auto max-w-[760px] rounded-3xl border border-ink/8 bg-white px-6 py-12 text-center md:px-12">
              <h2 className="font-heading text-2xl font-semibold text-ink">
                Profiles are being updated
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                There are no team members to show on the public site right now.
                Please check back soon.
              </p>
            </div>
          </section>
        ) : (
          <>
            {founder ? (
              <section className="bg-background px-4 py-16 md:px-8 md:py-20 lg:px-10">
                <div className="mx-auto max-w-site">
                  <SectionHeading
                    eyebrow="Leadership"
                    title="Founder & CEO"
                    description="The studio is led from Gurugram with a bias for clear work and careful websites."
                  />
                  <FounderFeature employee={founder} />
                </div>
              </section>
            ) : null}

            {heads.length > 0 ? (
              <section className="border-t border-ink/6 bg-white px-4 py-16 md:px-8 md:py-24 lg:px-10">
                <div className="mx-auto max-w-site">
                  <SectionHeading
                    eyebrow="Department Heads"
                    title="Leadership team"
                    description="The people responsible for operations, technology, and the quality of what ships."
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {heads.map((employee, index) => (
                      <LeadershipCard
                        key={employee.docId}
                        employee={employee}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {executives.length > 0 ? (
              <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
                <div className="mx-auto max-w-site">
                  <SectionHeading
                    eyebrow="Delivery"
                    title="Executives"
                    description="The operators who keep client work, support, and growth moving."
                  />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {executives.map((employee, index) => (
                      <ExecutiveCard
                        key={employee.docId}
                        employee={employee}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {others.length > 0 ? (
              <section className="border-t border-ink/6 bg-white px-4 py-16 md:px-8 md:py-24 lg:px-10">
                <div className="mx-auto max-w-site">
                  <SectionHeading
                    eyebrow="Studio"
                    title="Other team members"
                    description="Everyone else currently active in the company, outside leadership, executives, and internships."
                  />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {others.map((employee, index) => (
                      <MemberCard
                        key={employee.docId}
                        employee={employee}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {interns.length > 0 ? (
              <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
                <div className="mx-auto max-w-site">
                  <SectionHeading
                    eyebrow="Programme"
                    title="Interns"
                    description="Current and completed internships. Active profiles sit alongside those who have already finished their time with us."
                  />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {interns.map((employee, index) => (
                      <InternCard
                        key={employee.docId}
                        employee={employee}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </>
        )}

        <section className="bg-white px-4 pb-8 md:px-8 lg:px-10">
          <div className="mx-auto max-w-site">
            <Link
              href="/careers"
              className="font-semibold text-ink underline-offset-4 hover:underline"
            >
              Open roles and internships →
            </Link>
          </div>
        </section>
        <CtaBanner title="Want to work with this team?" />
      </main>
    </PageShell>
  );
}
