import type { ReactNode } from "react";

export default function SectionEyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div className="flex items-center gap-3">
      <span
        className={`relative flex h-2.5 w-2.5 ${
          isDark ? "text-accent" : "text-accent-strong"
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-current motion-safe:animate-ping opacity-30" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" />
      </span>
      <span
        className={`text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase ${
          isDark ? "text-accent" : "text-accent-strong"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
