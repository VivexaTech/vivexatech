"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type Testimonial = {
  id: number;
  review: string;
  name: string;
  role: string;
  image: string;
  linkedin: string;
};

export default function TestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max <= 0 ? 1 : el.scrollLeft / max);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 340) + 20;
    el.scrollBy({
      left: amount * direction,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      if (el.scrollLeft >= max - 8) {
        el.scrollTo({ left: 0, behavior: reduceMotion ? "auto" : "smooth" });
      } else {
        scrollByCard(1);
      }
    }, 4800);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduceMotion]);

  return (
    <div
      className="relative flex w-full max-w-full flex-col-reverse gap-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-4 md:gap-8">
        <div
          className="relative h-1 w-full overflow-hidden rounded-full bg-ink/10"
          role="presentation"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-ink transition-[width] duration-300"
            style={{ width: `${Math.max(progress, 0.08) * 100}%` }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/8 bg-white text-muted shadow-sm transition-all hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink md:h-12 md:w-12"
            aria-label="Previous testimonial"
          >
            <svg
              className="h-4 w-4 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/8 bg-white text-muted shadow-sm transition-all hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink md:h-12 md:w-12"
            aria-label="Next testimonial"
          >
            <svg
              className="h-4 w-4 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="testimonials-track flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain touch-pan-x pb-1 md:gap-5"
      >
        {testimonials.map((item) => (
          <article
            key={item.id}
            data-card
            className="flex h-auto w-[min(100%,22.5rem)] shrink-0 snap-start flex-col justify-between rounded-2xl border border-ink/8 bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-28px_rgba(10,22,40,0.28)] md:w-[28rem] md:rounded-3xl md:p-8"
          >
            <div className="mb-8 md:mb-10">
              <svg
                className="mb-4 h-7 w-7 text-accent md:mb-6 md:h-8 md:w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-base leading-relaxed font-medium text-ink/80 md:text-lg">
                {item.review}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/8 pt-5 md:pt-6">
              <div className="flex min-w-0 items-center gap-3 md:gap-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-background md:h-12 md:w-12">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold text-ink md:text-base">
                    {item.name}
                  </span>
                  <span className="truncate text-xs text-muted md:text-sm">
                    {item.role}
                  </span>
                </div>
              </div>

              <Link
                href={item.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-muted transition-colors hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink md:h-11 md:w-11"
                aria-label={`${item.name} on LinkedIn`}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
