import { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { achievements } from "../data/achievements";
import { sections } from "../data/sections";
import type { Achievement } from "../types/content";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { Counter } from "../components/ui/Counter";
import { Tag } from "../components/ui/Tag";
import { Modal } from "../components/ui/Modal";
import { AchievementCard } from "./achievements/AchievementCard";
import { medalOf } from "./achievements/medal";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Achievements() {
  const copy = sections.achievements;
  const reduced = useReducedMotion();
  const [year, setYear] = useState<number | null>(null);
  const [photo, setPhoto] = useState<Achievement | null>(null);

  const sorted = useMemo(() => [...achievements].sort((a, b) => b.year - a.year), []);
  const years = useMemo(() => Array.from(new Set(sorted.map((a) => a.year))), [sorted]);
  const stats = useMemo(() => {
    const medals = achievements.map(medalOf);
    return [
      { label: copy.stats.wins, value: medals.filter((x) => x === "gold").length },
      { label: copy.stats.podiums, value: medals.filter((x) => x !== "special").length },
      { label: copy.stats.awards, value: achievements.length },
      { label: copy.stats.years, value: years.length },
    ];
  }, [copy.stats, years.length]);

  const featured = sorted.filter((a) => a.featured && (!year || a.year === year));
  const rest = sorted.filter((a) => !a.featured && (!year || a.year === year));

  return (
    <Section id="achievements" className="overflow-hidden">
      <div aria-hidden className="halftone-red pointer-events-none absolute -left-24 top-40 h-[380px] w-[380px] opacity-20 [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <div className="wrap relative">
        <SectionHeader id="achievements" index={6} label={copy.label} title={copy.title} kicker={<p>{copy.kicker}</p>} />

        {achievements.length === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <>
            {/* stats strip */}
            <dl className="mb-12 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-b border-r border-line p-4 sm:p-5">
                  <dd className="font-display text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none tracking-[-0.04em]">
                    <Counter value={s.value} />
                  </dd>
                  <dt className="label mt-2 normal-case tracking-normal">{s.label}</dt>
                </div>
              ))}
            </dl>

            {years.length > 1 && (
              <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={copy.all}>
                <Tag active={!year} onClick={() => setYear(null)}>{copy.all}</Tag>
                {years.map((y) => (
                  <Tag key={y} active={year === y} onClick={() => setYear(year === y ? null : y)}>
                    {String(y)}
                  </Tag>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <m.div key={year ?? "all"} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                {featured.length > 0 && (
                  <ul className="mb-16 grid gap-16">
                    {featured.map((a) => (
                      <li key={a.id}>
                        <AchievementCard a={a} featured reduced={reduced} onOpenImage={setPhoto} />
                      </li>
                    ))}
                  </ul>
                )}
                {rest.length > 0 && (
                  <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((a) => (
                      <li key={a.id}>
                        <AchievementCard a={a} reduced={reduced} onOpenImage={setPhoto} />
                      </li>
                    ))}
                  </ul>
                )}
              </m.div>
            </AnimatePresence>
          </>
        )}
      </div>

      <Modal open={!!photo} onClose={() => setPhoto(null)} label={photo?.title ?? "Photo"} className="sm:w-[min(94vw,1100px)]">
        {photo?.image && (
          <figure>
            <div className="flex justify-center bg-ink pt-12">
              <img src={photo.image} alt={photo.title} className="max-h-[72svh] w-auto object-contain" />
            </div>
            <figcaption className="border-t border-line p-4">
              <p className="font-display font-extrabold uppercase">{photo.title}</p>
              <p className="mono mt-1 text-xs uppercase tracking-[0.08em] text-mute">
                {photo.event} · {photo.year}
              </p>
            </figcaption>
          </figure>
        )}
      </Modal>
    </Section>
  );
}
