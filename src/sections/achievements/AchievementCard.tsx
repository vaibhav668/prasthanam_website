import { useRef } from "react";
import type { Achievement } from "../../types/content";
import { sections } from "../../data/sections";
import { Medal3D } from "./Medal3D";
import { TrophyArt } from "./TrophyArt";
import { MEDAL_COLORS, medalOf } from "./medal";

const TrophyIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6l-1-3h-4z" />
  </svg>
);

interface Props {
  a: Achievement;
  featured?: boolean;
  reduced: boolean;
  onOpenImage: (a: Achievement) => void;
}

/**
 * 3D trophy card. On mouse move the card tilts; the photo, medal and text sit on
 * different translateZ layers so they parallax against each other, and a glare
 * sweeps across. Transform + opacity only.
 */
export function AchievementCard({ a, featured, reduced, onOpenImage }: Props) {
  const copy = sections.achievements;
  const card = useRef<HTMLElement>(null);
  const glare = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const accent = MEDAL_COLORS[medalOf(a)].accent;
  const max = featured ? 6 : 10;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduced || !card.current) return;
    const r = card.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (card.current) card.current.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max * 1.2).toFixed(2)}deg)`;
      if (glare.current) glare.current.style.transform = `translate3d(${(px * 60).toFixed(1)}%, ${(py * 40).toFixed(1)}%, 0)`;
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    if (card.current) card.current.style.transform = "";
    if (glare.current) glare.current.style.transform = "";
  };

  const media = (
    <div className={`relative overflow-hidden border-line ${featured ? "aspect-[16/10] border-b md:aspect-auto md:h-full md:border-b-0 md:border-r" : "aspect-[16/10] border-b"}`}>
      {a.image ? (
        <button type="button" onClick={() => onOpenImage(a)} className="group/img block h-full w-full" aria-label={`${copy.view}: ${a.title}`}>
          <img
            src={a.image}
            alt={a.title}
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-[1.04]"
          />
          <span aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-40" />
          <span aria-hidden className="mono absolute bottom-2 left-3 bg-ink/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-paper opacity-0 transition-opacity group-hover/img:opacity-100">
            {copy.view} ↗
          </span>
        </button>
      ) : (
        <TrophyArt a={a} />
      )}
      {featured && (
        <span className="mono absolute left-3 top-3 bg-red-ui px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
          ★ {copy.featured}
        </span>
      )}
    </div>
  );

  return (
    <div className="group h-full [perspective:1300px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <article
        ref={card}
        className={`relative h-full border border-line bg-ink-2 transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform ${
          featured ? "md:grid md:grid-cols-[1.15fr_1fr]" : "flex flex-col"
        }`}
      >
        <div style={{ transform: "translateZ(0)" }} className={`[transform-style:preserve-3d] ${featured ? "relative" : ""}`}>
          {media}
          {/* medal floats in front of the photo edge */}
          <div
            className={`pointer-events-none absolute ${featured ? "bottom-[-44px] right-6 md:bottom-6 md:right-[-44px]" : "bottom-[-38px] right-5"}`}
            style={{ transform: "translateZ(70px)" }}
          >
            <Medal3D a={a} size={featured ? 96 : 76} />
          </div>
        </div>

        <div className={`relative flex flex-1 flex-col ${featured ? "p-6 pt-14 sm:p-10 md:pl-16 md:pt-10" : "p-5 pt-12 sm:p-6 sm:pt-12"}`} style={{ transform: "translateZ(30px)" }}>
          {/* right padding keeps the row clear of the floating medal */}
          <div className={`flex items-center gap-3 ${featured ? "pr-24 md:pr-0" : "pr-20"}`}>
            {a.position && (
              <span className="mono inline-flex items-center gap-1.5 bg-paper px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">
                {a.position}
                <TrophyIcon className="h-3.5 w-3.5" />
              </span>
            )}
            <span className="mono text-sm font-semibold tracking-[0.1em] text-mute md:ml-auto">{a.year}</span>
          </div>
          {a.category && <p className="label mt-5">{a.category}</p>}
          <h3
            className={`mt-2 font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-paper ${
              featured ? "text-[clamp(1.4rem,3.2vw,2.6rem)]" : "text-[clamp(1.05rem,1.6vw,1.3rem)]"
            }`}
          >
            {a.title}
          </h3>
          <p className="mt-2 font-semibold text-paper/70">{a.event}</p>
          {a.description && <p className={`mt-4 leading-relaxed text-paper/70 ${featured ? "text-base sm:text-lg" : "text-sm"}`}>{a.description}</p>}

          {(a.highlight || a.link) && (
            <div className="mt-auto pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                {a.highlight && (
                  <span className="mono inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: accent }}>
                    <TrophyIcon className="h-4 w-4" />
                    {a.highlight}
                  </span>
                )}
                {a.link && (
                  <a
                    href={a.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ss tap mono inline-flex items-center text-[11px] uppercase tracking-[0.1em] text-paper/80 hover:text-cyan"
                    data-text={`${a.link.label} ↗`}
                  >
                    {a.link.label} ↗
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* glare */}
        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ transform: "translateZ(31px)" }}>
          <span ref={glare} className="foil absolute -inset-[40%] block opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
        </span>
      </article>
    </div>
  );
}
