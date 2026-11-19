import type { Event } from "../types/content";
import { withPhotos } from "../lib/photos";
import { reportPdf, warnOrphanReports } from "../lib/reports";

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
 * report        Optional. Adds a small "Report" button to the card that opens the report.
 *                 summary     what happened (a short paragraph)
 *                 highlights  optional bullet list (["42 participants", "Winner: Team X"])
 *                 pages / author   optional
 *                 file        PDF link. Normally leave it out: drop "<event id>.pdf" into
 *                             src/assets/reports/ and it is found automatically.
 *               An event with only a PDF in src/assets/reports/ also gets the button.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS.
 */
const raw: Event[] = [
  {
    id: "sample-orientation",
    title: "Sample: Fresher Orientation",
    date: "TBA",
    type: "talk",
    description: "SAMPLE — what the club does, how to join, and a live demo from the bench.",
    venue: "Venue TBA",
    registerLink: "https://example.com/register",
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
    report: {
      summary: "SAMPLE — what happened at the showcase, who came, which builds were demoed and what we'd do differently next year.",
      highlights: ["SAMPLE: 300+ visitors", "SAMPLE: 6 live demos", "SAMPLE: 2 sponsors on site"],
      pages: 12,
      author: "Documentation Team",
    },
  },
  {
    id: "sample-cad-workshop",
    title: "Sample: CAD for Robots",
    date: "TBA",
    type: "workshop",
    description: "SAMPLE — from sketch to printable chassis in one afternoon.",
    status: "past",
    report: {
      summary: "SAMPLE — workshop outline, tools used, attendance and participant feedback.",
      highlights: ["SAMPLE: 40 attendees", "SAMPLE: 8 printed chassis"],
      pages: 6,
    },
  },
];

// Photos are matched by id from src/assets/photos/events/; report PDFs from src/assets/reports/.
const withReports = raw.map((e) => {
  const file = e.report?.file ?? reportPdf(e.id);
  return e.report || file ? { ...e, report: { ...e.report, file } } : e;
});
warnOrphanReports(raw.map((e) => e.id));

export const events: Event[] = withPhotos("events", withReports, "image");
