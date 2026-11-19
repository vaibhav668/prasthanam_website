import type { Achievement, Medal } from "../../types/content";

export function medalOf(a: Achievement): Medal {
  if (a.medal) return a.medal;
  const p = (a.position ?? "").toLowerCase();
  if (/\b1st\b|first|winner|champion|gold/.test(p)) return "gold";
  if (/\b2nd\b|second|runner|silver/.test(p)) return "silver";
  if (/\b3rd\b|third|bronze/.test(p)) return "bronze";
  return "special";
}

/** Short text stamped on the medal face: "1ST", "2ND", "3RD", or ★. */
export function medalLabel(a: Achievement): string {
  const m = (a.position ?? "").match(/(\d+)\s*(st|nd|rd|th)/i);
  if (m) return `${m[1]}${m[2].toUpperCase()}`;
  const md = medalOf(a);
  return md === "gold" ? "1ST" : md === "silver" ? "2ND" : md === "bronze" ? "3RD" : "★";
}

export const MEDAL_COLORS: Record<Medal, { face: string; edge: string; ink: string; accent: string }> = {
  gold: {
    face: "radial-gradient(circle at 34% 28%, #fff5cc 0%, #f1c84b 30%, #c18f1c 66%, #7a5608 100%)",
    edge: "#8a6410",
    ink: "#3a2800",
    accent: "#e9b93a",
  },
  silver: {
    face: "radial-gradient(circle at 34% 28%, #ffffff 0%, #d9dde0 32%, #9aa1a8 68%, #5a6168 100%)",
    edge: "#666d74",
    ink: "#1f2327",
    accent: "#c9ced3",
  },
  bronze: {
    face: "radial-gradient(circle at 34% 28%, #ffe0c2 0%, #d9925a 32%, #9a5a2a 68%, #5c3010 100%)",
    edge: "#6e3a14",
    ink: "#2a1405",
    accent: "#d9925a",
  },
  special: {
    face: "radial-gradient(circle at 34% 28%, #ffb3ab 0%, #ff3b30 30%, #c80600 66%, #5a0200 100%)",
    edge: "#7a0300",
    ink: "#fff3ef",
    accent: "#ff3b30",
  },
};
