import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFlutter,
  SiVercel,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { Cloud, Smartphone } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal, { RevealGroup, RevealItem } from "./ui/Reveal";
import { techStack } from "../lib/data";

const ICON_MAP = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Flutter: SiFlutter,
  "React Native": Smartphone,
  AWS: Cloud,
  Vercel: SiVercel,
  Docker: SiDocker,
  Git: SiGit,
};

export default function Technology() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="container-tanvo">
        <Reveal>
          <SectionLabel>Technology</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-xl text-[32px] font-extrabold leading-[1.15] tracking-tight text-charcoal text-balance sm:text-[42px]">
            Built with modern technology.
          </h2>
        </Reveal>

        <RevealGroup
          className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 lg:grid-cols-6"
          stagger={0.04}
        >
          {techStack.map((name) => {
            const Icon = ICON_MAP[name];
            return (
              <RevealItem key={name}>
                <div
                  data-cursor="hover"
                  className="group flex h-full flex-col items-center justify-center gap-3 bg-ivory px-4 py-9 text-center transition-colors duration-300 hover:bg-blue-soft/25"
                >
                  {Icon && (
                    <Icon
                      size={26}
                      className="text-slate transition-colors duration-300 group-hover:text-charcoal"
                    />
                  )}
                  <span className="text-[12.5px] font-medium text-slate transition-colors duration-300 group-hover:text-charcoal">
                    {name}
                  </span>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
