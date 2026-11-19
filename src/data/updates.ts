import type { Update } from "../types/content";

/**
 * UPDATES — news feed / announcements. Newest first; pinned ones stay on top.
 *
 * id      Unique id.
 * date    ISO date "2026-03-14".
 * title   Headline.
 * body    One short paragraph.
 * tag     "announcement" | "recruitment" | "result" | "general".
 * link    Optional { label, url } button (a URL, or a section anchor like "#events").
 * pinned  Optional. true → always shown first.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS (dates included).
 */
export const updates: Update[] = [
  {
    id: "sample-recruitment",
    date: "2026-08-01",
    title: "Sample: Recruitment drive opens",
    body: "SAMPLE — first-years from every branch can apply. No experience needed.",
    tag: "recruitment",
    link: { label: "Apply", url: "https://example.com/apply" },
    pinned: true,
  },
  {
    id: "sample-result",
    date: "2026-04-12",
    title: "Sample: Competition result",
    body: "SAMPLE — replace with a real result once it happens.",
    tag: "result",
  },
  {
    id: "sample-lab",
    date: "2026-03-02",
    title: "Sample: Lab hours updated",
    body: "SAMPLE — the bench is open on these days. Bring your own solder wick.",
    tag: "announcement",
  },
  {
    id: "sample-general",
    date: "2026-01-20",
    title: "Sample: New project kick-off",
    body: "SAMPLE — a new build starts this month. Sign-ups at the lab.",
    tag: "general",
  },
];
