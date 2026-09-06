import { CONTACT } from "@/lib/site";
import { ButtonLink } from "./Button";
import Reveal from "./Reveal";

export default function CtaBanner({
  title = "Ready to launch with a partner who understands startups?",
  description = "Tell us where you are. We'll help you show up online with a site that looks considered and converts.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-10">
      <Reveal className="relative mx-auto max-w-site overflow-hidden rounded-3xl bg-navy-deep px-6 py-12 text-white md:rounded-[2rem] md:px-14 md:py-16">
        <div
          className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-accent/20 blur-[70px]"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance md:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
              {description}
            </p>
            <p className="mt-4 text-sm text-white/70">
              <a href={CONTACT.phoneHref} className="underline-offset-4 hover:underline">
                {CONTACT.phoneDisplay}
              </a>
              {" · "}
              <a href={CONTACT.emailHref} className="underline-offset-4 hover:underline">
                {CONTACT.email}
              </a>
            </p>
          </div>
          <ButtonLink href="/contact" variant="accent" className="shrink-0 px-8">
            Book strategy call
            <svg
              className="h-4 w-4 motion-safe:group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
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
      </Reveal>
    </section>
  );
}
