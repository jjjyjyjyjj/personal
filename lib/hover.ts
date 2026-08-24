import type { CSSProperties, FocusEvent, MouseEvent } from "react";

type Style = CSSProperties;

/** Writing "" removes the inline declaration so the resting value stands again. */
function write(el: HTMLElement, key: string, value: Style[keyof Style]): void {
  (el.style as unknown as Record<string, string>)[key] =
    value === undefined || value === null ? "" : String(value);
}

/**
 * Bind a resting style to a hover style and get back the props to spread onto
 * an element.
 *
 * On leave, every property the hover style touched is written back from `base`,
 * so an element cannot be left stuck in its hover state — the revert is derived
 * from the same object the element renders with, never a second copy that can
 * drift. Focus and blur mirror hover so keyboard users get the same feedback.
 *
 * Use matching property names in `base` and `hover` (both `backgroundColor`,
 * not one `background` and one `backgroundColor`) or the revert won't be exact.
 * Pass `enabled: false` for states that shouldn't react at all.
 */
export function interactive(base: Style, hover: Style, enabled = true) {
  const enter = (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
    if (!enabled) return;
    for (const [key, value] of Object.entries(hover)) write(e.currentTarget, key, value);
  };

  const leave = (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
    if (!enabled) return;
    for (const key of Object.keys(hover)) write(e.currentTarget, key, base[key as keyof Style]);
  };

  return {
    style: base,
    onMouseOver: enter,
    onMouseOut: leave,
    onFocus: enter,
    onBlur: leave,
  };
}
