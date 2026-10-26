"use client";

import { useEffect, useState, type CSSProperties, type FC } from "react";
import { NAV_LINKS } from "@/lib/data";

/* Index tabs that stick out of the page edge, one colour per section, like
   divider tabs in a magazine binder. The tab for the section in view pulls
   further out. Layout, colours and the mobile (top-edge) variant live in
   globals.css. */
const TAB_COLORS = ["var(--tab-1)", "var(--tab-2)", "var(--tab-3)", "var(--tab-4)"] as const;

const Nav: FC = () => {
  const [active, setActive] = useState<string>(NAV_LINKS[0].toLowerCase());

  useEffect(() => {
    const sections = NAV_LINKS
      .map((name) => document.getElementById(name.toLowerCase()))
      .filter((el): el is HTMLElement => el !== null);

    // A thin band across the middle of the viewport: whichever section
    // crosses it owns the active tab.
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="tab-rail" aria-label="Sections">
      <ul className="tab-list">
        {NAV_LINKS.map((name, i) => {
          const id = name.toLowerCase();
          return (
            <li key={name}>
              <a
                href={`#${id}`}
                className="tab"
                aria-current={active === id ? "true" : undefined}
                style={{ "--tab": TAB_COLORS[i % TAB_COLORS.length] } as CSSProperties}
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
