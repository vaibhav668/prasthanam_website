import { useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { events } from "../data/events";
import { sections } from "../data/sections";
import type { Event } from "../types/content";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";

type Tab = "upcoming" | "past";
const TABS: Tab[] = ["upcoming", "past"];

function formatDate(d: string, tba: string) {
  if (!d || d.toUpperCase() === "TBA") return { day: "??", rest: tba };
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return { day: "??", rest: d };
  return {
    day: String(date.getDate()).padStart(2, "0"),
    rest: date.toLocaleDateString("en-IN", { month: "short", year: "numeric" }).toUpperCase(),
  };
}

const sortKey = (e: Event) => (e.date === "TBA" ? Number.MAX_SAFE_INTEGER : new Date(e.date).getTime() || 0);

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
  const [tab, setTab] = useState<Tab>(events.some((e) => e.status === "upcoming") ? "upcoming" : "past");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = events
    .filter((e) => e.status === tab)
    .sort((a, b) => (tab === "upcoming" ? sortKey(a) - sortKey(b) : sortKey(b) - sortKey(a)));

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setTab(TABS[n]);
    tabRefs.current[n]?.focus();
  };

  return (
    <Section id="events">
      <div className="wrap">
        <SectionHeader id="events" index={5} label={copy.label} title={copy.title} />

        <div role="tablist" aria-label={copy.label} className="mb-12 flex border-b border-line">
          {TABS.map((t, i) => {
            const count = events.filter((e) => e.status === t).length;
            const active = tab === t;
            return (
              <button
                key={t}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`tab-${t}`}
                aria-selected={active}
                aria-controls="events-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setTab(t)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`ss tap mono relative -mb-px flex items-center gap-2 border-b-2 px-4 text-[13px] uppercase tracking-[0.12em] ${
                  active ? "border-red text-paper" : "border-transparent text-mute hover:text-paper"
                }`}
                data-text={`${copy.tabs[t]} ${String(count).padStart(2, "0")}`}
              >
                {copy.tabs[t]} <span className="text-[11px] text-mute">{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <div id="events-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
          {list.length === 0 ? (
            <EmptyState message={copy.empty[tab]} />
          ) : (
            <div className="relative">
              {/* the thread */}
              <span aria-hidden className="absolute bottom-0 left-[13px] top-0 w-px bg-gradient-to-b from-paper/50 via-paper/25 to-transparent md:left-1/2" />
              <AnimatePresence mode="wait" initial={false}>
                <m.ol key={tab} className="relative" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {list.map((ev, i) => {
                    const d = formatDate(ev.date, copy.tba);
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
                              <span className="font-display text-4xl font-extrabold leading-none tracking-[-0.04em]">{d.day}</span>
                              <span className="mono text-xs uppercase text-mute">{d.rest}</span>
                            </div>
                            <Badge tone={ev.type === "competition" ? "red" : ev.type === "workshop" ? "paper" : "mute"}>{ev.type}</Badge>
                          </div>
                          <h3 className="h3 mt-4">{ev.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-paper/80">{ev.description}</p>
                          {ev.venue && <p className="mono mt-3 text-xs uppercase tracking-[0.08em] text-mute">@ {ev.venue}</p>}
                          {ev.status === "upcoming" && ev.registerLink && (
                            <div className="mt-5">
                              <Button href={ev.registerLink} variant="primary" icon="→">
                                {copy.register}
                              </Button>
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
    </Section>
  );
}
