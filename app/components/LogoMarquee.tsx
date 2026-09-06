import Image from "next/image";
import { logos } from "../data/home";

export default function LogoMarquee() {
  return (
    <div className="logo-marquee relative flex w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_24px,_black_calc(100%-24px),transparent_100%)] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <div className="flex w-max animate-infinite-scroll items-center">
        {[0, 1].map((set) => (
          <div
            key={set}
            className="flex items-center gap-8 px-4 md:gap-16 md:px-8"
          >
            {logos.map((logo) => (
              <div
                key={`${set}-${logo.name}`}
                className="relative flex h-8 w-auto shrink-0 items-center justify-center opacity-45 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 motion-safe:hover:scale-105 md:h-11"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  width={140}
                  height={60}
                  sizes="140px"
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
