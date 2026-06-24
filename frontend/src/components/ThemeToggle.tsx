"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const OPTIONS = [
  { value: "light", label: "Light", src: "/sun.svg" },
  { value: "dark", label: "Dark", src: "/moon.svg" },
  { value: "system", label: "System", src: "/monitor.svg" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useEffect(() => setMounted(true), []);

  // Slide the highlight to the selected option (and keep it in sync on resize).
  useEffect(() => {
    if (!mounted) return;
    const update = () => {
      const i = OPTIONS.findIndex((o) => o.value === theme);
      const el = btnRefs.current[i];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [theme, mounted]);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <div className="relative flex items-center gap-1 rounded-full bg-neutral-100 p-1 dark:bg-white/10">
      {/* Sliding highlight behind the selected option */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 z-0 rounded-full bg-white shadow-sm transition-all duration-300 ease-out dark:bg-white/20"
        style={{
          left: pill.left,
          width: pill.width,
          height: "calc(100% - 0.5rem)",
          opacity: pill.width ? 1 : 0,
        }}
      />
      {OPTIONS.map((option, i) => (
        <button
          key={option.value}
          ref={(el) => {
            btnRefs.current[i] = el;
          }}
          onClick={() => setTheme(option.value)}
          className={`relative z-10 rounded-full p-1.5 transition-colors ${
            theme === option.value
              ? "text-neutral-900 dark:text-white"
              : "text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
          }`}
          title={option.label}
          aria-label={`Switch to ${option.label} mode`}
        >
          <Image
            src={option.src}
            alt={option.label}
            width={16}
            height={16}
            className={`dark:invert ${theme === option.value ? "opacity-100" : "opacity-40"}`}
          />
        </button>
      ))}
    </div>
  );
}
