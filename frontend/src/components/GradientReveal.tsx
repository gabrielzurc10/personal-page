"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function GradientReveal({
  children,
  className = "",
  dot = false,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [centered, setCentered] = useState(false);

  const checkCenter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight;
    const elCenter = rect.top + rect.height / 2;
    const zone = viewH * 0.3;
    const viewCenter = viewH / 2;
    setCentered(elCenter > viewCenter - zone && elCenter < viewCenter + zone);
  }, []);

  useEffect(() => {
    checkCenter();
    window.addEventListener("scroll", checkCenter, { passive: true });
    window.addEventListener("resize", checkCenter, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkCenter);
      window.removeEventListener("resize", checkCenter);
    };
  }, [checkCenter]);

  return (
    <>
      {dot && (
        <div
          className="absolute left-[11px] top-0 hidden h-2.5 w-2.5 rounded-full bg-primary dark:bg-white md:block"
          style={centered ? { background: "linear-gradient(160deg, #60a5fa, #818cf8, #a78bfa, #c084fc)" } : undefined}
        />
      )}
      <div ref={ref} className={`${className} ${centered ? "in-view" : ""}`}>
        {children}
      </div>
    </>
  );
}
