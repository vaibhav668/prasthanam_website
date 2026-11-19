interface Props {
  children: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Mono pill. Becomes a toggle button when onClick is given. */
export function Tag({ children, active, onClick, className = "" }: Props) {
  const base = `mono inline-flex items-center text-[11px] uppercase tracking-[0.08em] border px-2.5 py-1 ${className}`;
  if (!onClick) return <span className={`${base} border-line text-paper/80`}>{children}</span>;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-text={children}
      className={`ss tap ${base} px-3 transition-colors ${
        active ? "border-cyan text-cyan" : "border-line text-paper/75 hover:border-paper/50 hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}
