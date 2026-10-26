import type { FC, ReactNode } from "react";

/* Magazine running head: section name, a hairline, and the page folio. */
const SectionLabel: FC<{ children: ReactNode; folio?: string }> = ({ children, folio }) => (
  <p className="running-head">
    <span>{children}</span>
    <span className="running-head-rule" aria-hidden />
    {folio && <span className="running-head-folio">{folio}</span>}
  </p>
);

export default SectionLabel;
