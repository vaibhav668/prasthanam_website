import { forwardRef, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Placeholder P-8 built only from primitives (boxes/cylinders/spheres), so the
 * site works before a Blender GLB exists. ~3k triangles. All geometries and
 * materials are shared module-level singletons.
 *
 * Local space: origin = thread attachment point (top of abdomen). Eye faces +Z.
 */

const M = {
  shell: new THREE.MeshStandardMaterial({ color: "#2b2b31", metalness: 0.55, roughness: 0.38 }),
  plate: new THREE.MeshStandardMaterial({ color: "#d9d4ca", metalness: 0.35, roughness: 0.5 }),
  leg: new THREE.MeshStandardMaterial({ color: "#d9d4ca", metalness: 0.3, roughness: 0.55 }),
  red: new THREE.MeshStandardMaterial({ color: "#E10600", emissive: "#E10600", emissiveIntensity: 0.35, roughness: 0.35 }),
  lens: new THREE.MeshStandardMaterial({ color: "#ff1a0d", emissive: "#E10600", emissiveIntensity: 1.1, roughness: 0.15, metalness: 0.1 }),
  pupil: new THREE.MeshBasicMaterial({ color: "#050505" }),
  glint: new THREE.MeshBasicMaterial({ color: "#ffffff" }),
};

const G = {
  hex: new THREE.CylinderGeometry(0.62, 0.62, 0.36, 6),
  hexRim: new THREE.CylinderGeometry(0.66, 0.66, 0.06, 6),
  abdomen: new THREE.SphereGeometry(0.5, 20, 14),
  seg: new THREE.CylinderGeometry(0.04, 0.032, 1, 8),
  joint: new THREE.SphereGeometry(1, 12, 8),
  ring: new THREE.TorusGeometry(0.3, 0.045, 8, 28),
  eye: new THREE.SphereGeometry(0.25, 24, 16),
  pupil: new THREE.SphereGeometry(0.085, 12, 8),
  glint: new THREE.SphereGeometry(0.03, 8, 6),
  foot: new THREE.ConeGeometry(0.035, 0.12, 6),
  label: new THREE.PlaneGeometry(0.46, 0.2),
  stripe: new THREE.TorusGeometry(0.5, 0.025, 6, 40),
};

let labelMat: THREE.MeshBasicMaterial | null = null;
function getLabelMaterial() {
  if (labelMat) return labelMat;
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 112;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#EDE8DE";
  ctx.fillRect(0, 0, 256, 112);
  ctx.fillStyle = "#0B0B0C";
  ctx.font = "700 72px 'JetBrains Mono', ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("P-8", 128, 60);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  labelMat = new THREE.MeshBasicMaterial({ map: tex });
  return labelMat;
}

const UP = new THREE.Vector3(0, 1, 0);
function Segment({ a, b }: { a: THREE.Vector3; b: THREE.Vector3 }) {
  const { pos, quat, len } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    return {
      pos: new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize()),
      len,
    };
  }, [a, b]);
  return <mesh geometry={G.seg} material={M.leg} position={pos} quaternion={quat} scale={[1, len, 1]} />;
}

/** Body centre relative to the attachment point. */
const BODY = new THREE.Vector3(0, -0.95, 0.15);

function Leg({ side, i }: { side: 1 | -1; i: number }) {
  const ref = useRef<THREE.Group>(null);
  const pts = useMemo(() => {
    // Fan the legs out in the screen plane (P-8 is seen from the front):
    // front legs reach up, rear legs reach down.
    const elev = [0.95, 0.4, -0.15, -0.7][i];
    const depth = [0.35, 0.12, -0.12, -0.35][i];
    const hip = new THREE.Vector3(side * 0.5, 0.18 - i * 0.12, -0.05 + depth * 0.3);
    const upper = 0.72;
    const knee = hip
      .clone()
      .add(new THREE.Vector3(side * Math.cos(elev) * upper, Math.sin(elev) * upper + 0.22, depth));
    const foot = knee.clone().add(new THREE.Vector3(side * (0.55 - i * 0.06), -0.95 - i * 0.05, depth * 0.6));
    return { hip, knee, foot };
  }, [side, i]);

  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.rotation.z = side * Math.sin(t * 1.8 + i * 0.9) * 0.05;
  });

  return (
    <group ref={ref} position={pts.hip}>
      <group position={pts.hip.clone().negate()}>
        <Segment a={pts.hip} b={pts.knee} />
        <Segment a={pts.knee} b={pts.foot} />
        <mesh geometry={G.joint} material={M.red} position={pts.hip} scale={0.07} />
        <mesh geometry={G.joint} material={M.red} position={pts.knee} scale={0.085} />
        <mesh geometry={G.foot} material={M.leg} position={pts.foot} rotation={[Math.PI, 0, 0]} />
      </group>
    </group>
  );
}

export interface SpiderBotHandles {
  eye: THREE.Group | null;
}

/** The primitive P-8. `eyeRef` receives the lens group (rotated to track). */
export const SpiderBot = forwardRef<THREE.Group, { eyeRef: React.RefObject<THREE.Group> }>(function SpiderBot({ eyeRef }, ref) {
  const label = useMemo(getLabelMaterial, []);
  return (
    <group ref={ref}>
      {/* abdomen (back) hangs from the thread */}
      <group position={[0, -0.42, -0.25]}>
        <mesh geometry={G.abdomen} material={M.shell} scale={[1, 0.86, 1.15]} />
        <mesh geometry={G.label} material={label} position={[0, 0.36, 0.12]} rotation={[-1.05, 0, 0]} />
        <mesh geometry={G.joint} material={M.red} position={[0, 0.43, -0.12]} scale={0.05} />
        <mesh geometry={G.stripe} material={M.red} rotation={[Math.PI / 2 - 0.35, 0, 0]} position={[0, 0.06, 0]} scale={[1.02, 1.17, 1]} />
      </group>

      <group position={BODY}>
        {/* hex chassis, flat faces front/back */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={G.hex} material={M.shell} rotation={[0, Math.PI / 6, 0]} />
          {/* slightly larger paper hex behind → reads as a light outline around the dark face */}
          <mesh geometry={G.hexRim} material={M.plate} rotation={[0, Math.PI / 6, 0]} position={[0, -0.02, 0]} scale={[1, 4, 1]} />
        </group>

        {/* lens eye */}
        <group ref={eyeRef} position={[0, 0, 0.2]}>
          <mesh geometry={G.ring} material={M.plate} position={[0, 0, 0.02]} />
          <mesh geometry={G.eye} material={M.lens} scale={[1, 1, 0.62]} />
          <mesh geometry={G.pupil} material={M.pupil} position={[0, 0, 0.15]} scale={[1, 1, 0.5]} />
          <mesh geometry={G.glint} material={M.glint} position={[-0.07, 0.07, 0.17]} />
        </group>

        {([1, -1] as const).map((side) => [0, 1, 2, 3].map((i) => <Leg key={`${side}${i}`} side={side} i={i} />))}
      </group>
    </group>
  );
});
