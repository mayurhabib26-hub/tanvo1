import { ArrowUpRight } from "lucide-react";
import { RevealItem } from "./ui/Reveal";

export default function ProjectCard({ project, reverse = false }) {
  return (
    <RevealItem>
      <a
        href="#contact"
        data-cursor="hover"
        className="group grid items-center gap-8 border-t border-line py-12 first:border-none lg:grid-cols-2 lg:gap-14"
      >
        <div
          className={`overflow-hidden rounded-2xl border border-line ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={`https://loremflickr.com/800/500/${project.imageTags}`}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </div>
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <div className="flex items-center gap-3 text-[13px] font-medium text-accent">
            <span className="num-mono">{project.number}</span>
            <span className="h-px w-5 bg-line" />
            <span className="uppercase tracking-[0.14em] text-slate">
              {project.category}
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <h3 className="text-[26px] font-bold tracking-tight text-charcoal sm:text-[30px]">
              {project.title}
            </h3>
            <ArrowUpRight
              size={24}
              strokeWidth={2}
              className="mt-1 shrink-0 -translate-y-1 translate-x-1 text-charcoal opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </div>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate">
            {project.description}
          </p>

          <p className="mt-5 text-[12.5px] font-medium uppercase tracking-[0.1em] text-steel">
            {project.tech}
          </p>
        </div>
      </a>
    </RevealItem>
  );
}
