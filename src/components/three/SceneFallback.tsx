import { useEffect, useRef } from "react";
import { P8Svg } from "./P8Svg";
import { p8 } from "../../lib/p8Store";
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

    let raf = 0;
    const onScroll = () => {
      if (raf || reduced) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = window.innerHeight;
        const p = Math.min(1, Math.max(0, window.scrollY / h));
        if (dropRef.current) dropRef.current.style.transform = `translate3d(0, ${p * h * 0.32}px, 0)`;
        track();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      p8.getEye = null;
    };
  }, [reduced]);

  return (
    <div ref={dropRef} className={`will-change-transform ${className}`}>
      <div className={reduced ? "" : "p8-swing"} style={{ transformOrigin: "50% -200%" }}>
        <div className="relative">
          <P8Svg ref={pupilRef} animated={!reduced} className="h-auto w-full [&_g]:transition-transform [&_g]:duration-150" />
          {/* invisible anchor centred on the lens: origin for web shots + eye tracking */}
          <div ref={eyeAnchor} aria-hidden className="absolute h-px w-px" style={{ left: "50%", top: `${(216 / 380) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
