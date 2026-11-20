import { Component, Suspense, lazy, useEffect, useState, type ReactNode } from "react";
import { site } from "../../config/site";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { WebShot } from "./WebShot";
import SceneFallback from "../three/SceneFallback";

const HeroScene = lazy(() => import("../three/HeroScene"));

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

/**
 * P-8 lives here, fixed to the viewport, so it stays with you for the whole page:
 * it hangs over the hero, then tucks into the top-right corner as you scroll on.
 * Click / tap any empty spot anywhere and it fires a web there.
 *
 * Layering: in front of the content on desktop (it never takes clicks). On small screens it
 * sits just behind <main> (which is positioned and comes later in the DOM) so it never covers text.
 */
export function P8Layer() {
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const [load3d, setLoad3d] = useState(false);
  const use3d = site.features.threeHero && tier === "high";

  // Load the 3D chunk only after first paint + idle, so page text is never blocked.
  useEffect(() => {
    if (!use3d) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => setLoad3d(true);
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 1800 });
    else setTimeout(go, 700);
  }, [use3d]);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 lg:z-[55]">
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
      <WebShot enabled={site.features.webShooter && !reduced} />
    </>
  );
}
