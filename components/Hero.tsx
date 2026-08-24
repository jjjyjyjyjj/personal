"use client";

import { T } from "@/lib/tokens";
import { HeroPetals } from "@/components/Scales";
import { useParallax } from "@/hooks/useParallax";

const Hero = () => {
  const scalesRef = useParallax(0.18);
  const textRef   = useParallax(0.08);
  return (
    <section className="hero-section" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", position: "relative" }}>

    {/* ── Left ── */}
    <div className="hero-left-panel" style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"8rem 4rem 4rem 6rem", position:"relative", zIndex:2, overflow:"hidden" }}>

      <span style={{
        position: "absolute", top: "4rem", left: "-1rem",
        fontFamily: "'Helvetica Neue', sans-serif",
        fontSize: "clamp(5rem, 10vw, 9rem)",
        fontWeight: 600,
        color: T.grey, opacity: 0.10,
        letterSpacing: "-0.02em",
        transform: "rotate(-90deg) translateX(-60%)",
        transformOrigin: "left top",
        whiteSpace: "nowrap",
        userSelect: "none",
        pointerEvents: "none",
      }}>
        portfolio
      </span>

      <div style={{
        position: "absolute", top: "5rem", left: "8rem", right: "3rem",
        display: "flex", alignItems: "center", gap: "1rem",
        opacity: 0.35,
      }}>
        <div style={{ flex: 1, height: 2, background: T.grey }} />
      </div>

      <div ref={textRef} className="parallax-wrap">
        <p className="fade1" style={{ fontFamily:"var(--font-josefin)", fontSize:".9rem", fontWeight:200, letterSpacing:"0.4em", textTransform:"uppercase", color:T.steelBlue }}>
          hello world
        </p>
        <h1 className="fade2" style={{ fontFamily:"'Helvetica Neue', sans-serif", fontSize:"clamp(4rem,8vw,9rem)", fontWeight:600, letterSpacing:"-0.08em", color:T.charcoal }}>
          I&apos;m <span style={{ color:T.steelBlue }}>Jia</span>
        </h1>
        <p className="fade3" style={{ fontSize:"1rem", fontStyle:"italic", fontFamily:"var(--font-josefin)", color:T.grey, lineHeight:1.6, maxWidth:"28rem" }}>
          Passionate about learning, creating, and ugly cats.
        </p>
        <div className="fade4 hero-buttons" style={{ marginTop:"3rem", display:"flex", gap:"1.5rem", alignItems:"center" }}>
          <a href="#projects"
            onMouseOver={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = T.steelBlue; el.style.color = T.cream; el.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e)  => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "none"; el.style.color = T.charcoal; el.style.transform = "none"; }}
            style={{ fontFamily:"var(--font-josefin)", fontSize:"1rem", fontWeight:400, letterSpacing:"0.3em", textTransform:"uppercase", padding:"1rem 2.5rem", border:`1px solid ${T.charcoal}`, backgroundColor:"none", color:T.charcoal, textDecoration:"none", transition:"background 0.3s, transform 0.2s, color 0.3s" }}>
            View Projects
          </a>
          <a href="#about"
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            onMouseOut={(e)  => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"; }}
            style={{ fontFamily:"var(--font-josefin)", fontSize:"1rem", fontWeight:400, letterSpacing:"0.2em", textTransform:"uppercase", color:T.charcoal, textDecoration:"none", opacity:0.5, display:"flex", alignItems:"center", gap:"0.5rem", transition:"opacity 0.3s" }}>
            About Me →
          </a>
        </div>
      </div>

      <div style={{ position:"absolute", bottom:"6rem", left:"4rem", right:"4rem", display:"flex", flexDirection:"column", gap:"2rem" }}>
        <div style={{ height:2, background:T.grey, opacity:0.2 }} />
      </div>
    </div>

    {/* ── Right: scales panel ── */}
    <div className="hero-right-panel" style={{ position:"relative", background:T.parchment, overflow:"hidden" }}>
      <div ref={scalesRef} className="parallax-wrap" style={{ position:"absolute", inset:"-20%", height:"140%" }}>
        <HeroPetals />
      </div>
    </div>

    {/* ── Languages card ── */}
    <div className="fade5 hero-lang-card" style={{ position:"absolute", bottom:"3rem", left:"40%", right:0, zIndex:10, backgroundColor:"#252422d3", padding:"1.25rem 1.5rem", boxShadow:"0 20px 60px rgba(14,15,13,0.18)", display:"flex", flexDirection:"column", gap:"0.5rem", maxWidth:"50%" }}>
      <span style={{ fontFamily:"var(--font-josefin)", fontSize:"1rem", letterSpacing:"0.3em", textTransform:"uppercase", color:T.steelPale }}>Languages</span>
      <span style={{ fontFamily:"'Helvetica Neue', sans-serif", fontSize:"0.9rem", fontWeight:300, color:T.ivory, lineHeight:1.6, letterSpacing:"0.3em" }}>C, Python, Java, SQL, Javascript, TypeScript, HTML/CSS, MIPS Assembly</span>
    </div>
  </section>
)};

export default Hero;