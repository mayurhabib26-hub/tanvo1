import { useState } from "react";
import { Mail } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import { TextField, SelectField, TextAreaField } from "./ui/Field";
import { projectTypes, budgets } from "../lib/data";
import { socialLinks } from "../lib/socials";

const EMAIL = "hello@tanvo.in";

const initialForm = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "—"}`,
      `Project Type: ${form.projectType || "—"}`,
      `Budget: ${form.budget || "—"}`,
      "",
      form.message,
    ].join("\n");

    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `New project inquiry from ${form.name}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus("submitted");
  };

  return (
    <section id="contact" className="border-t border-line py-24 md:py-32">
      <div className="container-tanvo">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div>
            <Reveal>
              <SectionLabel>Contact</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-sm text-[32px] font-extrabold leading-[1.15] tracking-tight text-charcoal text-balance sm:text-[38px]">
                Let&rsquo;s build something meaningful.
              </h2>
            </Reveal>

            <Reveal delay={0.16} className="mt-12 space-y-10">
              <div>
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate">
                  Email
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  data-cursor="hover"
                  className="mt-3 inline-flex items-center gap-2 text-[16px] font-medium text-charcoal transition-colors hover:text-steel"
                >
                  <Mail size={16} strokeWidth={2} className="text-accent" />
                  {EMAIL}
                </a>
              </div>

              <div>
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate">
                  Follow
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      data-cursor="hover"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-slate transition-colors duration-300 hover:border-charcoal/30 hover:text-charcoal"
                    >
                      <social.icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            {status === "submitted" ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-line bg-ivory-dim px-8 text-center">
                <p className="text-[22px] font-bold tracking-tight text-charcoal">
                  Thank you.
                </p>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate">
                  Your email client should have opened with your message. We
                  typically reply within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setStatus("idle");
                  }}
                  className="mt-6 text-[13.5px] font-semibold text-steel underline underline-offset-4 hover:text-charcoal"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <TextField label="Name" name="name" required value={form.name} onChange={update("name")} />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                  />
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <TextField label="Company" name="company" value={form.company} onChange={update("company")} />
                  <SelectField
                    label="Project Type"
                    name="projectType"
                    options={projectTypes}
                    value={form.projectType}
                    onChange={update("projectType")}
                  />
                </div>

                <SelectField
                  label="Budget"
                  name="budget"
                  options={budgets}
                  value={form.budget}
                  onChange={update("budget")}
                />

                <TextAreaField
                  label="Message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                />

                <Button type="submit" data-cursor="hover">
                  Send Inquiry
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
