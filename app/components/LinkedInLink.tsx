export function LinkedInLink({
  href,
  label,
  tone = "light",
}: {
  href: string;
  label: string;
  tone?: "light" | "dark";
}) {
  const classes =
    tone === "dark"
      ? "inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-accent"
      : "inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:text-white";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      aria-label={label}
    >
      <svg
        className="h-4 w-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
      <span>LinkedIn</span>
    </a>
  );
}
