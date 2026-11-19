import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { getLenis } from "../../lib/scroll";

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  /** Element to focus first (defaults to the close button). */
  initialFocus?: React.RefObject<HTMLElement>;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

/** Accessible dialog: focus trap, Esc to close, scroll lock, returns focus. */
export function Modal({ open, onClose, label, children, className = "", initialFocus }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const lenis = getLenis();
    lenis?.stop();
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    if (sbw) document.documentElement.style.paddingRight = `${sbw}px`;
    const t = setTimeout(() => (initialFocus?.current ?? closeBtn.current)?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "Tab" && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey, true);
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
      lenis?.start();
      prev?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, initialFocus]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-ink/85" onClick={onClose} aria-hidden="true" />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={`relative max-h-[92svh] w-full overflow-y-auto overscroll-contain border border-line bg-ink-2 sm:w-[min(92vw,960px)] ${className}`}
            style={{ paddingBottom: "var(--safe-b)" }}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            data-lenis-prevent
          >
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="ss tap mono absolute right-2 top-2 z-10 bg-ink px-3 text-xs uppercase tracking-widest text-paper hover:text-red"
              data-text="Close ✕"
              aria-label="Close dialog"
            >
              Close ✕
            </button>
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
