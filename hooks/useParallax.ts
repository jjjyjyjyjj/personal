"use client";

import { useEffect, useRef } from "react";

export function useParallax(speed = 0.3, axis: "X" | "Y" = "Y") {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = axis === "Y" ? `translateY(${offset}px)` : `translateX(${offset}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed, axis]);

  return ref;
}