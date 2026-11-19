import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { hero } from "../data/hero";
import { sections } from "../data/sections";
import { site } from "../config/site";
import { useDeviceTier } from "../hooks/useDeviceTier";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Button } from "../components/ui/Button";
import { WebShot } from "../components/effects/WebShot";
import { Annotation } from "../components/ui/Annotation";
import SceneFallback from "../components/three/SceneFallback";

const HeroScene = lazy(() => import("../components/three/HeroScene"));

/** If WebGL blows up at runtime, fall back to the SVG bot. */
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const fallbackBot = (
  <SceneFallback className="absolute right-[-10vw] top-[calc(var(--nav-h)+2svh)] w-[64vw] max-w-[440px] opacity-90 xs:right-[-6vw] sm:right-[2vw] sm:w-[44vw] md:top-[12svh] lg:right-[5vw] lg:top-[4svh] lg:w-[25vw] lg:max-w-[380px]" />
);

export default function Hero() {
  const host = useRef<HTMLElement>(null);
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const [load3d, setLoad3d] = useState(false);
  const use3d = site.features.threeHero && tier === "high";

  // Load the 3D chunk only after first paint + idle, so hero text is never blocked.
  useEffect(() => {
    if (!use3d) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => setLoad3d(true);
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 1800 });
    else setTimeout(go, 700);
  }, [use3d]);

  return (
    <section id="top" ref={host} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* static backdrop */}
      <div aria-hidden className="gridpaper pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      <div aria-hidden className="halftone pointer-events-none absolute -left-20 bottom-0 -z-10 h-[50%] w-[60%] [mask-image:radial-gradient(closest-side,black,transparent)]" />

      {/* P-8 */}
      {/* desktop: P-8 hangs in front of the title; mobile: behind it for legibility */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 lg:z-20">
        {tier &&
          (use3d ? (
            load3d && (
              <SceneBoundary fallback={fallbackBot}>
                <Suspense fallback={null}>
                  <HeroScene className="absolute inset-0" />
                </Suspense>
              </SceneBoundary>
            )
          ) : (
            fallbackBot
          ))}
      </div>

      <WebShot hostRef={host} enabled={site.features.webShooter && !reduced} />

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
