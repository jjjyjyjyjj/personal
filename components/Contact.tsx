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

const Contact: FC = () => (
  <section
    className="contact-section"
    id="contact"
    style={{
      padding: "0rem clamp(1.25rem, 8vw, 10%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      position: "relative",  
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
        position: "relative",  // ← sits above the bg
        zIndex: 1,
      }}
    >
      {/* ── Left Column ── */}
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

        <div
        className="contact-right-col"
        style={{ padding:"0rem 4rem", width:"100%", display:"flex", flexDirection:"column", gap:"3.5rem" }}
      >
        {/* <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.7rem", fontWeight:400, letterSpacing:"0.4em", textTransform:"uppercase", color:T.charcoal, borderBottom:`2px solid ${T.grey}`, paddingBottom:"1rem", margin:0 }}>
          Direct Contacts
        </p> */}
        <div style={{ paddingTop: "2rem", display:"flex", flexDirection:"column", width:"100%", gap:"0.75rem" }}>
          <span style={labelStyle}>LinkedIn</span>
          <a href="https://www.linkedin.com/in/jjiayun-lee/"
            target="_blank" rel="noopener noreferrer"
            {...interactive(linkStyle, linkHover)}>
            linkedin.com/in/jjiayun-lee
          </a>
        </div>
      </div>
      </div>

      {/* ── Right Column ── */}
      
    </div>
  </section>
);

export default Contact;