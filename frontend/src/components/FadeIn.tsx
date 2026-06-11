"use client";

import { useEffect, useState } from "react";

/**
 * Fade + lift content in once it mounts (on page load / navigation).
 * Mirrors the site's ScrollReveal style; `delay` staggers multiple blocks.
 */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Paint the hidden state first, then flip on the next frame so it animates.
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
