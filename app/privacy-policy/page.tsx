import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Vivexa Tech in Gurugram collects and uses information from contact, newsletter, and career forms.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description="Last updated 4 September 2026."
        />
        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-[760px] space-y-6 text-base leading-relaxed text-muted md:text-lg">
            <p>
              Vivexa Tech collects the information you choose to send through
              our contact, newsletter, and career application forms — typically
              your name, company, email, Indian phone number, location, message,
              and, for applications, your resume. We use that information to
              respond to your enquiry or application and, if you opt in, to
              share occasional studio updates.
            </p>
            <p>
              We do not sell your data. Access is limited to the people who
              need it to do the work.               You can ask us to update or delete your
              information by writing to{" "}
              <a
                href="mailto:info@vivexatech.in"
                className="text-ink underline-offset-4 hover:underline"
              >
                info@vivexatech.in
              </a>
              .
            </p>
            <p>
              Our website may use essential cookies or similar technology to
              keep the site working. Analytics, if enabled later, will be
              described here before they run.
            </p>
            <p>
              This policy applies to www.vivexatech.in and related pages operated by
              Vivexa Tech in Gurugram. If we make a material change, we will
              update the date at the top of this page.
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
