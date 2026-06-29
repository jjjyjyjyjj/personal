export const T = {
  ink:       "#0E0F0D",
  mauveDark: "#111113ff",
  charcoal:  "#1A1C1B",
  steelBlue: "#72858fff",
  steelSoft: "#9BB5C5",
  steelPale: "#C7D9E3",
  grey:     "#312e2aff",
  greyDark: "#23201dff",
  parchment: "#E8DED0",
  ivory:     "#F4EEE5",
  mauve:     "#9E8593",
  sepia:     "#6B5548",
  cream:     "#FAF7F3",
  mauvePale: "#C8B8C0",
} as const;

export type Token = keyof typeof T;
