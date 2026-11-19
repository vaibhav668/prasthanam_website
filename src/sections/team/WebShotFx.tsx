/**
 * One web-shot inside the 3D orbit layer (needs a preserve-3d parent).
 *
 * Timeline (1.3 s, synced to the ring's 900 ms turn):
 *   0–230 ms   strand fires from the centre hub up to the top slot
 *   230–900    the strand stays taut while the ring reels the member in
 *   ~900       member arrives → web splat + shockwave ring
 *   900–1300   everything fades
 * Transform + opacity only. Elements sit at different translateZ depths, so the
 * shot reads in 3D when the orbit tilts.
 */
export function WebShotFx({ w, hub, R, node }: { w: number; hub: number; R: number; node: number }) {
  const c = w / 2;
  const topY = c - R; // centre of the top slot
  const len = R - hub / 2 + 6; // hub edge → node centre
  const splat = Math.round(node * 1.9);

  const spokes = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2);
  const ring = (r: number) =>
    spokes
      .map((a, i) => {
        const rr = r * (i % 2 ? 0.84 : 1);
        return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`;
      })
      .join(" ");

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]">
      {/* strand (double silk line), anchored at the hub, grows upward */}
      <div className="absolute" style={{ left: c - 3, top: topY, width: 6, height: len, transform: "translateZ(22px)" }}>
        <div className="tw-strand flex h-full w-full origin-bottom justify-center gap-[2px]">
          <span className="block h-full w-[2px] bg-paper shadow-[0_0_6px_rgba(237,232,222,.7)]" />
          <span className="block h-[96%] w-px self-end bg-paper/55" />
        </div>
      </div>

      {/* tiny silk droplets travelling up the strand */}
      <div className="absolute" style={{ left: c - 2, top: topY, width: 4, height: len, transform: "translateZ(26px)" }}>
        <span className="tw-bead absolute bottom-0 left-0 block h-1 w-1 rounded-full bg-cyan" style={{ ["--len" as string]: `${-len}px` }} />
      </div>

      {/* shockwave ring around the arriving node */}
      <div className="absolute" style={{ left: c - node / 2, top: topY - node / 2, width: node, height: node, transform: "translateZ(14px)" }}>
        <span className="tw-shock block h-full w-full rounded-full border-2 border-cyan" />
      </div>

      {/* web splat */}
      <div className="absolute" style={{ left: c - splat / 2, top: topY - splat / 2, width: splat, height: splat, transform: "translateZ(34px)" }}>
        <svg viewBox="-50 -50 100 100" className="tw-splat h-full w-full overflow-visible">
          <g fill="none" stroke="#EDE8DE" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 1.5px #0B0B0C)" }}>
            {spokes.map((a, i) => (
              <line key={i} x1={Math.cos(a) * 14} y1={Math.sin(a) * 14} x2={Math.cos(a) * (i % 2 ? 40 : 48)} y2={Math.sin(a) * (i % 2 ? 40 : 48)} strokeWidth="1.4" />
            ))}
            <polygon points={ring(22)} strokeWidth="1.3" />
            <polygon points={ring(32)} strokeWidth="1" opacity=".8" />
            <polygon points={ring(42)} strokeWidth=".8" opacity=".55" />
          </g>
        </svg>
      </div>
    </div>
  );
}
