import { forwardRef } from "react";

/**
 * P-8 drawn in SVG. Same silhouette as the 3D model: hex chassis, one big red
 * lens, 8 segmented legs with red joint caps, "P-8" plate on its back (abdomen).
 * Used for the low-tier hero, the boot intro, and the 404 page.
 */
const L_LEGS = [
  { hip: [152, 182], knee: [98, 146], foot: [52, 196] },
  { hip: [140, 202], knee: [70, 186], foot: [26, 250] },
  { hip: [140, 228], knee: [70, 240], foot: [36, 304] },
  { hip: [152, 250], knee: [98, 284], foot: [80, 344] },
];
const R_LEGS = L_LEGS.map((l) => ({
  hip: [400 - l.hip[0], l.hip[1]],
  knee: [400 - l.knee[0], l.knee[1]],
  foot: [400 - l.foot[0], l.foot[1]],
}));

function Leg({ hip, knee, foot }: { hip: number[]; knee: number[]; foot: number[] }) {
  const d = `M${hip[0]} ${hip[1]} L${knee[0]} ${knee[1]} L${foot[0]} ${foot[1]}`;
  return (
    <g>
      <path d={d} stroke="#EDE8DE" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={d} stroke="#141416" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx={hip[0]} cy={hip[1]} r="5" fill="#E10600" />
      <circle cx={knee[0]} cy={knee[1]} r="7" fill="#E10600" stroke="#0B0B0C" strokeWidth="2" />
      <circle cx={foot[0]} cy={foot[1]} r="2.5" fill="#EDE8DE" />
    </g>
  );
}

interface Props {
  className?: string;
  /** Adds idle leg motion classes. */
  animated?: boolean;
  /** Adds per-part classes for the boot "assembly" animation. */
  assemble?: boolean;
  title?: string;
}

export const P8Svg = forwardRef<SVGGElement, Props>(function P8Svg({ className = "", animated, assemble, title }, pupilRef) {
  const part = (name: string) => (assemble ? `bp bp-${name}` : undefined);
  return (
    <svg viewBox="0 0 400 380" className={`overflow-visible ${className}`} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {/* thread — extends far above so the bot can drop without detaching */}
      <line x1="200" y1="-2400" x2="200" y2="104" stroke="#EDE8DE" strokeOpacity=".7" strokeWidth="1.5" className={part("thread")} />

      <g className={part("legs-l")}>
        <g className={animated ? "p8-legs-l" : undefined}>{L_LEGS.map((l, i) => <Leg key={i} {...l} />)}</g>
      </g>
      <g className={part("legs-r")}>
        <g className={animated ? "p8-legs-r" : undefined}>{R_LEGS.map((l, i) => <Leg key={i} {...l} />)}</g>
      </g>

      {/* abdomen (back) with label */}
      <g className={part("abdomen")}>
        <ellipse cx="200" cy="146" rx="48" ry="44" fill="#1b1b1e" stroke="#EDE8DE" strokeWidth="2.5" />
        <path d="M160 132 Q200 118 240 132" stroke="#E10600" strokeWidth="3" fill="none" />
        <rect x="178" y="142" width="44" height="20" fill="#EDE8DE" />
        <text x="200" y="157" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="14" fill="#0B0B0C">
          P-8
        </text>
        <circle cx="200" cy="104" r="4" fill="#EDE8DE" />
      </g>

      {/* hex chassis */}
      <g className={part("body")}>
        <path d="M266 216 L233 159 L167 159 L134 216 L167 273 L233 273 Z" fill="#141416" stroke="#EDE8DE" strokeWidth="3" strokeLinejoin="round" />
        <path d="M250 216 L225 173 L175 173 L150 216 L175 259 L225 259 Z" fill="none" stroke="#EDE8DE" strokeOpacity=".22" strokeWidth="1.5" />
        {[
          [233, 159], [167, 159], [134, 216], [167, 273], [233, 273], [266, 216],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#8D887F" />
        ))}
        <text x="244" y="268" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#8D887F">
          SN-0008
        </text>
      </g>

      {/* lens eye */}
      <g className={part("eye")}>
       <g className={animated ? "p8-blink" : undefined}>
        <circle cx="200" cy="216" r="30" fill="#0B0B0C" stroke="#EDE8DE" strokeWidth="2" />
        <circle cx="200" cy="216" r="24" fill="#E10600" />
        <circle cx="200" cy="216" r="24" fill="none" stroke="#ff6a5c" strokeWidth="1" strokeDasharray="3 4" />
        <g ref={pupilRef}>
          <circle cx="200" cy="216" r="9" fill="#0B0B0C" />
          <circle cx="196" cy="212" r="3" fill="#EDE8DE" />
        </g>
       </g>
      </g>
    </svg>
  );
});
