import type { CardData } from "./types";

export const NAV_LINKS = ["About", "Projects",  "Contact"] as const;

export const FOOTER_LINKS = ["Back to Top"] as const;

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
  "CI/CD",
] as const;

export const PROJECTS: CardData[] = [
  {
    id: 1,
    title: "Focus Friend [2026 SheHacks Winner]",
    cat: "Python, OpenCV, React, SQL, Vultr, Gemini",
    collection:
      "Developed a React and Vultr-backed desktop application that uses OpenCV webcam analysis for real-time attention monitoring, coupled with Gemini AI to deliver data-driven productivity trend insights.",
    link: "https://github.com/jjjyjyjyjj/AI-Companion",
  },
  {
    id: 2,
    title: "UofThrifts",
    cat: "React, Javascript, HTML, CSS",
    collection:
      "Co-developed a full-stack, end-to-end tested campus marketplace using React, TypeScript, and Supabase that features Gemini-powered semantic search and automated image processing.",
    link: "https://uofthrifts.dev/",
  },
  {
    id: 3,
    title: "Security Scanner",
    cat: "Typescript, OpenAI, Semgrep, Gitleaks",
    collection:
      "Built a VS Code extension that scans code for insecure patterns and exposed secrets before commit, helping developers catch vulnerabilities early.",
    link: "https://marketplace.visualstudio.com/items?itemName=jjjyjyjyjj.security-scanner",
  },
  {
    id: 4,
    title: "Virtual Memory Simulator",
    cat: "C",
    collection:
      "Built a virtual memory simulator featuring multi-level page tables, software-loaded TLBs, Copy-on-Write (CoW) optimizations, and modular page-replacement algorithms.",
  },
  {
    id: 5,
    title: "FUSE File System",
    cat: "C, Linux, FUSE",
    collection:
      "Engineered a Linux-compatible, extent-based FUSE file system in C featuring inline data support, atomic metadata structures, and checksum verification for data integrity.",
  },
  {
    id: 6,
    title: "Cooperative User-Level Thread Package",
    cat: "C",
    collection:
      "Created a user-level x86-64 threading library with custom context-switching, an FCFS scheduler, and low-level stack manipulation for cooperative multitasking.",
  },
  {
    id: 7,
    title: "Pantry Pal",
    cat: "Java",
    collection:
      "Developed a recipe generator that integrates a third-party API to recommend personalized meals based on user ingredients, reducing manual data entry by 40%.",
    link: "https://github.com/jjjyjyjyjj/sexydevelopers",
  },
  {
    id: 8,
    title: "Miss WorldWide",
    cat: "React, Javascript, Google Maps API",
    collection:
      "Co-developed a geodiscovery web app for Toronto residents featuring interactive Google Maps spatial filtering, custom event accessibility toggles, and a dynamic monthly event density bar chart.",
    link: "https://src-blue-zeta.vercel.app/",
  },
];
