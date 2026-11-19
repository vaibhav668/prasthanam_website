import { achievements } from "../data/achievements";
import { sections } from "../data/sections";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { EmptyState } from "../components/ui/EmptyState";

export default function Achievements() {
  const copy = sections.achievements;
  const list = [...achievements].sort((a, b) => b.year - a.year);
  return (
    <Section id="achievements" className="pb-8 sm:pb-12">
      <div className="wrap">
        <SectionHeader id="achievements" index={6} label={copy.label} title={copy.title} />
        {list.length === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <ol className="border-t border-line">
            {list.map((a, i) => (
              <li key={a.id} className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 border-b border-line py-5 sm:grid-cols-[80px_120px_1fr_auto] sm:gap-x-8">
                <span className="mono text-xs text-mute">#{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">{a.year}</span>
                <div className="col-span-2 sm:col-span-1">
                  <p className="h3">{a.title}</p>
                  <p className="mono mt-1 text-xs uppercase tracking-[0.08em] text-mute">{a.event}</p>
                </div>
                {a.position && (
                  <span className="mono col-span-2 justify-self-start border border-red px-2 py-1 text-[11px] uppercase tracking-[0.1em] text-[var(--red-text)] sm:col-span-1 sm:justify-self-end">
                    {a.position}
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </Section>
  );
}
