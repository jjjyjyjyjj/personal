"use client";

import type { FC } from "react";
import Nav        from "@/components/Nav";
import Masthead   from "@/components/Masthead";
import Hero       from "@/components/Hero";
import Marquee    from "@/components/Marquee";
import About      from "@/components/About";
import Projects      from "@/components/Projects";
import Contact    from "@/components/Contact";
import Footer     from "@/components/Footer";

const Site: FC = () => {
  return (
    <div className="sheet-wrap">
      <div className="sheet">
        <Nav      />
        {/* Each <section> is one paper page, sized to the screen. */}
        <main className="pages">
          <section id="cover" className="page">
            <Masthead />
            <Hero />
          </section>
          {/* <Marquee /> */}
          <section id="about" className="page">
            <About />
          </section>
          <section id="projects" className="page">
            <Projects />
          </section>
          <section id="contact" className="page">
            <Contact />
            <Footer />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Site;
