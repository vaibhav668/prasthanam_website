import type { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
  /** Accessible name; usually the id of the section's h2. */
  labelledBy?: string;
}

/** Landmark wrapper for every page section. */
export function Section({ id, children, className = "", labelledBy }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy ?? `${id}-title`} className={`relative scroll-mt-16 py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}
