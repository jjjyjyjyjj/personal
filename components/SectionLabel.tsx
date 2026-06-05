import type { FC, ReactNode } from "react";
import { T } from "@/lib/tokens";

const SectionLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: "'Josefin Sans', sans-serif",
      fontSize: "1.2rem", fontWeight: 500, letterSpacing: "0.4em",
      textTransform: "uppercase", color: T.steelBlue,
      marginBottom: "2rem",
      display: "flex", alignItems: "center", gap: "1rem",
    }}
  >
    <span style={{ display: "block", width: "2rem", height: 1, background: T.steelBlue }} />
    {children}
  </p>
);

export default SectionLabel;
