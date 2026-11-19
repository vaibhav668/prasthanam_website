import type { Report } from "../types/content";

/**
 * REPORTS — event reports, workshop reports, technical write-ups, annual reports.
 *
 * id       Unique id.
 * title    Report title.
 * date     ISO date "2026-03-14" or "TBA".
 * type     "event" | "workshop" | "technical" | "annual" (used by the filter).
 * summary  One or two lines.
 * file     Optional. Put PDFs in /public/reports/ and use "/reports/<name>.pdf",
 *          or paste any public link (Google Drive, Dropbox). No file → "Coming soon".
 * pages    Optional page count shown on the card.
 * author   Optional ("Documentation Team").
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS.
 */
export const reports: Report[] = [
  {
    id: "sample-annual-report",
    title: "Sample: Annual Report",
    date: "TBA",
    type: "annual",
    summary: "SAMPLE — the year in builds, workshops, competitions and numbers.",
    pages: 24,
    author: "Core Team",
  },
  {
    id: "sample-workshop-report",
    title: "Sample: Arduino 101 Workshop Report",
    date: "TBA",
    type: "workshop",
    summary: "SAMPLE — attendance, what was taught, feedback, photos.",
    pages: 8,
  },
  {
    id: "sample-event-report",
    title: "Sample: Robo-War Event Report",
    date: "TBA",
    type: "event",
    summary: "SAMPLE — rounds, results, judges' notes and what we'd change.",
    pages: 12,
  },
  {
    id: "sample-technical-report",
    title: "Sample: Line Follower PID Tuning Notes",
    date: "TBA",
    type: "technical",
    summary: "SAMPLE — method, graphs and final gains for the line follower.",
    pages: 6,
  },
];
