"use client";

import type { FC } from "react";
import { T } from "@/lib/tokens";
import SectionLabel from "@/components/SectionLabel";

const labelStyle = {
  fontFamily: "'Josefin Sans', sans-serif",
  fontSize: "0.7rem",
  letterSpacing: "0.35em",
  textTransform: "uppercase" as const,
  color: T.greyDark,
};

const linkStyle = {
  fontFamily:"'Josefin Sans', sans-serif",
  fontSize: "clamp(1.5rem, 2.5vw, 1rem)",
  fontWeight: 300,
  fontStyle: "italic",
  color: T.charcoal,
  textDecoration: "none",
  paddingBottom: "0.5rem",
  display: "inline-block",
  width: "100%",
  transition: "all 0.4s ease",
};

/* ── Background decoration ───────────────────────────────────────────── */
const ContactBg: FC = () => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", userSelect:"none" }}>

    {/* large ghost word — bottom left anchor */}
    <span style={{
      position: "absolute",
      bottom: "-4rem",
      left: "-2rem",
      fontFamily: "'Helvetica Neue', sans-serif",
      fontSize: "clamp(10rem, 22vw, 20rem)",
      fontWeight: 600,
      fontStyle: "italic",
      color: T.grey,
      opacity: 0.07,
      lineHeight: 1,
      letterSpacing: "-0.03em",
      whiteSpace: "nowrap",
    }}>
      connect
    </span>
  </div>
);

const Contact: FC = () => (
  <section
    className="contact-section"
    id="contact"
    style={{
      // background: T.parchment,
      padding: "10rem 10%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      position: "relative",  
    }}
  >
    <ContactBg />

    <div
      className="reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        width: "100%",
        alignItems: "start",
        position: "relative",  // ← sits above the bg
        zIndex: 1,
      }}
    >
      {/* ── Left Column ── */}
      <div className="contact-grid" style={{ display:"flex", flexDirection:"column" }}>
        <SectionLabel>Contact</SectionLabel>
        <h2 style={{ fontSize:"clamp(3rem,6vw,5.5rem)", fontWeight:900, lineHeight:1.0, color:T.charcoal, letterSpacing:"-0.07em", margin:"2rem 0", fontFamily:"'Helvetica Neue', sans-serif", }}>
          Let&apos;s <br />
          <span style={{ fontStyle:"italic", paddingLeft:"1.5rem" }}>connect.</span>
        </h2>
        <p style={{ fontSize:"1.1rem", fontWeight:300, lineHeight:1.8, color:T.greyDark, maxWidth:"24rem", fontFamily:"'Helvetica Neue', sans-serif" }}>
          Whether you have an interesting project idea, or just want to chat, feel free to reach out!<br />
          I&apos;m always open to new connections and opportunities.
        </p>
      </div>

      {/* ── Right Column ── */}
      <div
        className="contact-right-col"
        style={{ borderLeft:`2px solid ${T.grey}`, padding:"5rem 4rem", width:"100%", display:"flex", flexDirection:"column", gap:"3.5rem" }}
      >
        <p style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"0.7rem", fontWeight:400, letterSpacing:"0.4em", textTransform:"uppercase", color:T.charcoal, borderBottom:`2px solid ${T.grey}`, paddingBottom:"1rem", margin:0 }}>
          Direct Contacts
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          <span style={labelStyle}>01 / Email</span>
          <a href="mailto:jiayun.lee@mail.utoronto.ca"
            onMouseOver={(e) => { e.currentTarget.style.color = T.steelBlue; e.currentTarget.style.paddingLeft = "0.5rem"; }}
            onMouseOut={(e)  => { e.currentTarget.style.color = T.grey;     e.currentTarget.style.paddingLeft = "0rem"; }}
            style={linkStyle}>
            jiayun.lee@mail.utoronto.ca
          </a>
        </div>

        <div style={{ display:"flex", flexDirection:"column", width:"100%", gap:"0.75rem" }}>
          <span style={labelStyle}>02 / LinkedIn</span>
          <a href="https://www.linkedin.com/in/jjiayun-lee/"
            target="_blank" rel="noopener noreferrer"
            onMouseOver={(e) => { e.currentTarget.style.color = T.steelBlue; e.currentTarget.style.paddingLeft = "0.5rem"; }}
            onMouseOut={(e)  => { e.currentTarget.style.color = T.grey;     e.currentTarget.style.paddingLeft = "0rem"; }}
            style={linkStyle}>
            linkedin.com/in/jjiayun-lee
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;