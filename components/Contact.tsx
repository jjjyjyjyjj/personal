"use client";

import type { FC } from "react";
import type { CSSProperties } from "react";
import { T } from "@/lib/tokens";
import { interactive } from "@/lib/hover";
import SectionLabel from "@/components/SectionLabel";

const labelStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.7rem",
  letterSpacing: "0.35em",
  textTransform: "uppercase" as const,
  color: T.normalFont,
  paddingLeft: "30px"
};

const linkStyle: CSSProperties = {
  fontFamily:"var(--font-inter)",
  fontSize: "clamp(1.5rem, 2.5vw, 1rem)",
  fontWeight: 300,
  fontStyle: "italic",
  color: T.subFont,
  textDecoration: "none",
  paddingBottom: "0.5rem",
  display: "inline-block",
  width: "100%",
  transition: "all 0.4s ease",
};

const linkHover: CSSProperties = { color: T.detail, paddingLeft: "0.5rem" };
const DOODLES = [
  { src: "/makeeup.png", alt: "Doodle of a mouse putting on makeup",  top: "3%",  left: "20%",  width: "40%", rotate: "-9deg" },
  { src: "/thumbs.png",  alt: "Doodle of a mouse giving a thumbs up", top: "15%", left: "60%", width: "45%", rotate: "8deg"  },
  { src: "/coding.png",  alt: "Doodle of a mouse at a laptop",        top: "38%", left: "10%",  width: "38%", rotate: "5deg"  },
  { src: "/sideeye.png", alt: "Doodle of a mouse side-eyeing",        top: "54%", left: "66%", width: "35%", rotate: "-13deg"},
  { src: "/call.png",    alt: "Doodle of a mouse on the phone",       top: "66%", left: "25%", width: "38%", rotate: "11deg" },
  { src: "/makeeup.png", alt: "", top: "2%",  left: "75%", width: "20%", rotate: "15deg"  },
  { src: "/sideeye.png", alt: "", top: "26%", left: "2%",  width: "22%", rotate: "-6deg"  },
  { src: "/call.png",    alt: "", top: "50%", left: "46%", width: "25%", rotate: "-19deg" },
  { src: "/coding.png",  alt: "", top: "75%", left: "63%", width: "26%", rotate: "7deg"   },
  { src: "/thumbs.png",  alt: "", top: "74%", left: "0%",  width: "30%", rotate: "-11deg" },
] as const;

const Contact: FC = () => (
  <section
    className="contact-section"
    id="contact"
    style={{
      padding: "1rem clamp(1.25rem, 8vw, 10%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      maxHeight: "100vh",
      position: "relative", 
      marginTop:"2rem"
    }}
  >

    <div
      className="reveal contact-grid-wrap"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        width: "100%",
        alignItems: "start",
        position: "relative", 
        zIndex: 1,
      }}
    >
      {/* Left Column */}
      <div className="contact-grid" style={{ display:"flex", flexDirection:"column" }}>
        <SectionLabel>Contact.</SectionLabel>
        <h2 style={{ fontSize:"clamp(3rem,6vw,5.5rem)", fontWeight:600, lineHeight:1.0, color:T.charcoal, letterSpacing:"-0.07em", margin:"2rem 0", fontFamily:"var(--font-inter)", }}>
          Let&apos;s <br />
          <span style={{ fontStyle:"italic", paddingLeft:"1.5rem" }}>connect</span>
        </h2>
        <p style={{ fontSize:"1.1rem", fontWeight:300, lineHeight:1.8, color:T.footerFont, maxWidth:"24rem", fontFamily:"var(--font-inter)" }}>
          Whether you have an interesting project idea, or just want to chat, feel free to reach out!<br />
          I&apos;m always open to new connections and opportunities.
        </p>
        <div style={{ paddingTop: "2rem", display:"flex", flexDirection:"column", width:"100%", gap:"0.75rem" }}>
          <span style={labelStyle}>LinkedIn</span>
          <a href="https://www.linkedin.com/in/jjiayun-lee/"
            target="_blank" rel="noopener noreferrer"
            {...interactive(linkStyle, linkHover)}>
            linkedin.com/in/jjiayun-lee
          </a>
      </div>
      </div>

       {/* Right Column */}
      <div
        className="parallax-wrap contact-right-col"
        style={{ position:"relative", width:"100%", paddingLeft: "10px", borderLeft:`1px solid ${T.normalFont}`, overflow:"hidden", height:"600px" }}
      >
        {DOODLES.map((d, i) => (
          <img
            key={`${d.src}-${i}`}
            src={d.src}
            alt={d.alt}
            style={{
              position: "absolute",
              top: d.top,
              left: d.left,
              width: d.width,
              height: "auto",
              transform: `rotate(${d.rotate})`,
            }}
          />
        ))}
       </div>
    </div>
  </section>
);

export default Contact;