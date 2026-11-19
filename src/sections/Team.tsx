import { useCallback, useEffect, useMemo, useState } from "react";
import { team } from "../data/team";
import { sections } from "../data/sections";
import type { MemberTier } from "../types/content";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { MemberOrbit } from "./team/MemberOrbit";
import { MemberCard } from "./team/MemberCard";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ORDER: MemberTier[] = ["faculty", "core", "lead", "member"];
const AUTOPLAY_MS = 4500;

const Arrow = ({ dir, label, onClick }: { dir: "prev" | "next"; label: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="ss tap mono flex h-14 w-14 shrink-0 items-center justify-center border border-line bg-ink-2 text-xl text-paper hover:border-paper/60"
    data-text={dir === "prev" ? "‹" : "›"}
  >
    {dir === "prev" ? "‹" : "›"}
  </button>
);

export default function Team() {
  const copy = sections.team;
  // faculty → core → leads → members around the ring
  const members = useMemo(() => ORDER.flatMap((t) => team.filter((m) => m.tier === t)), []);
  const n = members.length;
  const [pos, setPos] = useState(0); // cumulative, so the ring always turns the short way
  const [userTook, setUserTook] = useState(false);
  const [hover, setHover] = useState(false);
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const active = n ? ((pos % n) + n) % n : 0;

  const step = useCallback((d: 1 | -1) => {
    setUserTook(true);
    setPos((p) => p + d);
  }, []);
  const select = useCallback(
    (i: number) => {
      setUserTook(true);
      setPos((p) => {
        const cur = ((p % n) + n) % n;
        let d = (((i - cur) % n) + n) % n;
        if (d > n / 2) d -= n;
        return p + d;
      });
    },
    [n],
  );

  // gentle autoplay until the visitor takes over
  useEffect(() => {
    if (userTook || hover || !inView || reduced || n < 2) return;
    const t = window.setInterval(() => setPos((p) => p + 1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [userTook, hover, inView, reduced, n]);

  return (
    <Section id="team" className="overflow-hidden">
      <div aria-hidden className="halftone pointer-events-none absolute right-0 top-0 h-80 w-80 opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <div className="wrap relative">
        <SectionHeader id="team" index={4} label={copy.label} title={copy.title} kicker={<p>{copy.kicker}</p>} />

        {n === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <div
            ref={ref}
            className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8"
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onFocusCapture={() => setHover(true)}
            onBlurCapture={() => setHover(false)}
          >
            <div className="min-w-0 lg:col-span-7">
              <div className="flex items-center gap-3 xl:gap-6">
                <div className="hidden md:block">
                  <Arrow dir="prev" label={copy.prev} onClick={() => step(-1)} />
                </div>
                <div className="min-w-0 flex-1">
                  <MemberOrbit members={members} pos={pos} active={active} onSelect={select} onStep={step} reduced={reduced} />
                </div>
                <div className="hidden md:block">
                  <Arrow dir="next" label={copy.next} onClick={() => step(1)} />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
                <Arrow dir="prev" label={copy.prev} onClick={() => step(-1)} />
                <span className="mono text-xs text-mute">
                  {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
                <Arrow dir="next" label={copy.next} onClick={() => step(1)} />
              </div>
            </div>

            <div className="min-w-0 lg:col-span-5">
              <MemberCard member={members[active]} index={active} total={n} reduced={reduced} />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
