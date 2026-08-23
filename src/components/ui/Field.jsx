export function TextField({ label, name, type = "text", required, value, onChange, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-3 w-full border-b border-line bg-transparent pb-3 text-[15px] text-charcoal outline-none transition-colors duration-300 placeholder:text-slate/50 focus:border-charcoal"
      />
    </label>
  );
}

export function SelectField({ label, name, options, required, value, onChange, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-3 w-full appearance-none border-b border-line bg-transparent bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%226E6A85%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_2px_center] bg-no-repeat pb-3 text-[15px] text-charcoal outline-none transition-colors duration-300 focus:border-charcoal"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TextAreaField({ label, name, required, value, onChange, rows = 4, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        className="mt-3 w-full resize-none border-b border-line bg-transparent pb-3 text-[15px] text-charcoal outline-none transition-colors duration-300 placeholder:text-slate/50 focus:border-charcoal"
      />
    </label>
  );
}
