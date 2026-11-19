import { useEffect } from "react";

/**
 * Global pointer store. One passive listener, rAF-throttled, no React re-renders.
 * Values are normalised to -1..1 (x right, y up) plus raw client px.
 * On touch devices only taps update it ("last tap").
 */
type PointerState = { nx: number; ny: number; x: number; y: number; t: number };

export const pointer: PointerState = { nx: 0, ny: 0, x: 0, y: 0, t: 0 };
type Listener = (p: PointerState) => void;
const listeners = new Set<Listener>();
let started = false;
let raf = 0;
let pending: { x: number; y: number } | null = null;

function flush() {
  raf = 0;
  if (!pending) return;
  pointer.x = pending.x;
  pointer.y = pending.y;
  pointer.nx = (pending.x / window.innerWidth) * 2 - 1;
  pointer.ny = -((pending.y / window.innerHeight) * 2 - 1);
  pointer.t = performance.now();
  pending = null;
  listeners.forEach((l) => l(pointer));
}

function onMove(e: PointerEvent) {
  if (e.pointerType === "touch" && e.type === "pointermove") return;
  pending = { x: e.clientX, y: e.clientY };
  if (!raf) raf = requestAnimationFrame(flush);
}

export function startPointer() {
  if (started || typeof window === "undefined") return;
  started = true;
  pointer.x = window.innerWidth / 2;
  pointer.y = window.innerHeight / 2;
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onMove, { passive: true });
}

export function subscribePointer(l: Listener): () => void {
  startPointer();
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Subscribe to pointer updates inside a component (callback must be stable-ish). */
export function usePointer(cb: Listener) {
  useEffect(() => subscribePointer(cb), [cb]);
}
