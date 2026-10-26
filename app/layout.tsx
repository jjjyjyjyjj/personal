import type { Metadata } from "next";
import { Inter, Josefin_Sans, Playfair_Display } from "next/font/google";
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

// Magazine display face for mastheads and headlines. Variable, both styles.
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jiayun Lee",
  description: "My personal website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The head script sets data-theme before React hydrates.
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${josefin.variable} ${playfair.variable}`}>
      <head>
        {/* Applies a saved light/dark choice before paint; none → follow the OS. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');" +
              "if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
