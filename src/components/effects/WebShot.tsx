import { useCallback, useEffect, useRef, useState } from "react";
import { p8 } from "../../lib/p8Store";

interface Shot {
  id: number;
  x: number; // origin, relative to host
  y: number;
  len: number;
  angle: number; // deg
  tx: number; // target
  ty: number;
}

const MAX = 4;
const LIFE = 1100;
const INTERACTIVE = "a,button,input,select,textarea,label,[role=button],[data-no-web]";

/**
 * Click/tap empty space inside `hostRef` → P-8 fires a strand to that point and
 * leaves a web splat. Strands are rotated divs scaled on X (transform-only).
 * At most 4 alive at once; oldest is dropped.
 */
export function WebShot({ hostRef, enabled }: { hostRef: React.RefObject<HTMLElement>; enabled: boolean }) {
  const [shots, setShots] = useState<Shot[]>([]);
  const idRef = useRef(0);
  const timers = useRef<number[]>([]);

  const fire = useCallback((e: PointerEvent) => {
    const host = hostRef.current;
    if (!host || e.button > 0) return;
    if ((e.target as Element).closest(INTERACTIVE)) return;
    const rect = host.getBoundingClientRect();
    const eye = p8.getEye?.();
    if (!eye) return;
    const x = eye.x - rect.left;
    const y = eye.y - rect.top;
    const tx = e.clientX - rect.left;
    const ty = e.clientY - rect.top;
    const dx = tx - x;
    const dy = ty - y;
    const len = Math.hypot(dx, dy);
    if (len < 24) return;
    const shot: Shot = { id: ++idRef.current, x, y, tx, ty, len, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
    setShots((s) => [...s.slice(-(MAX - 1)), shot]);
    const t = window.setTimeout(() => setShots((s) => s.filter((k) => k.id !== shot.id)), LIFE);
    timers.current.push(t);
  }, [hostRef]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !enabled) return;
    host.addEventListener("pointerdown", fire, { passive: true });
    return () => host.removeEventListener("pointerdown", fire);
  }, [hostRef, enabled, fire]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {shots.map((s) => (
        <div key={s.id}>
          <div
            className="absolute left-0 top-0 h-[5px] origin-left"
            style={{ width: s.len, transform: `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.angle}deg)` }}
          >
            <div className="web-strand h-full w-full origin-left">
              <div className="h-[2px] w-full bg-paper shadow-[0_0_0_1px_rgba(11,11,12,.55)]" />
              <div className="mt-[2px] h-px w-[96%] bg-paper/60" />
            </div>
          </div>
          <svg
            className="web-splat absolute left-0 top-0"
            width="96"
            height="96"
            viewBox="-48 -48 96 96"
            style={{ transform: `translate3d(${s.tx - 48}px, ${s.ty - 48}px, 0) rotate(${s.angle}deg)` }}
          >
            <g fill="none" stroke="#EDE8DE" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 1px #0B0B0C)" }}>
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i / 8) * Math.PI * 2;
                const r = i % 2 ? 34 : 42;
                return <line key={i} x1="0" y1="0" x2={Math.cos(a) * r} y2={Math.sin(a) * r} strokeWidth="1.4" />;
              })}
              {[12, 22, 32].map((r) => (
                <polygon
                  key={r}
                  strokeWidth={r === 12 ? 1.6 : 1}
                  opacity={r === 32 ? 0.6 : 0.9}
                  points={Array.from({ length: 8 })
                    .map((_, i) => {
                      const a = (i / 8) * Math.PI * 2;
                      const rr = r * (i % 2 ? 0.86 : 1);
                      return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`;
                    })
                    .join(" ")}
                />
              ))}
              <circle r="3" fill="#E10600" stroke="none" />
            </g>
          </svg>
        </div>
      ))}
      <style>{`
        .web-strand{animation:strand ${LIFE}ms cubic-bezier(.2,.8,.2,1) forwards}
        .web-splat{opacity:0;animation:splat ${LIFE}ms ease-out forwards}
        .web-splat>g{transform-origin:0 0;animation:splat-g ${LIFE}ms cubic-bezier(.2,.8,.2,1) forwards}
        @keyframes strand{0%{transform:scaleX(0);opacity:1}14%{transform:scaleX(1);opacity:1}70%{opacity:.8}100%{transform:scaleX(1);opacity:0}}
        @keyframes splat{0%,12%{opacity:0}16%{opacity:1}70%{opacity:.9}100%{opacity:0}}
        @keyframes splat-g{0%,12%{transform:scale(.2)}24%{transform:scale(1.08)}32%,100%{transform:scale(1)}}
      `}</style>
    </div>
  );
}
