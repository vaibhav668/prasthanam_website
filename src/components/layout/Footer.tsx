import { useEffect, useRef } from "react";
import { site } from "../../config/site";
import { handleAnchorClick } from "../../lib/scroll";
import { LogoMark } from "./Logo";

const SOCIAL_LABELS: Record<string, string> = { instagram: "Instagram", linkedin: "LinkedIn", github: "GitHub", youtube: "YouTube" };

/** Big wordmark that always scales to exactly fill its container's width (never clipped). */
function FitWordmark({ text }: { text: string }) {
  const box = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const b = box.current;
    const w = word.current;
    if (!b || !w) return;
    const fit = () => {
      w.style.fontSize = "100px";
      const natural = w.getBoundingClientRect().width;
      if (natural > 0) w.style.fontSize = `${(100 * b.clientWidth) / natural}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={box} aria-hidden className="mt-16 w-full overflow-hidden">
      <span ref={word} className="display-xl block w-max select-none whitespace-nowrap text-paper/[0.05]" style={{ fontSize: "12vw" }}>
        {text}
      </span>
    </div>
  );
}

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);
  return (
    <footer className="relative border-t border-line bg-ink" style={{ paddingBottom: "calc(var(--safe-b) + 24px)" }}>
      <div className="wrap pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" onClick={(e) => handleAnchorClick(e, "#top")} className="inline-flex items-center gap-3 text-paper">
              <LogoMark size={84} />
              <span className="font-display text-2xl font-extrabold tracking-[-0.03em]">{site.name}</span>
            </a>
            <p className="mt-4 max-w-[38ch] text-paper/70">{site.tagline}</p>
          </div>

          <address className="not-italic md:col-span-4">
            <p className="label mb-3">[ COORDINATES ]</p>
            <p className="text-paper">{site.institute.name}</p>
            {site.institute.address.map((l) => (
              <p key={l} className="text-paper/70">
                {l}
              </p>
            ))}
          </address>

          <div className="md:col-span-3">
            <p className="label mb-3">[ SIGNAL ]</p>
            <ul className="flex flex-col">
              {socials.map(([k, url]) => (
                <li key={k}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ss tap mono inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] text-paper/80 hover:text-paper"
                    data-text={`↗ ${SOCIAL_LABELS[k] ?? k}`}
                  >
                    ↗ {SOCIAL_LABELS[k] ?? k}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FitWordmark text={site.name} />

        <div className="mt-4 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-xs text-mute">© {new Date().getFullYear()} {site.shortName} · {site.institute.short}</p>
          <p className="mono text-xs text-mute">
           
          </p>
        </div>
      </div>
    </footer>
  );
}
