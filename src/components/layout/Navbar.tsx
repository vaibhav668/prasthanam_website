import { useEffect, useState } from "react";
import { site } from "../../config/site";
import { handleAnchorClick } from "../../lib/scroll";
import { emit } from "../../lib/ui-events";
import { LogoMark } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [xray, setXray] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.xray = xray ? "on" : "off";
  }, [xray]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-200 ${
          scrolled ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
        style={{ paddingTop: "var(--safe-t)" }}
      >
        <nav aria-label="Primary" className="wrap relative flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            onClick={(e) => handleAnchorClick(e, "#top")}
            className="tap -ml-1 flex shrink-0 items-center gap-2.5 pl-1 text-paper xl:w-[232px]"
            aria-label={`${site.shortName} — back to top`}
          >
            <LogoMark />
            <span className="hidden font-display text-[15px] font-extrabold tracking-[-0.02em] min-[480px]:inline">{site.name}</span>
          </a>

          {/* logo has a fixed width at xl, so these links never shift when fonts swap */}
          <ul className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
            {site.navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => handleAnchorClick(e, `#${l.id}`)}
                  className="ss tap mono flex items-center whitespace-nowrap px-2.5 text-[11px] uppercase tracking-[0.09em] text-paper/75 hover:text-paper 2xl:px-3.5 2xl:text-[12px]"
                  data-text={l.label}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1">
            {site.features.xray && (
              <button
                type="button"
                onClick={() => setXray((v) => !v)}
                aria-pressed={xray}
                className={`ss tap mono hidden px-3 text-[12px] uppercase tracking-[0.1em] sm:inline-flex sm:items-center ${xray ? "text-cyan" : "text-paper/70 hover:text-paper"}`}
                data-text="X-ray"
                title="Toggle X-ray (blueprint) mode"
              >
                X-ray
              </button>
            )}
            {site.features.terminal && (
              <button
                type="button"
                onClick={() => emit("terminal:open")}
                className="ss tap mono inline-flex items-center justify-center border border-line px-3 text-[13px] text-cyan hover:border-cyan"
                data-text=">_"
                aria-label="Open terminal (shortcut: backtick)"
                title="Terminal ( ` )"
              >
                &gt;_
              </button>
            )}
            <a
              href="#join"
              onClick={(e) => handleAnchorClick(e, "#join")}
              className="ss tap mono hidden items-center bg-red-ui px-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-paper md:inline-flex"
              data-text="Join"
            >
              Join
            </a>
            <button
              type="button"
              className="tap mono inline-flex items-center gap-2 px-2 text-[12px] uppercase tracking-[0.1em] text-paper xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span className="block h-[2px] w-6 bg-paper" />
                <span className="block h-[2px] w-4 bg-red" />
              </span>
              <span>Menu</span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} xray={xray} onXray={() => setXray((v) => !v)} />
    </>
  );
}
