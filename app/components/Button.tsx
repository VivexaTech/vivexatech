import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-semibold text-base md:text-[17px] leading-none transition-[transform,background-color,box-shadow,color,border-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation";

const variants = {
  primary:
    "bg-ink text-white shadow-[0_10px_24px_-12px_rgba(10,22,40,0.55)] hover:bg-[#132338] hover:shadow-[0_16px_32px_-14px_rgba(10,22,40,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-ink",
  accent:
    "bg-accent text-ink shadow-[0_10px_28px_-12px_rgba(0,194,224,0.7)] hover:bg-[#5ed7ea] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-accent",
  ghost:
    "bg-white/10 text-white border border-white/15 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-white",
  outline:
    "bg-transparent text-ink border border-ink/12 hover:border-ink/30 hover:bg-ink hover:text-white hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-ink",
};

type Variant = keyof typeof variants;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
};

export function ButtonLink({
  className = "",
  variant = "primary",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
};

export function Button({
  className = "",
  type = "button",
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
