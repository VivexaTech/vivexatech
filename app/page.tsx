import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { ButtonLink } from "./components/Button";
import FaqAccordion from "./components/FaqAccordion";
import TestimonialsSlider from "./components/TestimonialsSlider";
import SectionEyebrow from "./components/SectionEyebrow";
import ContactForm from "./components/ContactForm";
import ContactDetails from "./components/ContactDetails";
import LogoMarquee from "./components/LogoMarquee";
import Showreel from "./components/Showreel";
import SectionHeading from "./components/SectionHeading";
import JsonLd from "./components/JsonLd";
import { faqs, testimonials } from "./data/home";
import { getWorkProjects } from "@/lib/projects";
import { getPublicServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${SITE_NAME} — Affordable websites for startups in Gurugram`,
  description:
    "Gurugram web studio helping new businesses and startups launch professional, attractive, and budget-friendly websites.",
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  const [workProjects, services] = await Promise.all([
    getWorkProjects(),
    getPublicServices(),
  ]);

  const numberedServices = services.map((service, index) => ({
    id: String(index + 1).padStart(2, "0"),
    name: service.name,
    href: `/services/${service.slug}`,
  }));

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Vivexa Tech",
          description:
            "Gurugram web studio helping new businesses and startups launch professional, attractive, and budget-friendly websites.",
          path: "/",
        })}
      />
      <Header />
      <Hero />
      <main id="main" className="overflow-x-clip">
        <section
          id="who-we-are"
          className="scroll-mt-24 bg-background py-16 font-sans sm:py-20 md:py-28"
        >
          <div className="mx-auto max-w-site px-4 md:px-8 lg:px-10">
            <Reveal className="surface-card overflow-hidden rounded-3xl p-5 sm:p-8 md:rounded-[2rem] md:p-12 lg:p-16">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="group order-2 flex w-full flex-col lg:order-1">
                  <div className="mb-6 lg:mb-8">
                    <SectionEyebrow>Who we are</SectionEyebrow>
                  </div>
                  <Showreel />
                </div>

                <div className="order-1 flex flex-col justify-center lg:order-2">
                  <h2 className="mb-6 font-heading text-2xl font-semibold leading-[1.2] tracking-tight text-balance text-ink sm:text-3xl md:text-4xl lg:mb-8">
                    You know your value. Does your brand show it?
                  </h2>

                  <div className="mb-8 space-y-5 text-base leading-relaxed text-muted md:mb-10 md:text-lg lg:text-xl">
                    <p>
                      We are Gurugram-based web designers dedicated to helping
                      new businesses launch their online journey.
                    </p>
                    <p>
                      We believe every business, no matter how small, deserves a
                      powerful online presence. We don&apos;t just build
                      websites; we craft digital experiences that translate your
                      vision into reality, helping you stand out and grow your
                      business.
                    </p>
                  </div>

                  <ButtonLink href="/about" variant="outline">
                    About us
                    <svg
                      className="h-4 w-4 motion-safe:group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="work"
          className="scroll-mt-24 bg-background py-16 font-sans sm:py-20 md:py-28"
        >
          <div className="mx-auto max-w-site px-4 md:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Selected Work"
              title="Companies that closed the perception gap and what changed."
            />

            <div className="surface-card space-y-12 overflow-hidden rounded-3xl p-5 sm:p-8 md:space-y-16 md:rounded-[2rem] md:p-12 lg:p-16">
              {workProjects.slice(0, 3).map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.05}>
                  <article className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12">
                    <div
                      className={`flex h-full w-full flex-col ${
                        index % 2 !== 0 ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="w-full rounded-2xl bg-navy p-2.5 sm:p-3">
                        <Link
                          href={project.href}
                          className="group relative block aspect-video w-full overflow-hidden rounded-xl shadow-md transition-shadow duration-500 hover:shadow-2xl"
                        >
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 55vw"
                              className="object-cover motion-safe:group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-navy-deep" />
                          )}
                        </Link>
                      </div>
                    </div>

                    <div
                      className={`flex flex-col justify-center ${
                        index % 2 !== 0 ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div className="mb-4 md:mb-6">
                        <SectionEyebrow>{project.category}</SectionEyebrow>
                      </div>

                      <Link
                        href={project.href}
                        className="group/link mb-4 block w-fit md:mb-5"
                      >
                        <h3 className="font-heading text-2xl font-semibold leading-[1.2] tracking-tight text-ink transition-colors group-hover/link:text-accent-strong sm:text-3xl md:text-4xl">
                          {project.title}
                        </h3>
                      </Link>

                      <p className="mb-5 text-base leading-relaxed text-muted md:text-lg">
                        {project.description}
                      </p>

                      <div className="mb-6 grid grid-cols-2 gap-4 border-t border-ink/8 pt-6 sm:grid-cols-3 lg:gap-6 md:pt-8">
                        {project.stats.map((stat) => (
                          <div key={stat.label} className="flex flex-col">
                            <span className="font-heading text-xl font-semibold text-ink md:text-2xl">
                              {stat.value}
                            </span>
                            <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted md:text-xs">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={project.href}
                        className="group relative inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-sm text-base font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink md:text-lg"
                      >
                        <span>Explore</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 13 8"
                          fill="none"
                          className="motion-safe:group-hover:translate-x-1 transition-transform duration-300"
                          aria-hidden="true"
                        >
                          <path
                            d="M0.5 3.18188C0.223858 3.18188 2.98023e-08 3.40574 2.98023e-08 3.68188C2.98023e-08 3.95803 0.223858 4.18188 0.5 4.18188L0.5 3.68188L0.5 3.18188ZM12.8536 4.03544C13.0488 3.84018 13.0488 3.52359 12.8536 3.32833L9.67157 0.146351C9.47631 -0.0489111 9.15973 -0.0489111 8.96447 0.146351C8.7692 0.341613 8.7692 0.658196 8.96447 0.853458L11.7929 3.68188L8.96447 6.51031C8.7692 6.70557 8.7692 7.02216 8.96447 7.21742C9.15973 7.41268 9.47631 7.41268 9.67157 7.21742L12.8536 4.03544ZM0.5 3.68188L0.5 4.18188L12.5 4.18188V3.68188V3.18188L0.5 3.18188L0.5 3.68188Z"
                            fill="currentColor"
                          />
                        </svg>
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}

              <div className="flex justify-center pt-2 md:pt-4">
                <ButtonLink href="/work">
                  View all projects
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="motion-safe:group-hover:translate-x-1 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-x-clip bg-background py-16 font-sans sm:py-20 md:py-28">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 opacity-40 md:h-[380px] md:w-[640px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/50 to-[#1150dc]/40 blur-[100px] mix-blend-multiply" />
          </div>

          <div className="relative mx-auto max-w-site px-4 md:px-8 lg:px-10">
            <Reveal className="surface-card overflow-hidden rounded-3xl p-5 sm:p-8 md:rounded-[2.25rem] md:p-12 lg:p-16">
              <div className="mb-12 flex flex-col items-start gap-6 lg:mb-16 lg:flex-row lg:gap-16">
                <div className="w-full shrink-0 lg:w-1/3">
                  <SectionEyebrow>Who we work with</SectionEyebrow>
                </div>

                <div className="w-full lg:w-2/3">
                  <h2 className="font-heading text-2xl font-semibold leading-[1.2] tracking-tight text-balance text-ink md:text-3xl lg:text-[2.5rem] lg:leading-[1.18]">
                    We work with ambitious{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-strong to-[#1150dc]">
                      B2B tech companies
                    </span>{" "}
                    whose ambition is ahead of how the market reads them — and
                    where that gap is becoming commercial.
                  </h2>
                </div>
              </div>

              <div className="flex w-full flex-col items-center border-t border-ink/8 pt-8 md:pt-10">
                <h3 className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-muted md:mb-10 md:text-xs">
                  Trusted by industry leaders
                </h3>
                <LogoMarquee />
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="services"
          className="scroll-mt-24 bg-background py-16 font-sans text-ink sm:py-20 md:py-28"
        >
          <div className="mx-auto max-w-site px-4 md:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Our Services"
              title="Everything your brand needs to grow — under one roof."
            />

            <Reveal className="surface-card overflow-hidden rounded-3xl p-5 sm:p-8 md:rounded-[2rem] md:p-12 lg:p-16">
              <div className="grid grid-cols-1 border-t border-ink/10 md:grid-cols-2">
                {numberedServices.map((service) => (
                  <div
                    key={service.href}
                    className="border-b border-ink/10 md:odd:border-r"
                  >
                    <Link
                      href={service.href}
                      className="group relative flex min-h-16 items-center justify-between overflow-hidden p-5 transition-colors md:p-8 lg:p-10"
                    >
                      <div className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                      <div className="relative z-10 flex w-full min-w-0 items-center gap-4 md:gap-6">
                        <span className="shrink-0 font-mono text-base font-medium text-muted transition-colors duration-300 group-hover:text-accent md:text-lg">
                          {service.id}
                        </span>
                        <h3 className="font-heading text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-white sm:text-xl md:text-2xl lg:text-[1.75rem]">
                          {service.name}
                        </h3>
                        <div className="relative ml-auto flex h-6 w-6 shrink-0 items-center overflow-hidden md:h-8 md:w-8">
                          <svg
                            className="absolute inset-0 h-full w-full text-ink transition-all duration-500 ease-in-out group-hover:translate-x-[150%] group-hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <svg
                            className="absolute inset-0 h-full w-full -translate-x-[150%] text-white transition-all duration-500 ease-in-out group-hover:translate-x-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex justify-center md:mt-14">
                <ButtonLink href="/services">
                  All Services
                  <svg
                    className="h-4 w-4 motion-safe:group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="faq"
          className="w-full scroll-mt-24 rounded-3xl bg-white py-16 font-sans sm:py-20 md:rounded-[3rem] md:py-28"
        >
          <div className="mx-auto max-w-site px-4 md:px-8 lg:px-10">
            <Reveal className="mb-8 md:mb-14">
              <SectionEyebrow>FAQ</SectionEyebrow>
            </Reveal>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-5">
                <h2 className="font-heading text-3xl font-semibold leading-[1.12] tracking-tight text-balance text-ink md:text-5xl lg:sticky lg:top-32 lg:text-[3.25rem]">
                  Frequently <br className="hidden md:block" />
                  Asked Questions
                </h2>
              </Reveal>

              <Reveal className="lg:col-span-7" delay={0.08}>
                <FaqAccordion faqs={faqs} />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="w-full overflow-x-clip bg-background py-16 font-sans sm:py-20 md:py-28">
          <div className="mx-auto max-w-site px-4 md:px-8 lg:px-10">
            <Reveal className="mb-10 md:mb-14">
              <SectionEyebrow>Testimonials</SectionEyebrow>
            </Reveal>
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 bg-background px-4 py-16 font-sans sm:py-20 md:px-8 md:py-28 lg:px-10"
        >
          <div className="mx-auto max-w-site">
            <SectionHeading
              eyebrow="Contact Us"
              title="The right partner at the right moment changes everything."
            />

            <Reveal className="surface-card overflow-hidden rounded-3xl p-5 sm:p-8 md:rounded-[2rem] md:p-14 lg:p-16">
              <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-16">
                <div className="flex flex-col justify-between xl:col-span-4">
                  <div>
                    <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      Start a conversation
                    </span>
                    <h3 className="mb-6 font-heading text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl">
                      Tell us about your next stage.
                    </h3>
                    <p className="text-base leading-relaxed text-muted md:text-lg">
                      Whether you&apos;re an emerging startup in Gurugram or an
                      established brand looking to scale, we&apos;re here to
                      secure your online presence and accelerate your growth.
                    </p>
                    <div className="mt-8">
                      <ContactDetails compact />
                    </div>
                  </div>

                  <div className="mt-10 xl:mt-0">
                    <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      Recognized By
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/8 bg-background transition-transform hover:scale-110">
                        <Image
                          src="https://cdn.prod.website-files.com/673786754d248974527e65b5/673b2cac4321a68d21e1191d_Icon.avif"
                          alt="Clutch"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/8 bg-background transition-transform hover:scale-110">
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
      <Footer />
    </>
  );
}
