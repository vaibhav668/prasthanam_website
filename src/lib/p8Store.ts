/**
 * Shared, mutable (non-React) state for P-8. Whichever renderer is active
 * (3D or SVG) registers `getEye`, which returns the eye position in viewport px.
 * The WebShot overlay reads it as the origin of every web strand.
 */
export const p8: {
  getEye: (() => { x: number; y: number } | null) | null;
} = {
  getEye: null,
};
