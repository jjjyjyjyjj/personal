import type { FC, ReactNode } from "react";
import { T } from "@/lib/tokens";

const SectionLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: "var(--font-inter)",
      fontSize: "1.2rem", fontWeight: 500, letterSpacing: "0.2em",
      textTransform: "uppercase", color: T.normalFont,
      marginBottom: "2rem",
      display: "flex", alignItems: "center", gap: "1rem",
    }}>
    {children}
  </p>
);

export default SectionLabel;
