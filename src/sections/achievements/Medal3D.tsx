import type { Achievement } from "../../types/content";
import { MEDAL_COLORS, medalLabel, medalOf } from "./medal";

/**
 * A CSS 3D coin: front face, back face (year) and stacked edge layers for
 * thickness. Floats gently; spins 360° when its card is hovered (.group).
 */
export function Medal3D({ a, size = 84 }: { a: Achievement; size?: number }) {
  const c = MEDAL_COLORS[medalOf(a)];
  const label = medalLabel(a);
  const depth = 7;
  return (
    <div aria-hidden="true" className="medal-float" style={{ width: size, height: size }}>
      <div className="medal-spin relative h-full w-full [transform-style:preserve-3d]">
        {/* edge (thickness) */}
        {Array.from({ length: depth }, (_, i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              background: c.edge,
              transform: `translateZ(${-i - 1}px)`,
              boxShadow: i === depth - 1 ? "0 14px 22px rgba(0,0,0,.55)" : undefined,
            }}
          />
        ))}
        {/* back */}
        <span
          className="absolute inset-0 flex flex-col items-center justify-center rounded-full [backface-visibility:hidden]"
          style={{ background: c.face, transform: `translateZ(${-depth - 1}px) rotateY(180deg)`, color: c.ink }}
        >
          <span className="font-display font-extrabold leading-none" style={{ fontSize: size * 0.24 }}>
            {a.year}
          </span>
          <span className="mono mt-1 uppercase tracking-[0.2em]" style={{ fontSize: Math.max(6, size * 0.075) }}>
            prasthanam
          </span>
        </span>
        {/* front */}
        <span
          className="absolute inset-0 flex items-center justify-center rounded-full shadow-[inset_0_0_0_3px_rgba(255,255,255,.25),inset_0_-6px_12px_rgba(0,0,0,.35)] [backface-visibility:hidden]"
          style={{ background: c.face, color: c.ink }}
        >
          <span className="absolute inset-[12%] rounded-full border border-dashed" style={{ borderColor: c.ink, opacity: 0.45 }} />
          <span className="font-display font-extrabold leading-none tracking-[-0.04em]" style={{ fontSize: label === "★" ? size * 0.42 : size * 0.3 }}>
            {label}
          </span>
        </span>
      </div>
      {/* ribbon tails */}
      <span className="absolute -bottom-3 left-[30%] h-6 w-3 -rotate-12 bg-red-ui [clip-path:polygon(0_0,100%_0,100%_100%,50%_75%,0_100%)]" style={{ transform: "translateZ(-10px) rotate(-12deg)" }} />
      <span className="absolute -bottom-3 right-[30%] h-6 w-3 bg-paper [clip-path:polygon(0_0,100%_0,100%_100%,50%_75%,0_100%)]" style={{ transform: "translateZ(-10px) rotate(12deg)" }} />
    </div>
  );
}
