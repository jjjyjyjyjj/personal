"use client";

import { useCallback, useEffect, useState, type FC, type FormEvent } from "react";
import { DRAWING_STATUSES, type Drawing, type DrawingStatus } from "@/lib/drawings/types";

/* The approval desk at /admin: sign in with ADMIN_PASSWORD, then approve or
   reject readers' drawings. Not linked from the site. */

type View =
  | { kind: "checking" }
  | { kind: "signed-out"; error?: string }
  | { kind: "error"; message: string }
  | { kind: "list"; drawings: Drawing[] };

const LABELS: Record<DrawingStatus, string> = {
  pending: "Waiting",
  approved: "On the wall",
  rejected: "Rejected",
};

/* What each tab offers: the statuses a drawing in it can move to. */
const MOVES: Record<DrawingStatus, { to: DrawingStatus; label: string }[]> = {
  pending: [
    { to: "approved", label: "Approve" },
    { to: "rejected", label: "Reject" },
  ],
  approved: [{ to: "rejected", label: "Take down" }],
  rejected: [{ to: "approved", label: "Approve" }],
};

const AdminPanel: FC = () => {
  const [status, setStatus] = useState<DrawingStatus>("pending");
  const [view, setView] = useState<View>({ kind: "checking" });
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async (which: DrawingStatus) => {
    const res = await fetch(`/api/admin/drawings?status=${which}`);
    if (res.status === 401) return setView({ kind: "signed-out" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setView({ kind: "error", message: data.error ?? "Something went wrong." });
    setView({ kind: "list", drawings: data.drawings });
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/drawings?status=${status}`)
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 401) return setView({ kind: "signed-out" });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) return setView({ kind: "error", message: data.error ?? "Something went wrong." });
        setView({ kind: "list", drawings: data.drawings });
      })
      .catch(() => { if (!cancelled) setView({ kind: "error", message: "Couldn't reach the server." }); });
    return () => { cancelled = true; };
  }, [status]);

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return setView({ kind: "signed-out", error: data.error ?? "Couldn't sign in." });
    }
    setView({ kind: "checking" });
    await load(status);
  };

  const signOut = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    setView({ kind: "signed-out" });
  };

  const act = async (id: string, request: RequestInit) => {
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/drawings/${id}`, {
        ...request,
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "That didn't work.");
        return;
      }
      // It has left this tab either way.
      setView((v) => (v.kind === "list" ? { ...v, drawings: v.drawings.filter((d) => d.id !== id) } : v));
    } finally {
      setBusy(null);
    }
  };

  const move = (id: string, to: DrawingStatus) => act(id, { method: "PATCH", body: JSON.stringify({ status: to }) });

  const remove = (d: Drawing) => {
    if (!confirm(`Delete the drawing by ${d.name ?? "Anonymous"} for good? This can't be undone.`)) return;
    act(d.id, { method: "DELETE" });
  };

  return (
    <main className="admin">
      <header className="admin-head">
        <h1>Approvals</h1>
        {view.kind === "list" && (
          <button type="button" className="admin-link" onClick={signOut}>Sign out</button>
        )}
      </header>

      {view.kind === "checking" && <p className="wall-note">Checking…</p>}

      {view.kind === "error" && <p className="wall-note">{view.message}</p>}

      {view.kind === "signed-out" && (
        <form className="admin-login" onSubmit={signIn}>
          <label className="board-name">
            <span>Password</span>
            <input type="password" name="password" autoComplete="current-password" required autoFocus />
          </label>
          <button type="submit" className="board-submit">Sign in</button>
          {view.error && <p className="board-status" role="alert">{view.error}</p>}
        </form>
      )}

      {view.kind === "list" && (
        <>
          <nav className="admin-tabs" aria-label="Drawing status">
            {DRAWING_STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                className="board-tool board-text"
                aria-pressed={status === s}
                onClick={() => { if (s !== status) { setView({ kind: "checking" }); setStatus(s); } }}
              >
                {LABELS[s]}
              </button>
            ))}
          </nav>

          {view.drawings.length === 0 ? (
            <p className="wall-note">Nothing here.</p>
          ) : (
            <ul className="admin-grid">
              {view.drawings.map((d) => (
                <li key={d.id} className="admin-card">
                  {/* eslint-disable-next-line @next/next/no-img-element -- short-lived signed URLs */}
                  <img src={d.imageUrl} alt={`Drawing by ${d.name ?? "Anonymous"}`} />
                  <div className="admin-meta">
                    <span className="wall-sig">— {d.name ?? "Anonymous"}</span>
                    <time dateTime={d.createdAt}>{new Date(d.createdAt).toLocaleString()}</time>
                  </div>
                  <div className="admin-actions">
                    {MOVES[status].map((m) => (
                      <button
                        key={m.to}
                        type="button"
                        className={m.to === "approved" ? "board-submit" : "board-tool board-text"}
                        disabled={busy === d.id}
                        onClick={() => move(d.id, m.to)}
                      >
                        {m.label}
                      </button>
                    ))}
                    <button type="button" className="admin-link" disabled={busy === d.id} onClick={() => remove(d)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
};

export default AdminPanel;
