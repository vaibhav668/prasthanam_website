import type { Achievement } from "../../types/content";
import { MEDAL_COLORS, medalOf } from "./medal";

/** Drawn trophy shown when an achievement has no photo. */
export function TrophyArt({ a }: { a: Achievement }) {
  const accent = MEDAL_COLORS[medalOf(a)].accent;
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <div aria-hidden className="halftone absolute inset-0 opacity-60" />
      <span aria-hidden className="absolute -bottom-6 -left-2 font-display text-[clamp(5rem,14vw,9rem)] font-extrabold leading-none tracking-[-0.06em] text-paper/[0.06]">
        {a.year}
      </span>
      <svg aria-hidden viewBox="0 0 200 160" className="absolute inset-0 h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="100" cy="66" r="46" stroke={accent} strokeOpacity=".35" strokeDasharray="3 5" />
        <g stroke="#EDE8DE" strokeWidth="2.2">
          <path d="M72 34h56v20c0 18-12 32-28 32S72 72 72 54z" fill="#141416" />
          <path d="M72 42H58c0 14 8 22 18 24M128 42h14c0 14-8 22-18 24" />
          <path d="M100 86v18M86 118h28l-4-14H90z" fill="#141416" />
          <path d="M80 118h40v8H80z" fill="#141416" />
        </g>
        <path d="M100 42l3.5 7.2 8 1.1-5.8 5.6 1.4 7.9-7.1-3.8-7.1 3.8 1.4-7.9-5.8-5.6 8-1.1z" fill={accent} stroke={accent} strokeWidth="1" />
        <path d="M150 30l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6-4.5-4 6-1z" fill={accent} fillOpacity=".8" />
        <path d="M40 104l2 4 4 .6-3 2.8.8 4.2-3.8-2-3.8 2 .8-4.2-3-2.8 4-.6z" fill="#EDE8DE" fillOpacity=".5" />
      </svg>
    </div>
  );
}
