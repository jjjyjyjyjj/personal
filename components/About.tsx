"use client";

import type { FC } from "react";
import Image from "next/image";
import { T } from "@/lib/tokens";
import SectionLabel from "@/components/SectionLabel";
import { useParallax } from "@/hooks/useParallax";

const HEADING_TIERS = ["Who", "am", "I?"] as const;
const TIER_STEP = "clamp(0.75rem, 5vw, 5rem)";
const BLURB_TIERS = [
  "CS and Stats @",
  " University of Toronto",
] as const;
const BLURB_STEP = "clamp(0.4rem, 1.6vw, 1.5rem)";

const SPREAD = [
  { area: "a", src: "/about/pond.jpg", alt: "Painting of a figure standing in a lotus pond", position: "center 30%" },
  { area: "b", src: "/about/red.jpeg",   alt: "Grey-toned painting of a figure in a shirt and tie", position: "center 30%" },
  { area: "c", src: "/about/horns.jpg", alt: "Painting of a figure with ram horns and flowers", position: "center 25%" },
  { area: "e", src: "/about/hands.jpg",  alt: "Close painting of cupped hands", position: "center 25%" },
  { area: "d", src: "/about/bangs.jpeg",  alt: "Painting of a figure with bangs", position: "right 30%" },
  { area: "f", src: "/about/perfect_blue.png",  alt: "Painting of a figure standing in a lotus pond", position: "center 40%" }
] as const;

const About: FC = () => {
  const spreadRef = useParallax(0.07);
  const textRef   = useParallax(0.06);

  return (
    <section id="about" className="about-grid" style={{ maxHeight:"100vh" }}>
      <div className="about-image-col">
        <div ref={spreadRef} className="about-spread">
        {SPREAD.map((p) => (
          <div key={p.area} data-area={p.area} style={{ gridArea: p.area, position: "relative", overflow: "hidden" }}>
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 1024px) 40vw, 30vw"
              style={{ objectFit: "cover", objectPosition: p.position }}
            />
          </div>
        ))}
        </div>
      </div>

      {/* Text col */}
      <div className="about-text-col" style={{ width:"100%", padding:"1.5rem clamp(1.5rem, 5vw, 5rem)" }}>
        <div ref={textRef} className="parallax-wrap about-text-grid" style={{ width:"100%", display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"clamp(1rem, 2.5vw, 2.5rem)" }}>
          <div style={{ paddingLeft:"0rem" }}>
          <SectionLabel>About.</SectionLabel>
            <h2 style={{ fontFamily:"var(--font-inter)", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:600, letterSpacing:"0.03em", lineHeight:1.05, color: T.normalFont}}>
              {HEADING_TIERS.map((word, i) => (
                <span key={word} style={{ display:"block", marginLeft:`calc(${i} * ${TIER_STEP})` }}>
                  {word}{i < HEADING_TIERS.length - 1 ? " " : ""}
                </span>
              ))}
            </h2>
            
            <p style={{ fontFamily:"var(--font-inter)", fontSize:"1.05rem", fontWeight:300, lineHeight:1.6, letterSpacing: "0.04rem", color: T.normalFont, maxWidth:"34rem", paddingLeft:"0.5rem"}}> 
              {BLURB_TIERS.map((phrase, i) => (
                <span key={phrase} style={{ display:"block", marginLeft:`calc(${i} * ${BLURB_STEP})` }}>
                  {phrase}{i < BLURB_TIERS.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
            </div>
          <div>
          <p style={{ fontFamily:"var(--font-inter)", fontSize:"1.05rem", fontWeight:300, lineHeight:1.9, color:T.normalFont, maxWidth:"34rem", paddingTop:"0.5rem"}}>
            I like building stuff that helps my friends and I:
            <br />1. Save money<br />2. Make our lives easier<br />3. Entertain us
            </p>
            </div>
            <div>
              <p style={{ fontFamily:"var(--font-inter)", fontSize:"1.05rem", fontWeight:300, lineHeight:1.9, color:T.normalFont, maxWidth:"34rem", paddingTop:"0.5rem"}}>
            In my freetime, I&apos;ve ran a small business selling handmade jewelry. I also like drawing, going to the gym and staring at ugly animals on the street.
            <br /><br />I&apos;ve always been fascinated by the intersection of technology and design, and I&apos;m constantly looking for ways to bring those two worlds together.
              </p>
        </div>
        </div>
        </div>
        {/* </div> */}
      </section>
  );
};

export default About;