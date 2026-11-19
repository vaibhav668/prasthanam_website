import { m } from "framer-motion";
import { about } from "../data/about";
import { sections } from "../data/sections";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Counter } from "../components/ui/Counter";
import { Annotation } from "../components/ui/Annotation";

export default function About() {
  return (
    <Section id="about">
      <div className="wrap">
        <SectionHeader id="about" index={2} label={sections.about.label} title={about.heading} />

        <div className="grid gap-12 md:grid-cols-12">
          <div className="space-y-5 text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-paper/85 md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-4">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-paper" : ""}>
                {p}
              </p>
            ))}
          </div>

          {about.stats.length > 0 && (
            <dl className="relative grid grid-cols-2 border-l border-t border-line md:col-span-12 lg:col-span-4 lg:col-start-9">
              {about.stats.map((s) => (
                <div key={s.label} className="flex flex-col justify-between gap-3 border-b border-r border-line p-4 sm:p-6">
                  <dt className="label order-2 normal-case tracking-normal">{s.label}</dt>
                  <dd className="order-1 font-display text-[clamp(2.4rem,7vw,4.2rem)] font-extrabold leading-none tracking-[-0.04em]">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
              <Annotation text={sections.about.statsNote} rotate={-2} className="absolute -bottom-10 right-0 hidden w-[260px] text-right lg:block" />
            </dl>
          )}
        </div>

        {about.focusAreas.length > 0 && (
          <div className="mt-16 border-t border-line pt-8 sm:mt-24">
            <p className="label mb-6">{sections.about.focusLabel}</p>
            <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
              {about.focusAreas.map((f, i) => (
                <m.li
                  key={f.name}
                  className="group bg-ink p-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <span className="mono text-xs text-red-text">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-6 font-display text-lg font-medium leading-tight">{f.name}</p>
                  <p className="mono mt-2 text-xs text-mute">{f.note}</p>
                </m.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
