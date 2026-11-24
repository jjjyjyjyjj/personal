"use client";

import { useEffect, useRef, useState, type FC, type FormEvent, type PointerEvent } from "react";
import { BOARD_SIZE, NAME_MAX } from "@/lib/drawings/types";

/* A square sketchpad visitors draw on and send in for approval.
   Strokes are kept as point lists so undo can repaint without them; the
   paper colour is fixed (not themed) so drawings look the same everywhere. */

type Stroke = { color: string; size: number; points: [number, number][] };
type SendState = { kind: "idle" | "sending" | "sent" } | { kind: "error"; message: string };

const PAPER = "#FBF8F3";

const INKS = [
  { name: "Ink",   value: "#2B211F" },
  { name: "Rose",  value: "#B5545C" },
  { name: "Slate", value: "#4F6D7E" },
  { name: "Moss",  value: "#6B7A3A" },
  { name: "Ochre", value: "#D49A2A" },
] as const;

const SIZES = [
  { name: "Fine",   value: 3 },
  { name: "Medium", value: 8 },
  { name: "Bold",   value: 18 },
] as const;

function drawSegment(ctx: CanvasRenderingContext2D, s: Stroke, from: number) {
  ctx.strokeStyle = s.color;
  ctx.fillStyle = s.color;
  ctx.lineWidth = s.size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (s.points.length === 1) {
    const [x, y] = s.points[0];
    ctx.beginPath();
    ctx.arc(x, y, s.size / 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(...s.points[Math.max(from - 1, 0)]);
  for (let i = Math.max(from, 1); i < s.points.length; i++) ctx.lineTo(...s.points[i]);
  ctx.stroke();
}

function repaint(ctx: CanvasRenderingContext2D, strokes: Stroke[]) {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
  for (const s of strokes) drawSegment(ctx, s, 0);
}

const DrawingBoard: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const current = useRef<Stroke | null>(null);
  // Bumped whenever strokes change, so Undo/Clear/Send enable themselves.
  const [count, setCount] = useState(0);

  const [ink, setInk] = useState<string>(INKS[0].value);
  const [size, setSize] = useState<number>(SIZES[1].value);
  const [erasing, setErasing] = useState(false);
  const [name, setName] = useState("");
  const [send, setSend] = useState<SendState>({ kind: "idle" });

  const ctx = () => canvasRef.current?.getContext("2d") ?? null;

  useEffect(() => {
    const c = ctx();
    if (c) repaint(c, []);
  }, []);

  const toBoard = (e: PointerEvent<HTMLCanvasElement>): [number, number] => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = BOARD_SIZE / rect.width;
    return [(e.clientX - rect.left) * scale, (e.clientY - rect.top) * scale];
  };

  const onDown = (e: PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const stroke: Stroke = { color: erasing ? PAPER : ink, size: erasing ? size * 2.5 : size, points: [toBoard(e)] };
    current.current = stroke;
    const c = ctx();
    if (c) drawSegment(c, stroke, 0);
    if (send.kind !== "idle") setSend({ kind: "idle" });
  };

  const onMove = (e: PointerEvent<HTMLCanvasElement>) => {
    const stroke = current.current;
    if (!stroke) return;
    const from = stroke.points.length;
    // Coalesced events keep fast strokes smooth instead of jagged.
    const events = e.nativeEvent.getCoalescedEvents?.() ?? [];
    if (events.length) {
      const rect = e.currentTarget.getBoundingClientRect();
      const scale = BOARD_SIZE / rect.width;
      for (const ev of events) stroke.points.push([(ev.clientX - rect.left) * scale, (ev.clientY - rect.top) * scale]);
    } else {
      stroke.points.push(toBoard(e));
    }
    const c = ctx();
    if (c) drawSegment(c, stroke, from);
  };

  const onUp = () => {
    if (!current.current) return;
    strokes.current.push(current.current);
    current.current = null;
    setCount(strokes.current.length);
  };

  const undo = () => {
    strokes.current.pop();
    const c = ctx();
    if (c) repaint(c, strokes.current);
    setCount(strokes.current.length);
  };

  const clear = () => {
    strokes.current = [];
    const c = ctx();
    if (c) repaint(c, []);
    setCount(0);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas || count === 0 || send.kind === "sending") return;

    setSend({ kind: "sending" });
    const website = (new FormData(e.currentTarget).get("website") as string) ?? "";
    try {
      const res = await fetch("/api/drawings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: canvas.toDataURL("image/png"), name, website }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSend({ kind: "error", message: data.error ?? "Couldn't send it. Please try again." });
        return;
      }
      clear();
      setName("");
      setSend({ kind: "sent" });
    } catch {
      setSend({ kind: "error", message: "You seem to be offline. Please try again." });
    }
  };

  return (
    <form className="board" onSubmit={submit}>
      <div className="board-tools" role="toolbar" aria-label="Drawing tools">
        <div className="board-group">
          {INKS.map((c) => (
            <button
              key={c.value}
              type="button"
              className="board-swatch"
              style={{ background: c.value }}
              aria-label={c.name}
              aria-pressed={!erasing && ink === c.value}
              onClick={() => { setInk(c.value); setErasing(false); }}
            />
          ))}
        </div>
        <div className="board-group">
          {SIZES.map((s) => (
            <button
              key={s.value}
              type="button"
              className="board-tool"
              aria-label={`${s.name} brush`}
              aria-pressed={size === s.value}
              onClick={() => setSize(s.value)}
            >
              <span className="board-dot" style={{ width: s.value + 2, height: s.value + 2 }} />
            </button>
          ))}
          <button type="button" className="board-tool board-text" aria-pressed={erasing} onClick={() => setErasing((v) => !v)}>
            Eraser
          </button>
        </div>
        {/* Grouped so the tools wrap onto two rows at most, never three:
            the board's size is worked out from that (see globals.css). */}
        <div className="board-group">
          
          <button type="button" className="board-tool board-text" onClick={undo} disabled={count === 0}>Undo</button>
          <button type="button" className="board-tool board-text" onClick={clear} disabled={count === 0}>Clear</button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="board-canvas"
        width={BOARD_SIZE}
        height={BOARD_SIZE}
        role="img"
        aria-label="Drawing board. Draw with your mouse, finger or stylus."
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />

      <div className="board-send">
        <label className="board-name">
          <span>Sign it</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={NAME_MAX}
            placeholder="anonymous"
            autoComplete="nickname"
          />
        </label>
        {/* Spam trap: hidden from people, filled in by bots. */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="board-trap" />
        <button type="submit" className="board-submit" disabled={count === 0 || send.kind === "sending"}>
          {send.kind === "sending" ? "Sending…" : "Send to Jia"}
        </button>
      </div>

      <p className="board-status" role="status">
        {send.kind === "sent" && "Thank you! It'll go up on the wall once approved."}
        {send.kind === "error" && send.message}
      </p>
    </form>
  );
};

export default DrawingBoard;
