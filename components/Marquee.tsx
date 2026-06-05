import type { FC } from "react";
import { T } from "@/lib/tokens";
import { MARQUEE_ITEMS } from "@/lib/data";

const Marquee: FC = () => {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ background: T.ink, padding: "1.2rem 0", overflow: "hidden" }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "0.8rem", fontWeight: 400, letterSpacing: "0.35em",
              textTransform: "uppercase", color: T.parchment,
              padding: "0 3rem", flexShrink: 0, opacity: 0.7,
            }}
          >
            {item}{" "}
            <span style={{ color: T.steelBlue, opacity: 1, margin: "0 0.5rem" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
