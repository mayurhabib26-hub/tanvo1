import SectionLabel from "./ui/SectionLabel";
import Reveal, { RevealGroup } from "./ui/Reveal";
import ServiceCard from "./ServiceCard";
import { services } from "../lib/data";

export default function Services() {
  return (
    <section id="services" className="border-t border-line py-24 md:py-32">
      <div className="container-tanvo">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <SectionLabel>Services</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl text-[32px] font-extrabold leading-[1.15] tracking-tight text-charcoal text-balance sm:text-[42px]">
                Everything you need to build digital.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[15px] leading-relaxed text-slate">
              A full-stack digital team covering strategy, design,
              engineering and long-term product support.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.07}>
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              className={i === services.length - 1 ? "sm:col-span-2" : ""}
            />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
