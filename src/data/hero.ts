import type { HeroContent } from "../types/content";

/**
 * HERO — the first screen.
 *
 * titleTop / titleBottom  The giant display word. Rendered joined on ONE line (PRASTHA + NAM = PRASTHANAM).
 * sanskrit                Devanagari name shown above the subline.
 * subline                 Short line under the title.
 * primaryCta / secondaryCta  Buttons. `href` is a section anchor ("#join") or any URL.
 * marquee                 Words in the scrolling ticker under the hero (joined with " · ").
 * bootLines               Status lines printed during the first-visit loading intro.
 */
export const hero: HeroContent = {
  titleTop: "PRASTHA",
  titleBottom: "NAM",
  sanskrit: "प्रस्थानम्",
  subline: "the departure. Where ideas leave the notebook and start walking.",
  primaryCta: { label: "Join the web", href: "#join" },
  secondaryCta: { label: "See builds", href: "#projects" },
  marquee: ["THINK", "BUILD", "CONQUER"],
  bootLines: [
    "CHASSIS_HEX :: OK",
    "SERVO_01..04 :: OK",
    "SERVO_05..08 :: OK",
    "LENS_EYE :: CALIBRATED",
    "SILK_SPOOL :: 100%",
    "P-8 ONLINE",
  ],
};
