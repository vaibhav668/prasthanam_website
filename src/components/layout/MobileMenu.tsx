import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { site } from "../../config/site";
import { getLenis, handleAnchorClick } from "../../lib/scroll";
import { emit } from "../../lib/ui-events";

interface Props {
  open: boolean;
  onClose: () => void;
  xray: boolean;
  onXray: () => void;
}

/** Full-screen menu: links drop in like threads, Esc closes, focus is trapped. */
export function MobileMenu({ open, onClose, xray, onXray }: Props) {
  const first = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a,button");
        const a = f[0];
        const b = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      getLenis()?.start();
      prev?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  const links = site.navLinks;

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[75] flex flex-col bg-ink"
          style={{ paddingTop: "var(--safe-t)", paddingBottom: "var(--safe-b)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-40" />
          <div className="wrap relative flex h-16 items-center justify-between">
            <span className="label">[ MENU / NAV ]</span>
            <button ref={first} type="button" onClick={onClose} className="tap mono px-2 text-[12px] uppercase tracking-[0.1em] text-paper">
              Close ✕
            </button>
          </div>
          <nav aria-label="Mobile" className="wrap relative flex-1 overflow-y-auto pt-4">
            <ol className="border-t border-line">
              {links.map((l, i) => (
                <m.li
                  key={l.id}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => handleAnchorClick(e, `#${l.id}`, onClose)}
                    className="flex items-baseline gap-4 py-4 text-paper active:text-red"
                  >
                    <span className="mono w-7 text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`font-display text-[clamp(1.6rem,8vw,3rem)] font-extrabold uppercase leading-none tracking-[-0.03em]`}>
                      {l.label}
                    </span>
                  </a>
                </m.li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-2 pb-8">
              {site.features.terminal && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setTimeout(() => emit("terminal:open"), 220);
                  }}
                  className="tap mono border border-line px-4 text-sm text-cyan"
                >
                  &gt;_ terminal
                </button>
              )}
              {site.features.xray && (
                <button type="button" onClick={onXray} aria-pressed={xray} className={`tap mono border border-line px-4 text-sm ${xray ? "text-cyan" : "text-paper"}`}>
                  X-ray: {xray ? "on" : "off"}
                </button>
              )}
            </div>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
