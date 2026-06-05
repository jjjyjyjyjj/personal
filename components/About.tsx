import type { FC } from "react";
import { T } from "@/lib/tokens";
import { STATS } from "@/lib/data";
import { AboutPetals } from "@/components/Scales";
import SectionLabel from "@/components/SectionLabel";

const About: FC = () => (
  <section id="about" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"80vh" }}>
    {/* ── Image col ── */}
    <div style={{ background:T.parchment, position:"relative", overflow:"hidden", minHeight:600 }}>
      <AboutPetals />
      <div style={{ position:"absolute", bottom:"3rem", right:"-2rem", background:T.cream, padding:"2rem 2.5rem", boxShadow:"0 20px 60px rgba(14,15,13,0.12)", zIndex:2 }}>
        <p style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"0.55rem", letterSpacing:"0.3em", textTransform:"uppercase", color:T.taupe, marginBottom:"0.5rem" }}>class of</p>
        <p style={{ fontSize:"2.5rem", fontWeight:300, color:T.charcoal }}>2027</p>
        <p style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"0.55rem", letterSpacing:"0.25em", textTransform:"uppercase", color:T.steelBlue, marginTop:"0.5rem" }}> ✦ Kuala Lumpur ✦ Toronto ✦ </p>
      </div>
    </div>

    {/* ── Text col ── */}
    <div className="reveal" style={{ padding:"8rem 5rem 5rem 5rem", display:"flex", flexDirection:"column", justifyContent:"center" }}>
      <SectionLabel>About</SectionLabel>

      <h2 style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:300, lineHeight:1.2, marginBottom:"2rem", color:T.charcoal }}>
       Who am I?
      </h2>

      <p style={{ fontSize:"1.05rem", fontWeight:300, lineHeight:1.9, color:T.taupeDark, maxWidth:"34rem", marginBottom:"3rem" }}>
        I’m currently an undergraduate at the University of Toronto studying Computer Science and Statistics. I like building stuff that help my friends and I either 1. save money 2. make our lives easier 3. entertain us.
        <br /><br />
        Outside of the classroom, I’ve spent the past few years running a small business selling handmade jewelry. I also like drawing, going to the gym and staring at ugly animals (shihtzus & persian cats).
        <br /><br />
        I’ve always been fascinated by the intersection of technology and design, and I'm constantly looking for fresh ways to bring those two worlds together.</p>

      <div style={{ display:"flex", gap:"3rem", borderTop:`1px solid ${T.parchment}`, paddingTop:"2rem", height:"150px" }}>
        {STATS.map(({ value, label }) => (
          <div key={label}>
            <div style={{ fontSize:"2.5rem", fontWeight:300, color:T.charcoal }}>{value}</div>
            <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"0.58rem", letterSpacing:"0.25em", textTransform:"uppercase", color:T.taupe, marginTop:"0.25rem" }}>{label}</div>
          </div>
        ))} 
      </div>
    </div>
  </section>
);

export default About;
