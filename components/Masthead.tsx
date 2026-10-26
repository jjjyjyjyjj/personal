import type { FC } from "react";
import ThemeToggle from "@/components/ThemeToggle";

/* The magazine nameplate across the top of the page. */
const Masthead: FC = () => (
  <header className="masthead">
    <div className="masthead-meta">
      <span>Vol. 01 &mdash; Issue 10</span>
      <span>Toronto</span>
      <span>Autumn 2026</span>
      <ThemeToggle />
    </div>
    <a href="#cover" className="masthead-title" aria-label="Jia — back to cover">
      Jia
    </a>
    <div className="masthead-strap">
      <span>Software</span>
      <span aria-hidden>&#10022;</span>
      <span>Drawing</span>
      <span aria-hidden>&#10022;</span>
      <span>Ugly Cats</span>
    </div>
  </header>
);

export default Masthead;
