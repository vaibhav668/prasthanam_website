import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import type { Member } from "../../types/content";
import { sections } from "../../data/sections";
import { site } from "../../config/site";
import { Avatar } from "./Avatar";

const SOCIAL: Record<string, string> = { linkedin: "LinkedIn", github: "GitHub", instagram: "Instagram" };

/** Holographic agent ID for the selected member. Tilts + foil sheen on mouse hover. */
export function MemberCard({ member, index, total, reduced }: { member: Member; index: number; total: number; reduced: boolean }) {
  const copy = sections.team;
  const card = useRef<HTMLDivElement>(null);
  const foil = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const serial = `AGT-${String(index + 1).padStart(3, "0")}`;
  const socials = Object.entries(member.socials ?? {}).filter(([, u]) => u);

  // glitch-tear the card whenever the member changes (not on first paint)
  const [tearKey, setTearKey] = useState(0);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!reduced) setTearKey((k) => k + 1);
  }, [member.id, reduced]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduced || !card.current) return;
    const r = card.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (card.current) card.current.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
      if (foil.current) foil.current.style.transform = `translate3d(${(px * 50).toFixed(1)}%, ${(py * 24).toFixed(1)}%, 0)`;
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    if (card.current) card.current.style.transform = "";
    if (foil.current) foil.current.style.transform = "";
  };

  return (
    <div className="[perspective:1000px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={card} className="glitch-host relative overflow-hidden border border-line bg-ink-2 transition-transform duration-200 ease-out will-change-transform" aria-live="polite">
        <div className="mono flex items-center justify-between border-b border-line px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-mute">
          <span>{site.shortName} // agent id</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={member.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: reduced ? 0 : 0.28 }}
            className="relative p-5 sm:p-7"
          >
            <div className="flex items-start gap-4 sm:gap-6">
              <span className="relative block h-20 w-20 shrink-0 overflow-hidden bg-ink xs:h-24 xs:w-24 sm:h-32 sm:w-32">
                <Avatar member={member} size={128} />
                <span aria-hidden className="absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-cyan" />
                <span aria-hidden className="absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-cyan" />
              </span>
              <div className="min-w-0 pt-1">
                <p className="label">{copy.tiers[member.tier]}</p>
                <h3 className="mt-2 font-display text-[clamp(1.05rem,4.6vw,2.1rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-paper [overflow-wrap:anywhere] lg:text-[clamp(1.2rem,2vw,2.1rem)]">
                  {member.name}
                </h3>
                <p className="mono mt-2 text-xs uppercase tracking-[0.08em] text-red-text">{member.role}</p>
                <p className="mt-1 text-sm text-paper/70">
                  {member.branch} · {member.year}
                </p>
              </div>
            </div>

            {member.tier === "core" && (
              <span aria-hidden className="pointer-events-none absolute -right-14 top-9 rotate-45 bg-red-ui px-14 py-1">
                <span className="mono whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.35em] text-paper">Clearance</span>
              </span>
            )}

            <div className="mt-6 border-t border-line pt-5">
              {member.skills.length > 0 && (
                <>
                  <p className="label">{copy.skills}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {member.skills.map((s) => (
                      <li key={s} className="mono border border-line px-2 py-0.5 text-[11px] text-paper/85">
                        {s}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {socials.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={copy.socials}>
                  {socials.map(([k, u]) => (
                    <li key={k}>
                      <a
                        href={u}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ss tap mono inline-flex items-center gap-2 border border-line px-4 text-[12px] uppercase tracking-[0.1em] text-paper hover:border-cyan hover:text-cyan"
                        data-text={`${SOCIAL[k] ?? k} ↗`}
                      >
                        {SOCIAL[k] ?? k} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div aria-hidden className="mt-6 flex items-end justify-between gap-4">
              <span className="flex h-5 items-stretch gap-[2px] opacity-40">
                {(serial + member.id)
                  .split("")
                  .slice(0, 26)
                  .map((c, i) => (
                    <span key={i} className="block bg-paper" style={{ width: (c.charCodeAt(0) % 3) + 1 }} />
                  ))}
              </span>
              <span className="mono text-[10px] text-mute">{serial}</span>
            </div>
          </m.div>
        </AnimatePresence>

        {tearKey > 0 && (
          <span key={tearKey} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="card-tear absolute inset-x-0 top-[22%] h-[6%] bg-red/70 mix-blend-screen" />
            <span className="card-tear absolute inset-x-0 top-[48%] h-[2%] bg-cyan/70 mix-blend-screen" style={{ animationDelay: "50ms" }} />
            <span className="card-tear absolute inset-x-0 top-[70%] h-[8%] bg-paper/30" style={{ animationDelay: "90ms" }} />
          </span>
        )}
        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <span ref={foil} className="foil absolute -inset-[30%] block opacity-40 transition-transform duration-200" />
        </span>
      </div>
    </div>
  );
}
