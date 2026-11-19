import type { Achievement } from "../types/content";
import { withPhotos } from "../lib/photos";

/**
 * ACHIEVEMENTS — the trophy cabinet.
 *
 * id           Unique id.
 * title        What was achieved ("1st Place Champions — National Robowars Championship").
 * event        Where ("National Technical Symposium 2025").
 * year         Year (number).
 * position     Optional badge text ("1st Place", "Runner-up", "Finalist").
 * category     Optional small label above the title ("Combat Robotics (15kg category)").
 * description  Optional 1–2 sentences.
 * highlight    Optional footer line with a trophy icon ("National Champion").
 * image        Optional override. Normally leave it out: drop "<id>.webp" into
 *              src/assets/photos/achievements/ (16:10 works best). No photo → a drawn
 *              trophy is shown instead. Click a photo to open it full size.
 * medal        Optional "gold" | "silver" | "bronze" | "special" — the 3D medal.
 *              If omitted it's guessed from `position` (1st → gold, 2nd → silver, 3rd → bronze).
 * featured     Optional. true → shown as the big card at the top (use for one or two wins).
 * link         Optional { label, url } — news article, certificate, video.
 *
 * Only list real achievements. The first entry is taken from the old site's screenshot;
 * please verify it. The rest are SAMPLE placeholders.
 */
const items: Achievement[] = [
  {
    id: "robowars-national-2025",
    title: "1st Place Champions — National Robowars Championship",
    event: "National Technical Symposium 2025",
    year: 2025,
    position: "1st Place",
    category: "Combat Robotics (15kg category)",
    description: 'Our custom drum-spinner bot "Vajra" went undefeated through 6 tournament rounds, winning 1st place with total arena dominance.',
    highlight: "National Champion",
    medal: "gold",
    featured: true,
  },
  {
    id: "sample-2",
    title: "Sample: Runner-up — Line Follower Challenge",
    event: "Event Name TBA",
    year: 2025,
    position: "2nd Place",
    category: "Autonomous Robotics",
    description: "SAMPLE — replace with a real result, or delete this entry.",
    highlight: "Podium finish",
  },
  {
    id: "sample-3",
    title: "Sample: 3rd Place — Drone Obstacle Course",
    event: "Event Name TBA",
    year: 2024,
    position: "3rd Place",
    category: "Aerial Robotics",
    description: "SAMPLE — replace with a real result, or delete this entry.",
  },
  {
    id: "sample-4",
    title: "Sample: Best Design Award",
    event: "Event Name TBA",
    year: 2024,
    position: "Special Award",
    category: "Design",
    description: "SAMPLE — replace with a real result, or delete this entry.",
    medal: "special",
  },
];

/** Photos are matched by id from src/assets/photos/achievements/ (see src/assets/photos/README.md). */
export const achievements: Achievement[] = withPhotos("achievements", items, "image");
