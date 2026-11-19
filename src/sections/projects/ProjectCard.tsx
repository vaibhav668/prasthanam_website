import type { Project } from "../../types/content";
import { GlitchTransition } from "../../components/effects/GlitchTransition";
import { ProjectArt, seeded } from "./ProjectArt";
import { sections } from "../../data/sections";

const STATUS_TONE: Record<Project["status"], string> = {
  completed: "bg-paper text-ink",
  ongoing: "bg-red-ui text-paper",
  prototype: "bg-cyan text-ink",
};

const VERSE_LABEL: Record<Project["verse"], string> = {
  blueprint: "EARTH-BP",
  comic: "EARTH-INK",
  crt: "EARTH-CRT",
  thermal: "EARTH-IR",
};

/** One project, drawn in its own "verse". The whole card is a button that opens the modal. */
export function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const v = project.verse;
  const isComic = v === "comic";
  return (
    <GlitchTransition className="h-full">
      <button
        type="button"
        onClick={onOpen}
        className={`verse-${v} group relative flex h-full w-full flex-col overflow-hidden text-left ${
          isComic ? "border-[3px] border-ink shadow-[6px_6px_0_var(--red)]" : "border border-white/15"
        }`}
      >
        <div
          className={`mono flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-[0.14em] ${
            isComic ? "border-b-[3px] border-ink" : "border-b border-white/15"
          }`}
        >
          <span>
            B-{String(index + 1).padStart(2, "0")} · {VERSE_LABEL[v]}
          </span>
          <span className={`px-1.5 py-0.5 font-semibold ${STATUS_TONE[project.status]}`}>{project.status}</span>
        </div>

        <div className="relative aspect-video w-full overflow-hidden">
          {project.image ? (
            <img src={project.image} alt="" loading="lazy" decoding="async" width={640} height={360} className="h-full w-full object-cover" />
          ) : (
            <ProjectArt project={project} />
          )}
          {v === "crt" && <div aria-hidden className="scanlines pointer-events-none absolute inset-0" />}
          {isComic && (
            <div className="absolute left-3 top-3 max-w-[72%] rounded-[18px] border-[3px] border-ink bg-white px-3 py-2 text-[13px] font-bold leading-tight text-ink">
              {project.tagline}
              <span aria-hidden className="absolute -bottom-[12px] left-6 h-0 w-0 border-x-[8px] border-t-[12px] border-x-transparent border-t-ink" />
            </div>
          )}
          {v === "thermal" && (
            <span aria-hidden className="mono absolute bottom-2 right-3 text-[10px]">
              {seeded(project.id, 18, 30).toFixed(1)}° ▸ {seeded(project.id, 60, 95).toFixed(1)}°
            </span>
          )}
        </div>

        <div className={`flex flex-1 flex-col gap-3 p-4 sm:p-5 ${v === "crt" ? "crt-glow" : ""}`}>
          <div className="flex items-baseline justify-between gap-3">
            <h3
              className={
                isComic
                  ? "font-display text-xl font-extrabold uppercase leading-none"
                  : v === "crt"
                    ? "mono text-lg font-semibold"
                    : "font-display text-lg font-medium leading-tight"
              }
            >
              {v === "crt" && "> "}
              {project.title}
            </h3>
            <span className="mono shrink-0 text-xs opacity-80">{project.year}</span>
          </div>
          {!isComic && <p className="text-sm leading-snug opacity-90">{project.tagline}</p>}
          <span className="sr-only">{sections.projects.open}</span>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className={`mono px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] ${isComic ? "border-2 border-ink font-semibold" : "border border-white/30"}`}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </GlitchTransition>
  );
}
