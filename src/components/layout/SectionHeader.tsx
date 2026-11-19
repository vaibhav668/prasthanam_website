import type { ReactNode } from "react";
import { m } from "framer-motion";

interface Props {
  id: string;
  index: number;
  label: string;
  title: ReactNode;
  kicker?: ReactNode;
  className?: string;
}

/** `[ 02 / PROJECTS ]` spec label + big offset heading. */
export function SectionHeader({ id, index, label, title, kicker, className = "" }: Props) {
  const n = String(index).padStart(2, "0");
  return (
    <header className={`relative mb-12 grid gap-6 sm:mb-16 md:grid-cols-12 ${className}`}>
      <div className="md:col-span-3">
        <p className="label flex items-center gap-3">
          <span className="text-paper">[ {n} / {label} ]</span>
          <span aria-hidden className="hidden h-px flex-1 bg-line md:block" />
        </p>
        {/* decorative ghost number via CSS content, so it's invisible to assistive tech */}
        <span aria-hidden data-n={n} className="mono mt-2 block text-[64px] font-semibold leading-none text-paper/[0.06] before:content-[attr(data-n)] sm:text-[96px]" />
      </div>
      <m.div
        className="md:col-span-9 md:-mt-1"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <h2 id={`${id}-title`} className="h2 max-w-[18ch]">
          {title}
        </h2>
        {kicker && <div className="mt-5 max-w-[56ch] text-paper/75">{kicker}</div>}
      </m.div>
    </header>
  );
}
