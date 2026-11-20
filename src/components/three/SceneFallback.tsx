import { useEffect, useRef } from "react";
import { P8Svg } from "./P8Svg";
import { onShot, p8 } from "../../lib/p8Store";
import { subscribePointer, pointer } from "../../hooks/usePointer";
import { prefersReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Low-tier / no-WebGL / reduced-motion P-8. Pure SVG + CSS transforms:
 *  - swings (CSS keyframes), legs breathe
 *  - pupil tracks the cursor or last tap (rAF-throttled via the pointer store)
 *  - drops lower as you scroll through the hero (transform only)
 */
export default function SceneFallback({ className = "" }: { className?: string }) {
  const dropRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<SVGGElement>(null);
  const eyeAnchor = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    p8.getEye = () => {
      const r = eyeAnchor.current?.getBoundingClientRect();
      return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
    };

    const track = () => {
      const pupil = pupilRef.current;
      const anchor = eyeAnchor.current;
      if (!pupil || !anchor) return;
      const r = anchor.getBoundingClientRect();
      const dx = pointer.x - (r.left + r.width / 2);
      const dy = pointer.y - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260) * 11;
      pupil.style.transform = `translate(${(dx / d) * k}px, ${(dy / d) * k}px)`;
    };
    const unsub = subscribePointer(track);

    // recoil + eye flash on every web shot (restart the CSS animation)
    const unsubShot = onShot(() => {
      const b = bodyRef.current;
      if (!b || reduced) return;
      b.classList.remove("p8-recoil");
      void b.offsetWidth;
      b.classList.add("p8-recoil");
    });

    let raf = 0;
    const onScroll = () => {
      if (raf) return; // position only (no animation), so it also runs with reduced motion
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = window.innerHeight;
        const s = window.scrollY / h;
        const p = Math.min(1, Math.max(0, s));
        // past the hero: rise back up, shrink and tuck into the top-right corner
        const phone = window.innerWidth < 640; // phones: tuck into the corner sooner so it never sits over headings
        const t = Math.min(1, Math.max(0, (s - (phone ? 0.25 : 0.85)) / (phone ? 0.45 : 0.65)));
        const dock = t * t * (3 - 2 * t);
        const el = dropRef.current;
        if (el) {
          const r = el.offsetLeft + el.offsetWidth; // right edge in the fixed layer
          const toRight = (window.innerWidth - 16 - r) * dock;
          el.style.transformOrigin = "100% 0";
          el.style.transform = `translate3d(${toRight}px, ${p * h * 0.32 * (1 - dock)}px, 0) scale(${1 - 0.55 * dock})`;
        }
        track();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      unsub();
      unsubShot();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      p8.getEye = null;
    };
  }, [reduced]);

  return (
    <div ref={dropRef} className={`will-change-transform ${className}`}>
      <div className={reduced ? "" : "p8-swing"} style={{ transformOrigin: "50% -200%" }}>
        <div ref={bodyRef} className="relative">
          <P8Svg ref={pupilRef} animated={!reduced} className="h-auto w-full [&_g]:transition-transform [&_g]:duration-150" />
          {/* invisible anchor centred on the lens: origin for web shots + eye tracking */}
          <div ref={eyeAnchor} aria-hidden className="absolute h-px w-px" style={{ left: "50%", top: `${(216 / 380) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
