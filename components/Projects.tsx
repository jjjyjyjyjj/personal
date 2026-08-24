"use client";

import { useState } from "react";
import type { FC } from "react";
import { T } from "@/lib/tokens";
import { PROJECTS } from "@/lib/data";
import type { CardData } from "@/lib/types";
import SectionLabel from "./SectionLabel";

const PAGE_SIZE = 5;

const ProjectRow: FC<{ card: CardData; index: number}> = ({ card, index}) => {
  const displayIndex = String(index + 1).padStart(2, "0");

  const rowContent = (
    <div
      className="project-catalog-row"
      style={{
        display: "grid",
        gridTemplateColumns: "0.5fr 2.5fr 1.5fr",
        padding: "2rem 0",
        borderBottom: `1px solid ${T.grey}`,
        alignItems: "baseline",
        transition: "background-color 0.4s ease, padding 0.4s ease",
      }}
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
      {/* Column 1: Index */}
      <span style={{ fontFamily:"'Helvetica Neue', sans-serif", fontSize:"0.95rem", fontWeight:400, color:T.grey, letterSpacing:"0.1em" }}>
        {displayIndex}
      </span>

      {/* Column 2: Title & collection */}
      <div className="projects-section" style={{ display:"flex", flexDirection:"column", gap:"0.25rem" }}>
        <h3 style={{ fontFamily:"'Helvetica Neue', sans-serif", fontSize:"1.65rem", fontWeight:400, color:T.charcoal, margin:0, lineHeight:1.2 }}>
          {card.title}
        </h3>
        <p style={{ fontFamily:"var(--font-josefin)", fontSize:"1rem", color:T.greyDark, margin:0 }}>
          {card.collection || "Selected Works"}
        </p>
      </div>

      {/* Column 3: Category + link arrow */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginLeft:"2.4rem" }}>
        <span className="project-cat-col" style={{ fontFamily:"var(--font-josefin)", fontSize:"0.75rem", letterSpacing:"0.1em", textTransform:"uppercase", color:T.steelBlue }}>
          {card.cat}
        </span>
        {card.link && (
          <span style={{ fontFamily:"var(--font-josefin)", fontSize:"0.6rem", color:T.grey, opacity:0.6, letterSpacing:"0.1em" }}>
          </span>
        )}
      </div>
    </div>
  );

  // if there's a link, wrap in <a>; otherwise render as-is
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
}> = ({ label, active = false, disabled = false, onClick, ariaLabel }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel ?? label}
    aria-current={active ? "page" : undefined}
    style={{
      fontFamily: "var(--font-josefin)",
      fontSize: "0.8rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: disabled ? T.grey : active ? T.cream : T.charcoal,
      background: active ? T.charcoal : "transparent",
      border: `1px solid ${active ? T.charcoal : T.grey}`,
      padding: "0.5rem 0.9rem",
      minWidth: "2.5rem",
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.35 : 1,
      transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    }}
    onMouseOver={(e) => {
      if (disabled || active) return;
      e.currentTarget.style.backgroundColor = T.parchment;
    }}
    onMouseOut={(e) => {
      if (disabled || active) return;
      e.currentTarget.style.backgroundColor = "transparent";
    }}
  >
    {label}
  </button>
);

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
        padding: "6rem 10%", // Wider editorial margins
        background: T.cream,
      minHeight: "100vh"
    }}
  >
    <SectionLabel>Projects</SectionLabel>
    
    {/* Editorial Header Section */}
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column",
        alignItems: "flex-start", 
        paddingBottom: "2rem",
        marginBottom: "1rem",
        borderBottom: `2px solid ${T.charcoal}`
      }}
    >
      <h2 
        style={{ 
          fontFamily:"'Helvetica Neue', sans-serif",
          fontSize: "clamp(3rem, 5vw, 3.5rem)", 
          fontWeight: 900, 
          color: T.charcoal, 
          lineHeight: 1.0,
          margin: 0,
          letterSpacing:"-0.08em"
        }}
      >
        Collection of my Past Works
      </h2>
    </div>

    {/* Catalog List Component */}
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {visible.map((card, idx) => (
        <ProjectRow key={card.id || start + idx} card={card} index={start + idx} />
      ))}
    </div>

    {/* Pagination */}
    {pageCount > 1 && (
      <nav
        aria-label="Projects pagination"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginTop: "2.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-josefin)",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: T.grey,
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