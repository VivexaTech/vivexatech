import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-14 lg:flex-row lg:gap-16">
      <div className="w-full shrink-0 lg:w-1/3">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
      </div>
      <div className="w-full lg:w-2/3">
        <h2 className="font-heading text-2xl font-semibold leading-[1.2] tracking-tight text-balance text-ink md:text-3xl lg:text-[2.5rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
