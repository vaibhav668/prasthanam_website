import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { terminalCommands } from "../../data/terminal";
import { projects } from "../../data/projects";
import { team } from "../../data/team";
import { site } from "../../config/site";
import { getLenis, scrollToId } from "../../lib/scroll";
import { on } from "../../lib/ui-events";

type Line = { kind: "in" | "out" | "err"; text: string };

const BANNER: Line[] = [
  { kind: "out", text: `${site.name.toLowerCase()} shell v1.0 — P-8 kernel` },
  { kind: "out", text: "type `help` to list commands. esc to close." },
];

function isTyping(el: EventTarget | null) {
  const t = el as HTMLElement | null;
  return !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
}

/** Easter-egg terminal. Opens on ` / ~ or the navbar >_ button. */
export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const hIndex = useRef(-1);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const off = on("terminal:open", () => {
      opener.current = document.activeElement as HTMLElement;
      setOpen(true);
    });
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "`" || e.key === "~") && !isTyping(e.target)) {
        e.preventDefault();
        opener.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      off();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const t = setTimeout(() => input.current?.focus(), 40);
    return () => {
      clearTimeout(t);
      getLenis()?.start();
      opener.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const text = raw.trim();
    const echo: Line = { kind: "in", text: raw };
    if (!text) return setLines((l) => [...l, echo]);
    history.current.unshift(text);
    hIndex.current = -1;
    const cmd = terminalCommands.find((c) => c.cmd.toLowerCase() === text.toLowerCase());
    if (!cmd) {
      return setLines((l) => [...l, echo, { kind: "err", text: `command not found: ${text}. try \`help\`.` }]);
    }
    const out: Line[] = (cmd.output ?? []).map((t) => ({ kind: "out", text: t }));
    switch (cmd.action) {
      case "clear":
        return setLines([]);
      case "exit":
        setLines((l) => [...l, echo]);
        return close();
      case "help": {
        const visible = terminalCommands.filter((c) => !c.hidden);
        const w = Math.max(...visible.map((c) => c.cmd.length));
        visible.forEach((c) => out.push({ kind: "out", text: `  ${c.cmd.padEnd(w + 2)}${c.description}` }));
        break;
      }
      case "listProjects":
        if (!projects.length) out.push({ kind: "out", text: "  (no builds yet)" });
        projects.forEach((p) => out.push({ kind: "out", text: `  ${p.status.padEnd(10)} ${String(p.year)}  ${p.title}` }));
        break;
      case "listTeam":
        if (!team.length) out.push({ kind: "out", text: "  (no agents yet)" });
        team.forEach((p) => out.push({ kind: "out", text: `  [${p.tier.padEnd(7)}] ${p.name} — ${p.role}` }));
        break;
      case "scrollToJoin":
        out.push({ kind: "out", text: "access request queued. opening /join …" });
        setLines((l) => [...l, echo, ...out]);
        setTimeout(() => {
          opener.current = null;
          close();
          setTimeout(() => {
            scrollToId("join");
            setTimeout(() => document.querySelector<HTMLInputElement>("#join input")?.focus({ preventScroll: true }), 900);
          }, 120);
        }, 450);
        return;
    }
    setLines((l) => [...l, echo, ...out]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(history.current.length - 1, hIndex.current + 1);
      if (n >= 0) {
        hIndex.current = n;
        setValue(history.current[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = hIndex.current - 1;
      hIndex.current = Math.max(-1, n);
      setValue(n >= 0 ? history.current[n] : "");
    } else if (e.key === "`" || e.key === "~") {
      if (!value) {
        e.preventDefault();
        close();
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-ink/70" onClick={close} aria-hidden="true" />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            className="relative flex h-[min(70svh,520px)] w-full max-w-[760px] flex-col border border-cyan/40 bg-[#060707] shadow-[0_0_0_1px_rgba(0,0,0,.6)]"
            style={{ paddingBottom: "var(--safe-b)" }}
            initial={{ y: 20, scaleY: 0.96 }}
            animate={{ y: 0, scaleY: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => {
              if (!(e.target as Element).closest("button")) input.current?.focus();
            }}
            onKeyDown={(e) => {
              // Focus trap: only the close button and the input are tabbable.
              if (e.key !== "Tab") return;
              const btn = closeBtn.current;
              const inp = input.current;
              if (!btn || !inp) return;
              e.preventDefault();
              (document.activeElement === inp ? btn : inp).focus();
            }}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between border-b border-cyan/20 px-4 py-2">
              <span className="mono text-[11px] uppercase tracking-[0.14em] text-cyan">p8@prasthanam:~</span>
              <button ref={closeBtn} type="button" onClick={close} className="tap mono -mr-2 px-2 text-[11px] uppercase tracking-[0.14em] text-paper/70 hover:text-red">
                esc ✕
              </button>
            </div>
            <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-40" />
            <div ref={body} className="mono relative flex-1 overflow-y-auto overscroll-contain px-4 py-3 text-[13px] leading-relaxed" role="log" aria-live="polite">
              {lines.map((l, i) => (
                <pre key={i} className={`whitespace-pre-wrap break-words font-[inherit] ${l.kind === "in" ? "text-paper" : l.kind === "err" ? "text-[#ff6b5e]" : "text-[#7dffb0]"}`}>
                  {l.kind === "in" ? <><span className="text-cyan">❯ </span>{l.text}</> : l.text}
                </pre>
              ))}
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(value);
                  setValue("");
                }}
              >
                <label htmlFor="term-in" className="text-cyan">❯&nbsp;</label>
                <input
                  id="term-in"
                  ref={input}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal command"
                  className="min-w-0 flex-1 bg-transparent text-[16px] text-paper caret-red outline-none sm:text-[13px]"
                />
              </form>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
