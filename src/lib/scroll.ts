import type Lenis from "lenis";
import { prefersReducedMotion } from "../hooks/useReducedMotion";

let lenis: Lenis | null = null;
export function setLenis(l: Lenis | null) {
  lenis = l;
}
export function getLenis() {
  return lenis;
}

const NAV_OFFSET = 72;

/** Scroll to a section id, waiting briefly for lazily-rendered sections to mount. */
export function scrollToId(id: string, tries = 40) {
  const el = document.getElementById(id);
  if (!el) {
    window.dispatchEvent(new Event("prasthanam:need-sections"));
    if (tries > 0) setTimeout(() => scrollToId(id, tries - 1), 50);
    return;
  }
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET + 8, immediate: prefersReducedMotion() });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 8;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
  history.replaceState(null, "", `#${id}`);
  // Move focus for keyboard/screen-reader users without a second jump.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/** Click handler for in-page links ("#join"). External links pass through. */
export function handleAnchorClick(e: React.MouseEvent, href: string, after?: () => void) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  after?.();
  scrollToId(href.slice(1));
}
