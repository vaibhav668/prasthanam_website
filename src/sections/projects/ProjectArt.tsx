import type { Project } from "../../types/content";

/** Deterministic pseudo-random number from a string (stable per project). */
export function seeded(id: string, min: number, max: number) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return min + (((h >>> 0) % 1000) / 1000) * (max - min);
}

/** Generic robot schematic, drawn differently per verse. Used when a project has no photo. */
export function ProjectArt({ project }: { project: Project }) {
  const v = project.verse;
  const stroke = v === "comic" ? "#0B0B0C" : v === "crt" ? "#47ff8a" : v === "thermal" ? "#fff7e0" : "#f4f8ff";
  const temp = seeded(project.id, 41, 88).toFixed(1);
  const pid = `ht-${project.id}`;
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true" fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <pattern id={pid} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.8" fill="#E10600" opacity=".55" />
        </pattern>
      </defs>
      {v === "comic" && <rect width="320" height="220" fill={`url(#${pid})`} stroke="none" />}
      <rect x="96" y="92" width="128" height="56" rx={v === "crt" ? 0 : 6} strokeWidth={v === "comic" ? 4 : 1.6} fill={v === "comic" ? "#EDE8DE" : "none"} />
      <rect x="128" y="70" width="64" height="22" strokeWidth={v === "comic" ? 3.5 : 1.4} fill={v === "comic" ? "#EDE8DE" : "none"} />
      <circle cx="160" cy="81" r="6" fill={v === "comic" ? "#E10600" : "none"} strokeWidth="1.4" />
      {[118, 202].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="156" r="20" strokeWidth={v === "comic" ? 4 : 1.6} fill={v === "comic" ? "#0B0B0C" : "none"} />
          <circle cx={cx} cy="156" r="6" strokeWidth="1.2" stroke={v === "comic" ? "#EDE8DE" : stroke} />
        </g>
      ))}
      <path d="M210 92 L238 52 L268 60" strokeWidth={v === "comic" ? 4 : 1.6} />
      <circle cx="238" cy="52" r="4" fill={stroke} />

      {v === "blueprint" && (
        <g strokeWidth="0.8" opacity=".85">
          <path d="M96 190 H224 M96 184 V196 M224 184 V196" />
          <text x="160" y="206" fill={stroke} stroke="none" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
            {`${Math.round(seeded(project.id, 140, 320))} mm`}
          </text>
          <path d="M80 92 V148 M74 92 H86 M74 148 H86" />
          <circle cx="160" cy="120" r="44" strokeDasharray="3 4" opacity=".5" />
          <text x="22" y="26" fill={stroke} stroke="none" fontSize="9" fontFamily="JetBrains Mono, monospace">
            FIG. {project.year % 100}-A
          </text>
        </g>
      )}
      {v === "crt" && (
        <g strokeWidth="0.8">
          <rect x="88" y="62" width="144" height="118" strokeDasharray="2 3" opacity=".7" />
          <text x="92" y="56" fill={stroke} stroke="none" fontSize="9" fontFamily="JetBrains Mono, monospace">
            TARGET LOCK 0.{Math.round(seeded(project.id, 70, 99))}
          </text>
          <path d="M20 200 L60 188 L90 196 L130 176 L170 190 L210 170 L250 184 L300 166" opacity=".6" />
        </g>
      )}
      {v === "thermal" && (
        <g strokeWidth="1">
          <path d="M160 100 V140 M140 120 H180" />
          <circle cx="160" cy="120" r="14" />
          <text x="186" y="112" fill={stroke} stroke="none" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            {temp}°C
          </text>
          <text x="20" y="26" fill={stroke} stroke="none" fontSize="9" fontFamily="JetBrains Mono, monospace">
            T_MAX {temp}°C · ε 0.95
          </text>
        </g>
      )}
    </svg>
  );
}
