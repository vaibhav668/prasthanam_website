import { Suspense, lazy, useEffect, useState, type ComponentType, type LazyExoticComponent } from "react";
import Hero from "../sections/Hero";
import Marquee from "../sections/Marquee";
import { scrollToId } from "../lib/scroll";

// Below-the-fold sections: code-split, then mounted one per idle slot so the
// main thread is never blocked by one big render.
const loaders = [
  () => import("../sections/About"),
  () => import("../sections/Projects"),
  () => import("../sections/Team"),
  () => import("../sections/Events"),
  () => import("../sections/Achievements"),
  () => import("../sections/Reports"),
  () => import("../sections/Updates"),
  () => import("../sections/Alumni"),
  () => import("../sections/Gallery"),
  () => import("../sections/Sponsors"),
  () => import("../sections/FAQ"),
  () => import("../sections/Join"),
];
const SECTIONS: LazyExoticComponent<ComponentType>[] = loaders.map((l) => lazy(l));

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
const idle = (cb: () => void, timeout = 1200) => {
  const w = window as IdleWindow;
  return w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout }) : window.setTimeout(cb, 120);
};

/** Reserves space while sections mount (always below the fold → no visible shift). */
const Hold = () => <div aria-hidden style={{ minHeight: "100svh" }} />;

export default function Home() {
  // Deep link or user intent → mount everything at once.
  const [count, setCount] = useState(() => (location.hash.length > 1 ? SECTIONS.length : 0));

  useEffect(() => {
    if (count >= SECTIONS.length) return;
    const id = idle(() => setCount((c) => c + 1), count === 0 ? 2000 : 600);
    return () => {
      const w = window as IdleWindow & { cancelIdleCallback?: (id: number) => void };
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [count]);

  useEffect(() => {
    // Any navigation intent (scroll, nav click, keyboard) → mount the rest immediately.
    const all = () => setCount(SECTIONS.length);
    window.addEventListener("scroll", all, { passive: true, once: true });
    window.addEventListener("keydown", all, { once: true });
    window.addEventListener("hashchange", all, { once: true });
    window.addEventListener("prasthanam:need-sections", all, { once: true });
    if (location.hash.length > 1) scrollToId(decodeURIComponent(location.hash.slice(1)));
    return () => {
      window.removeEventListener("scroll", all);
      window.removeEventListener("keydown", all);
      window.removeEventListener("hashchange", all);
      window.removeEventListener("prasthanam:need-sections", all);
    };
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      {SECTIONS.slice(0, count).map((S, i) => (
        <Suspense key={i} fallback={<Hold />}>
          <S />
        </Suspense>
      ))}
      {count < SECTIONS.length && <Hold />}
    </>
  );
}
