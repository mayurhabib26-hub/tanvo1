import { ArrowRight } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal, { RevealGroup } from "./ui/Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "../lib/data";

export default function Work() {
  return (
    <section id="work" className="border-t border-line py-24 md:py-32">
      <div className="container-tanvo">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <SectionLabel>Selected Work</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl text-[32px] font-extrabold leading-[1.15] tracking-tight text-charcoal text-balance sm:text-[44px]">
                Digital products designed to solve real problems.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="hidden lg:block">
            <a
              href="#contact"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-6 py-3 text-[13.5px] font-bold text-white transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.08] active:scale-95"
            >
              <span>Start a Project</span>
              <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>

        <RevealGroup className="mt-8 md:mt-12">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
