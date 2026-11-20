import type { AboutContent } from "../types/content";
import { achievements } from "./achievements";
import { events } from "./events";
import { projects } from "./projects";

// Counts are taken from the real data files, for the most recent year that has any.
const toYear = (d: string) => Number(d.match(/\d{4}/)?.[0] ?? 0);
const LAST_YEAR = Math.max(...achievements.map((a) => a.year), ...projects.map((p) => p.year), ...events.map((e) => toYear(e.date)));
const buildsShipped = projects.filter((p) => p.year === LAST_YEAR && p.status !== "ongoing").length;
const workshops = events.filter((e) => e.type === "workshop" && toYear(e.date) === LAST_YEAR).length;
const competitions = achievements.length; // all-time

/**
 * ABOUT
 *
 * label        Small mono label above the heading.
 * heading      Section heading.
 * paragraphs   Mission text, one string per paragraph.
 * stats        Animated counters. `value` is a number, `suffix` is appended ("+", "%").
 *              Members is set by hand; the others are computed above from projects, events and
 *              achievements (builds & workshops: most recent year; competitions: all time).
 * focusAreas   Tags with a short note each.
 */
export const about: AboutContent = {
  label: "MISSION LOG",
  heading: "A web of builders, strung across every branch.",
  paragraphs: [
    "Prasthanam Robotics Club, founded in 2022, is more than a robotics community—it's a journey of ambition, innovation, and perseverance. Every robot built, every challenge overcome, and every achievement earned reflects the dedication of our students. United by curiosity and driven by excellence, we continue to learn, create, and lead the way toward a smarter future.",
    "We run workshops, take robots to competitions, and keep a lab bench that is never quite tidy. Freshers are welcome. Not knowing yet is the whole point.",
  ],
  stats: [
    { value: 75, suffix: "+", label: "Members" },
    { value: buildsShipped, suffix: "+", label: "Builds shipped" },
    { value: workshops, label: "Workshops / year" },
    { value: competitions, label: "Competitions" },
  ],
  focusAreas: [
    { name: "Embedded", note: "MCUs, sensors, firmware" },
    { name: "Mechanical / CAD", note: "chassis, linkages, 3D print" },
    { name: "Vision / AI", note: "OpenCV, edge inference" },
    { name: "Drones", note: "flight controllers, frames" },
    { name: "Competitive Robotics", note: "line followers, robo-wars" },
  ],
};
