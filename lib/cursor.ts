import type { CursorRefs } from "@/lib/types";

export function expandCursor({ dot, ring }: CursorRefs): void {
  if (dot.current)  dot.current.style.transform = "translate(-50%,-50%) scale(2)";
  if (ring.current) { ring.current.style.width = "60px"; ring.current.style.height = "60px"; }
}

export function resetCursor({ dot, ring }: CursorRefs): void {
  if (dot.current)  dot.current.style.transform = "translate(-50%,-50%) scale(1)";
  if (ring.current) { ring.current.style.width = "34px"; ring.current.style.height = "34px"; }
}
