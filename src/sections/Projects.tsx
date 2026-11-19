import { useState } from "react";
import { m } from "framer-motion";
import { projects } from "../data/projects";
import { sections } from "../data/sections";
import type { Project } from "../types/content";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { GlitchFlash } from "../components/effects/GlitchTransition";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectModal } from "./projects/ProjectModal";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Projects() {
  const copy = sections.projects;
  const [open, setOpen] = useState<Project | null>(null);
  const [flash, setFlash] = useState(false);
  const reduced = useReducedMotion();

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

        {projects.length === 0 ? (
          <EmptyState message={copy.empty} />
        ) : (
          <ul className="grid gap-8 pb-10 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10">
            {projects.map((p, i) => (
                <m.li
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                >
                  <div className="h-full">
                    <ProjectCard project={p} index={i} onOpen={() => openProject(p)} />
                  </div>
                </m.li>
              ))}
          </ul>
        )}
      </div>
      <GlitchFlash show={flash} />
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
