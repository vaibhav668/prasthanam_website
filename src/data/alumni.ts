import type { Alumnus } from "../types/content";

/**
 * ALUMNI — grouped by batch (newest batch first).
 *
 * id        Unique id.
 * name      Full name (only with their consent).
 * batch     "2019–2023" — groups the list.
 * branch    "CSE", "ECE", …
 * clubRole  Optional — role they held in the club.
 * now       Optional — where they are now ("Engineer @ Company").
 * photo     Optional — "/images/alumni/<id>.webp" (square). Initials if missing.
 * linkedin  Optional profile URL.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS.
 */
export const alumni: Alumnus[] = [
  { id: "alum-1", name: "Alumni Name", batch: "2021–2025", branch: "ECE", clubRole: "Former President", now: "Current role TBA" },
  { id: "alum-2", name: "Alumni Name", batch: "2021–2025", branch: "ME", clubRole: "Former Mechanical Lead", now: "Current role TBA" },
  { id: "alum-3", name: "Alumni Name", batch: "2020–2024", branch: "CSE", clubRole: "Former Vision Lead", now: "Current role TBA" },
  { id: "alum-4", name: "Alumni Name", batch: "2020–2024", branch: "EE", clubRole: "Founding Member", now: "Current role TBA" },
];
