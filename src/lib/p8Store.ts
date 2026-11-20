/**
 * Shared, mutable (non-React) state for P-8. Whichever renderer is active
 * (3D or SVG) registers `getEye`, which returns the eye position in viewport px.
 * The WebShot overlay reads it as the origin of every web strand, and calls
 * `notifyShot` so the renderer can recoil / flash its eye.
 */
type Shot = { t: number; x: number; y: number };
const shotListeners = new Set<(s: Shot) => void>();

export const p8: {
  getEye: (() => { x: number; y: number } | null) | null;
  /** Last web shot (performance.now() timestamp + target in viewport px). */
  shot: Shot | null;
} = {
  getEye: null,
  shot: null,
};

export function notifyShot(x: number, y: number) {
  p8.shot = { t: performance.now(), x, y };
  shotListeners.forEach((l) => l(p8.shot!));
}

export function onShot(l: (s: Shot) => void): () => void {
  shotListeners.add(l);
  return () => shotListeners.delete(l);
}
