/** Static film-grain overlay. One fixed layer, a tiled PNG, never animated. */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="grain-layer pointer-events-none fixed inset-0 z-[70] opacity-[0.5] mix-blend-overlay"
      style={{ backgroundImage: "url(/images/grain.png)", backgroundSize: "160px 160px" }}
    />
  );
}
