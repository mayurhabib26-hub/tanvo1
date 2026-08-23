import { Target, Sparkles, Cpu, Handshake } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal, { RevealGroup, RevealItem } from "./ui/Reveal";
import { whyPrinciples } from "../lib/data";

const ICONS = [Target, Sparkles, Cpu, Handshake];

export default function WhyTanvo() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="container-tanvo">
        <Reveal>
          <SectionLabel>Why Tanvo</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl text-[32px] font-extrabold leading-[1.15] tracking-tight text-charcoal text-balance sm:text-[42px]">
            Technology should simplify business, not complicate it.
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {whyPrinciples.map((principle, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={principle.number} className="border-t border-line pt-8">
                <Icon size={22} strokeWidth={1.75} className="text-steel" />
                <div className="num-mono mt-6 text-[13px] font-semibold text-accent">
                  {principle.number}
                </div>
                <h3 className="mt-3 text-[18px] font-bold tracking-tight text-charcoal">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate">
                  {principle.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
