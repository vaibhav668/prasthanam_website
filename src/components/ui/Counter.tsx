import { useEffect } from "react";
import { useInView } from "../../hooks/useInView";
import { prefersReducedMotion } from "../../hooks/useReducedMotion";

/** Counts up from 0 every time it scrolls into view. Writes textContent directly (no re-renders). */
export function Counter({ value, suffix = "", duration = 2200 }: { value: number; suffix?: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView) {
      el.textContent = `0${suffix}`; // reset so it replays on the next entry
      return;
    }
    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 2); // gentle ease-out: small numbers visibly tick up
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
