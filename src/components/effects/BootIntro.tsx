import { useEffect, useState } from "react";
import { hero } from "../../data/hero";
import { site } from "../../config/site";
import { P8Svg } from "../three/P8Svg";
import { prefersReducedMotion } from "../../hooks/useReducedMotion";

const KEY = "p8-booted-v1";
const DURATION = 1350; // < 1.5 s total

function shouldShow() {
  if (!site.features.bootIntro || prefersReducedMotion()) return false;
  try {
    return !localStorage.getItem(KEY);
  } catch {
    return false;
  }
}

/**
 * First-visit intro: P-8 assembles from parts while mono status lines print.
 * Skippable (button, Esc, any click). Never shown again after the first visit.
 * It's a fixed overlay — the hero underneath is already painted (LCP unaffected).
 */
export function BootIntro() {
  const [show, setShow] = useState(shouldShow);
  const [leaving, setLeaving] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* private mode — fine */
    }
    const step = (DURATION - 250) / hero.bootLines.length;
    const ticks = hero.bootLines.map((_, i) => window.setTimeout(() => setCount(i + 1), 120 + i * step));
    const done = window.setTimeout(() => setLeaving(true), DURATION);
    const skip = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") setLeaving(true);
    };
    window.addEventListener("keydown", skip);
    return () => {
      ticks.forEach(clearTimeout);
      clearTimeout(done);
      window.removeEventListener("keydown", skip);
    };
  }, [show]);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => setShow(false), 260);
    return () => clearTimeout(t);
  }, [leaving]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[95] flex items-center justify-center bg-ink transition-opacity duration-200 ${leaving ? "opacity-0" : "opacity-100"}`}
      onClick={() => setLeaving(true)}
      role="presentation"
    >
      <div aria-hidden className="gridpaper pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative grid w-full max-w-[720px] items-center gap-6 px-6 sm:grid-cols-[220px_1fr]">
        <div className="mx-auto w-[160px] sm:w-[220px]">
          <P8Svg assemble className="w-full" />
        </div>
        <div className="mono text-[12px] leading-6 sm:text-[13px]" aria-hidden="true">
          <p className="mb-2 text-mute">[ BOOT / P-8 ]</p>
          {/* every line is rendered up-front and revealed with opacity → zero layout shift */}
          {hero.bootLines.map((l, i) => {
            const [a, b] = l.split("::");
            return (
              <p key={i} className={`text-paper ${i < count ? "opacity-100" : "opacity-0"}`}>
                <span className="text-mute">{String(i).padStart(2, "0")} </span>
                {a}
                {b && (
                  <>
                    ::<span className="text-cyan">{b}</span>
                  </>
                )}
              </p>
            );
          })}
          <p className="mt-1 inline-block h-4 w-2 bg-red align-middle" />
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLeaving(true);
        }}
        className="tap mono absolute right-4 top-4 px-3 text-[12px] uppercase tracking-[0.14em] text-paper/80 hover:text-paper"
        style={{ marginTop: "var(--safe-t)" }}
      >
        Skip intro →
      </button>
      <style>{`
        .bp{animation:bp-in 420ms cubic-bezier(.2,.8,.2,1) both}
        .bp-thread{animation-delay:0ms}
        .bp-abdomen{--from:translate(0,-80px);animation-delay:80ms}
        .bp-body{--from:translate(0,60px);animation-delay:180ms}
        .bp-legs-l{--from:translate(-90px,0);animation-delay:330ms}
        .bp-legs-r{--from:translate(90px,0);animation-delay:420ms}
        .bp-eye{--from:scale(.1);transform-box:fill-box;transform-origin:center;animation-delay:620ms}
        @keyframes bp-in{from{opacity:0;transform:var(--from,none)}to{opacity:1;transform:none}}
      `}</style>
    </div>
  );
}
