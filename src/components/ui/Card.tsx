import type { ReactNode, HTMLAttributes } from "react";

/** Plain surface with corner ticks — the engineering-notebook look. */
export function Card({ children, className = "", ...rest }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`relative border border-line bg-ink-2 ${className}`} {...rest}>
      <span aria-hidden className="pointer-events-none absolute -left-px -top-px h-2.5 w-2.5 border-l-2 border-t-2 border-paper/60" />
      <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b-2 border-r-2 border-paper/60" />
      {children}
    </div>
  );
}
