import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SpiderBot, P8_LENS, P8_LENS_GLOW } from "./SpiderBot";
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
const lerp = THREE.MathUtils.lerp;
const tmp = new THREE.Vector3();

/** 0 while over the hero → 1 once you've scrolled past it (P-8 "docks" in the corner). */
export function dockProgress() {
  const s = window.scrollY / Math.max(1, window.innerHeight);
  return THREE.MathUtils.smoothstep(s, 0.85, 1.5);
}

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
  const x = useRef<number | null>(null);
  const k = useRef<number | null>(null);
  const lastScroll = useRef(window.scrollY);
  const kick = useRef(0);
  // personality: blinks, idle look-around, dizzy spin on a fast scroll fling
  const blinkAt = useRef(2 + Math.random() * 3);
  const blinkStart = useRef(-10);
  const baseRotY = useRef(0);
  const spinVel = useRef(0);
  const spinAngle = useRef(0);
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
    const dock = dockProgress();
    // over the hero: starts above the title, then descends in front of it as you scroll.
    // past the hero: shrinks and tucks into the top-right corner on a short thread.
    const base = viewport.height * (wide ? 0.17 : 0.2);
    const descent = base + scroll * viewport.height * 0.38;
    const dockScale = scale * (wide ? 0.34 : 0.5);
    const target = lerp(descent, viewport.height * (wide ? 0.12 : 0.1), dock);
    len.current = len.current ? damp(len.current, target, 4, dt) : target;

    const kTarget = lerp(scale, dockScale, dock);
    k.current = k.current === null ? kTarget : damp(k.current, kTarget, 5, dt);
    const xTarget = lerp(anchorX, viewport.width / 2 - 1.9 * dockScale - 0.35, dock);
    x.current = x.current === null ? xTarget : damp(x.current, xTarget, 4, dt);

    // scrolling gives it a little swing, like a real spider on a thread
    const vel = (window.scrollY - lastScroll.current) / Math.max(dt, 1e-3);
    lastScroll.current = window.scrollY;
    kick.current = damp(kick.current, THREE.MathUtils.clamp(vel * 0.00012, -0.22, 0.22), 6, dt);

    if (pivot.current) {
      pivot.current.position.x = x.current;
      const swing = Math.sin(t * 0.9) * 0.055 + Math.sin(t * 2.3) * 0.012;
      pivot.current.rotation.z = damp(pivot.current.rotation.z, swing - pointer.nx * 0.05 + kick.current, 3, dt);
    }
    if (thread.current) {
      thread.current.scale.set(1, len.current, 1);
      thread.current.position.y = -len.current / 2;
    }
    // idle (no mouse movement for a few seconds) → look around on its own
    const idle = performance.now() - pointer.t > 3500;
    const lookNx = idle ? Math.sin(t * 0.7) * 0.55 + Math.sin(t * 1.9) * 0.15 : pointer.nx;
    const lookNy = idle ? Math.sin(t * 0.53) * 0.35 : pointer.ny;

    // recoil + eye flash for ~0.45 s after each web shot
    const age = p8.shot ? (performance.now() - p8.shot.t) / 1000 : 9;
    const recoil = age < 0.45 ? Math.sin((Math.PI * age) / 0.45) * (1 - age / 0.45) : 0;
    P8_LENS.emissiveIntensity = P8_LENS_GLOW + Math.max(0, 1 - age / 0.3) * 3.2;

    // fast scroll fling → spins on its thread, then settles facing forward
    if (Math.abs(vel) > 2200) spinVel.current = THREE.MathUtils.clamp(spinVel.current + Math.sign(vel) * Math.abs(vel) * 0.004 * dt, -16, 16);
    spinVel.current *= Math.exp(-1.6 * dt);
    spinAngle.current += spinVel.current * dt;
    if (Math.abs(spinVel.current) < 0.6) {
      const rest = Math.round(spinAngle.current / (Math.PI * 2)) * Math.PI * 2;
      spinAngle.current = damp(spinAngle.current, rest, 3, dt);
    }

    if (bot.current) {
      bot.current.scale.setScalar(k.current * (1 - recoil * 0.08));
      bot.current.position.y = -len.current + recoil * 0.35 * k.current;
      bot.current.position.z = -recoil * 0.8 * k.current;
      baseRotY.current = damp(baseRotY.current, lookNx * 0.45, 3, dt);
      bot.current.rotation.y = baseRotY.current + spinAngle.current;
      bot.current.rotation.x = damp(bot.current.rotation.x, 0.28 - lookNy * 0.18, 3, dt) - recoil * 0.06;
    }
    if (eye.current) {
      eye.current.getWorldPosition(tmp);
      tmp.project(camera);
      eyeNdc.current.set(tmp.x, tmp.y);
      // look from eye toward the pointer in screen space
      const ex = lookNx - tmp.x;
      const ey = lookNy - tmp.y;
      eye.current.rotation.y = damp(eye.current.rotation.y, THREE.MathUtils.clamp(ex * 0.9, -0.6, 0.6), 8, dt);
      eye.current.rotation.x = damp(eye.current.rotation.x, THREE.MathUtils.clamp(-ey * 0.9, -0.5, 0.5), 8, dt);

      // blink every few seconds (sometimes a double blink)
      if (t > blinkAt.current) {
        blinkStart.current = t;
        blinkAt.current = t + (Math.random() < 0.25 ? 0.28 : 2.5 + Math.random() * 4);
      }
      const bp = (t - blinkStart.current) / 0.16;
      eye.current.scale.y = bp < 1 ? 1 - Math.sin(Math.PI * bp) * 0.9 : 1;
    }
  });

  return (
    <>
      <WebStrands origin={[viewport.width / 2, viewport.height / 2, -2]} radius={Math.min(viewport.width, viewport.height) * 0.55} />
      <group ref={pivot} position={[anchorX, topY, 0]}>
        <mesh ref={thread} geometry={threadGeometry} material={threadMaterial} />
        <group ref={bot}>
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
