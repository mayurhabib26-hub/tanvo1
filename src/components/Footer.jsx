import Logo from "./Logo";
import { footerLinks } from "../lib/data";
import { socialLinks } from "../lib/socials";

export default function Footer() {
  return (
    <footer className="bg-dark pt-20">
      <div className="container-tanvo">
        <div className="flex flex-col justify-between gap-12 border-b border-dark-line pb-16 lg:flex-row lg:items-end">
          <div>
            <Logo variant="light" />
            <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed text-slate-400">
              Products. Platforms. Possibilities.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:flex sm:items-center sm:gap-10">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-cursor="hover"
                className="text-[16px] font-medium text-slate-300 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-6 py-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("tanvo:replay-intro"))}
              data-cursor="hover"
              className="text-[12.5px] font-medium text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dark-line hover:border-white/20"
            >
              <span>↺</span> Replay Intro
            </button>
            <p className="text-[13px] text-slate-500">
              © 2026 Tanvo. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                data-cursor="hover"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-line text-slate-400 transition-colors duration-300 hover:border-white/30 hover:text-white"
              >
                <social.icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
