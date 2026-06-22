import { T } from "./tokens";
import type { CardData, ServiceData, StatData } from "./types";

export const NAV_LINKS = ["Projects", "About", "Contact"] as const;

export const MARQUEE_ITEMS = [
  "React",
  "Node.js/Next.js",
  "OpenCV",
  "Gemini API/ OpenAI API",
  "Git/GitHub",
  "Vultr",
  "AWS",
  "GCP",
  "Linux",
  "CI/CD"
] as const;

export const PROJECTS: CardData[] = [
  {
    id: 1, title: "Focus Friend [2026 SheHacks Winner]",
    cat: "Python, OpenCV, React, SQL, Vultr, Gemini",  collection: "Developed a React and Vultr-backed desktop application that uses OpenCV webcam analysis for real-time attention monitoring, coupled with Gemini AI to deliver data-driven productivity trend insights.",
    bg: T.ink,
    blobs: [
      `radial-gradient(ellipse 55% 70% at 35% 40%, ${T.steelBlue}66, transparent)`,
      `radial-gradient(ellipse 60% 50% at 70% 65%, ${T.grey}44, transparent)`,
    ],
    lines: "repeating-linear-gradient(160deg,transparent,transparent 40px,rgba(107,143,163,0.04) 40px,rgba(107,143,163,0.04) 41px)",
    link: "https://github.com/jjjyjyjyjj/AI-Companion",
  },
  {
    id: 2, title: "UofThrifts",
    cat: "React, Javascript, HTML, CSS", collection: "Co-developed a full-stack, end-to-end tested campus marketplace using React, TypeScript, and Supabase that features Gemini-powered semantic search and automated image processing.",
    bg: T.parchment,
    blobs: [
      `radial-gradient(ellipse 70% 80% at 30% 60%, ${T.mauve}66, transparent)`,
      `radial-gradient(ellipse 55% 55% at 75% 30%, ${T.grey}66, transparent)`,
    ],
    link: "https://uofthrifts.dev/",
  },
  {
    id: 3, title: "Miss WorldWide",
    cat: "React, Javascript, Google Maps API", collection: "Co-developed a geodiscovery web app for Toronto residents featuring interactive Google Maps spatial filtering, custom event accessibility toggles, and a dynamic monthly event density bar chart.",
    bg: T.parchment,
    blobs: [
      `radial-gradient(ellipse 70% 80% at 30% 60%, ${T.mauve}66, transparent)`,
      `radial-gradient(ellipse 55% 55% at 75% 30%, ${T.grey}66, transparent)`,
    ],
    link: "https://src-blue-zeta.vercel.app/",
  },

  {
    id: 4, title: "Virtual Memory Simulator",
    cat: "C", collection: "Built a virtual memory simulator featuring multi-level page tables, software-loaded TLBs, Copy-on-Write (CoW) optimizations, and modular page-replacement algorithms.",
    bg: T.parchment,
    blobs: [
      `radial-gradient(ellipse 70% 80% at 30% 60%, ${T.mauve}66, transparent)`,
      `radial-gradient(ellipse 55% 55% at 75% 30%, ${T.grey}66, transparent)`,
    ],
  },
  {
    id: 5, title: "FUSE File System",
    cat: " C, Linux, FUSE", collection: "Engineered a Linux-compatible, extent-based FUSE file system in C featuring inline data support, atomic metadata structures, and checksum verification for data integrity.",
    bg: T.ivory,
    blobs: [
      `radial-gradient(ellipse 65% 75% at 55% 50%, ${T.sepia}66, transparent)`,
      `radial-gradient(ellipse 50% 60% at 20% 70%, ${T.grey}55, transparent)`,
    ],
    lines: "repeating-linear-gradient(80deg,transparent,transparent 28px,rgba(107,85,72,0.04) 28px,rgba(107,85,72,0.04) 29px)",
  },
  {
    id: 6, title: "Cooperative User-Level Thread Package ",
    cat: "C",  collection: "Created a user-level x86-64 threading library with custom context-switching, an FCFS scheduler, and low-level stack manipulation for cooperative multitasking.",
    bg: "#1E2B35",
    blobs: [
      `radial-gradient(ellipse 70% 60% at 40% 55%, ${T.steelBlue}55, transparent)`,
      `radial-gradient(ellipse 55% 70% at 75% 30%, ${T.steelSoft}33, transparent)`,
    ],
  },
  {
    id: 7, title: "Pantry Pal",
    cat: "Java",    collection: "Developed an recipe generator that integrates a third-party API to recommend personalized meals based on user ingredients, reducing manual data entry by 40%.",
    bg: "#D8CCBF",
    blobs: [
      `radial-gradient(ellipse 60% 70% at 60% 45%, ${T.steelPale}55, transparent)`,
      `radial-gradient(ellipse 50% 55% at 25% 65%, ${T.mauve}55, transparent)`,
    ],
    link:"https://github.com/jjjyjyjyjj/sexydevelopers",
  },
];

// export const STATS: StatData[] = [
//   { value: "May-Aug", label: "Cybersecurity Consulting Intern @ EY" },
//   { value: "JAn-APr",   label: "Collections" },
//   { value: "3",   label: "Fashion weeks" },
// ];

export const FOOTER_LINKS = ["Back to Top"] as const;
