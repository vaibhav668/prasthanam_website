import { useCallback, useEffect, useState } from "react";
import { gallery } from "../data/gallery";
import { sections } from "../data/sections";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { Modal } from "../components/ui/Modal";

/** Masonry (CSS columns) + lazy images + keyboard lightbox. */
export default function Gallery() {
  const copy = sections.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? gallery[index] : null;

  return (
    <Section id="gallery">
      <div className="wrap">
        <SectionHeader id="gallery" index={8} label={copy.label} title={copy.title} kicker={<p>{copy.kicker}</p>} />
        {gallery.length === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <ul className="columns-1 gap-4 xs:columns-2 lg:columns-3 [&>li]:mb-4">
            {gallery.map((g, i) => (
              <li key={g.id} className="relative break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group relative block w-full overflow-hidden border border-line bg-ink-2"
                >
                  <img
                    src={g.src}
                    srcSet={g.srcSet}
                    sizes="(min-width: 1024px) 33vw, (min-width: 390px) 50vw, 100vw"
                    alt={g.alt}
                    width={g.width ?? 800}
                    height={g.height ?? 600}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="sr-only">Open larger</span>
                  {g.caption && (
                    <span className="mono absolute inset-x-0 bottom-0 bg-ink/85 px-3 py-2 text-left text-[11px] uppercase tracking-[0.08em] text-paper opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                      {g.caption}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={!!current} onClose={close} label={current?.alt ?? "Image"} className="sm:w-[min(94vw,1100px)]">
        {current && (
          <figure className="flex flex-col">
            <div className="flex items-center justify-center bg-ink pt-12">
              <img src={current.src} srcSet={current.srcSet} alt={current.alt} width={current.width} height={current.height} className="max-h-[72svh] w-auto object-contain" />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-line p-3">
              <span className="mono text-xs uppercase tracking-[0.08em] text-paper/80">
                {String((index ?? 0) + 1).padStart(2, "0")}/{String(gallery.length).padStart(2, "0")} {current.caption ?? current.alt}
              </span>
              <span className="flex gap-1">
                <button type="button" onClick={() => step(-1)} className="tap mono border border-line px-3 text-sm hover:border-paper" aria-label={copy.prev}>
                  ←
                </button>
                <button type="button" onClick={() => step(1)} className="tap mono border border-line px-3 text-sm hover:border-paper" aria-label={copy.next}>
                  →
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </Modal>
    </Section>
  );
}
