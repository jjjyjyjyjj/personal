"use client";

import { useState } from "react";
import type { CSSProperties, FC } from "react";
import { T } from "@/lib/tokens";
import { PROJECTS } from "@/lib/data";
import type { CardData } from "@/lib/types";
import { interactive } from "@/lib/hover";
import SectionLabel from "./SectionLabel";

const PAGE_SIZE = 4;

const catalogRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "0.5fr 2.5fr 1.5fr",
  padding: "2rem 0",
  borderBottom: `1px solid ${T.normalFont}`,
  alignItems: "baseline",
  transition: "background-color 0.4s ease, padding 0.4s ease",
};

const catalogRowHover: CSSProperties = {
  backgroundColor: T.hoverRow,
  paddingLeft: "1rem",
  paddingRight: "1rem",
};

const ProjectRow: FC<{ card: CardData; index: number}> = ({ card, index}) => {
  const displayIndex = String(index + 1).padStart(2, "0");

  const rowContent = (
    <div
      className="project-catalog-row"
      {...interactive(catalogRow, catalogRowHover)}
    >
      {/* Column 1: Index */}
      <span style={{ fontFamily:"'Helvetica Neue', sans-serif", fontSize:"0.95rem", fontWeight:400, color:T.grey, letterSpacing:"0.1em" }}>
        {displayIndex}
      </span>
      <div className="projects-section" style={{ display:"flex", flexDirection:"column", gap:"0.25rem" }}>
        <h3 style={{ fontFamily:"'Helvetica Neue', sans-serif", fontSize:"1.65rem", fontWeight:400, color:T.normalFont, margin:0, lineHeight:1.2 }}>
          {card.title}
        </h3>
        <p style={{ fontFamily:"var(--font-josefin)", fontSize:"1rem", color:T.subFont, margin:0 }}>
          {card.collection || "Selected Works"}
        </p>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginLeft:"2.4rem" }}>
        <span className="project-cat-col" style={{ fontFamily:"var(--font-josefin)", fontSize:"0.75rem", letterSpacing:"0.1em", textTransform:"uppercase", color:T.detail}}>
          {card.cat}
        </span>
        {card.link && (
          <span style={{ fontFamily:"var(--font-josefin)", fontSize:"0.6rem", color:T.grey, opacity:0.6, letterSpacing:"0.1em" }}>
          </span>
        )}
      </div>
    </div>
  );

  return card.link ? (
    <a href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration:"none", display:"block", color:"inherit" }}
    >
      {rowContent}
    </a>
  ) : (
    rowContent
  );
};

const PageButton: FC<{
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel?: string;
}> = ({ label, active = false, disabled = false, onClick, ariaLabel }) => {
  const base: CSSProperties = {
    fontFamily: "var(--font-josefin)",
    fontSize: "0.8rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: disabled ? T.grey : active ? T.accentFont : T.normalFont,
    backgroundColor: active ? T.normalFont : "transparent",
    border: `1px solid ${active ? T.normalFont : T.grey}`,
    borderRadius: "5px",
    padding: "0.5rem 0.9rem",
    minWidth: "2.5rem",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.35 : 1,
    transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      aria-current={active ? "page" : undefined}
      {...interactive(base, { backgroundColor: T.hoverRow}, !disabled && !active)}
    >
      {label}
    </button>
  );
};

const Projects: FC = () => {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(PROJECTS.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const visible = PROJECTS.slice(start, start + PAGE_SIZE);

  const goTo = (next: number) => {
    const clamped = Math.min(Math.max(next, 0), pageCount - 1);
    if (clamped === page) return;
    setPage(clamped);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="projects"
      style={{
        padding: "clamp(4rem, 10vh, 6rem) clamp(1.25rem, 8vw, 10%)",
        minHeight: "100svh"
    }}
  >
    <SectionLabel>Projects.</SectionLabel>
    
    {/* Editorial Header Section */}
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column",
        alignItems: "flex-start", 
        paddingBottom: "1rem",
        borderBottom: `2px solid ${T.normalFont}`
      }}
    >
      <h2 
        style={{ 
          fontFamily:"'Helvetica Neue', sans-serif",
          fontSize: "clamp(3rem, 5vw, 3.5rem)", 
          fontWeight: 600, 
          color: T.normalFont, 
          lineHeight: 1.0,
        }}
      >
        Collection of Past Work
      </h2>
    </div>
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {visible.map((card, idx) => (
        <ProjectRow key={card.id || start + idx} card={card} index={start + idx} />
      ))}
    </div>

    {pageCount > 1 && (
      <nav
        aria-label="Projects pagination"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-josefin)",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: T.normalFont
          }}
        >
          {String(start + 1).padStart(2, "0")}&ndash;{String(start + visible.length).padStart(2, "0")} of{" "}
          {String(PROJECTS.length).padStart(2, "0")}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <PageButton label="Prev" disabled={page === 0} onClick={() => goTo(page - 1)} ariaLabel="Previous page" />
          {Array.from({ length: pageCount }, (_, i) => (
            <PageButton
              key={i}
              label={String(i + 1)}
              active={i === page}
              onClick={() => goTo(i)}
              ariaLabel={`Page ${i + 1}`}
            />
          ))}
          <PageButton label="Next" disabled={page === pageCount - 1} onClick={() => goTo(page + 1)} ariaLabel="Next page" />
        </div>
      </nav>
    )}
  </section>
);}
export default Projects;