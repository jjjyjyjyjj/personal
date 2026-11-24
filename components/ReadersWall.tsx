"use client";

import { useEffect, useState, type FC } from "react";
import type { Drawing } from "@/lib/drawings/types";

const PER_PAGE = 6;
const TILTS = [-2.5, 1.5, -1, 2, -1.8, 1] as const;

type Wall =
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "ready"; open: boolean; drawings: Drawing[] };

const ReadersWall: FC = () => {
  const [wall, setWall] = useState<Wall>({ kind: "loading" });
  const [page, setPage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/drawings")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { open: boolean; drawings: Drawing[] }) => {
        if (!cancelled) setWall({ kind: "ready", open: data.open, drawings: data.drawings });
      })
      .catch(() => { if (!cancelled) setWall({ kind: "error" }); });
    return () => { cancelled = true; };
  }, []);

  if (wall.kind === "loading") return <p className="wall-note">Loading the wall…</p>;
  if (wall.kind === "error") return <p className="wall-note">The wall couldn&apos;t be loaded right now.</p>;
  if (!wall.open) return <p className="wall-note">The readers&apos; wall opens soon.</p>;
  if (wall.drawings.length === 0) {
    return <p className="wall-note">Nothing pinned up yet. Yours could be the first.</p>;
  }

  const pageCount = Math.ceil(wall.drawings.length / PER_PAGE);
  const start = page * PER_PAGE;
  const visible = wall.drawings.slice(start, start + PER_PAGE);

  return (
    <div className="wall">
      <ul className="wall-grid">
        {visible.map((d, i) => (
          <li key={d.id} className="wall-card" style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}>
            <img src={d.imageUrl} alt={`Drawing by ${d.name ?? "an anonymous reader"}`} loading="lazy" />
            <span className="wall-sig">— {d.name ?? "Anonymous"}</span>
          </li>
        ))}
      </ul>

      {pageCount > 1 && (
        <nav className="wall-pager" aria-label="Wall pages">
          <button type="button" onClick={() => setPage((p) => p - 1)} disabled={page === 0}>Prev</button>
          <span>{page + 1} / {pageCount}</span>
          <button type="button" onClick={() => setPage((p) => p + 1)} disabled={page === pageCount - 1}>Next</button>
        </nav>
      )}
    </div>
  );
};

export default ReadersWall;
