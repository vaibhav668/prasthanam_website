import { hero } from "../data/hero";
import { sections } from "../data/sections";
import { site } from "../config/site";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Button } from "../components/ui/Button";
import { Annotation } from "../components/ui/Annotation";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* static backdrop */}
      <div aria-hidden className="gridpaper pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      <div aria-hidden className="halftone pointer-events-none absolute -left-20 bottom-0 -z-10 h-[50%] w-[60%] [mask-image:radial-gradient(closest-side,black,transparent)]" />

      <div className="wrap relative z-10 flex flex-1 flex-col pb-8 pt-[calc(var(--nav-h)+var(--safe-t)+20px)] sm:pb-10">
        <div className="flex items-start justify-between gap-4">
          <p className="label">
            <span className="text-paper">[ 01 / {sections.hero.label} ]</span>
            <span className="mt-1 block">{sections.hero.meta}</span>
          </p>
          <p className="label hidden text-right sm:block">{sections.hero.coords}</p>
        </div>

        <div className="my-auto pb-6 pt-[24svh] sm:pt-[22svh]">
          <h1 id="hero-title" className="display-xl relative" style={{ "--display-size": "min(calc((100vw - 2 * var(--gutter) - var(--safe-l) - var(--safe-r)) / 9.4), 9.2rem)" } as React.CSSProperties}>
            <span className="sr-only">{`${hero.titleTop}${hero.titleBottom}`}</span>
            <span aria-hidden="true" className="block whitespace-nowrap">
              {hero.titleTop}
              {hero.titleBottom}
              <span className="text-red">.</span>
            </span>
          </h1>

          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-[40ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-snug text-paper/85 md:col-span-6 lg:col-span-5">
              <span lang="sa" className="font-body font-bold text-paper">{hero.sanskrit}</span>{" "}
              <span className="text-mute">—</span> {hero.subline}
            </p>
            <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7">
              <Button href={hero.primaryCta.href} variant="primary" icon="→">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost" icon="↓">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-10">
          <p className="label flex items-center gap-2">
            <span aria-hidden className="inline-block h-6 w-px bg-paper/50" />
            {sections.hero.scroll}
          </p>
          {site.features.webShooter && !reduced && <p className="label text-right">[ {sections.hero.hint} ]</p>}
        </div>
      </div>

      <Annotation text={sections.hero.annotation} kind="arrow-right" rotate={3} className="absolute right-[max(41vw,calc(50vw-120px))] top-[17svh] z-10 hidden w-[170px] text-right lg:block" />
    </section>
  );
}
