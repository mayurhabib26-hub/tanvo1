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
            <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed text-blue-soft/60">
              Products. Platforms. Possibilities.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:flex sm:items-center sm:gap-10">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-cursor="hover"
                className="text-[14px] font-medium text-blue-soft/70 transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-6 py-8 sm:flex-row">
          <p className="text-[13px] text-blue-soft/45">
            © 2026 Tanvo. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                data-cursor="hover"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-line text-blue-soft/60 transition-colors duration-300 hover:border-white/30 hover:text-ivory"
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
