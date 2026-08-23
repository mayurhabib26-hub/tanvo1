import { ArrowUpRight } from "lucide-react";
import { RevealItem } from "./ui/Reveal";

export default function ServiceCard({ service, className = "" }) {
  return (
    <RevealItem className={className}>
      <a
        href="#contact"
        data-cursor="hover"
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-[#0B1224]/70 p-8 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-accent/40 hover:bg-[#101B36] hover:shadow-[0_12px_30px_rgba(26,107,255,0.12)] sm:p-10"
      >
        <div className="flex items-start justify-between">
          <span className="num-mono text-[15px] font-semibold text-accent">
            {service.number}
          </span>
          <ArrowUpRight
            size={20}
            strokeWidth={2}
            className="-translate-y-1 translate-x-1 text-white opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </div>

        <div className="mt-16">
          <h3 className="text-[21px] font-bold tracking-tight text-charcoal">
            {service.title}
          </h3>
          <p className="mt-3 max-w-[38ch] text-[14.5px] leading-relaxed text-slate">
            {service.description}
          </p>
        </div>
      </a>
    </RevealItem>
  );
}
