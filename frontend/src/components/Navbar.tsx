"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

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
        ? "text-white dark:text-black"
        : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 z-50 w-full bg-white dark:bg-[#0d0d0d]">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center px-6">
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
              className="pointer-events-none absolute top-1/2 z-0 h-9 -translate-y-1/2 rounded-full bg-black transition-all duration-300 ease-out dark:bg-white"
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
                className={`relative z-10 flex items-center ${linkClass(link.href)}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Theme toggle — pinned to the right edge (desktop) */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:block">
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-4 md:hidden">
          <ThemeToggle />
          {showSections && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-neutral-500 dark:text-neutral-400"
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
        <div className="border-t border-neutral-200/60 bg-white px-6 py-4 dark:border-white/10 dark:bg-[#0d0d0d] md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block ${linkClass(link.href)} ${isActive(link.href) ? "bg-black dark:bg-white" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
