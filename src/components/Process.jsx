import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";
import Reveal, { RevealGroup, RevealItem } from "./ui/Reveal";
import { processSteps } from "../lib/data";

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="border-t border-line py-24 md:py-32">
      <div className="container-tanvo">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <SectionLabel>How We Build</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl text-[32px] font-extrabold leading-[1.15] tracking-tight text-charcoal text-balance sm:text-[42px]">
                A clear process, from idea to launch.
              </h2>
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative mt-20">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line sm:left-[23px]" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] top-2 w-px bg-steel sm:left-[23px]"
          />

          <RevealGroup className="flex flex-col" stagger={0.1}>
            {processSteps.map((step) => (
              <RevealItem key={step.number} className="relative flex gap-6 py-7 sm:gap-8 sm:py-8">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-[#0B1224] sm:h-12 sm:w-12 shadow-[0_0_15px_rgba(0,0,0,0.4)]">
                  <span className="num-mono text-[13px] font-semibold text-accent">
                    {step.number}
                  </span>
                </div>
                <div className="pt-1.5 sm:pt-2.5">
                  <h3 className="text-[19px] font-bold tracking-tight text-charcoal sm:text-[21px]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-slate">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
