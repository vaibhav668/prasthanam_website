import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type * as THREE from "three";

/**
 * Loads a Draco-compressed GLB (e.g. /models/p8.glb).
 * Conventions for the Blender export:
 *  - origin at the thread attachment point (top of the abdomen), Y up, eye facing +Z
 *  - roughly 2.5 units wide including legs
 *  - the lens object named "Eye" (it will be rotated to track the cursor)
 */
export default function GltfBot({ url, eyeRef }: { url: string; eyeRef: React.MutableRefObject<THREE.Group | null> }) {
  const { scene } = useGLTF(url, true); // true → Draco decoder from the drei CDN default
  const clone = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => {
    eyeRef.current = (clone.getObjectByName("Eye") as THREE.Group) ?? null;
  }, [clone, eyeRef]);
  return <primitive object={clone} />;
}
