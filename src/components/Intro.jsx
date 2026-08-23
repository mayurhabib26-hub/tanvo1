import SectionLabel from "./ui/SectionLabel";
import Reveal, { RevealGroup, RevealItem } from "./ui/Reveal";
import { stats } from "../lib/data";

export default function Intro() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="container-tanvo">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel>What We Do</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-md text-[32px] font-extrabold leading-[1.15] tracking-tight text-charcoal sm:text-[38px]">
                From idea to digital product.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <p className="max-w-xl text-[16.5px] leading-relaxed text-slate">
              We combine design, development and technology to create digital
              experiences that are fast, scalable and built around real
              business goals. Every product we ship is measured against one
              standard: does it move the business forward.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-14 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="num-mono text-[34px] font-extrabold tracking-tight text-charcoal sm:text-[42px]">
                {stat.value}
              </div>
              <div className="mt-2 text-[13.5px] font-medium text-slate">
                {stat.label}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
