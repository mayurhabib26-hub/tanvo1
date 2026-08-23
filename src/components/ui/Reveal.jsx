import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 22,
  duration = 0.7,
  className = "",
  once = true,
  amount = 0.3,
}) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({ children, className = "", stagger = 0.08, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "", y = 18, duration = 0.6 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
