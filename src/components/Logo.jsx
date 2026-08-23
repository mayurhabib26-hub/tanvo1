import tanvoMark from "../assets/tanvo-mark.png";

export default function Logo({ showLabel = true, className = "" }) {
  const textColor = "text-white";
  const labelColor = "text-accent/90";

  return (
    <a
      href="#home"
      aria-label="Tanvo — home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <img
        src={tanvoMark}
        alt=""
        width={33}
        height={34}
        className="h-[34px] w-auto shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5"
      />

      {showLabel && (
        <span className="flex flex-col leading-none">
          <span className={`font-extrabold text-[19px] tracking-tight ${textColor}`}>
            Tanvo
          </span>
          <span className={`mt-1 text-[9.5px] font-semibold uppercase tracking-[0.18em] ${labelColor}`}>
            Digital Studio
          </span>
        </span>
      )}
    </a>
  );
}
