import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { events } from "../data/events";
import { sections } from "../data/sections";
import type { Event } from "../types/content";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";
import { ReportModal } from "./events/ReportModal";

/** Events show the year only. */
function formatYear(d: string, tba: string) {
  const y = d.match(/\d{4}/)?.[0];
  return y ?? tba;
}

/** Newest year first; undated events go last. */
const sortKey = (e: Event) => Number(e.date.match(/\d{4}/)?.[0] ?? 0);

/** Small web knot used as a timeline node. */
function Knot({ upcoming }: { upcoming: boolean }) {
  return (
    <svg width="28" height="28" viewBox="-14 -14 28 28" aria-hidden="true" className="block">
      <g stroke={upcoming ? "var(--red)" : "var(--mute)"} strokeWidth="1.2" fill="none">
        {[0, 45, 90, 135].map((a) => (
          <line key={a} x1={-12 * Math.cos((a * Math.PI) / 180)} y1={-12 * Math.sin((a * Math.PI) / 180)} x2={12 * Math.cos((a * Math.PI) / 180)} y2={12 * Math.sin((a * Math.PI) / 180)} />
        ))}
        <circle r="6" />
      </g>
      <circle r="3.5" fill={upcoming ? "var(--red)" : "var(--paper)"} />
    </svg>
  );
}

export default function Events() {
  const copy = sections.events;
  const [reportFor, setReportFor] = useState<Event | null>(null);
  const list = [...events].sort((a, b) => sortKey(b) - sortKey(a));

  return (
    <Section id="events">
      <div className="wrap">
        <SectionHeader id="events" index={5} label={copy.label} title={copy.title} />

        <div>
          {list.length === 0 ? (
            <EmptyState message={copy.empty} />
          ) : (
            <div className="relative">
              {/* the thread */}
              <span aria-hidden className="absolute bottom-0 left-[13px] top-0 w-px bg-gradient-to-b from-paper/50 via-paper/25 to-transparent md:left-1/2" />
              <AnimatePresence mode="wait" initial={false}>
                <m.ol className="relative" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {list.map((ev, i) => {
                    const year = formatYear(ev.date, copy.tba);
                    const right = i % 2 === 1;
                    return (
                      <li key={ev.id} className="relative grid grid-cols-[28px_1fr] gap-5 pb-12 md:grid-cols-[1fr_28px_1fr] md:gap-8">
                        <div className={`hidden md:block ${right ? "" : "md:order-3"}`} />
                        <div className="relative z-10 pt-5 md:order-2">
                          <Knot upcoming={ev.status === "upcoming"} />
                        </div>
                        <article className={`overflow-hidden border border-line bg-ink-2 ${right ? "md:order-3" : "md:order-1"}`}>
                          {ev.image && (
                            <img
                              src={ev.image}
                              alt={ev.title}
                              loading="lazy"
                              decoding="async"
                              width={800}
                              height={450}
                              className="aspect-video w-full border-b border-line object-cover"
                            />
                          )}
                          <div className="p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-baseline gap-3">
                              <span className="font-display text-4xl font-extrabold leading-none tracking-[-0.04em]">{year}</span>
                            </div>
                            <Badge tone={ev.type === "competition" ? "red" : ev.type === "workshop" ? "paper" : "mute"}>{ev.type}</Badge>
                          </div>
                          <h3 className="h3 mt-4">{ev.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-paper/80">{ev.description}</p>
                          {ev.venue && <p className="mono mt-3 text-xs uppercase tracking-[0.08em] text-mute">@ {ev.venue}</p>}
                          {((ev.status === "upcoming" && ev.registerLink) || ev.report) && (
                            <div className="mt-5 flex flex-wrap items-center gap-3">
                              {ev.status === "upcoming" && ev.registerLink && (
                                <Button href={ev.registerLink} variant="primary" icon="→">
                                  {copy.register}
                                </Button>
                              )}
                              {ev.report && (
                                <button
                                  type="button"
                                  onClick={() => setReportFor(ev)}
                                  aria-haspopup="dialog"
                                  className="ss tap mono inline-flex items-center gap-2 border border-line px-3 text-[11px] uppercase tracking-[0.1em] text-paper/85 hover:border-cyan hover:text-cyan"
                                  data-text={`▤ ${copy.report}`}
                                >
                                  <span aria-hidden>▤</span> {copy.report}
                                </button>
                              )}
                            </div>
                          )}
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </m.ol>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <ReportModal event={reportFor} onClose={() => setReportFor(null)} />
    </Section>
  );
}
