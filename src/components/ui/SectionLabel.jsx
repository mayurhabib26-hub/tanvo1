export default function SectionLabel({ children, tone = "light", className = "" }) {
  const color = tone === "dark" ? "text-blue-soft/80" : "text-steel";
  const line = tone === "dark" ? "bg-white/25" : "bg-steel/40";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`h-px w-8 ${line}`} />
      <span className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${color}`}>
        {children}
      </span>
    </div>
  );
}
