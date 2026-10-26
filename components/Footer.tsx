"use client";

import type { FC } from "react";
import type { CSSProperties } from "react";
import { T } from "@/lib/tokens";
import { interactive } from "@/lib/hover";
import { FOOTER_LINKS } from "@/lib/data";
const footerLink: CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: T.footerFont,
  textDecoration: "none",
  opacity: 0.5,
  transition: "opacity 0.3s",
};

const footerLinkHover: CSSProperties = { opacity: 1 };

const Footer: FC = () => (
  <footer style={{ background:"transparent", padding:"1.5rem clamp(1.25rem, 5vw, 6rem)", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid ${T.normalFont}` }}>
    <span style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontSize:"1rem", color:T.footerFont }}>
      Jia &mdash; Issue 10, Autumn 2026
    </span>

    <div style={{ display:"flex", flexDirection:"row", gap:"2rem" }}>
      {FOOTER_LINKS.map((link) => (
        <a key={link} href="#cover" {...interactive(footerLink, footerLinkHover)}>
          {link}
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
