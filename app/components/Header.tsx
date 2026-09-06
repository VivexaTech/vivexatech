"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "./Button";

const ChevronDown = ({ className = "" }: { className?: string }) => (
  <svg
    className={`h-3.5 w-3.5 opacity-60 transition-transform duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/6 bg-background text-ink transition-all duration-300 group-hover/item:border-ink/10 group-hover/item:bg-white group-hover/item:shadow-sm">
    {children}
  </div>
);

interface DropdownItemProps {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
}

const DropdownItem = ({
  href,
  title,
  description,
  icon,
  onClick,
}: DropdownItemProps) => (
  <Link
    href={href}
    onClick={onClick}
    className="group/item flex min-h-11 items-start gap-4 rounded-xl p-3 transition-colors hover:bg-background"
  >
    <IconWrapper>{icon}</IconWrapper>
    <div className="flex flex-col">
      <span className="relative inline-block w-fit font-semibold text-ink">
        {title}
        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-ink transition-all duration-300 group-hover/item:w-full" />
      </span>
      <span className="mt-0.5 text-sm leading-snug text-muted">
        {description}
      </span>
    </div>
  </Link>
);

type DesktopMenu = "about" | "works" | "services" | null;

function NavLink({
  href,
  children,
  onDark,
}: {
  href: string;
  children: ReactNode;
  onDark: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 font-medium transition-colors group ${
        onDark ? "text-white/80 hover:text-white" : "text-ink/75 hover:text-ink"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-1 left-4 h-px w-[calc(100%-2rem)] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
          onDark ? "bg-accent" : "bg-ink"
        }`}
      />
    </Link>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );
  const [openDesktopMenu, setOpenDesktopMenu] = useState<DesktopMenu>(null);
  const [overHero, setOverHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => {
      if (open) setOpenMobileDropdown(null);
      return !open;
    });
  };

  const toggleMobileDropdown = (dropdown: string) => {
    setOpenMobileDropdown((current) =>
      current === dropdown ? null : dropdown,
    );
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        setOpenDesktopMenu(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMobileMenu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) {
      const frame = requestAnimationFrame(() => setOverHero(false));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverHero(entry.isIntersecting && entry.intersectionRatio > 0.12);
      },
      { threshold: [0, 0.12, 0.4, 1] },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const onDark = overHero && !isMobileMenuOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-[70] w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          isMobileMenuOpen
            ? "border-b border-ink/8 bg-white"
            : onDark
              ? scrolled
                ? "border-b border-white/10 bg-navy-deep/80 backdrop-blur-xl"
                : "border-b border-transparent bg-transparent"
              : "border-b border-ink/8 bg-white/80 shadow-[0_8px_30px_-20px_rgba(10,22,40,0.35)] backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6 md:h-[4.5rem] lg:px-8">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group relative z-[80] flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <Image
              src="/logo.svg"
              alt="Vivexa Tech Logo"
              width={36}
              height={36}
              priority
              className="h-8 w-8 shrink-0 object-contain transition-transform group-hover:scale-105 sm:h-9 sm:w-9"
            />
            <span
              className={`truncate font-heading text-lg font-semibold tracking-tight sm:text-xl ${
                onDark ? "text-white" : "text-ink"
              }`}
            >
              Vivexa Tech
            </span>
          </Link>

          <div className="hidden items-center space-x-0.5 lg:flex">
            <NavLink href="/" onDark={onDark}>
              Home
            </NavLink>

            <div
              className="relative px-4 py-2"
              onMouseEnter={() => setOpenDesktopMenu("about")}
              onMouseLeave={() => setOpenDesktopMenu(null)}
            >
              <button
                type="button"
                className={`flex cursor-pointer items-center gap-1.5 font-medium transition-colors ${
                  onDark
                    ? "text-white/80 hover:text-white"
                    : "text-ink/75 hover:text-ink"
                }`}
                aria-expanded={openDesktopMenu === "about"}
                aria-haspopup="true"
                onClick={() =>
                  setOpenDesktopMenu((menu) =>
                    menu === "about" ? null : "about",
                  )
                }
              >
                About
                <ChevronDown
                  className={openDesktopMenu === "about" ? "rotate-180" : ""}
                />
              </button>
              <div
                className={`absolute top-full left-1/2 z-[80] w-[min(620px,calc(100vw-2rem))] -translate-x-1/2 pt-2 ${
                  openDesktopMenu === "about"
                    ? "visible"
                    : "invisible pointer-events-none"
                }`}
              >
                <div
                  className={`grid grid-cols-1 gap-1 rounded-2xl border border-ink/8 bg-white p-3 shadow-[0_24px_60px_-20px_rgba(10,22,40,0.28)] transition-all duration-300 sm:grid-cols-2 lg:grid-cols-3 ${
                    openDesktopMenu === "about"
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  <DropdownItem
                    href="/about"
                    title="Company"
                    description="Learn more about who we are."
                    onClick={() => setOpenDesktopMenu(null)}
                    icon={
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    }
                  />
                  <DropdownItem
                    href="/team"
                    title="Our Team"
                    description="Meet the people behind the code."
                    onClick={() => setOpenDesktopMenu(null)}
                    icon={
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    }
                  />
                  <DropdownItem
                    href="/careers"
                    title="Careers"
                    description="Join our team and make a difference."
                    onClick={() => setOpenDesktopMenu(null)}
                    icon={
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>

            <div
              className="relative px-4 py-2"
              onMouseEnter={() => setOpenDesktopMenu("works")}
              onMouseLeave={() => setOpenDesktopMenu(null)}
            >
              <button
                type="button"
                className={`flex cursor-pointer items-center gap-1.5 font-medium transition-colors ${
                  onDark
                    ? "text-white/80 hover:text-white"
                    : "text-ink/75 hover:text-ink"
                }`}
                aria-expanded={openDesktopMenu === "works"}
                aria-haspopup="true"
                onClick={() =>
                  setOpenDesktopMenu((menu) =>
                    menu === "works" ? null : "works",
                  )
                }
              >
                Works
                <ChevronDown
                  className={openDesktopMenu === "works" ? "rotate-180" : ""}
                />
              </button>
              <div
                className={`absolute top-full left-1/2 z-[80] w-80 -translate-x-1/2 pt-2 ${
                  openDesktopMenu === "works"
                    ? "visible"
                    : "invisible pointer-events-none"
                }`}
              >
                <div
                  className={`rounded-2xl border border-ink/8 bg-white p-3 shadow-[0_24px_60px_-20px_rgba(10,22,40,0.28)] transition-all duration-300 ${
                    openDesktopMenu === "works"
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  <DropdownItem
                    href="/work?type=webdesign"
                    title="Web Design"
                    description="Websites that connect and convert."
                    onClick={() => setOpenDesktopMenu(null)}
                    icon={
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />
                  <DropdownItem
                    href="/work?type=uiux"
                    title="UX/UI Design"
                    description="Seamless & intuitive interfaces."
                    onClick={() => setOpenDesktopMenu(null)}
                    icon={
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>

            <div
              className="relative px-4 py-2"
              onMouseEnter={() => setOpenDesktopMenu("services")}
              onMouseLeave={() => setOpenDesktopMenu(null)}
            >
              <button
                type="button"
                className={`flex cursor-pointer items-center gap-1.5 font-medium transition-colors ${
                  onDark
                    ? "text-white/80 hover:text-white"
                    : "text-ink/75 hover:text-ink"
                }`}
                aria-expanded={openDesktopMenu === "services"}
                aria-haspopup="true"
                onClick={() =>
                  setOpenDesktopMenu((menu) =>
                    menu === "services" ? null : "services",
                  )
                }
              >
                Services
                <ChevronDown
                  className={openDesktopMenu === "services" ? "rotate-180" : ""}
                />
              </button>
              <div
                className={`absolute top-full left-1/2 z-[80] w-[min(650px,calc(100vw-2rem))] -translate-x-1/2 pt-2 ${
                  openDesktopMenu === "services"
                    ? "visible"
                    : "invisible pointer-events-none"
                }`}
              >
                <div
                  className={`flex flex-col gap-4 rounded-2xl border border-ink/8 bg-white p-4 shadow-[0_24px_60px_-20px_rgba(10,22,40,0.28)] transition-all duration-300 sm:flex-row ${
                    openDesktopMenu === "services"
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  <div className="flex-1">
                    <div className="mb-3 ml-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      Core Services
                    </div>
                    <DropdownItem
                      href="/services/web-dev"
                      title="Web Development"
                      description="Functional & interactive websites"
                      onClick={() => setOpenDesktopMenu(null)}
                      icon={
                        <span className="font-mono font-bold text-ink">
                          {"</>"}
                        </span>
                      }
                    />
                    <DropdownItem
                      href="/services/seo"
                      title="SEO Optimization"
                      description="Boosting search rankings and traffic"
                      onClick={() => setOpenDesktopMenu(null)}
                      icon={
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      }
                    />
                    <DropdownItem
                      href="/services/security"
                      title="Web Security"
                      description="Protecting source code & user data"
                      onClick={() => setOpenDesktopMenu(null)}
                      icon={
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      }
                    />
                  </div>
                  <div className="my-2 hidden w-px bg-ink/8 sm:block" />
                  <div className="flex-1">
                    <div className="mb-3 ml-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      Growth & Retainer
                    </div>
                    <DropdownItem
                      href="/services/branding"
                      title="Branding"
                      description="Memorable & strategic identities"
                      onClick={() => setOpenDesktopMenu(null)}
                      icon={
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                      }
                    />
                    <DropdownItem
                      href="/services/landing-page"
                      title="Landing Pages"
                      description="High converting single-page sites"
                      onClick={() => setOpenDesktopMenu(null)}
                      icon={
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <NavLink href="/contact" onDark={onDark}>
              Contact
            </NavLink>
          </div>

          <div className="z-[80] flex items-center gap-2 sm:gap-4">
            <div className="hidden md:block">
              <ButtonLink
                href="/contact"
                variant={onDark ? "accent" : "primary"}
                className="px-6 py-2.5 text-sm md:text-[15px]"
              >
                Let&apos;s chat
                <svg
                  className="h-3.5 w-3.5 motion-safe:group-hover:translate-x-0.5 transition-transform"
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

            <button
              type="button"
              onClick={toggleMobileMenu}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-2.5 -mr-1 transition-transform touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 lg:hidden ${
                onDark
                  ? "text-white focus-visible:ring-white"
                  : "text-ink focus-visible:ring-ink"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-[60] bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isMobileMenuOpen
            ? "translate-y-0"
            : "-translate-y-full pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex h-[100dvh] flex-col gap-1 overflow-y-auto overscroll-contain px-5 pt-20 pb-8">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex min-h-11 items-center border-b border-ink/8 py-4 font-heading text-xl font-semibold text-ink"
          >
            Home
          </Link>

          <MobileAccordion
            title="About"
            isOpen={openMobileDropdown === "about"}
            onToggle={() => toggleMobileDropdown("about")}
          >
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              Company
            </Link>
            <Link
              href="/team"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              Our Team
            </Link>
            <Link
              href="/careers"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              Careers
            </Link>
          </MobileAccordion>

          <MobileAccordion
            title="Works"
            isOpen={openMobileDropdown === "works"}
            onToggle={() => toggleMobileDropdown("works")}
          >
            <Link
              href="/work?type=webdesign"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              Web Design
            </Link>
            <Link
              href="/work?type=uiux"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              UX/UI Design
            </Link>
          </MobileAccordion>

          <MobileAccordion
            title="Services"
            isOpen={openMobileDropdown === "services"}
            onToggle={() => toggleMobileDropdown("services")}
          >
            <p className="mt-2 mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Core Services
            </p>
            <Link
              href="/services/web-dev"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              Web Development
            </Link>
            <Link
              href="/services/seo"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              SEO Optimization
            </Link>
            <Link
              href="/services/security"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              Web Security
            </Link>
            <p className="mt-4 mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Growth & Retainer
            </p>
            <Link
              href="/services/branding"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              Branding
            </Link>
            <Link
              href="/services/landing-page"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center py-3 font-medium text-muted"
            >
              Landing Pages
            </Link>
          </MobileAccordion>

          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="flex min-h-11 items-center border-b border-ink/8 py-4 font-heading text-xl font-semibold text-ink"
          >
            Contact
          </Link>

          <ButtonLink href="/contact" onClick={closeMobileMenu} className="mt-8 w-full">
            Let&apos;s chat
            <svg
              className="h-4 w-4"
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
      </div>
    </>
  );
}

function MobileAccordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-ink/8">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-11 w-full items-center justify-between py-4 font-heading text-xl font-semibold text-ink touch-manipulation"
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown className={isOpen ? "rotate-180" : ""} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={title}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-2 flex flex-col border-l-2 border-ink/8 pb-4 pl-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
