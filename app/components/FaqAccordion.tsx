"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  const toggleFaq = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="flex flex-col border-t border-ink/10">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const number = String(index + 1).padStart(2, "0");
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={faq.question} className="border-b border-ink/10">
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex min-h-11 w-full cursor-pointer items-start justify-between gap-4 rounded-sm py-5 text-left touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 md:py-8"
              >
                <span className="flex min-w-0 items-start gap-3 sm:gap-6 md:gap-10">
                  <span className="mt-1 shrink-0 font-mono text-sm font-medium text-muted md:text-base">
                    {number}
                  </span>
                  <span
                    className={`text-base leading-snug font-semibold transition-colors duration-300 sm:text-lg md:text-2xl ${
                      isOpen ? "text-accent-strong" : "text-ink"
                    }`}
                  >
                    {faq.question}
                  </span>
                </span>

                <span
                  className="relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center md:h-6 md:w-6"
                  aria-hidden="true"
                >
                  <span className="absolute h-[2px] w-full rounded-full bg-ink" />
                  <span
                    className={`absolute h-full w-[2px] rounded-full bg-ink transition-transform duration-300 ease-in-out ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pr-2 pb-6 pl-8 text-sm leading-relaxed text-muted sm:pl-10 sm:text-base md:pr-12 md:pb-8 md:pl-16 md:text-lg">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
