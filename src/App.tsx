import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import Lenis from "lenis";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Grain } from "./components/layout/Grain";
import { Terminal } from "./components/effects/Terminal";
import { BootIntro } from "./components/effects/BootIntro";
import { P8Layer } from "./components/effects/P8Layer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { setLenis } from "./lib/scroll";
import { site } from "./config/site";
import { prefersReducedMotion } from "./hooks/useReducedMotion";

function useSmoothScroll() {
  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!site.features.smoothScroll || touch || prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    setLenis(lenis);
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { 
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
}

export default function App() {
  useSmoothScroll();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="mono sr-only z-[100] bg-paper px-4 py-3 text-sm text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <BootIntro />
        {/* before <main> in the DOM so, on phones, page content paints over it */}
        <P8Layer />
        <Navbar />
        <main id="main" tabIndex={-1} className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {site.features.terminal && <Terminal />}
        <Grain />
      </MotionConfig>
    </LazyMotion>
  );
}
