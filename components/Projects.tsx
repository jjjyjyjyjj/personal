"use client";

import type { FC } from "react";
import { T } from "@/lib/tokens";
import { PROJECTS } from "@/lib/data";
import type { CardData, CursorRefs } from "@/lib/types";
import { expandCursor, resetCursor } from "@/lib/cursor";
import SectionLabel from "./SectionLabel";

const ProjectRow: FC<{ card: CardData; index: number; cursor: CursorRefs }> = ({ card, index, cursor }) => {
  // Format index to a magazine catalog double digit (e.g., 01, 02)
  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      className="project-catalog-row"
      onMouseEnter={() => expandCursor(cursor)}
      onMouseLeave={() => resetCursor(cursor)}
      style={{
        display: "grid",
        // Magazine column split: Index | Title & Collection | Category 
        gridTemplateColumns: "0.5fr 2.5fr 1.5fr",
        padding: "2rem 0",
        borderBottom: `1px solid ${T.taupe}`,
        alignItems: "baseline",
        cursor: "pointer",
        transition: "background-color 0.4s ease, padding 0.4s ease",
      }}
      // Interactive styling injected via simple inline overrides
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = T.parchment;
        e.currentTarget.style.paddingLeft = "1rem";
        e.currentTarget.style.paddingRight = "1rem";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.paddingLeft = "0px";
        e.currentTarget.style.paddingRight = "0px";
      }}
    >
      {/* Column 1: Index Number */}
      <span
        style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 300,
          color: T.taupe,
          letterSpacing: "0.1em",
        }}
      >
        {displayIndex}
      </span>

      {/* Column 2: Core Project Details */}
      <div className="projects-section" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.65rem",
            fontWeight: 400,
            color: T.charcoal,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            fontStyle: "italic",
            color: T.taupeDark,
            margin: 0,
          }}
        >
          {card.collection || "Selected Works"}
        </p>
      </div>

      {/* Column 3: Languages / Frameworks */}
      <span className="project-cat-col"
        style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginLeft: "2.4rem",
          color: T.steelBlue,
        }}
      >
        {card.cat}
      </span>
    </div>
  );
};

const Projects: FC<{ cursor: CursorRefs }> = ({ cursor }) => (
  <section 
    id="projects" 
    style={{ 
      padding: "6rem 10%", // Wider editorial margins
      background: T.cream,
      minHeight: "100vh"
    }}
  >
    <SectionLabel>Projects</SectionLabel>
    
    {/* Editorial Header Section */}
    <div 
      className="reveal" 
      style={{ 
        display: "flex", 
        flexDirection: "column",
        alignItems: "flex-start", 
        paddingBottom: "2rem",
        marginBottom: "1rem",
        // gap: "1.5rem",
        borderBottom: `2px solid ${T.charcoal}`
      }}
    >
      <h2 
        style={{ 
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(3rem, 5vw, 3.5rem)", 
          fontWeight: 300, 
          color: T.charcoal, 
          lineHeight: 1.0,
          margin: 0,
          letterSpacing: "-0.01em"
        }}
      >
        Collection of my Past Works
      </h2>
    </div>

    {/* Catalog List Component */}
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {PROJECTS.map((card, idx) => (
        <ProjectRow key={card.id || idx} card={card} index={idx} cursor={cursor} />
      ))}
    </div>
    <div style={{ marginTop: "3rem", fontFamily: "'Josefin Sans', sans-serif", fontSize: "1rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.taupe }}>
      And more to come...
    </div>
  </section>
);

export default Projects;