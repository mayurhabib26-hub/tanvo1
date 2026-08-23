import { ArrowUpRight } from "lucide-react";
import { RevealItem } from "./ui/Reveal";

export default function ProjectCard({ project }) {
  return (
    <RevealItem>
      <a
        href="#contact"
        data-cursor="hover"
        className="group grid items-center gap-8 border-t border-line/60 py-10 md:py-14 first:border-none lg:grid-cols-12 lg:gap-14"
      >
        <div className="overflow-hidden rounded-2xl border border-line/80 bg-[#0B1224] lg:col-span-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-2">
          <div className="flex items-center gap-2.5 text-[12.5px] font-semibold uppercase">
            <span className="num-mono text-accent">{project.number}</span>
            <span className="h-px w-5 bg-accent/60" />
            <span className="tracking-[0.16em] text-accent">
              {project.category}
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <h3 className="text-[26px] font-extrabold tracking-tight text-charcoal sm:text-[32px] transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </h3>
            <ArrowUpRight
              size={22}
              strokeWidth={2}
              className="mt-1.5 shrink-0 -translate-y-1 translate-x-1 text-accent opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </div>

          <p className="mt-3.5 max-w-lg text-[15px] leading-relaxed text-slate">
            {project.description}
          </p>

          <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">
            {project.tech}
          </p>
        </div>
      </a>
    </RevealItem>
  );
}
