import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import type { Member } from "../../types/content";
import { Avatar } from "./Avatar";
import { WebShotFx } from "./WebShotFx";

interface Props {
  members: Member[];
  /** Cumulative position (can exceed members.length) so the ring always turns the short way. */
  pos: number;
  active: number;
  onSelect: (i: number) => void;
  onStep: (d: 1 | -1) => void;
  reduced: boolean;
}

const RING: Record<Member["tier"], string> = {
  faculty: "ring-paper/80",
  core: "ring-red",
  lead: "ring-paper/40",
  member: "ring-paper/15",
};

/**
 * The web: members sit on an orbit around a big centre portrait. The ring turns
 * (CSS rotate) so the active member is always at the top; every node
 * counter-rotates so faces stay upright. Spokes, rings and dashed red strands
 * are an SVG that turns with it. The whole thing tilts in 3D toward the cursor.
 * Transform + opacity only; no WebGL (the hero owns the site's single canvas).
 */
export function MemberOrbit({ members, pos, active, onSelect, onStep, reduced }: Props) {
  const n = members.length;
  const wrap = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(480);

  // measure → radius + node size
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // web-shot on every switch (skipped on first render and for reduced motion)
  const [shots, setShots] = useState<number[]>([]);
  const firstRun = useRef(true);
  const shotId = useRef(0);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (reduced) return;
    const id = ++shotId.current;
    setShots((s) => [...s.slice(-1), id]); // at most 2 alive
    const t = window.setTimeout(() => setShots((s) => s.filter((k) => k !== id)), 1400);
    return () => clearTimeout(t);
  }, [pos, reduced]);

  // roving focus: when the ring turns via keyboard, keep focus on the active node
  useEffect(() => {
    const el = wrap.current;
    if (el && el.contains(document.activeElement)) {
      el.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')?.focus({ preventScroll: true });
    }
  }, [active]);

  const step = 360 / Math.max(n, 1);
  const ring = -pos * step;
  const chord = n > 1 ? 2 * (w / 2) * Math.sin(Math.PI / n) : w;
  const node = Math.round(Math.max(40, Math.min(w > 520 ? 86 : 64, chord * 0.6)));
  const R = w / 2 - node / 2 - 10;
  const hub = Math.round(w * (w > 520 ? 0.4 : 0.38));
  const ease = reduced ? "none" : "transform 900ms cubic-bezier(.65,0,.25,1)";

  // 3D tilt toward the mouse (rAF, transform only)
  const raf = useRef(0);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduced) return;
    const el = tilt.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `rotateX(${(-py * 16).toFixed(2)}deg) rotateY(${(px * 18).toFixed(2)}deg)`;
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    if (tilt.current) tilt.current.style.transform = "";
  };

  // swipe (touch / pen)
  const start = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) onStep(dx < 0 ? 1 : -1);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onStep(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onStep(-1);
    }
  };

  // web geometry in a unit viewBox (-1..1), rotates with the ring
  const rN = R / (w / 2);
  const pts = members.map((_, i) => {
    const a = ((i * step - 90) * Math.PI) / 180;
    return [Math.cos(a), Math.sin(a)] as const;
  });
  const poly = (k: number) => pts.map(([x, y]) => `${(x * k).toFixed(4)},${(y * k).toFixed(4)}`).join(" ");
  const current = members[active];

  return (
    <div
      ref={wrap}
      className="relative mx-auto aspect-square w-full max-w-[620px] select-none [perspective:1100px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
      onPointerUp={onUp}
      style={{ touchAction: "pan-y" }}
    >
      <div ref={tilt} className="absolute inset-0 transition-transform duration-300 ease-out [transform-style:preserve-3d] will-change-transform">
        {/* rotating ring: web + nodes */}
        <div className="absolute inset-0" style={{ transform: `rotate(${ring}deg)`, transition: ease }}>
          <svg aria-hidden="true" viewBox="-1 -1 2 2" className="absolute inset-0 h-full w-full overflow-visible">
            <g fill="none" stroke="rgb(var(--paper-rgb))" strokeWidth="0.004">
              {pts.map(([x, y], i) => (
                <line key={i} x1="0" y1="0" x2={x * rN} y2={y * rN} strokeOpacity="0.16" />
              ))}
              {n > 2 && [0.42, 0.62, 0.82].map((k) => <polygon key={k} points={poly(rN * k)} strokeOpacity="0.1" />)}
            </g>
            {n > 1 && (
              <polygon
                points={poly(rN)}
                fill="none"
                stroke="rgb(var(--red-rgb))"
                strokeOpacity="0.75"
                strokeWidth="0.012"
                strokeDasharray="0.03 0.05"
                strokeLinecap="round"
              />
            )}
          </svg>

          {members.map((mem, i) => {
            const isActive = i === active;
            return (
              <div
                key={mem.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: node,
                  height: node,
                  marginLeft: -node / 2,
                  marginTop: -node / 2,
                  transform: `rotate(${i * step}deg) translateY(${-R}px) rotate(${-i * step - ring}deg)`,
                  transition: ease,
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  onKeyDown={onKey}
                  aria-pressed={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`group block h-full w-full rounded-full transition-transform duration-300 hover:scale-110 focus-visible:scale-110 ${
                    isActive ? "scale-110" : ""
                  }`}
                >
                  <span className="sr-only">{`${mem.name}, ${mem.role}`}</span>
                  <span
                    aria-hidden="true"
                    className={`block h-full w-full overflow-hidden rounded-full bg-ink ring-2 ring-offset-2 ring-offset-ink ${
                      isActive ? "ring-cyan" : RING[mem.tier]
                    } shadow-[0_0_28px_rgba(237,232,222,0.16)]`}
                  >
                    <Avatar member={mem} size={node} />
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* web-shot: hub → top slot, reels the chosen member in, splats on arrival */}
        {shots.map((id) => (
          <WebShotFx key={id} w={w} hub={hub} R={R} node={node} />
        ))}

        {/* centre hub — stays upright, crossfades to the active member */}
        <div
          className="absolute left-1/2 top-1/2 overflow-hidden rounded-full bg-ink ring-2 ring-paper/30 ring-offset-4 ring-offset-ink shadow-[0_0_60px_rgba(237,232,222,0.18)]"
          style={{ width: hub, height: hub, marginLeft: -hub / 2, marginTop: -hub / 2, transform: "translateZ(40px)" }}
          aria-hidden="true"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {current && (
              <m.div
                key={current.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: reduced ? 0 : 0.45 }}
              >
                <Avatar member={current} size={hub} big />
              </m.div>
            )}
          </AnimatePresence>
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.14),transparent_55%)]" />
        </div>
      </div>
    </div>
  );
}
