import type { Project } from "../../types/content";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { ProjectArt } from "./ProjectArt";
import { team } from "../../data/team";
import { sections } from "../../data/sections";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const builders = (project?.team ?? []).map((id) => team.find((mm) => mm.id === id)).filter((x): x is NonNullable<typeof x> => !!x);
  return (
    <Modal open={!!project} onClose={onClose} label={project?.title ?? "Project"}>
      {project && (
        <div className="grid md:grid-cols-[1.4fr_1fr] md:items-start">
          <div className={`verse-${project.verse} relative flex aspect-video w-full items-center justify-center bg-black`}>
            {project.image ? (
              <img src={project.image} alt={project.title} className="h-full w-full object-contain" width={800} height={450} />
            ) : (
              <ProjectArt project={project} />
            )}
            {project.verse === "crt" && <div aria-hidden className="scanlines pointer-events-none absolute inset-0" />}
          </div>
          <div className="p-5 pt-12 sm:p-6 sm:pt-12">
            <p className="label">
              {project.status} · {project.year} · verse/{project.verse}
            </p>
            <h3 className="h2 mt-2 text-[clamp(1.25rem,2.5vw,1.75rem)]">{project.title}</h3>
            <p className="mt-1 text-sm text-paper/80">{project.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/85">{project.description}</p>

            {project.specs.length > 0 && (
              <>
                <p className="label mt-5">{sections.projects.specsLabel}</p>
                <dl className="mt-3 border-t border-line">
                  {project.specs.map((s) => (
                    <div key={s.label} className="mono flex justify-between gap-4 border-b border-line py-1.5 text-xs">
                      <dt className="text-mute">{s.label}</dt>
                      <dd className="text-right text-paper">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <li key={t} className="mono border border-line px-2 py-0.5 text-[11px] uppercase text-paper/80">
                  {t}
                </li>
              ))}
            </ul>

            {builders.length > 0 && (
              <p className="mt-4 text-xs text-paper/75">
                <span className="label mr-2">{sections.projects.teamLabel}</span>
                {builders.map((b) => `${b.name} (${b.role})`).join(", ")}
              </p>
            )}

            {(project.github || project.video) && (
              <div className="mt-5 flex flex-wrap gap-3">
                {project.github && (
                  <Button href={project.github} variant="paper" icon="↗">
                    {sections.projects.links.github}
                  </Button>
                )}
                {project.video && (
                  <Button href={project.video} variant="ghost" icon="▶">
                    {sections.projects.links.video}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
