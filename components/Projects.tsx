// "use client";

// import type { FC } from "react";
// import { T } from "@/lib/tokens";
// import { CARDS } from "@/lib/data";
// import type { CardData, CursorRefs } from "@/lib/types";
// import { expandCursor, resetCursor } from "@/lib/cursor";
// import SectionLabel from "./SectionLabel";

// const WorkCard: FC<{ card: CardData; cursor: CursorRefs }> = ({ card, cursor }) => (
//   <div
//     className="work-card"
//     onMouseEnter={() => expandCursor(cursor)}
//     onMouseLeave={() => resetCursor(cursor)}
//     style={{
//       position: "relative", overflow: "hidden", background: T.parchment,
//       gridColumn: card.tall ? "1 / 2" : undefined,
//       gridRow:    card.tall ? "1 / 3" : undefined,
//     }}
//   >
//     <div style={{
//       aspectRatio: card.tall ? undefined : "3/4",
//       position: "relative", overflow: "hidden",
//       height:    card.tall ? "100%"  : undefined,
//       minHeight: card.tall ? 500     : undefined,
//     }}>
//       {/* Background */}
//       <div
//         className="card-bg"
//         style={{ position:"absolute", inset:0, background:card.bg, transition:"transform 0.6s ease" }}
//       >
//         <div style={{ position:"absolute", inset:0, background:card.blobs.join(", ") }} />
//         {card.lines && <div style={{ position:"absolute", inset:0, background:card.lines }} />}
//       </div>

//       {/* Hover overlay */}
//       <div
//         className="card-overlay"
//         style={{
//           position:"absolute", inset:0,
//           background:"linear-gradient(to top, rgba(14,15,13,0.75) 0%, transparent 60%)",
//           opacity:0, transition:"opacity 0.4s",
//           display:"flex", alignItems:"flex-end", padding:"2rem",
//         }}
//       >
//         <div style={{ color:"white" }}>
//           <p style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"0.55rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", marginBottom:"0.3rem" }}>
//             {card.season}
//           </p>
//           <p style={{ fontSize:"1.2rem", fontStyle:"italic" }}>{card.title}</p>
//         </div>
//       </div>
//     </div>

//     <div style={{ padding:"1.2rem" }}>
//       <p style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"0.55rem", letterSpacing:"0.3em", textTransform:"uppercase", color:T.steelBlue, marginBottom:"0.4rem" }}>
//         {card.cat}
//       </p>
//       <p style={{ fontSize:"1.1rem", fontWeight:300, fontStyle:"italic", color:T.charcoal }}>
//         {card.collection}
//       </p>
//     </div>
//   </div>
// );

// const Work: FC<{ cursor: CursorRefs }> = ({ cursor }) => (
//   <section id="work" style={{ padding:"8rem 4rem", background:T.cream }}>
//     <SectionLabel>Projects</SectionLabel>
//     <div className="reveal" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem" }}>
//       <h2 style={{ fontSize:"clamp(2.5rem,4vw,3rem)", fontWeight:300, color:T.charcoal, lineHeight:1.1 }}>
//         Some of my past creations:<br />
//       </h2>
//       <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:"0.6rem", fontWeight:200, letterSpacing:"0.3em", textTransform:"uppercase", color:T.taupe }}>
//         2021 — 2025
//       </span>
//     </div>

//     <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gridTemplateRows:"auto auto", gap:"1.5rem" }}>
//       {CARDS.map((card) => (
//         <WorkCard key={card.id} card={card} cursor={cursor} />
//       ))}
//     </div>
//   </section>
// );

// export default Work;

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
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
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
      <span
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
      padding: "10rem 10%", // Wider editorial margins
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