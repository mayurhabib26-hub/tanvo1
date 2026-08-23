import { motion } from "framer-motion";
import Button from "./ui/Button";
import HeroVisual from "./HeroVisual";

const EASE = [0.16, 1, 0.3, 1];

const headline = ["We Build Digital", "Products That Move", "Businesses Forward."];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-40 md:pb-32 md:pt-48">
      <div className="container-tanvo grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-steel" />
            <span className="text-[12.5px] font-medium text-slate">
              Digital Technology Agency
            </span>
          </motion.div>

          <h1 className="max-w-2xl text-[42px] font-extrabold leading-[1.08] tracking-tight text-charcoal text-balance sm:text-[54px] lg:text-[60px]">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
            className="mt-7 max-w-lg text-[16.5px] leading-relaxed text-slate"
          >
            Tanvo is a digital technology agency building websites, web
            applications, mobile apps, e-commerce experiences and digital
            solutions for ambitious businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="#contact" data-cursor="hover">Start a Project</Button>
            <Button href="#work" variant="secondary" icon={false} data-cursor="hover">
              Explore Our Work
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
