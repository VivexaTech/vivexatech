import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Terms of use for the Vivexa Tech website and how project work is agreed separately.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow="Legal"
          title="Terms of Service"
          description="Last updated 4 September 2026."
        />
        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-[760px] space-y-6 text-base leading-relaxed text-muted md:text-lg">
            <p>
              By using this website you agree to these terms. The site is
              provided to describe our services and to let you contact Vivexa
              Tech. Project work is governed by a separate proposal or
              agreement.
            </p>
            <p>
              Content on this website — including copy, layout, and case-study
              presentation — is owned by Vivexa Tech or used with permission.
              You may not copy it for commercial use without written consent.
            </p>
            <p>
              Case studies and metrics reflect the work as presented. We do not
              promise identical results for every client. Quotes, timelines, and
              scope are confirmed in writing before work begins.
            </p>
            <p>
              The website is provided as-is. We take care to keep it accurate
              and available, but we are not liable for losses arising from your
              use of the public site. For project liability, see your signed
              agreement.
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
