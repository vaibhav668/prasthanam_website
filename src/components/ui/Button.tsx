import type { ReactNode, MouseEvent } from "react";
import { handleAnchorClick } from "../../lib/scroll";

type Variant = "primary" | "ghost" | "paper";

interface Props {
  children: string;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  variant?: Variant;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
}

const styles: Record<Variant, string> = {
  primary: "bg-red-ui text-paper hover:bg-[#b00500]",
  ghost: "border border-paper/40 text-paper hover:border-paper",
  paper: "bg-paper text-ink hover:bg-white",
};

/** Text button / link with spider-sense hover. Internal "#id" links smooth-scroll. */
export function Button({ children, href, onClick, variant = "primary", type = "button", disabled, icon, className = "", external }: Props) {
  const cls = `ss tap inline-flex items-center justify-center gap-3 px-6 py-3 mono text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon && <span aria-hidden="true">{icon}</span>}
    </>
  );
  if (href) {
    const isExternal = external ?? /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        data-text={children}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) handleAnchorClick(e, href);
        }}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls} data-text={children} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
