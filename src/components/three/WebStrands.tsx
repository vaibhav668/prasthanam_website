import { useMemo } from "react";
import * as THREE from "three";

/**
 * Faint background web anchored in the top-right corner of the hero, plus the
 * material for P-8's main thread. Static geometry, one draw call.
 */
export const threadMaterial = new THREE.MeshBasicMaterial({ color: "#EDE8DE", transparent: true, opacity: 0.75 });
export const threadGeometry = new THREE.CylinderGeometry(0.008, 0.008, 1, 4, 1, true);

export function WebStrands({ origin, radius = 3.2 }: { origin: [number, number, number]; radius?: number }) {
  const geom = useMemo(() => {
    const pts: number[] = [];
    const spokes = 7;
    const angles = Array.from({ length: spokes }, (_, i) => Math.PI + (i / (spokes - 1)) * (Math.PI / 2)); // fan down-left
    angles.forEach((a) => pts.push(0, 0, 0, Math.cos(a) * radius, Math.sin(a) * radius, 0));
    for (let ring = 1; ring <= 5; ring++) {
      const r = (ring / 5) * radius * 0.92;
      for (let i = 0; i < spokes - 1; i++) {
        const a1 = angles[i];
        const a2 = angles[i + 1];
        const sag = 0.9; // slight inward sag
        pts.push(Math.cos(a1) * r, Math.sin(a1) * r, 0, Math.cos(a2) * r * sag, Math.sin(a2) * r * sag, 0);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [radius]);

  return (
    <lineSegments geometry={geom} position={origin}>
      <lineBasicMaterial color="#EDE8DE" transparent opacity={0.12} />
    </lineSegments>
  );
}
