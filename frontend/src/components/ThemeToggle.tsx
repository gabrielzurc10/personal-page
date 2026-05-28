"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  const options = [
    { value: "light", label: "Light", src: "/sun.svg" },
    { value: "dark", label: "Dark", src: "/moon.svg" },
    { value: "system", label: "System", src: "/monitor.svg" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full bg-neutral-100 p-1 dark:bg-white/10">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`rounded-full p-1.5 transition-colors ${
            theme === option.value
              ? "bg-white text-neutral-900 shadow-sm dark:bg-white/20 dark:text-white"
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

