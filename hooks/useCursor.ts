"use client";

import { useEffect, useRef } from "react";
import type { CursorRefs } from "@/lib/types";

export function useCursor(): CursorRefs {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      const { clientX: x, clientY: y } = e;
      if (dot.current)  { dot.current.style.left  = `${x}px`; dot.current.style.top  = `${y}px`; }
      setTimeout(() => {
        if (ring.current) { ring.current.style.left = `${x}px`; ring.current.style.top = `${y}px`; }
      }, 80);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return { dot, ring };
}
