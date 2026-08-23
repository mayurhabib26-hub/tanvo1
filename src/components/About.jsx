import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

export default function About() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <div className="container-tanvo">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel>About Tanvo</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 text-[32px] font-extrabold leading-[1.15] tracking-tight text-charcoal sm:text-[42px]">
                We are Tanvo.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <p className="max-w-xl text-[16.5px] leading-relaxed text-slate">
              A digital technology studio focused on building meaningful
              digital products for businesses, startups and ambitious ideas.
              We work closely with founders and teams to turn early concepts
              into products people actually use.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-24 border-t border-line pt-20 md:mt-28 md:pt-24">
          <p className="max-w-4xl text-[30px] font-extrabold leading-[1.25] tracking-tight text-charcoal text-balance sm:text-[40px] lg:text-[48px]">
            Ideas are everywhere.
            <span className="text-slate"> We build the technology that makes them real.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
