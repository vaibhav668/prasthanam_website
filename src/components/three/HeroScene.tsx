import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SpiderBot } from "./SpiderBot";
import { WebStrands, threadGeometry, threadMaterial } from "./WebStrands";
import { p8 } from "../../lib/p8Store";
import { pointer, startPointer } from "../../hooks/usePointer";
import { site } from "../../config/site";

/**
 * THE ONE WebGL canvas on the site. Lazy-loaded after first paint.
 * - dpr capped at 1.5, 2 lights, no shadows, no postprocessing
 * - frameloop switches to "never" when the hero is off-screen or the tab is hidden
 */

const damp = THREE.MathUtils.damp;
const tmp = new THREE.Vector3();

/** Optional GLB (site.modelUrl). Loaded in its own chunk so drei is only fetched when used. */
const GltfBot = lazy(() => import("./GltfBot"));

function Rig({ hostRect }: { hostRect: React.MutableRefObject<DOMRect | null> }) {
  const { viewport, size, camera } = useThree();
  const pivot = useRef<THREE.Group>(null);
  const bot = useRef<THREE.Group>(null);
  const thread = useRef<THREE.Mesh>(null);
  const eye = useRef<THREE.Group>(null);
  const eyeNdc = useRef(new THREE.Vector2(0.5, 0));
  const len = useRef(0);
  const wide = size.width >= 900;
  const scale = wide ? 1 : 0.62;
  const anchorX = wide ? viewport.width * 0.27 : viewport.width * 0.24;
  const topY = viewport.height / 2 + 0.1;

  useEffect(() => {
    p8.getEye = () => {
      const r = hostRect.current;
      if (!r) return null;
      return {
        x: r.left + ((eyeNdc.current.x + 1) / 2) * r.width,
        y: r.top + ((1 - eyeNdc.current.y) / 2) * r.height,
      };
    };
    return () => {
      p8.getEye = null;
    };
  }, [hostRect]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    dt = Math.min(dt, 0.05);
    const scroll = Math.min(1, Math.max(0, window.scrollY / size.height));
    // starts above the title, then descends in front of it as you scroll
    const base = viewport.height * (wide ? 0.17 : 0.2);
    const target = base + scroll * viewport.height * 0.38;
    len.current = len.current ? damp(len.current, target, 4, dt) : target;

    if (pivot.current) {
      const swing = Math.sin(t * 0.9) * 0.055 + Math.sin(t * 2.3) * 0.012;
      pivot.current.rotation.z = damp(pivot.current.rotation.z, swing - pointer.nx * 0.05, 3, dt);
    }
    if (thread.current) {
      thread.current.scale.set(1, len.current, 1);
      thread.current.position.y = -len.current / 2;
    }
    if (bot.current) {
      bot.current.position.y = -len.current;
      bot.current.rotation.y = damp(bot.current.rotation.y, pointer.nx * 0.45, 3, dt);
      bot.current.rotation.x = damp(bot.current.rotation.x, 0.28 - pointer.ny * 0.18, 3, dt);
    }
    if (eye.current) {
      eye.current.getWorldPosition(tmp);
      tmp.project(camera);
      eyeNdc.current.set(tmp.x, tmp.y);
      // look from eye toward the pointer in screen space
      const ex = pointer.nx - tmp.x;
      const ey = pointer.ny - tmp.y;
      eye.current.rotation.y = damp(eye.current.rotation.y, THREE.MathUtils.clamp(ex * 0.9, -0.6, 0.6), 8, dt);
      eye.current.rotation.x = damp(eye.current.rotation.x, THREE.MathUtils.clamp(-ey * 0.9, -0.5, 0.5), 8, dt);
    }
  });

  return (
    <>
      <WebStrands origin={[viewport.width / 2, viewport.height / 2, -2]} radius={Math.min(viewport.width, viewport.height) * 0.55} />
      <group ref={pivot} position={[anchorX, topY, 0]}>
        <mesh ref={thread} geometry={threadGeometry} material={threadMaterial} />
        <group ref={bot} scale={scale}>
          {site.modelUrl ? (
            <Suspense fallback={null}>
              <GltfBot url={site.modelUrl} eyeRef={eye} />
            </Suspense>
          ) : (
            <SpiderBot eyeRef={eye} />
          )}
        </group>
      </group>
    </>
  );
}

export default function HeroScene({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const hostRect = useRef<DOMRect | null>(null);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    let raf = 0;
    const measure = () => {
      raf = 0;
      hostRect.current = el.getBoundingClientRect();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    startPointer();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  const active = visible && tabVisible;

  return (
    <div
      ref={host}
      className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 10], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
        style={{ pointerEvents: "none" }}
        onCreated={() => requestAnimationFrame(() => setReady(true))}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 5, 6]} intensity={2.2} color="#fff4e8" />
        <Rig hostRect={hostRect} />
      </Canvas>
    </div>
  );
}
