import { alumni } from "../data/alumni";
import { sections } from "../data/sections";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { Avatar } from "./team/Avatar";

/** Alumni grouped by batch (newest first), each batch hanging off its own thread. */
export default function Alumni() {
  const copy = sections.alumni;
  const batches = Array.from(new Set(alumni.map((a) => a.batch))).sort((a, b) => b.localeCompare(a));

  return (
    <Section id="alumni" className="border-t border-line">
      <div aria-hidden className="halftone pointer-events-none absolute left-0 top-0 h-72 w-72 opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <div className="wrap relative">
        <SectionHeader id="alumni" index={7} label={copy.label} title={copy.title} kicker={<p>{copy.kicker}</p>} />

        {alumni.length === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <div className="space-y-14">
            {batches.map((batch) => {
              const group = alumni.filter((a) => a.batch === batch);
              return (
                <div key={batch} className="grid gap-6 md:grid-cols-12">
                  <h3 className="md:col-span-3">
                    <span className="label block">{copy.batch}</span>
                    <span className="mt-1 block font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{batch}</span>
                  </h3>
                  <ul className="relative grid gap-4 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
                    {group.map((a) => (
                      <li key={a.id} className="relative flex items-center gap-4 border border-line bg-ink-2 p-4">
                        <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-paper/20 ring-offset-2 ring-offset-ink-2" aria-hidden="true">
                          <Avatar member={a} size={64} />
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-[15px] font-medium leading-tight text-paper">{a.name}</p>
                          {a.clubRole && <p className="mono mt-1 text-[11px] uppercase tracking-[0.08em] text-red-text">{a.clubRole}</p>}
                          <p className="mono mt-1 text-[11px] uppercase tracking-[0.08em] text-mute">{a.branch}</p>
                          {a.now && (
                            <p className="mt-2 text-sm text-paper/80">
                              <span className="label mr-1.5 normal-case tracking-normal">{copy.now} →</span>
                              {a.now}
                            </p>
                          )}
                        </div>
                        {a.linkedin && (
                          <a
                            href={a.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tap mono absolute right-1 top-1 flex items-center justify-center text-xs text-mute hover:text-cyan"
                            aria-label={`${a.name} on LinkedIn`}
                          >
                            in ↗
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}
