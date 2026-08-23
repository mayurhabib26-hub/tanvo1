import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import tanvoMark from "../../assets/tanvo-mark.png";

const SESSION_KEY = "tanvo_intro_played";
const EASE = [0.16, 1, 0.3, 1];

// Metallic silver-gray + royal-blue, matching the brand reference reel —
// no near-black tones, everything reads as polished glass/metal.
const COLORS = [
  { base: "#9AA1AC", light: "#F5F7F9" },
  { base: "#7D8590", light: "#E8EBEF" },
  { base: "#1E46D6", light: "#6FA1FF" },
  { base: "#2F5DFF", light: "#8FC4FF" },
];

const SHAPES = [
  { type: "sphere", clipPath: null },
  { type: "cube", clipPath: null },
  { type: "triangle", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" },
  { type: "diamond", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
  { type: "pentagon", clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" },
];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Background field: shapes scattered edge-to-edge that gently drift and
// rotate in place for the whole intro — they never travel to the center,
// they're atmosphere, not the logo's raw material.
function generateAmbient(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = randomBetween(0, Math.PI * 2);
    const radius = randomBetween(14, 50); // % — keeps a clear zone near center
    const depth = Math.random();

    return {
      id: i,
      shape: pick(SHAPES),
      color: pick(COLORS),
      size: randomBetween(6, 14) + depth * 14,
      blur: (1 - depth) * 3,
      opacity: 0.35 + depth * 0.5,
      x: Math.min(97, Math.max(3, 50 + Math.cos(angle) * radius)),
      y: Math.min(94, Math.max(6, 50 + Math.sin(angle) * radius * 0.85)),
      floatX: randomBetween(-10, 10),
      floatY: randomBetween(-18, -7),
      rotA: randomBetween(-8, 8),
      rotB: randomBetween(-22, 22),
      duration: randomBetween(4, 8),
      delay: randomBetween(0, 3),
    };
  });
}

// Assembly layer: bright motes that spiral inward (curved via a mid-point
// offset) and dissolve right as the solid mark crossfades in over them.
function generateSparks(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = randomBetween(0, Math.PI * 2);
    const radius = randomBetween(10, 34);
    const curveSign = Math.random() > 0.5 ? 1 : -1;

    return {
      id: i,
      size: randomBetween(3, 7),
      startX: Math.cos(angle) * radius,
      startY: Math.sin(angle) * radius,
      curveX: Math.cos(angle + curveSign * 0.9) * radius * 0.5,
      curveY: Math.sin(angle + curveSign * 0.9) * radius * 0.5,
      delay: randomBetween(0, 0.35),
    };
  });
}

function AmbientParticle({ p }) {
  const isRound = p.shape.type === "sphere";
  const isCube = p.shape.type === "cube";

  return (
    <span
      aria-hidden="true"
      className="absolute"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        marginLeft: -p.size / 2,
        marginTop: -p.size / 2,
        opacity: p.opacity,
        borderRadius: isRound ? "50%" : isCube ? "22%" : 0,
        clipPath: p.shape.clipPath ?? undefined,
        background: isRound
          ? `radial-gradient(circle at 32% 28%, ${p.color.light}, ${p.color.base} 70%)`
          : `linear-gradient(135deg, ${p.color.light}, ${p.color.base})`,
        boxShadow: `0 6px 14px rgba(11,15,25,0.16)`,
        filter: `blur(${p.blur}px)`,
        animationName: "intro-float",
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        "--float-x": `${p.floatX}px`,
        "--float-y": `${p.floatY}px`,
        "--rot-a": `${p.rotA}deg`,
        "--rot-b": `${p.rotB}deg`,
      }}
    />
  );
}

function Spark({ s, duration }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: s.size,
        height: s.size,
        marginLeft: -s.size / 2,
        marginTop: -s.size / 2,
        background: "radial-gradient(circle, #EAF4FF 0%, #4C86FF 60%, transparent 75%)",
        boxShadow: "0 0 6px rgba(59,130,246,0.85), 0 0 2px rgba(255,255,255,0.9)",
      }}
      initial={{ x: `${s.startX}vw`, y: `${s.startY}vh`, opacity: 0, scale: 0.5 }}
      animate={{
        x: [`${s.startX}vw`, `${s.curveX}vw`, "0vw"],
        y: [`${s.startY}vh`, `${s.curveY}vh`, "0vh"],
        opacity: [0, 1, 0.9, 0],
        scale: [0.5, 1, 0.6, 0.2],
      }}
      transition={{ duration, delay: s.delay, ease: EASE, times: [0, 0.55, 0.85, 1] }}
    />
  );
}

function SparkleAccent({ delay }) {
  const x = useMemo(() => randomBetween(10, 90), []);
  const y = useMemo(() => randomBetween(15, 85), []);

  return (
    <motion.span
      aria-hidden="true"
      className="absolute h-3 w-3 sm:h-4 sm:w-4"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: "linear-gradient(135deg, #ffffff, #6FA1FF)",
        clipPath:
          "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.7] }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}

export default function IntroAnimation() {
  const [shouldRender, setShouldRender] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== "true";
    } catch {
      return true;
    }
  });
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(false);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );

  const ambientCount = prefersReducedMotion ? 0 : isMobile ? 28 : 70;
  const sparkCount = prefersReducedMotion ? 0 : isMobile ? 10 : 26;
  const accentCount = prefersReducedMotion ? 0 : isMobile ? 2 : 3;

  const ambient = useMemo(
    () => (ambientCount > 0 ? generateAmbient(ambientCount) : []),
    [ambientCount]
  );
  const sparks = useMemo(
    () => (sparkCount > 0 ? generateSparks(sparkCount) : []),
    [sparkCount]
  );

  const SPARK_DURATION = 1.3;
  const MARK_DELAY = prefersReducedMotion ? 0.1 : 1.45;
  const MARK_DURATION = prefersReducedMotion ? 0.35 : 0.55;
  const GLOW_DELAY = Math.max(0, MARK_DELAY - 0.15);
  const WORD_DELAY = MARK_DELAY + (prefersReducedMotion ? 0.3 : 0.45);
  const WORD_DURATION = prefersReducedMotion ? 0.25 : 0.4;
  const TAG_DELAY = WORD_DELAY + (prefersReducedMotion ? 0.2 : 0.35);
  const TAG_DURATION = prefersReducedMotion ? 0.25 : 0.4;
  const HOLD = prefersReducedMotion ? 0.35 : 0.4;
  const EXIT_DURATION = prefersReducedMotion ? 0.4 : 0.7;
  const exitAtMs = (TAG_DELAY + TAG_DURATION + HOLD) * 1000;

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // sessionStorage unavailable (private mode etc.) — animation still
      // completes, it just may replay on next load.
    }
    setShouldRender(false);
  }

  useEffect(() => {
    if (!shouldRender) return;

    // A class (not inline style) so this can't be clobbered by Navbar's own
    // body.style.overflow toggle for its mobile menu.
    document.body.classList.add("overflow-hidden");

    const exitTimer = setTimeout(() => setExiting(true), exitAtMs);
    // Hard safety net: force the overlay away even if the exit animation's
    // onAnimationComplete never fires, so it can never block the site.
    const fallbackTimer = setTimeout(finish, exitAtMs + EXIT_DURATION * 1000 + 1500);

    return () => {
      document.body.classList.remove("overflow-hidden");
      clearTimeout(exitTimer);
      clearTimeout(fallbackTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        perspective: 1000,
        backgroundImage:
          "radial-gradient(circle at 50% 45%, var(--color-ivory) 0%, var(--color-ivory-dim) 100%)",
      }}
      animate={exiting ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
      transition={{ duration: EXIT_DURATION, ease: EASE }}
      onAnimationComplete={() => {
        if (exiting) finish();
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute h-[46vh] w-[46vh] rounded-full bg-accent/40 blur-3xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 0.8, 0.55], scale: [0.7, 1.15, 1] }}
        transition={{ duration: 1, delay: GLOW_DELAY, ease: EASE }}
      />

      {ambient.length > 0 && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {ambient.map((p) => (
            <AmbientParticle key={p.id} p={p} />
          ))}
        </motion.div>
      )}

      {sparks.map((s) => (
        <Spark key={s.id} s={s} duration={SPARK_DURATION} />
      ))}

      {Array.from({ length: accentCount }, (_, i) => (
        <SparkleAccent key={i} delay={GLOW_DELAY + 0.4 + i * 0.3} />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.img
          src={tanvoMark}
          alt="Tanvo"
          className="h-24 w-24 object-contain sm:h-28 sm:w-28"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: MARK_DURATION, delay: MARK_DELAY, ease: EASE }}
        />

        <motion.span
          className="mt-4 text-[40px] font-extrabold tracking-tight text-charcoal sm:text-[52px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: WORD_DURATION, delay: WORD_DELAY, ease: EASE }}
        >
          Tanvo
        </motion.span>

        <motion.span
          className="mt-2 text-[15px] font-medium tracking-wide text-slate sm:text-[17px]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: TAG_DURATION, delay: TAG_DELAY, ease: EASE }}
        >
          Products. Platforms. Possibilities.
        </motion.span>
      </div>
    </motion.div>
  );
}
