"use client";

import type { FC } from "react";
import Link from "next/link";
import { T } from "@/lib/tokens";
import { NAV_LINKS } from "@/lib/data";
import type { CursorRefs } from "@/lib/types";
import { expandCursor, resetCursor } from "@/lib/cursor";

const Nav:FC = () => (
  <nav
    style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.5rem 3rem",
      background: `linear-gradient(to bottom, rgba(250,247,243,0.99), transparent)`,
      backdropFilter: "blur(3px)",
    }}
  >
    <Link
      href="/"
      style={{
        fontFamily:"'Helvetica Neue', sans-serif",
        fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.3em",
        textTransform: "uppercase", color: T.charcoal, textDecoration: "none",
      }}
    >
      Jia
    </Link>

    <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}>
      {NAV_LINKS.map((name) => (
        <li key={name}>
          <a
            href={`#${name.toLowerCase()}`}
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            onMouseOut={(e)  => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"; }}
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "0.8rem", fontWeight: 400, letterSpacing: "0.25em",
              textTransform: "uppercase", color: T.charcoal,
              textDecoration: "none", opacity: 0.6, transition: "opacity 0.3s",
            }}
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
