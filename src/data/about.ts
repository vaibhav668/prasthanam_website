import type { AboutContent } from "../types/content";

/**
 * ABOUT
 *
 * label        Small mono label above the heading.
 * heading      Section heading.
 * paragraphs   Mission text, one string per paragraph.
 * stats        Animated counters. `value` is a number, `suffix` is appended ("+", "%").
 *              SAMPLE numbers — replace with real ones.
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
    { value: 40, suffix: "+", label: "Members (sample)" },
    { value: 12, label: "Builds shipped (sample)" },
    { value: 8, label: "Workshops / year (sample)" },
    { value: 5, label: "Competitions (sample)" },
  ],
  focusAreas: [
    { name: "Embedded", note: "MCUs, sensors, firmware" },
    { name: "Mechanical / CAD", note: "chassis, linkages, 3D print" },
    { name: "Vision / AI", note: "OpenCV, edge inference" },
    { name: "Drones", note: "flight controllers, frames" },
    { name: "Competitive Robotics", note: "line followers, robo-wars" },
  ],
};
