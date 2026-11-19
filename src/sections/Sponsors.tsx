import { sponsors } from "../data/sponsors";
import { sections } from "../data/sections";
import { site } from "../config/site";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";

export default function Sponsors() {
  const copy = sections.sponsors;
  return (
    <Section id="sponsors" className="border-t border-line">
      <div className="wrap">
        <SectionHeader id="sponsors" index={10} label={copy.label} title={copy.title} />
        {sponsors.length === 0 ? (
          <EmptyState message={copy.empty}>
            <Button href={`mailto:${site.email}`} variant="ghost" external={false}>
              {copy.cta}
            </Button>
          </EmptyState>
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-4">
              {sponsors.map((s) => {
                const inner = (
                  <>
                    <img src={s.logo} alt={s.name} loading="lazy" decoding="async" width={240} height={80} className="h-12 w-auto max-w-full object-contain opacity-80 grayscale transition-opacity group-hover:opacity-100" />
                    {s.tier && <span className="mono absolute left-3 top-2 text-[10px] uppercase tracking-[0.1em] text-mute">{s.tier}</span>}
                  </>
                );
                return (
                  <li key={s.id} className="bg-ink">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="group relative flex h-32 items-center justify-center p-6">
                        {inner}
                      </a>
                    ) : (
                      <div className="group relative flex h-32 items-center justify-center p-6">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <Button href={`mailto:${site.email}`} variant="ghost" external={false} icon="↗">
                {copy.cta}
              </Button>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
