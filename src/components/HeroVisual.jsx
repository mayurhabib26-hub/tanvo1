import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import tanvoMark from "../assets/tanvo-mark.png";

const PARTICLES = [
  { top: "12%", left: "18%", size: 4, delay: 0 },
  { top: "24%", left: "78%", size: 3, delay: 0.6 },
  { top: "62%", left: "8%", size: 3, delay: 1.1 },
  { top: "78%", left: "64%", size: 5, delay: 0.3 },
  { top: "40%", left: "92%", size: 3, delay: 1.6 },
  { top: "88%", left: "30%", size: 4, delay: 0.9 },
  { top: "8%", left: "52%", size: 3, delay: 1.3 },
];

export default function HeroVisual() {
  const wrapRef = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 140, damping: 16, mass: 0.4 });
  const springY = useSpring(py, { stiffness: 140, damping: 16, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const glareX = useTransform(springX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["10%", "90%"]);

  function handlePointerMove(e) {
    const rect = wrapRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[560px]"
      style={{ perspective: 1000 }}
    >
      {/* grid */}
      <div
        className="absolute inset-0 rounded-[32px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FFE0E7 1px, transparent 1px), linear-gradient(to bottom, #FFE0E7 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at 55% 45%, black 45%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle at 55% 45%, black 45%, transparent 78%)",
        }}
      />

      {/* soft blurred forms */}
      <motion.div
        className="absolute left-[8%] top-[14%] h-56 w-56 rounded-full bg-blue-soft/60 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] h-64 w-64 rounded-full bg-steel/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* rotating outlined ring echoing the fold geometry */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="200" cy="200" r="168" stroke="#BDB2FF" strokeWidth="1" fill="none" />
        <circle cx="200" cy="200" r="120" stroke="#BDB2FF" strokeWidth="1" fill="none" strokeDasharray="2 8" />
      </motion.svg>

      {/* real brand mark, tilts toward the cursor */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* pulsing glow, drifts with the cursor for depth */}
        <motion.div
          className="absolute inset-[-26%] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(58,134,255,0.45) 0%, rgba(189,178,255,0.25) 55%, transparent 75%)",
            x: useTransform(springX, [-0.5, 0.5], [-14, 14]),
            y: useTransform(springY, [-0.5, 0.5], [-14, 14]),
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* gentle float + sway */}
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ y: [0, -10, 0], rotate: [-1.2, 1.2, -1.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={tanvoMark}
            alt=""
            className="h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(26,31,61,0.12)]"
            style={{ transform: "translateZ(40px)" }}
          />

          {/* highlights, clipped to the mark's own silhouette */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              transform: "translateZ(40px)",
              maskImage: `url(${tanvoMark})`,
              WebkitMaskImage: `url(${tanvoMark})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          >
            {/* automatic shine sweep */}
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              style={{ mixBlendMode: "overlay" }}
              animate={{ x: ["-160%", "260%"] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
            />

            {/* glare that tracks the cursor */}
            <motion.div
              className="absolute -inset-4"
              style={{
                mixBlendMode: "overlay",
                background: "radial-gradient(circle at center, white, transparent 60%)",
                left: glareX,
                top: glareY,
                translateX: "-50%",
                translateY: "-50%",
                width: "70%",
                height: "70%",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* particles */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-accent/50"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}
