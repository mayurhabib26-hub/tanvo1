import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-dark py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(circle at 50% 40%, black 0%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 0%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-steel/10 blur-[100px]"
      />

      <div className="container-tanvo relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-[36px] font-extrabold leading-[1.15] tracking-tight text-ivory text-balance sm:text-[48px] lg:text-[56px]">
            Have an idea?
            <br />
            Let&rsquo;s build it.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-blue-soft/70">
            Tell us what you&rsquo;re building, and we&rsquo;ll help turn the
            idea into a digital product.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Button href="#contact" tone="dark" data-cursor="hover">
            Start a Project
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
