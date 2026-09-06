import SectionEyebrow from "./SectionEyebrow";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-navy-deep text-white rounded-b-[2rem] md:rounded-b-[2.5rem]"
    >
      <div className="pointer-events-none absolute inset-0 hero-grid" />
      <div className="pointer-events-none absolute inset-0 hero-grain mix-blend-overlay" />
      <div
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#00c2e0]/16 blur-[80px] orb-a"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[#1150dc]/24 blur-[90px] orb-b"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-site flex-col items-start px-4 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-36 lg:px-8">
        <SectionEyebrow tone="dark">{eyebrow}</SectionEyebrow>
        <h1 className="mt-5 max-w-4xl font-heading text-[2rem] font-semibold leading-[1.12] tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-[3.4rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
