import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import ContactDetails from "../components/ContactDetails";
import SectionHeading from "../components/SectionHeading";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Book a strategy call with Vivexa Tech in Gurugram. Tell us about your website, brand, or launch.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd
        data={webPageSchema({
          name: "Contact Vivexa Tech",
          description:
            "Book a strategy call with Vivexa Tech in Gurugram. Tell us about your website, brand, or launch.",
          path: "/contact",
          type: "ContactPage",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <main id="main">
        <PageHero
          eyebrow="Contact"
          title="The right partner at the right moment changes everything."
          description="Whether you're an emerging startup in Gurugram or an established brand looking to scale, we're here to secure your online presence and accelerate your growth."
        />

        <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-site">
            <SectionHeading
              eyebrow="Start a conversation"
              title="Tell us about your next stage."
            />
            <Reveal className="surface-card overflow-hidden rounded-3xl p-5 sm:p-8 md:rounded-[2rem] md:p-14">
              <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-16">
                <div className="flex flex-col justify-between xl:col-span-4">
                  <div>
                    <p className="text-base leading-relaxed text-muted md:text-lg">
                      Share a little context. We typically reply with a clear
                      next step — not a generic sales sequence.
                    </p>
                    <div className="mt-8">
                      <ContactDetails />
                    </div>
                  </div>
                  <div className="mt-10 xl:mt-0">
                    <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      Recognized By
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/8 bg-background">
                        <Image
                          src="https://cdn.prod.website-files.com/673786754d248974527e65b5/673b2cac4321a68d21e1191d_Icon.avif"
                          alt="Clutch"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/8 bg-background">
                        <Image
                          src="https://cdn.prod.website-files.com/673786754d248974527e65b5/673b2cac72f42c05552f3d00_Icon-1.avif"
                          alt="DesignRush"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xl:col-span-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
