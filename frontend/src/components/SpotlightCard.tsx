"use client";

import { useRef } from "react";

/**
 * Card wrapper whose ::before layer (see .spotlight in globals.css) follows the
 * cursor with a soft radial highlight. Only visible in dark mode; on touch
 * devices nothing fires so it degrades to a plain card.
 */
export default function SpotlightCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMouseMove} className={`spotlight ${className}`} style={style}>
      {children}
    </div>
  );
}
