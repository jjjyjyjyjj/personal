"use client";

import type { FC } from "react";
import Image from "next/image";
import { T } from "@/lib/tokens";
import SectionLabel from "@/components/SectionLabel";
import { useParallax } from "@/hooks/useParallax";

const About: FC = () => {
  const scalesRef = useParallax(0.15);
  const textRef   = useParallax(0.06);

  return (
    <section id="about" className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"100svh" }}>
      {/* ── Image col ── */}
      <div className="about-image-col" style={{ position:"relative", overflow:"hidden" }}>
        <div ref={scalesRef} className="parallax-wrap" style={{ position:"absolute",  height:"100%" }}>
          <Image
            src="/about.png"
            alt="Illustration of a figure, drawn by Jia"
            width={960}
            height={1080}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width:"110%", height:"100%", objectFit:"cover", objectPosition:"center" }}
          />
          </div>
      </div>

      {/* ── Text col ── */}
      <div className="reveal about-text-col" style={{ paddingLeft:"clamp(1.5rem, 5vw, 5rem)", paddingRight:"clamp(1.5rem, 5vw, 5rem)", paddingTop:"clamp(6rem, 12vh, 8rem)", paddingBottom:"clamp(3rem, 8vh, 5rem)", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", minHeight:"100svh" }}>
        <div ref={textRef} className="parallax-wrap">
          <SectionLabel>About.</SectionLabel>
          <h2 style={{ fontFamily:"var(--font-inter)", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:600, letterSpacing:"-0.08em", lineHeight:1.2, marginBottom:"2rem", color:T.charcoal }}>Who am I?</h2>
          <p style={{ fontFamily:"var(--font-inter)", fontSize:"1.05rem", fontWeight:300, lineHeight:1.9, color:T.greyDark, maxWidth:"34rem", marginBottom:"3rem" }}>
            I&apos;m currently an undergraduate at the University of Toronto studying Computer Science and Statistics. I like building stuff that helps my friends and I:
            <br /><br />1. Save money<br />2. Make our lives easier<br />3. Entertain us
            <br /><br />Outside of the classroom, I&apos;ve spent the past few years running a small business selling handmade jewelry. I also like drawing, going to the gym and staring at ugly animals on the street.
            <br /><br />I&apos;ve always been fascinated by the intersection of technology and design, and I&apos;m constantly looking for ways to bring those two worlds together.
          </p>
          {/* <div style={{ display:"flex", gap:0, marginBottom:"3rem", borderTop:`1px solid ${T.parchment}`, borderBottom:`1px solid ${T.parchment}`, padding:"2rem"}}>
            {["Cybersecurity","Low-level systems","Ugly animals"].map((item, i, arr) => (
              <div key={item} style={{ paddingRight: i < arr.length-1 ? "2rem" : 0, borderRight: i < arr.length-1 ? `1px solid ${T.parchment}` : "none", marginRight: i < arr.length-1 ? "2rem" : 0, marginBottom:"0.5rem" }}>
                <div style={{ fontFamily:"var(--font-inter)", fontSize:"1rem", fontStyle:"italic", color:T.charcoal }}>{item}</div>
                <div style={{ fontFamily:"var(--font-inter)", fontSize:"0.45rem", letterSpacing:"0.3em", textTransform:"uppercase", color:T.grey, marginTop:"0.2rem" }}>interest</div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;