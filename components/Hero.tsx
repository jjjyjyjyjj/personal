"use client";

import type { FC } from "react";
import { T } from "@/lib/tokens";
import type { CursorRefs } from "@/lib/types";
import { expandCursor, resetCursor } from "@/lib/cursor";
import { HeroPetals } from "@/components/Scales";

const Hero: FC<{ cursor: CursorRefs }> = ({ cursor }) => (
  <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", position: "relative" }}>
    {/* ── Left ── */}
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"8rem 4rem 4rem 6rem", position:"relative", zIndex:2 }}>
      <p className="fade1" style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:".9rem", fontWeight:200, letterSpacing:"0.4em", textTransform:"uppercase", color:T.steelBlue, marginBottom:"2rem" }}>
        hello world
      </p>

      <h1 className="fade2" style={{ fontSize:"clamp(3.5rem,6vw,6rem)", fontWeight:300, lineHeight:1.05, letterSpacing:"-0.01em", color:T.charcoal }}>
        I'm <em style={{ fontStyle:"italic", color:T.steelBlue }}>Jia</em>
      </h1>

      <p className="fade3" style={{ marginTop:"2rem", fontSize:"1.1rem", fontWeight:300, fontStyle:"italic", color:T.taupe, lineHeight:1.6, maxWidth:"28rem" }}>
        Passionate about learning, creating and ugly cats.
      </p>

      <div className="fade4" style={{ marginTop:"3rem", display:"flex", gap:"1.5rem", alignItems:"center" }}>
        <a
          href="#projects"
          onMouseEnter={() => expandCursor(cursor)}
          onMouseLeave={() => resetCursor(cursor)}
          onMouseOver={(e)  => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = T.steelBlue; el.style.color = T.cream ;el.style.transform = "translateY(-2px)"; }}
          onMouseOut={(e)   => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "none";  el.style.color = T.charcoal;el.style.transform = "none"; }}
          style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"1rem", fontWeight:400, letterSpacing:"0.3em", textTransform:"uppercase", padding:"1rem 2.5rem", border:`1px solid ${T.charcoal}`, backgroundColor:"none", color:T.charcoal, textDecoration:"none", transition:"background 0.3s, transform 0.2s" }}
        >
          View Projects
        </a>
        <a
          href="#about"
          onMouseEnter={() => expandCursor(cursor)}
          onMouseLeave={() => resetCursor(cursor)}
          onMouseOver={(e)  => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          onMouseOut={(e)   => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"; }}
          style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"1rem", fontWeight:400, letterSpacing:"0.2em", textTransform:"uppercase", color:T.charcoal, textDecoration:"none", opacity:0.5, display:"flex", alignItems:"center", gap:"0.5rem", transition:"opacity 0.3s" }}
        >
          About Me →
        </a>
      </div>
    </div>

    {/* ── Right: scales panel ── */}
    <div style={{ position:"relative", background:T.parchment, overflow:"hidden" }}>
      <HeroPetals />
    </div>

    {/* ── Languages card — spans both columns, 80% over right panel ── */}
    {/* left: 40% means it starts at 40% of section width = 20% into the right column */}
    <div
      className="fade5"
      style={{
        position: "absolute",
        bottom: "3rem",
        left: "40%",
        right: 0,
        zIndex: 10,
        backgroundColor: "#252422d3",
        padding: "1.25rem 1.5rem",
        boxShadow: "0 20px 60px rgba(14,15,13,0.18)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxWidth: "50%",
      }}
    >
      <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"1rem", letterSpacing:"0.3em", textTransform:"uppercase", color:T.steelSoft }}>
        Languages & Frameworks
      </span>
      <span style={{ fontSize:"1rem", fontWeight:300, color:T.ivory, lineHeight:1.6, letterSpacing:"0.3em" }}>
        C, Python, Java, SQL, Javascript/TypeScript, React, HTML/CSS
      </span>
    </div>
  </section>
);

export default Hero;