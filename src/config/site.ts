/**
 * SITE CONFIG — global settings.
 *
 * name / shortName   Club name shown in navbar, footer, page title.
 * tagline            One-liner used in the footer and meta.
 * institute          Full institute name + address lines (footer).
 * email              Contact email. Shown as plain text AND as a mailto link.
 * socials            Leave a value as "" to hide that icon.
 * form.endpoint      Where the Join form POSTs to (JSON). Works with Formspree
 *                    ("https://formspree.io/f/xxxxxxx"). Leave "" to run in demo
 *                    mode (no network request, success state still shows).
 * form.mode          "json" (Formspree, Getform, any JSON endpoint) or
 *                    "google-form" (posts as form-data with no-cors; set
 *                    form.googleFieldMap to your entry.XXXX ids).
 * logo               Club logo files in /public/images (small = navbar, large = footer/intro).
 * features           Feature flags. Turn things off without touching components.
 * navLinks           Section anchors in the navbar. `id` must match a section id.
 */

export const site = {
  name: "PRASTHANAM",
  shortName: "Prasthanam",
  tagline: "The robotics club of GBPIET. A web of builders.",
  institute: {
    name: "G.B. Pant Institute of Engineering & Technology",
    short: "GBPIET",
    address: ["Ghurdauri, Pauri Garhwal", "Uttarakhand 246194, India"],
    mapUrl: "https://maps.google.com/?q=GB+Pant+Institute+of+Engineering+and+Technology+Ghurdauri",
  },
  email: "prasthanam.club@example.com", // SAMPLE — replace with the real club email
  socials: {
    instagram: "https://instagram.com/", // SAMPLE
    linkedin: "https://linkedin.com/", // SAMPLE
    github: "https://github.com/", // SAMPLE
    youtube: "",
  },
  form: {
    endpoint: "", // e.g. "https://formspree.io/f/abcdwxyz"
    mode: "json" as "json" | "google-form",
    // Only for mode "google-form": map our field names → your Google Form entry ids.
    googleFieldMap: {
      name: "entry.0000000001",
      branch: "entry.0000000002",
      year: "entry.0000000003",
      interest: "entry.0000000004",
      why: "entry.0000000005",
    } as Record<string, string>,
  },
  logo: { small: "/images/logo-64.png", large: "/images/logo-128.png" },
  features: {
    threeHero: true, // false → always use the SVG P-8 (no WebGL at all)
    bootIntro: true, // first-visit assembly intro
    webShooter: true, // click/tap empty hero space to shoot a web
    terminal: true, // ` / ~ easter-egg terminal
    xray: true, // blueprint/wireframe toggle in the navbar
    smoothScroll: true, // Lenis on desktop (never on touch)
  },
  /** One-line swap: set to "/models/p8.glb" once the Blender model exists. "" = primitive placeholder. */
  modelUrl: "",
  navLinks: [
    { id: "projects", label: "Projects" },
    { id: "team", label: "Members" },
    { id: "events", label: "Events & Workshops" },
    { id: "achievements", label: "Achievements" },
    { id: "reports", label: "Reports" },
    { id: "updates", label: "Updates" },
    { id: "alumni", label: "Alumni" },
  ],
};

export type SiteConfig = typeof site;
