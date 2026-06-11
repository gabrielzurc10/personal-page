import Image from "next/image";
import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

const SOCIAL = [
  { href: "mailto:GabrielArquizaCruz@gmail.com", label: "Email", icon: "/email.svg" },
  { href: "https://linkedin.com/in/gabriel-arquiza-cruz", label: "LinkedIn", icon: "/linkedin.svg" },
  { href: "https://github.com/gabrielzurc10", label: "GitHub", icon: "/github.svg" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-white/10 dark:bg-[#0d0d0d]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2" aria-label="Home">
              <Image src="/light-icon.png" alt="Gabriel Cruz" width={36} height={36} className="dark:hidden" />
              <Image src="/dark-icon.png" alt="Gabriel Cruz" width={36} height={36} className="hidden dark:block" />
              <span className="text-lg font-bold text-neutral-900 dark:text-white">Gabriel Cruz</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Software engineer building reliable web apps with React, TypeScript, Python, and AWS.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Explore
              </h3>
              <ul className="mt-4 space-y-3">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Connect
              </h3>
              <ul className="mt-4 space-y-3">
                {SOCIAL.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-neutral-200 pt-6 dark:border-white/10">
          <div className="flex items-center gap-5">
            {SOCIAL.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={item.label}
                className="opacity-60 transition-opacity hover:opacity-100"
              >
                <Image src={item.icon} alt={item.label} width={18} height={18} className="dark:invert" />
              </a>
            ))}
          </div>
          <p className="text-sm text-neutral-400 dark:text-neutral-500">
            &copy; {year} Gabriel Cruz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
