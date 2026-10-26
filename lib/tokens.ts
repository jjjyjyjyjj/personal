/* Every colour resolves to a CSS variable, so the light and dark palettes
   live in one place (globals.css) and swap without re-rendering. */
export const T = {
  ink:       "var(--ink)",
  charcoal:  "var(--ink)",
  steelBlue: "var(--tab-2)",
  grey:      "var(--muted)",
  paper:     "var(--paper)",
  nav:       "var(--ink)",
  accentFont: "var(--on-ink)",
  normalFont: "var(--ink)",
  footer:    "var(--paper-shade)",
  footerFont: "var(--ink-soft)",
  hoverFont: "var(--ink-hover)",
  darkHoverFont: "var(--ink)",
  detail:    "var(--accent)",
  subFont:   "var(--sub)",
  hoverRow:  "var(--row-hover)",
} as const;
