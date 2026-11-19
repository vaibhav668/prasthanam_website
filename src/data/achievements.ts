import type { Achievement } from "../types/content";

/**
 * ACHIEVEMENTS
 *
 * id        Unique id.
 * title     What was achieved.
 * event     Competition / event name.
 * year      Year.
 * position  Optional ("Winner", "2nd", "Finalist").
 * image     Optional image path.
 *
 * SAMPLE PLACEHOLDERS ONLY — do not list anything the club has not actually won.
 */
export const achievements: Achievement[] = [
  { id: "ach-1", title: "Achievement Title (sample)", event: "Event Name TBA", year: 2026, position: "Position TBA" },
  { id: "ach-2", title: "Achievement Title (sample)", event: "Event Name TBA", year: 2025, position: "Position TBA" },
  { id: "ach-3", title: "Achievement Title (sample)", event: "Event Name TBA", year: 2025 },
];
