import { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { projects } from "../data/projects";
import { sections } from "../data/sections";
import type { Project, ProjectStatus } from "../types/content";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Tag } from "../components/ui/Tag";
import { EmptyState } from "../components/ui/EmptyState";
import { GlitchFlash } from "../components/effects/GlitchTransition";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectModal } from "./projects/ProjectModal";
import { useReducedMotion } from "../hooks/useReducedMotion";

const STATUSES: ProjectStatus[] = ["completed", "ongoing", "prototype"];

export default function Projects() {
  const copy = sections.projects;
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [tech, setTech] = useState<string | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const [flash, setFlash] = useState(false);
  const reduced = useReducedMotion();

  const allTech = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tech))).sort(), []);
  const list = projects.filter((p) => (!status || p.status === status) && (!tech || p.tech.includes(tech)));

  const openProject = (p: Project) => {
    if (reduced) return setOpen(p);
    setFlash(true);
    setTimeout(() => setOpen(p), 160);
    setTimeout(() => setFlash(false), 540);
  };

  return (
    <Section id="projects">
      <div className="wrap">
        <SectionHeader id="projects" index={3} label={copy.label} title={copy.title} kicker={<p>{copy.kicker}</p>} />

        {projects.length > 0 && (
          <div className="mb-10 grid gap-4 border-y border-line py-4 md:grid-cols-[auto_1fr] md:gap-x-6">
            <p className="label self-center">{copy.filterStatus}</p>
            <div className="-mx-1 flex flex-wrap gap-2 px-1" role="group" aria-label={copy.filterStatus}>
              <Tag active={!status} onClick={() => setStatus(null)}>{copy.all}</Tag>
              {STATUSES.map((s) => (
                <Tag key={s} active={status === s} onClick={() => setStatus(status === s ? null : s)}>
                  {s}
                </Tag>
              ))}
            </div>
            <p className="label self-center">{copy.filterTech}</p>
            <div className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0" role="group" aria-label={copy.filterTech}>
              <Tag active={!tech} onClick={() => setTech(null)} className="shrink-0">{copy.all}</Tag>
              {allTech.map((t) => (
                <Tag key={t} active={tech === t} onClick={() => setTech(tech === t ? null : t)} className="shrink-0">
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {list.length === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <ul className="grid gap-8 pb-10 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p) => (
                <m.li
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* broken grid: every 2nd card sits lower (static transform on an inner wrapper,
                      so framer-motion's inline transform on the li doesn't cancel it) */}
                  <div className={`h-full ${projects.indexOf(p) % 2 ? "sm:translate-y-10" : ""}`}>
                    <ProjectCard project={p} index={projects.indexOf(p)} onOpen={() => openProject(p)} />
                  </div>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
      <GlitchFlash show={flash} />
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
