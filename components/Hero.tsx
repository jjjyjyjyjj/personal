"use client";

import type { CSSProperties } from "react";
import { T } from "@/lib/tokens";
import { interactive } from "@/lib/hover";
import { useParallax } from "@/hooks/useParallax";

/* Hero buttons.
   The resting styles live here so hoverOut can restore them from the same
   source the element rendered with — no second copy of the values to drift. */
const btnBase: CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: "1rem",
  fontWeight: 400,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  padding: "1rem",
  borderRadius: "2px",
  textDecoration: "none",
  transition: "background 0.3s, color 0.3s, border-color 0.3s, transform 0.2s",
};

const primaryBtn: CSSProperties = {
  ...btnBase,
  border: `1px solid ${T.footerFont}`,
  backgroundColor: T.footerFont,
  color: T.accentFont,
};

const secondaryBtn: CSSProperties = {
  ...btnBase,
  border: `1px solid ${T.normalFont}`,
  backgroundColor: "transparent",
  color: T.footerFont,
  display: "flex",
  alignItems: "center",
};

const primaryHover: CSSProperties = {
  backgroundColor: `color-mix(in srgb, ${T.accentFont} 50%, transparent)`,
  color: T.darkHoverFont,
  border: `1px solid ${T.darkHoverFont}`,
  transform: "translateY(-2px)",
};

const secondaryHover: CSSProperties = {
  backgroundColor: T.footerFont,
  color: T.accentFont,
  border: `1px solid ${T.footerFont}`,
  transform: "translateY(-2px)",
};

const Hero = () => {
  const scalesRef = useParallax(0.18);
  const textRef   = useParallax(0.08);
  return (
    <div className="hero-section page-fill" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", overflow: "hidden", position: "relative" }}>

    {/* ── Left ── */}
    <div className="hero-left-panel" style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"clamp(1rem, 4svh, 4rem) clamp(1.5rem, 4vw, 4rem)", position:"relative", zIndex:2, overflow:"hidden" }}>
    <div ref={textRef} className="parallax-wrap">
        <p className="fade1 kicker">Cover Story</p>
        <h1 className="fade1" style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontSize:"clamp(2.5rem, min(5.5vw, 8svh), 4.75rem)", fontWeight:500, lineHeight:1.0, letterSpacing:"-0.02em", color:T.normalFont, marginBottom:"clamp(0.75rem, 2.5svh, 1.5rem)" }}>
          hello world.
        </h1>
        <p className="fade3" style={{ fontSize:"1.35rem", fontFamily:"var(--font-serif)", color:T.normalFont, lineHeight:1.35, maxWidth:"26rem", fontWeight:400, borderTop:`1px solid ${T.normalFont}`, paddingTop:"1rem" }}>
          Passionate about learning, creating, and ugly cats.
        </p>
        <div className="fade4 hero-buttons" style={{ marginTop:"clamp(1.25rem, 4svh, 3rem)", display:"flex", gap:"1.5rem", alignItems:"center" }}>
          <a href="#projects" {...interactive(primaryBtn, primaryHover)}>
            Projects
          </a>
          <a href="#about" {...interactive(secondaryBtn, secondaryHover)}>
            About
          </a>
        </div>
      </div>

    </div>

    {/* ── Right: image panel ── */}
    <div className="hero-right-panel" style={{ position:"relative", overflow:"hidden" }}>
      <div ref={scalesRef} className="parallax-wrap" style={{ position:"absolute",  height:"100%", width:"100%", top:0, left:0,bottom:0, zIndex:1 }}>
      <figure style={{ margin:0, height:"100%" }}><img src="/hero.jpeg" alt="Background illustration of a figure, drawn by Jia" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }} /></figure>
      </div>
      <figcaption className="photo-credit">Illustration by Jia</figcaption>
    </div>

    {/* ── Languages card ── */}
    {/* <div className="fade5 hero-lang-card" style={{ position:"absolute", bottom:"3rem", left:"25%", right:0, zIndex:10, backgroundColor:"#2524227f", padding:"1.25rem 1.5rem", boxShadow:"0 20px 60px rgba(14,15,13,0.18)", display:"flex", flexDirection:"column", gap:"0.5rem", maxWidth:"50%" }}>
      <span style={{ fontFamily:"var(--font-inter)", fontSize:"1rem", letterSpacing:"0.3em", textTransform:"uppercase", color:T.hoverFont }}>Languages</span>
      <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.9rem", fontWeight:300, color:T.accentFont, lineHeight:1.6, letterSpacing:"0.3em" }}>C, Python, Java, SQL, Javascript, TypeScript, HTML/CSS, MIPS Assembly</span>
    </div> */}
  </div>
)};

export default Hero;