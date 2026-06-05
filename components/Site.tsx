"use client";

import type { FC } from "react";
import { useCursor } from "@/hooks/useCursor";
import { useReveal } from "@/hooks/useReveal";
import Cursor     from "@/components/Cursor";
import Nav        from "@/components/Nav";
import Hero       from "@/components/Hero";
import Marquee    from "@/components/Marquee";
import About      from "@/components/About";
import Projects      from "@/components/Projects";
import Contact    from "@/components/Contact";
import Footer     from "@/components/Footer";

const Site: FC = () => {
  const cursor = useCursor();
  useReveal();

  return (
    <>
      <Cursor dot={cursor.dot} ring={cursor.ring} />
      <Nav        cursor={cursor} />
      <main>
        <Hero       cursor={cursor} />
        <Marquee />
        <About />
        <Projects   cursor={cursor} />
        <Contact    cursor={cursor} />
      </main>
      <Footer     cursor={cursor} />
    </>
  );
};

export default Site;
