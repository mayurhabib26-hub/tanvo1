import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

const VARIANTS = {
  primary: {
    light: "bg-steel text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]",
    dark: "bg-white text-[#080D1A] hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.15)]",
  },
  secondary: {
    light: "border border-line bg-white/[0.04] text-charcoal hover:border-accent/40 hover:bg-white/[0.08]",
    dark: "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10",
  },
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  tone = "light",
  icon = true,
  magnetic = true,
  className = "",
  ...rest
}) {
  const Component = href ? "a" : "button";
  const styles = VARIANTS[variant][tone];

  const content = (
    <Component
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      className={`group/btn relative inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[14px] font-semibold tracking-tight transition-colors duration-300 ease-out ${styles} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <ArrowRight
          size={16}
          strokeWidth={2.25}
          className="transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
        />
      )}
    </Component>
  );

  if (!magnetic) return content;

  return <Magnetic strength={0.3}>{content}</Magnetic>;
}
