type Tone = "red" | "cyan" | "paper" | "mute";
const tones: Record<Tone, string> = {
  red: "bg-red-ui text-paper",
  cyan: "bg-cyan text-ink",
  paper: "bg-paper text-ink",
  mute: "bg-paper/10 text-paper/80",
};

export function Badge({ children, tone = "mute", className = "" }: { children: string; tone?: Tone; className?: string }) {
  return (
    <span className={`mono inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
