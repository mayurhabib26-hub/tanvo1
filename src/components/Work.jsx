import SectionLabel from "./ui/SectionLabel";
import Reveal, { RevealGroup } from "./ui/Reveal";
import Button from "./ui/Button";
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
              <h2 className="mt-6 max-w-xl text-[32px] font-extrabold leading-[1.15] tracking-tight text-charcoal text-balance sm:text-[42px]">
                Digital products designed to solve real problems.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="hidden lg:block">
            <Button href="#contact" variant="secondary" data-cursor="hover">
              Start a Project
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-4">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
