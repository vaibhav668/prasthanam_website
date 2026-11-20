/**
 * SECTION COPY — headings, labels and empty states for every
 * section. Edit text here; components never hard-code copy.
 *
 * label    Mono spec label, shown as "[ 02 / LABEL ]".
 * title    Section heading (h2).
 * kicker   Optional paragraph under the heading.
 * empty    Message shown when the section's data array is empty.
 */
export const sections = {
  hero: {
    label: "HELLO, WORLD",
    coords: "30.1°N / 78.8°E · GHURDAURI",
    meta: "ROBOTICS CLUB · GBPIET",
    hint: "Tap anywhere — P-8 shoots",
    scroll: "Scroll",
    annotation: "this is P-8. it bites (gently)",
  },
  about: {
    label: "ABOUT",
    focusLabel: "Focus areas",
    statsNote: "sample numbers — update in data/about.ts",
  },
  projects: {
    label: "PROJECTS",
    title: "Multiverse of builds.",
    kicker: "Every build lives in its own dimension. Hover to tear through, open one for the spec sheet.",
    empty: "No builds yet. Go build one.",
    open: "Open spec sheet",
    specsLabel: "Spec sheet",
    teamLabel: "Built by",
    links: { github: "Source", video: "Video" },
  },
  team: {
    label: "MEMBERS",
    title: "Agents of the web.",
    kicker: "Every agent is a node on the web. Tap a node, swipe, or use the arrow keys.",
    prev: "Previous member",
    next: "Next member",
    socials: "Signal",
    tiers: {
      faculty: "Faculty advisors",
      core: "Core — clearance A",
      lead: "Leads",
      member: "Agents",
    },
    skills: "Skills",
    empty: "The roster is empty. Be the first agent.",
  },
  events: {
    label: "EVENTS & WORKSHOPS",
    title: "Threads in time.",
    tabs: { upcoming: "Upcoming", past: "Past" },
    register: "Register",
    report: "Report",
    reportTitle: "Event report",
    openPdf: "Open full report",
    highlights: "Highlights",
    pages: "pages",
    noFile: "Full PDF coming soon.",
    tba: "Date TBA",
    empty: { upcoming: "Nothing scheduled yet. Watch this thread.", past: "No past events logged yet." },
  },
  achievements: {
    label: "ACHIEVEMENTS",
    title: "Trophy cabinet.",
    kicker: "Arena wins, podiums and awards. Hover a card to spin its medal.",
    stats: { wins: "Wins", podiums: "Podiums", awards: "Total awards", years: "Years competing" },
    featured: "Featured win",
    all: "All years",
    view: "View photo",
    empty: "Nothing logged yet. The first entry is yours to earn.",
  },
  alumni: {
    label: "ALUMNI",
    title: "Threads that went further.",
    kicker: "They built here first. Batch by batch, the web keeps growing.",
    batch: "Batch",
    now: "Now",
    empty: "No alumni listed yet.",
  },
  gallery: {
    label: "GALLERY",
    title: "Life at Prasthanam.",
    kicker: "Solder smoke, arena dust, 3 a.m. debugging.",
    empty: "No photos yet.",
    annotation: "sample — swap me",
    prev: "Previous",
    next: "Next",
  },
  sponsors: {
    label: "SPONSORS",
    title: "Holding the web up.",
    empty: "Your logo could hang here.",
    cta: "Sponsor the club",
  },
  faq: {
    label: "FAQ",
    title: "Questions, answered.",
    empty: "No questions yet. Ask us.",
  },
  notFound: {
    code: "ERR 404",
    title: "Thread snapped.",
    body: "P-8 swung over here and found nothing. The page you want isn't on this web.",
    cta: "Back to base",
  },
};
