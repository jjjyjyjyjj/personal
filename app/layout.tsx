import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

// Self-hosted at build time — no request to fonts.googleapis.com, no FOUT.
// 200–700 covers every weight the components actually ask for.
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jiayun Lee",
  description: "My personal website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={josefin.variable}>
      <body>{children}</body>
    </html>
  );
}
