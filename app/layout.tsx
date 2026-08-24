import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";

// Self-hosted at build time — no request to fonts.googleapis.com, no FOUT.

// Site-wide face. No `weight`, so this pulls Inter's variable font: one file
// covering 100–900, rather than a separate download per weight.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Now used only by the Projects catalog, which sets it at 400 throughout.
// Add weights here if that section ever needs them — otherwise the browser
// synthesises a faux bold instead of loading a real one.
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jiayun Lee",
  description: "My personal website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${josefin.variable}`}>
      <body>{children}</body>
    </html>
  );
}
