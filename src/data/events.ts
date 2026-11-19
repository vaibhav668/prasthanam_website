import type { Event } from "../types/content";
import { withPhotos } from "../lib/photos";

/**
 * EVENTS — the web-thread timeline.
 *
 * id            Unique id.
 * title         Event name.
 * date          ISO date "2026-02-14" or "TBA".
 * type          "workshop" | "competition" | "fest" | "talk".
 * description   One or two sentences.
 * venue         Optional location.
 * registerLink  Optional URL. Shows a "Register" button on upcoming events.
 * image         Optional override. Normally leave it out: drop "<id>.webp" into
 *               src/assets/photos/events/ (16:9 works best).
 * status        "upcoming" | "past" — decides which tab it appears in.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS.
 */
const items: Event[] = [
  {
    id: "sample-orientation",
    title: "Sample: Fresher Orientation",
    date: "TBA",
    type: "talk",
    description: "SAMPLE — what the club does, how to join, and a live demo from the bench.",
    venue: "Venue TBA",
    registerLink: "#join",
    status: "upcoming",
  },
  {
    id: "sample-arduino-101",
    title: "Sample: Arduino 101 Workshop",
    date: "TBA",
    type: "workshop",
    description: "SAMPLE — two days, zero prerequisites. Blink an LED, then make it chase a line.",
    venue: "Venue TBA",
    registerLink: "https://example.com/register",
    status: "upcoming",
  },
  {
    id: "sample-robowar",
    title: "Sample: Inter-College Robo-War",
    date: "TBA",
    type: "competition",
    description: "SAMPLE — arena combat event. Replace with real details.",
    status: "upcoming",
  },
  {
    id: "sample-techfest",
    title: "Sample: Annual Tech Fest Showcase",
    date: "TBA",
    type: "fest",
    description: "SAMPLE — open lab, live demos, and the yearly build showcase.",
    venue: "Campus",
    status: "past",
  },
  {
    id: "sample-cad-workshop",
    title: "Sample: CAD for Robots",
    date: "TBA",
    type: "workshop",
    description: "SAMPLE — from sketch to printable chassis in one afternoon.",
    status: "past",
  },
];

/** Photos are matched by id from src/assets/photos/events/ (see src/assets/photos/README.md). */
export const events: Event[] = withPhotos("events", items, "image");
