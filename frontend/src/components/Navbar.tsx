"use client";

import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200/60 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#0d0d0d]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" aria-label="Home">
          <Image src="/light-icon.png" alt="Gabriel Cruz" width={56} height={56} className="dark:hidden" />
          <Image src="/dark-icon.png" alt="Gabriel Cruz" width={56} height={56} className="hidden dark:block" />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
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
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-neutral-200/60 bg-white px-6 py-4 dark:border-white/10 dark:bg-[#0d0d0d] md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
