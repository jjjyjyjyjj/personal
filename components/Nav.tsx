"use client";

import type { CSSProperties, FC } from "react";
import Link from "next/link";
import { T } from "@/lib/tokens";
import { interactive } from "@/lib/hover";
import { NAV_LINKS } from "@/lib/data";

const navLink: CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.8rem",
  fontWeight: 400,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: T.accentFont,
  textDecoration: "none",
  transition: "color 0.3s",
};

const navLinkHover: CSSProperties = { color: T.hoverFont };

const Nav:FC = () => (
  <nav
    style={{
      position: "fixed", zIndex: 100, width: "100%",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1rem clamp(1.25rem, 4vw, 4rem)",
      backgroundColor: T.nav,
      borderBottom:"2px solid " + T.accentFont,
    }}
  >
    <Link
      href="/"
      style={{
        fontFamily:"var(--font-inter)",
        fontSize: "2.5rem", fontWeight: 600,
        textTransform: "uppercase", color: T.accentFont,
        letterSpacing: "-0.05em", textDecoration: "none"
      }}
    >
      Jia
    </Link>

    <ul style={{ display: "flex", flexWrap: "wrap", gap: "clamp(0.9rem, 2.5vw, 2.5rem)", listStyle: "none", margin: 0, padding: 0 }}>
      {NAV_LINKS.map((name) => (
        <li key={name}>
          <a href={`#${name.toLowerCase()}`} {...interactive(navLink, navLinkHover)}>
            {name}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
