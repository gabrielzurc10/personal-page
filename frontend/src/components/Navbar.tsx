"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const RESUME_URL = `${API_BASE}/api/resume`;

// Heroicons outline paths (24x24): sparkles, briefcase, folder, academic-cap, envelope
const NAV_LINKS = [
  {
    href: "#skills",
    label: "Skills",
    icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z",
  },
  {
    href: "#experience",
    label: "Experience",
    icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z",
  },
  {
    href: "#projects",
    label: "Projects",
    icon: "M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z",
  },
  {
    href: "#education",
    label: "Education",
    icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5",
  },
  {
    href: "#contact",
    label: "Contact",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
  },
];

function NavIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function Navbar({ showSections = true }: { showSections?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  // Scroll-spy: highlight the nav link for the section currently under the navbar.
  useEffect(() => {
    if (!showSections) return;
    const ids = NAV_LINKS.map((link) => link.href.slice(1));

    const onScroll = () => {
      // Switch when a section's content passes the viewport center.
      const offset = window.innerHeight / 2;

      // The active section is the last one whose top has scrolled past the
      // offset line. This naturally handles the bottom of the page.
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showSections]);

  // Slide the desktop pill to the active link (and keep it in sync on resize).
  useEffect(() => {
    if (!showSections) return;
    const update = () => {
      const i = NAV_LINKS.findIndex((link) => link.href === `#${activeId}`);
      const el = linkRefs.current[i];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
      else setPill((prev) => ({ ...prev, width: 0 }));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeId, showSections]);

  const isActive = (href: string) => href === `#${activeId}`;

  // Shared shape + text color. The pill background is rendered separately:
  // a sliding span on desktop, a static bg on the active mobile link.
  const linkClass = (href: string) =>
    `rounded-full px-4 py-2 text-sm font-bold transition-colors ${
      isActive(href)
        ? "text-primary-content"
        : "text-base-content/60 hover:text-base-content"
    }`;

  return (
    <nav className="navbar fixed top-0 z-50 min-h-16 w-full flex-col bg-base-200 p-0 dark:bg-base-100">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center px-6">
        {/* Logo — pinned to the left edge */}
        <a
          href={showSections ? "#" : "/"}
          aria-label="Home"
          className="absolute left-6 top-1/2 -translate-y-1/2"
        >
          <Image src="/light-icon.png" alt="Gabriel Cruz" width={56} height={56} className="dark:hidden" />
          <Image src="/dark-icon.png" alt="Gabriel Cruz" width={56} height={56} className="hidden dark:block" />
        </a>

        {/* Desktop nav — links grouped and centered in the bar */}
        {showSections && (
          <div className="relative mx-auto hidden h-16 items-center gap-1 md:flex">
            {/* Sliding pill behind the active link */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 z-0 h-9 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ease-out"
              style={{
                left: pill.left,
                width: pill.width,
                opacity: pill.width ? 1 : 0,
              }}
            />
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                className={`relative z-10 flex items-center gap-1.5 ${linkClass(link.href)}`}
              >
                <NavIcon path={link.icon} />
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Resume + theme toggle — pinned to the right edge (desktop) */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 items-center gap-3 md:flex">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm h-9 rounded-full px-4 text-sm"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          {/* Without a menu, keep the toggle in the bar; otherwise it lives inside the menu. */}
          {!showSections && (
            <>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm h-9 rounded-full px-4 text-sm"
              >
                Resume
              </a>
              <ThemeToggle />
            </>
          )}
          {showSections && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn btn-ghost btn-square btn-sm"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <Image src="/close.svg" alt="close menu" width={24} height={24} className="dark:invert" />
              ) : (
                <Image src="/menu.svg" alt="open menu" width={24} height={24} className="dark:invert" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {showSections && mobileOpen && (
        <div className="flex w-full flex-col items-center bg-base-200 px-6 py-4 dark:bg-base-100">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`inline-flex items-center gap-1.5 ${linkClass(link.href)} ${isActive(link.href) ? "bg-primary" : ""}`}
            >
              <NavIcon path={link.icon} />
              {link.label}
            </a>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="btn btn-outline btn-sm mt-2 h-9 rounded-full px-5 text-sm"
          >
            Resume
          </a>
          {/* Appearance switch inside the hamburger menu */}
          <div className="mt-4 flex w-full justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
