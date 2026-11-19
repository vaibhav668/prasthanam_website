import type { Sponsor } from "../types/content";

/**
 * SPONSORS
 *
 * id     Unique id.
 * name   Sponsor name (also used as alt text).
 * logo   Path to logo ("/images/sponsors/acme.svg"). Monochrome light logos look best.
 * url    Optional website.
 * tier   Optional label ("Title", "Gold", "Community").
 *
 * Empty array → a "become a sponsor" empty state is shown.
 */
export const sponsors: Sponsor[] = [
  { id: "sp-1", name: "Sponsor Name (sample)", logo: "/images/sponsors/sample.svg", tier: "Sample tier" },
  { id: "sp-2", name: "Sponsor Name (sample)", logo: "/images/sponsors/sample.svg", tier: "Sample tier" },
  { id: "sp-3", name: "Sponsor Name (sample)", logo: "/images/sponsors/sample.svg" },
];
