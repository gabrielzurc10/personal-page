"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The site sets `scroll-behavior: smooth` globally so in-page anchor links
 * (e.g. #skills) glide. That also makes Next's route-change scroll-to-top
 * animate, so navigating to a new page appears to "scroll up".
 *
 * To fix it without losing smooth anchors: disable smooth scrolling the moment
 * an internal page link is clicked — so the scroll-to-top is instant — then
 * restore it shortly after the new route renders.
 */
export default function ScrollManager() {
  const pathname = usePathname();

  // Disable smooth scrolling on internal path navigations (not #hash links).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const href = (e.target as HTMLElement | null)
        ?.closest("a")
        ?.getAttribute("href");
      // Path navigations start with "/" (e.g. /projects/rabbitrole). In-page
      // hash links ("#skills") and external links are left smooth/untouched.
      if (href && href.startsWith("/") && !href.startsWith("//")) {
        document.documentElement.style.scrollBehavior = "auto";
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // After the new route settles, restore the stylesheet's smooth behavior so
  // subsequent in-page anchor links animate again.
  useEffect(() => {
    const id = window.setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 100);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
