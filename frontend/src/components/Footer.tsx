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
  { href: "mailto:gabrielarquizacruz@gmail.com", label: "Email", icon: "/email.svg" },
  { href: "https://linkedin.com/in/gabriel-arquiza-cruz", label: "LinkedIn", icon: "/linkedin.svg" },
  { href: "https://github.com/gabrielzurc10", label: "GitHub", icon: "/github.svg" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-200 dark:bg-base-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="footer md:footer-horizontal md:justify-between">
          {/* Brand */}
          <aside className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Home">
              <Image src="/light-icon.png" alt="Gabriel Cruz" width={36} height={36} className="dark:hidden" />
              <Image src="/dark-icon.png" alt="Gabriel Cruz" width={36} height={36} className="hidden dark:block" />
              <span className="text-lg font-bold text-base-content">Gabriel Cruz</span>
            </Link>
            <p className="text-sm leading-relaxed text-base-content/60">
              Software Developer with over 4 years of experience
              designing, developing, and deploying scalable
              full-stack applications.
            </p>
          </aside>

          {/* Link columns */}
          <nav>
            <h6 className="footer-title">Explore</h6>
            {EXPLORE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="link link-hover text-sm text-base-content/70">
                {link.label}
              </Link>
            ))}
          </nav>

          <nav>
            <h6 className="footer-title">Connect</h6>
            {SOCIAL.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="link link-hover text-sm text-base-content/70"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <nav>
            <h6 className="footer-title">Legal</h6>
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="link link-hover text-sm text-base-content/70">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 pt-6">
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
          <p className="text-sm text-base-content/50">
            &copy; {year} Gabriel Cruz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
