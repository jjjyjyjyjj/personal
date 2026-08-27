"use client";

import { useEffect } from "react";

export function useReveal(): void {
  useEffect(() => {
    // The inline script in layout.tsx already armed .js-reveal before paint and
    // started a failsafe that strips it if we never get here. We did, so cancel it.
    clearTimeout((window as unknown as { __revealFailsafe?: number }).__revealFailsafe);

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
      { threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));

    // Safety net for anything the observer misses.
    const sweep = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!vh) {
        els.forEach(reveal);
        return;
      }
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh) reveal(el);
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
