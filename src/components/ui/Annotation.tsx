/**
 * Hand-drawn style annotations: a wobbly circle, an arrow, and a red note.
 * Purely decorative (aria-hidden). Position it with className.
 */
type Kind = "arrow-left" | "arrow-right" | "arrow-down" | "circle";

export function Annotation({ text, kind = "arrow-left", className = "", rotate = -4 }: { text?: string; kind?: Kind; className?: string; rotate?: number }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none text-red ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {kind === "circle" && (
        <svg viewBox="0 0 220 120" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
          <path
            d="M24 64C18 30 74 10 120 12c52 2 92 22 88 52-4 34-60 50-108 46C46 106 10 92 14 62 17 40 46 22 80 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      {(kind === "arrow-left" || kind === "arrow-right") && (
        <svg width="96" height="46" style={kind === "arrow-right" ? { transform: "scaleX(-1)", marginLeft: "auto" } : undefined} viewBox="0 0 96 46" fill="none" className="mb-1">
          <path d="M92 38C70 40 40 34 12 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M8 22 11 8l14 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {kind === "arrow-down" && (
        <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
          <path d="M8 4c18 10 22 34 16 58" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M14 54l10 10 8-13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {text && <p className="mono text-[12px] italic leading-tight tracking-tight text-[var(--red-text)]">{text}</p>}
    </div>
  );
}
