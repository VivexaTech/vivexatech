"use client";

import { useState } from "react";

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "VT";
}

export default function EmployeePhoto({
  src,
  name,
  className = "",
  priority = false,
}: {
  src: string;
  name: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-navy-deep to-[#12324a] font-heading text-3xl font-semibold text-accent ${className}`}
        aria-hidden="true"
      >
        {initials(name)}
      </div>
    );
  }

  return (
    // Firestore photos come from Firebase Storage with varying crop metadata.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className={`object-cover object-[center_18%] ${className}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
