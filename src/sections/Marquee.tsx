import { hero } from "../data/hero";

/** BUILD · BREAK · DEBUG · REPEAT — a single CSS transform loop. */
export default function Marquee() {
  const text = hero.marquee.join(" · ");
  const row = Array.from({ length: 4 }, () => text);
  return (
    <div className="relative overflow-hidden border-y border-line bg-red py-3 text-ink" role="marquee" aria-label={text}>
      <div className="marquee-track flex w-max whitespace-nowrap" aria-hidden="true">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="font-display px-6 text-[clamp(1.25rem,2.6vw,2rem)] font-extrabold uppercase tracking-[-0.02em]">
            {t} <span className="text-paper">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
