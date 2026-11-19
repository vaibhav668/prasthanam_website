import { useState } from "react";
import { faq } from "../data/faq";
import { sections } from "../data/sections";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { EmptyState } from "../components/ui/EmptyState";

/** Accessible accordion: real buttons, aria-expanded, region panels. */
export default function FAQ() {
  const copy = sections.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <div className="wrap">
        <SectionHeader id="faq" index={12} label={copy.label} title={copy.title} />
        {faq.length === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <ul className="border-t border-line md:ml-[25%]">
            {faq.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={i} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start gap-4 py-5 text-left"
                    >
                      <span className="mono pt-1 text-xs text-mute">Q{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1 font-display text-[clamp(1rem,2vw,1.3rem)] font-medium leading-snug group-hover:text-paper">{f.q}</span>
                      <span aria-hidden className={`mono mt-0.5 text-xl leading-none transition-transform duration-200 ${isOpen ? "rotate-45 text-red" : "text-paper/70"}`}>
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className={`max-w-[62ch] pb-6 pl-10 leading-relaxed text-paper/80 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} aria-hidden={!isOpen}>
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Section>
  );
}
