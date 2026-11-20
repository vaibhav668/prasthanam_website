import type { Alumnus } from "../types/content";
import { withPhotos } from "../lib/photos";

/**
 * ALUMNI — grouped by batch (newest batch first).
 *
 * id        Unique id.
 * name      Full name (only with their consent).
 * batch     "2019–2023" — groups the list.
 * branch    "CSE", "ECE", …
 * clubRole  Optional — role they held in the club.
 * now       Optional — where they are now ("Engineer @ Company").
 * photo     Optional override. Normally leave it out: drop "<id>.webp" into
 *            src/assets/photos/alumni/ (square). Initials if missing.
 * linkedin  Optional profile URL.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS.
 */
const items: Alumnus[] = [
  { id: "alum-1", name: "Ashmit Rana ", batch: "2021–2025", branch: "EE" },
  { id: "alum-2", name: "Harsh Singh", batch: "2021–2025", branch: "EE", },
  { id: "alum-3", name: "Arvind Singh Rawat", batch: "2020–2024", branch: "EE"},
  { id: "alum-4", name: "Gyanendra Yadav", batch: "2020–2024", branch: "EE"},
];

/** Photos are matched by id from src/assets/photos/alumni/ (see src/assets/photos/README.md). */
export const alumni: Alumnus[] = withPhotos("alumni", items, "photo");
