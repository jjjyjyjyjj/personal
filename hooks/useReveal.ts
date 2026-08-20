"use client";

import { useEffect } from "react";

export function useReveal(): void {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reveal = (el: Element) => el.classList.add("visible");

    // No observer support: show everything rather than hiding it forever.
    if (typeof IntersectionObserver === "undefined") {
      els.forEach(reveal);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));

    // Safety net. An element that never reaches the 0.1 threshold — one taller
    // than the viewport, or observed while the viewport has no measurable
    // height — would otherwise sit at opacity 0 permanently.
    const sweep = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!vh) {
        els.forEach(reveal);
        return;
      }
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) reveal(el);
      });
    };

    const timer = window.setTimeout(sweep, 1000);
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep);

    return () => {
      obs.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
    };
  }, []);
}
