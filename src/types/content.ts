/**
 * Content types for every file in src/data.
 * Components only ever read data through these shapes, so if you add a field here,
 * add it to the matching data file too.
 */

export type ProjectStatus = "completed" | "ongoing" | "prototype";
export type Verse = "blueprint" | "comic" | "crt" | "thermal";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: number;
  status: ProjectStatus;
  /** Visual "dimension" the card is drawn in. */
  verse: Verse;
  tech: string[];
  specs: { label: string; value: string }[];
  image?: string;
  github?: string;
  video?: string;
  /** Member ids from data/team.ts */
  team?: string[];
}

export type MemberTier = "faculty" | "core" | "lead" | "member";

export interface Member {
  id: string;
  name: string;
  role: string;
  branch: string;
  year: string;
  tier: MemberTier;
  photo?: string;
  skills: string[];
  socials?: { linkedin?: string; github?: string; instagram?: string };
}

export type EventType = "workshop" | "competition" | "fest" | "talk";

export interface Event {
  id: string;
  title: string;
  /** ISO date ("2026-02-14") or "TBA" */
  date: string;
  type: EventType;
  description: string;
  venue?: string;
  registerLink?: string;
  image?: string;
  status: "upcoming" | "past";
}

export type Medal = "gold" | "silver" | "bronze" | "special";

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: number;
  /** Badge text, e.g. "1st Place", "Runner-up", "Finalist" */
  position?: string;
  /** Photo of the win (team, trophy, bot). 16:10 looks best. */
  image?: string;
  /** Small label above the title, e.g. "Combat Robotics (15kg category)" */
  category?: string;
  description?: string;
  /** Footer line with a trophy icon, e.g. "National Champion" */
  highlight?: string;
  /** 3D medal colour. Defaults from `position` (1st → gold, 2nd → silver, 3rd → bronze, else special). */
  medal?: Medal;
  /** Shown big at the top of the section. */
  featured?: boolean;
  /** Optional link (news article, certificate, video). */
  link?: { label: string; url: string };
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  /** Optional responsive sources: "/images/gallery/a-640.webp 640w, /images/gallery/a-1280.webp 1280w" */
  srcSet?: string;
  /** Optional intrinsic size, used to reserve space and avoid layout shift. */
  width?: number;
  height?: number;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url?: string;
  tier?: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface HeroContent {
  titleTop: string;
  titleBottom: string;
  sanskrit: string;
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  marquee: string[];
  bootLines: string[];
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface AboutContent {
  label: string;
  heading: string;
  paragraphs: string[];
  stats: Stat[];
  focusAreas: { name: string; note: string }[];
}

export interface TerminalCommand {
  /** What the user types, e.g. "ls projects" */
  cmd: string;
  /** Shown in `help` output */
  description: string;
  /** Static text lines to print. Use {projects} / {team} tokens to inject live data. */
  output?: string[];
  /** Special behaviour handled by the terminal component. */
  action?: "clear" | "exit" | "scrollToJoin" | "listProjects" | "listTeam" | "help";
  /** Hidden commands don't appear in `help`. */
  hidden?: boolean;
}

export type ReportType = "event" | "workshop" | "technical" | "annual";

export interface Report {
  id: string;
  title: string;
  /** ISO date "2026-03-14" or "TBA" */
  date: string;
  type: ReportType;
  summary: string;
  /** PDF in /public/reports/ ("/reports/arduino-101.pdf") or any URL (Google Drive etc.) */
  file?: string;
  pages?: number;
  author?: string;
}

export type UpdateTag = "announcement" | "recruitment" | "result" | "general";

export interface Update {
  id: string;
  /** ISO date "2026-03-14" */
  date: string;
  title: string;
  body: string;
  tag: UpdateTag;
  link?: { label: string; url: string };
  /** Pinned updates stay on top. */
  pinned?: boolean;
}

export interface Alumnus {
  id: string;
  name: string;
  /** e.g. "2019–2023" — alumni are grouped by this */
  batch: string;
  branch: string;
  /** Role they held in the club */
  clubRole?: string;
  /** Where they are now, e.g. "Robotics Engineer @ Company" */
  now?: string;
  photo?: string;
  linkedin?: string;
}
