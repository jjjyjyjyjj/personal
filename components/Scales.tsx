"use client";

import { useState, type FC } from "react";

/* ─── Single scale ────────────────────────────────────────────────────── */
interface ScaleProps {
  cx: number;
  cy: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  id: string;
}

const Scale: FC<ScaleProps> = ({ cx, cy, w, h, fill, stroke, id }) => {
  const [hovered, setHovered] = useState(false);
  const hw = w / 2;

  // Open arc — no Z so there is no bottom horizontal edge.
  const arc = `M ${cx - hw} ${cy} C ${cx - hw} ${cy - h * 1.15}, ${cx + hw} ${cy - h * 1.15}, ${cx + hw} ${cy}`;

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "default",
        filter: hovered ? "drop-shadow(0 0 6px rgba(238, 249, 249, 0.95))" : "none",
        transition: "filter 0.3s ease",
      }}
    >
      <defs>
        <radialGradient id={`sg-${id}`} cx="50%" cy="85%" r="65%">
          <stop offset="0%"   stopColor="#F0EBE0" stopOpacity={0.95} />
          <stop offset="40%"  stopColor={fill}    stopOpacity={0.85} />
          <stop offset="100%" stopColor="#5A5850" stopOpacity={0.55} />
        </radialGradient>
        <radialGradient id={`sh-${id}`} cx="38%" cy="28%" r="42%">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity={hovered ? 0.75 : 0.38} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* filled dome — closed for fill, open stroke so no bottom line */}
      <path d={`${arc} Z`} fill={`url(#sg-${id})`} stroke="none" />
      {/* arc outline only — open path, bottom edge intentionally absent */}
      <path d={arc} fill="none" stroke={stroke} strokeWidth="0.65" strokeOpacity={0.35} />
      {/* specular sheen */}
      <path d={`${arc} Z`} fill={`url(#sh-${id})`} stroke="none" pointerEvents="none" />
      {/* vein lines radiating from base */}
      {([-0.28, 0, 0.28] as number[]).map((offset, i) => (
        <line
          key={i}
          x1={cx + offset * hw * 0.5} y1={cy}
          x2={cx + offset * hw * 1.0} y2={cy - h * 0.72}
          stroke="#B0A898"
          strokeWidth="0.35"
          strokeOpacity={hovered ? 0.55 : 0.22}
          style={{ transition: "stroke-opacity 0.3s ease" }}
          pointerEvents="none"
        />
      ))}
    </g>
  );
};

/* ─── Scale grid — renders TOP rows first so BOTTOM rows paint on top ─── */
interface GridConfig {
  cols: number;
  rows: number;
  scaleW: number;
  scaleH: number;
  offsetX: number;
  offsetY: number;
  prefix: string;
  colorFn: (col: number, row: number, cols: number) => { fill: string; stroke: string };
}

const ScaleGrid: FC<GridConfig> = ({ cols, rows, scaleW, scaleH, offsetX, offsetY, prefix, colorFn }) => {
  const scales: React.ReactNode[] = [];

  // Render row 0 first (top), last row renders last (bottom) — so bottom rows sit on top
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isOdd = row % 2 === 1;
      const cx = offsetX + col * scaleW + (isOdd ? scaleW / 2 : 0);
      const cy = offsetY + row * (scaleH * 0.62);
      const { fill, stroke } = colorFn(col, row, cols);
      const id = `${prefix}-${row}-${col}`;
      scales.push(
        <Scale key={id} id={id} cx={cx} cy={cy} w={scaleW} h={scaleH} fill={fill} stroke={stroke} />
      );
    }
  }
  return <>{scales}</>;
};

/* ─── Colour functions ────────────────────────────────────────────────── */
const heroColor = (col: number, _row: number, cols: number): { fill: string; stroke: string } => {
  const t = col / Math.max(cols - 1, 1);
  const fills = ["#4A4840", "#686558", "#8A8472", "#A89E8C", "#C4BAA8", "#D8D0C0"];
  const idx = Math.min(Math.floor(t * fills.length), fills.length - 1);
  return { fill: fills[idx], stroke: "#2A2820" };
};


/* ─── HeroPetals ──────────────────────────────────────────────────────── */
export const HeroPetals: FC = () => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden" }}
    viewBox="0 0 800 900"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="hero-bg" cx="40%" cy="50%" r="70%">
        <stop offset="0%"   stopColor="#3A3830" stopOpacity={0.6} />
        <stop offset="100%" stopColor="#0E0F0D" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="800" height="900" fill="url(#hero-bg)" />
    <ScaleGrid
      cols={12} rows={25}
      scaleW={72} scaleH={58}
      offsetX={4} offsetY={40}
      prefix="h"
      colorFn={heroColor}
    />
  </svg>
);

