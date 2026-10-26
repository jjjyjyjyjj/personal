"use client";

import { useSyncExternalStore, type FC } from "react";

type Theme = "light" | "dark";

const DARK_QUERY = "(prefers-color-scheme: dark)";
const THEME_EVENT = "themechange";

/* The live theme is the reader's saved choice (data-theme on <html>, set
   before paint by the inline script in layout.tsx) or, failing that, the OS. */
const read = (): Theme =>
  (document.documentElement.dataset.theme as Theme | undefined) ??
  (window.matchMedia(DARK_QUERY).matches ? "dark" : "light");

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
};

const ThemeToggle: FC = () => {
  // null on the server, which can't see the reader's OS setting.
  const theme = useSyncExternalStore<Theme | null>(subscribe, read, () => null);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* private mode: still flips for this visit */ }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{ visibility: theme ? "visible" : "hidden" }}
    >
      <span aria-hidden>{theme === "dark" ? "☀" : "☾"}</span>
      {theme === "dark" ? "Day edition" : "Night edition"}
    </button>
  );
};

export default ThemeToggle;
