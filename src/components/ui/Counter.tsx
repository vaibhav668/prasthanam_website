import { useEffect, useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { prefersReducedMotion } from "../../hooks/useReducedMotion";

/** Counts up once when scrolled into view. Writes textContent directly (no re-renders). */
export function Counter({ value, suffix = "", duration = 1400 }: { value: number; suffix?: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>({ once: true, threshold: 0.4 });
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || done.current) return;
    done.current = true;
    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${Math.round(value * eased)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, suffix, duration, ref]);

  return (
    <span className="tabular-nums">
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span ref={ref} aria-hidden="true">
        0{suffix}
      </span>
    </span>
  );
}
