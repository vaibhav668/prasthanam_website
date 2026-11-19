import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Force the tear to play (e.g. when a modal opens). Hover/focus always plays it. */
  active?: boolean;
  className?: string;
}

/**
 * Wraps content with three horizontal "tear" strips that slide + flash on hover
 * or when `active` flips on. Transform + opacity only.
 */
export function GlitchTransition({ children, active, className = "" }: Props) {
  return (
    <div className={`glitch-host relative ${className}`} data-glitch={active ? "on" : "off"}>
      <div className="tear-shift h-full">{children}</div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="tear top-[18%] h-[7%] bg-red/70" />
        <span className="tear top-[46%] h-[3%] bg-cyan/70" />
        <span className="tear top-[71%] h-[9%] bg-paper/40" />
      </div>
    </div>
  );
}

/** Full-screen tear flash, used for project modal opens. */
export function GlitchFlash({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div aria-hidden="true" className="flash-screen pointer-events-none fixed inset-0 z-[85]">
      <div className="absolute inset-x-0 top-[12%] h-[8%] bg-red/60 mix-blend-screen" />
      <div className="absolute inset-x-0 top-[38%] h-[2%] bg-cyan/70 mix-blend-screen" />
      <div className="absolute inset-x-0 top-[55%] h-[14%] bg-paper/15" />
      <div className="absolute inset-x-0 top-[83%] h-[4%] bg-red/50 mix-blend-screen" />
    </div>
  );
}
