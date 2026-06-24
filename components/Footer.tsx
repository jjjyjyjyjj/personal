"use client";

import type { FC } from "react";
import { T } from "@/lib/tokens";
import { FOOTER_LINKS } from "@/lib/data";
const Footer: FC = () => (
  <footer style={{ background:T.ink, padding:"2rem 6rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
    <span style={{ fontFamily:"'Helvetica Neue', sans-serif", fontSize:"1rem", fontWeight:300, letterSpacing:"0.3em", textTransform:"uppercase", color:T.ivory }}>
      Jia
    </span>

    <div style={{ display:"flex", flexDirection:"row", gap:"2rem" }}>
      {FOOTER_LINKS.map((link) => (
        <a
          key={link}
          href="#"
          onMouseOver={(e)  => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          onMouseOut={(e)   => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"; }}
          style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"1rem", fontWeight:800, letterSpacing:"0.25em", textTransform:"uppercase", color:T.parchment, textDecoration:"none", opacity:0.5, transition:"opacity 0.3s" }}
        >
          {link}
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
