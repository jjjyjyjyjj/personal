"use client";

import type { FC } from "react";
import { T } from "@/lib/tokens";
import { AboutPetals } from "@/components/Scales";
import SectionLabel from "@/components/SectionLabel";
import { useParallax } from "@/hooks/useParallax";

const About: FC = () => {
  const scalesRef = useParallax(0.15);
  const textRef   = useParallax(0.06);

  return (
    <section id="about" className="about-grid" style={{ backgroundColor:T.ivory, display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"100vh" }}>

      {/* ── Image col ── */}
      <div className="about-image-col" style={{ background:T.parchment, position:"relative", overflow:"hidden", minHeight:"100vh" }}>
        <div ref={scalesRef} className="parallax-wrap" style={{ position:"absolute", inset:"-20%", height:"140%" }}>
          <AboutPetals />
        </div>
      </div>

      {/* ── Text col ── */}
      <div className="reveal about-text-col" style={{ paddingLeft:"5rem", paddingRight:"5rem", paddingTop:"100px", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", minHeight:"100vh" }}>
        <div style={{ position:"absolute", top:"3rem", left:"5rem", right:"5rem", display:"flex", alignItems:"center", gap:"1rem", opacity:0.25 }}>
          <div style={{ flex:1, height:1, background:T.taupe }} />
          <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"0.45rem", letterSpacing:"0.4em", textTransform:"uppercase", color:T.taupe, whiteSpace:"nowrap" }}>2025</span>
        </div>
        <div ref={textRef} className="parallax-wrap">
          <SectionLabel>About</SectionLabel>
          <h2 style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:300, lineHeight:1.2, marginBottom:"2rem", color:T.charcoal }}>Who am I?</h2>
          <p style={{ fontSize:"1.05rem", fontWeight:300, lineHeight:1.9, color:T.taupeDark, maxWidth:"34rem", marginBottom:"3rem" }}>
            I'm currently an undergraduate at the University of Toronto studying Computer Science and Statistics. I like building stuff that helps my friends and I either :
            <br /><br />1. Save money<br />2. Make our lives easier<br />3. Entertain us
            <br /><br />Outside of the classroom, I've spent the past few years running a small business selling handmade jewelry. I also like drawing, going to the gym and staring at ugly animals on the street.
            <br /><br />I've always been fascinated by the intersection of technology and design, and I'm constantly looking for fresh ways to bring those two worlds together.
          </p>
          <div style={{ display:"flex", gap:0, marginBottom:"3rem", borderTop:`1px solid ${T.parchment}`, borderBottom:`1px solid ${T.parchment}`, padding:"2rem", flexWrap:"wrap" }}>
            {["Cybersecurity","Low-level systems","Jewellery","Ugly cats"].map((item, i, arr) => (
              <div key={item} style={{ paddingRight: i < arr.length-1 ? "2rem" : 0, borderRight: i < arr.length-1 ? `1px solid ${T.parchment}` : "none", marginRight: i < arr.length-1 ? "2rem" : 0, marginBottom:"0.5rem" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontStyle:"italic", color:T.charcoal }}>{item}</div>
                <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"0.45rem", letterSpacing:"0.3em", textTransform:"uppercase", color:T.taupe, marginTop:"0.2rem" }}>interest</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;