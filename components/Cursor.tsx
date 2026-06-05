"use client";

import type { FC } from "react";
import type { CursorRefs } from "@/lib/types";
import { T } from "@/lib/tokens";

const Cursor: FC<CursorRefs> = ({ dot, ring }) => (
  <>
    <div
      ref={dot}
      style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        width: 10, height: 10,
        background: T.steelBlue,
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%,-50%)",
        transition: "transform 0.1s, background 0.2s",
        mixBlendMode: "multiply",
      }}
    />
    <div
      ref={ring}
      style={{
        position: "fixed", top: 0, left: 0, zIndex: 9998,
        width: 34, height: 34,
        border: `1px solid ${T.steelBlue}`,
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%,-50%)",
        transition: "transform 0.25s ease, width 0.2s, height 0.2s",
        opacity: 0.5,
      }}
    />
  </>
);

export default Cursor;
