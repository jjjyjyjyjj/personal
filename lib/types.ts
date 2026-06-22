import type { RefObject } from "react";

export interface CursorRefs {
  dot:  RefObject<HTMLDivElement | null>;
  ring: RefObject<HTMLDivElement | null>;
}

export interface CardData {
  id:         number;
  title:      string;
  cat:        string;
  collection: string;
  bg:         string;
  blobs:      string[];
  lines?:     string;
  link?:      string;
}

export interface ServiceData {
  num:  string;
  name: string;
  desc: string;
}

export interface StatData {
  value: string;
  label: string;
}
