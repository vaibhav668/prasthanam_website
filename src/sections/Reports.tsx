import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { reports } from "../data/reports";
import { sections } from "../data/sections";
import type { ReportType } from "../types/content";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Tag } from "../components/ui/Tag";
import { EmptyState } from "../components/ui/EmptyState";

const TYPES: ReportType[] = ["event", "workshop", "technical", "annual"];
const sortKey = (d: string) => (d === "TBA" ? Number.MAX_SAFE_INTEGER : new Date(d).getTime() || 0);
const fmt = (d: string, tba: string) => {
  if (!d || d === "TBA") return tba;
  const x = new Date(d);
  return Number.isNaN(x.getTime()) ? d : x.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
};

/** Reports as case files: folder tab, serial, summary, PDF link. */
export default function Reports() {
  const copy = sections.reports;
  const [type, setType] = useState<ReportType | null>(null);
  const present = TYPES.filter((t) => reports.some((r) => r.type === t));
  const list = reports.filter((r) => !type || r.type === type).sort((a, b) => sortKey(b.date) - sortKey(a.date));

  return (
    <Section id="reports" className="border-t border-line">
      <div className="wrap">
        <SectionHeader id="reports" index={7} label={copy.label} title={copy.title} kicker={<p>{copy.kicker}</p>} />

        {reports.length === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <>
            {present.length > 1 && (
              <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={copy.label}>
                <Tag active={!type} onClick={() => setType(null)}>{copy.all}</Tag>
                {present.map((t) => (
                  <Tag key={t} active={type === t} onClick={() => setType(type === t ? null : t)}>
                    {copy.types[t]}
                  </Tag>
                ))}
              </div>
            )}
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {list.map((r) => {
                  const serial = `RPT-${String(reports.indexOf(r) + 1).padStart(3, "0")}`;
                  const external = r.file && /^https?:/.test(r.file);
                  return (
                    <m.li
                      key={r.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.22 }}
                      className="relative pt-5"
                    >
                      {/* folder tab */}
                      <span aria-hidden className="mono absolute left-0 top-0 h-6 border border-b-0 border-line bg-ink-2 px-3 pt-1 text-[10px] uppercase tracking-[0.14em] text-mute">
                        {copy.types[r.type]}
                      </span>
                      <article className="group relative flex h-full flex-col border border-line bg-ink-2 p-5">
                        <div className="mono flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-mute">
                          <span>{serial}</span>
                          <span>{fmt(r.date, copy.tba)}</span>
                        </div>
                        {/* paper stack */}
                        <div aria-hidden className="relative my-5 h-24">
                          <span className="absolute inset-x-6 top-2 bottom-0 rotate-[-3deg] border border-line bg-ink" />
                          <span className="halftone absolute inset-x-3 top-1 bottom-1 rotate-[2deg] border border-line bg-ink" />
                          <span className="absolute inset-x-0 inset-y-0 flex flex-col justify-center gap-1.5 border border-paper/25 bg-ink px-4">
                            <span className="h-1.5 w-1/2 bg-paper/70" />
                            <span className="h-1 w-5/6 bg-paper/20" />
                            <span className="h-1 w-4/6 bg-paper/20" />
                            <span className="h-1 w-3/4 bg-paper/20" />
                            <span className="mono absolute right-3 top-2 rotate-[-8deg] border border-red px-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-red-text">
                              filed
                            </span>
                          </span>
                        </div>
                        <h3 className="h3">{r.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-paper/75">{r.summary}</p>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                          <span className="mono text-[11px] text-mute">
                            {r.pages ? `${r.pages} ${copy.pages}` : ""}
                            {r.author ? `${r.pages ? " · " : ""}${r.author}` : ""}
                          </span>
                          {r.file ? (
                            <a
                              href={r.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              {...(!external ? { type: "application/pdf" } : {})}
                              className="ss tap mono inline-flex items-center border border-paper/40 px-3 text-[11px] uppercase tracking-[0.1em] text-paper hover:border-cyan hover:text-cyan"
                              data-text={`${copy.open} ↗`}
                            >
                              {copy.open} ↗
                            </a>
                          ) : (
                            <span className="mono text-[11px] uppercase tracking-[0.1em] text-mute">{copy.soon}</span>
                          )}
                        </div>
                      </article>
                    </m.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </>
        )}
      </div>
    </Section>
  );
}
