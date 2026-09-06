"use client";

import Image from "next/image";
import { useState } from "react";

export default function Showreel() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="w-full rounded-2xl bg-background p-2.5 sm:p-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ink/8 shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
        {videoFailed ? (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-navy-deep">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,194,224,0.28),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(17,80,220,0.35),transparent_50%)]" />
            <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
              <Image
                src="/logo.svg"
                alt=""
                width={48}
                height={48}
                className="object-contain"
              />
              <p className="font-heading text-lg font-semibold text-white md:text-xl">
                Vivexa Tech Showreel
              </p>
            </div>
          </div>
        ) : (
          <video
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover motion-safe:group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 px-2 sm:px-3">
        <span className="text-sm font-medium text-muted md:text-base">
          Vivexa Tech Showreel
        </span>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/8 bg-white">
          <Image
            src="/logo.svg"
            alt="Vivexa Tech Logo"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
