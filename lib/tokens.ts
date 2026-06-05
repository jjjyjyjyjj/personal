export const T = {
  ink:       "#0E0F0D",
  mauveDark: "#111113ff",
  charcoal:  "#1A1C1B",
  steelBlue: "#6B8FA3",
  steelSoft: "#9BB5C5",
  steelPale: "#C7D9E3",
  taupe:     "#B09A82",
  taupeDark: "#7D6752",
  parchment: "#E8DED0",
  ivory:     "#F4EEE5",
  mauve:     "#9E8593",
  sepia:     "#6B5548",
  cream:     "#FAF7F3",
  mauvePale: "#C8B8C0",
} as const;

export type Token = keyof typeof T;
