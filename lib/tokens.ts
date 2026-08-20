export const T = {
  ink:       "#0E0F0D",
  charcoal:  "#1A1C1B",
  steelBlue: "#72858fff",
  steelPale: "#C7D9E3",
  grey:     "#312e2aff",
  greyDark: "#23201dff",
  parchment: "#E8DED0",
  ivory:     "#F4EEE5",
  cream:     "#FAF7F3",
} as const;

export type Token = keyof typeof T;
