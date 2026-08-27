"use client";

import type { FC } from "react";
import { useReveal } from "@/hooks/useReveal";
import Nav        from "@/components/Nav";
import Hero       from "@/components/Hero";
import Marquee    from "@/components/Marquee";
import About      from "@/components/About";
import Projects      from "@/components/Projects";
import Contact    from "@/components/Contact";
import Footer     from "@/components/Footer";

const Site: FC = () => {
  useReveal();

  return (
    <>
      <Nav      />
      <main>
        <Hero       />
        {/* <Marquee /> */}
        <About />
        <Projects   />
        <Contact    />
      </main>
      <Footer     />
    </>
  );
};

export default Site;
