/** Tiny event bus for cross-tree UI toggles (terminal, x-ray). */
type Name = "terminal:open" | "terminal:toggle";
export function emit(name: Name) {
  window.dispatchEvent(new CustomEvent(name));
}
export function on(name: Name, cb: () => void) {
  window.addEventListener(name, cb);
  return () => window.removeEventListener(name, cb);
}
