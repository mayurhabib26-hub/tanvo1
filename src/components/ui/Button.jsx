import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

const VARIANTS = {
  primary: {
    light: "bg-charcoal text-ivory hover:bg-[#262C52]",
    dark: "bg-ivory text-charcoal hover:bg-white",
  },
  secondary: {
    light: "border border-line text-charcoal hover:border-charcoal/40 hover:bg-ivory-dim",
    dark: "border border-white/20 text-ivory hover:border-white/40 hover:bg-white/5",
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
