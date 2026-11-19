import { useState } from "react";
import { updates } from "../data/updates";
import { sections } from "../data/sections";
import type { UpdateTag } from "../types/content";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";

const TONE: Record<UpdateTag, string> = {
  recruitment: "bg-red-ui text-paper",
  result: "bg-cyan text-ink",
  announcement: "bg-paper text-ink",
  general: "bg-paper/10 text-paper/80",
};

const fmt = (d: string) => {
  const x = new Date(d);
  if (Number.isNaN(x.getTime())) return { day: "--", rest: d || "TBA" };
  return {
    day: String(x.getDate()).padStart(2, "0"),
    rest: x.toLocaleDateString("en-IN", { month: "short", year: "numeric" }).toUpperCase(),
  };
};

/** News feed styled as a transmission log. Pinned first, then newest. */
export default function Updates() {
  const copy = sections.updates;
  const [all, setAll] = useState(false);
  const sorted = [...updates].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || new Date(b.date).getTime() - new Date(a.date).getTime());
  const list = all ? sorted : sorted.slice(0, copy.initial);

  return (
    <Section id="updates">
      <div className="wrap">
        <SectionHeader id="updates" index={7} label={copy.label} title={copy.title} kicker={<p>{copy.kicker}</p>} />

        {updates.length === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <div className="md:ml-[25%]">
            <ol className="border-t border-line">
              {list.map((u, i) => {
                const d = fmt(u.date);
                return (
                  <li key={u.id} className={`relative grid grid-cols-[64px_1fr] gap-x-4 border-b border-line py-6 sm:grid-cols-[96px_1fr] sm:gap-x-8 ${u.pinned ? "bg-ink-2/60" : ""}`}>
                    {u.pinned && <span aria-hidden className="absolute bottom-0 left-0 top-0 w-[3px] bg-red" />}
                    <div className="pl-3">
                      <p className="font-display text-3xl font-extrabold leading-none tracking-[-0.04em] sm:text-4xl">{d.day}</p>
                      <p className="mono mt-1 text-[10px] uppercase tracking-[0.1em] text-mute">{d.rest}</p>
                    </div>
                    <div className="min-w-0 pr-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`mono px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${TONE[u.tag]}`}>{copy.tags[u.tag]}</span>
                        {u.pinned && <span className="mono text-[10px] uppercase tracking-[0.12em] text-red-text">● {copy.pinned}</span>}
                        <span aria-hidden className="mono ml-auto text-[10px] text-mute">TX-{String(sorted.length - i).padStart(3, "0")}</span>
                      </div>
                      <h3 className="h3 mt-3">{u.title}</h3>
                      <p className="mt-2 max-w-[62ch] leading-relaxed text-paper/75">{u.body}</p>
                      {u.link && (
                        <div className="mt-4">
                          <Button href={u.link.url} variant="ghost" icon="→">
                            {u.link.label}
                          </Button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            {sorted.length > copy.initial && (
              <button
                type="button"
                onClick={() => setAll((v) => !v)}
                aria-expanded={all}
                className="ss tap mono mt-6 border border-line px-4 text-[12px] uppercase tracking-[0.1em] text-paper hover:border-paper/60"
                data-text={all ? copy.showLess : `${copy.showAll} (${sorted.length})`}
              >
                {all ? copy.showLess : `${copy.showAll} (${sorted.length})`}
              </button>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
