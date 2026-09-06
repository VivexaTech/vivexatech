"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "./Button";
import SectionEyebrow from "./SectionEyebrow";

const highlights = [
  { label: "Typical launch", value: "1–2 weeks" },
  { label: "Built for", value: "Startups" },
  { label: "Based in", value: "Gurugram" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const scrollToContent = () => {
    document.getElementById("who-we-are")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-navy-deep text-white rounded-b-[2rem] md:rounded-b-[2.75rem]"
    >
      <div className="pointer-events-none absolute inset-0 hero-grid" />
      <div className="pointer-events-none absolute inset-0 hero-grain mix-blend-overlay" />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-[28rem] w-[28rem] rounded-full bg-[#00c2e0]/18 blur-[90px] orb-a"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-[26rem] w-[26rem] rounded-full bg-[#1150dc]/28 blur-[100px] orb-b"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ae3383]/12 blur-[80px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-site flex-1 flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:px-6 md:pt-32 md:pb-20 lg:px-8">
        <motion.div
          className="flex max-w-4xl flex-col items-center"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionEyebrow tone="dark">Gurugram web studio</SectionEyebrow>

          <h1 className="mt-6 font-heading text-[2.15rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.08]">
            Launch your business online,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#7ae7f4] to-white">
              affordably.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
            We help new businesses and startups grow with professional,
            attractive, and budget-friendly websites.
          </p>
        </motion.div>

        <motion.div
          className="mt-9 flex flex-col items-center gap-3 sm:mt-11 sm:flex-row sm:gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <ButtonLink href="/contact" variant="accent" className="min-h-12 px-8">
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
          <ButtonLink href="/#work" variant="ghost" className="min-h-12 px-8">
            View selected work
          </ButtonLink>
        </motion.div>

        <motion.dl
          className="mt-14 grid w-full max-w-xl grid-cols-3 gap-2 border-t border-white/10 pt-8 sm:mt-16"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {highlights.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:text-xs">
                {item.label}
              </dt>
              <dd className="font-heading text-sm font-semibold text-white sm:text-base">
                {item.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        <button
          type="button"
          onClick={scrollToContent}
          className="mt-12 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:mt-16"
          aria-label="Scroll to next section"
        >
          <svg
            className="h-5 w-5 scroll-cue"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
