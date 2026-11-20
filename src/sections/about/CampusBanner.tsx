import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/** Full-bleed campus panorama — just the photo, with a slow parallax drift. */
export function CampusBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "-16%"]);

  return (
    <figure ref={ref} className="relative my-14 h-[clamp(240px,40vw,540px)] w-full overflow-hidden border-y border-line sm:my-20">
      <m.img
        src="/images/campus.jpg"
        alt="Aerial view of the GB Pant Institute of Engineering and Technology campus on its hilltop at sunset"
        width={2200}
        height={971}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-x-0 top-0 h-[120%] w-full select-none object-cover"
        style={{ y: reduced ? "-14%" : y }}
      />
    </figure>
  );
}
