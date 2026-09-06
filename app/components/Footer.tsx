"use client";

import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { CONTACT, SOCIAL_LINKS } from "@/lib/site";

const FooterLink = ({ href, text }: { href: string; text: string }) => (
  <div className="w-fit">
    <Link
      href={href}
      className="group relative text-sm font-medium text-muted transition-colors hover:text-ink md:text-[15px]"
    >
      {text}
      <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-ink transition-all duration-300 group-hover:w-full" />
    </Link>
  </div>
);

const SocialIcon = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/8 bg-background text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:bg-white hover:text-ink hover:shadow-sm"
  >
    {children}
  </a>
);

function SocialGlyph({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  if (label === "X") {
    return (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative z-10 w-full overflow-x-clip rounded-t-[2rem] border-t border-ink/8 bg-white pt-16 pb-8 font-sans md:rounded-t-[3rem] md:pt-24 md:pb-12">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid grid-cols-1 gap-12 md:mb-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt="Vivexa Tech Logo"
                width={30}
                height={30}
                className="object-contain transition-transform group-hover:scale-105"
              />
              <span className="font-heading text-xl font-semibold tracking-tight text-ink">
                Vivexa Tech
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted md:text-[15px]">
              Gurugram web designers helping startups and new businesses launch
              professional, budget-friendly websites.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {SOCIAL_LINKS.map((item) => (
                <SocialIcon key={item.href} href={item.href} label={item.label}>
                  <SocialGlyph label={item.label} />
                </SocialIcon>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Quick links
              </span>
              <FooterLink href="/about" text="About" />
              <FooterLink href="/work" text="Projects" />
              <FooterLink href="/team" text="Team" />
              <FooterLink href="/careers" text="Careers" />
              <FooterLink href="/blog" text="Blog" />
              <FooterLink href="/faq" text="FAQ" />
            </div>

            <div className="flex flex-col gap-4">
              <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Services
              </span>
              <FooterLink href="/services/web-dev" text="Web Development" />
              <FooterLink href="/services/branding" text="Branding" />
              <FooterLink href="/services/seo" text="SEO" />
              <FooterLink href="/services/security" text="Web Security" />
              <FooterLink href="/services/landing-page" text="Landing Pages" />
            </div>

            <div className="flex flex-col gap-4">
              <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Contact
              </span>
              <a
                href={CONTACT.phoneHref}
                className="w-fit text-sm font-semibold text-ink underline-offset-4 hover:underline md:text-[15px]"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.emailHref}
                className="w-fit text-sm text-muted underline-offset-4 hover:text-ink hover:underline md:text-[15px]"
              >
                {CONTACT.email}
              </a>
              <FooterLink href="/contact" text="Start a project" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Office
            </span>
            <address className="not-italic text-sm leading-relaxed text-muted md:text-[15px]">
              {CONTACT.addressLines[0]}
              <br />
              {CONTACT.addressLines[1]}
              <br />
              {CONTACT.addressLines[2]}
              <br />
              {CONTACT.addressLines[3]}
            </address>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              {CONTACT.mapsLabel}
            </a>

            <div className="mt-8">
              <span className="mb-3 block text-sm font-semibold text-ink">
                News and updates
              </span>
              {subscribed ? (
                <p
                  className="rounded-full bg-background px-5 py-3.5 text-sm text-muted"
                  role="status"
                >
                  You&apos;re on the list. We&apos;ll keep you posted.
                </p>
              ) : (
                <form
                  className="relative"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    autoComplete="email"
                    aria-label="Email address"
                    className="w-full rounded-full border border-ink/10 bg-background px-4 py-3 pr-24 text-sm text-ink transition-all placeholder:text-muted/70 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ink"
                  />
                  <button
                    type="submit"
                    className="absolute top-1.5 right-1.5 bottom-1.5 rounded-full bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-[#132338]"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-ink/8 pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-3 text-center text-sm font-medium text-muted md:flex-row md:text-left">
            <span>© 2026 Vivexa Tech. All rights reserved.</span>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-ink/30 md:block" />
            <Link
              href="/privacy-policy"
              className="underline-offset-4 hover:text-ink hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="underline-offset-4 hover:text-ink hover:underline"
            >
              Terms of Service
            </Link>
          </div>

          <a
            href="#top"
            onClick={scrollToTop}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-ink text-white transition-all duration-300 hover:scale-105 hover:bg-[#132338] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            aria-label="Scroll to top"
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
