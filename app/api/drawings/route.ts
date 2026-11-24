import { NextResponse } from "next/server";
import { getStore } from "@/lib/drawings/store";
import { clientIp, cleanName, decodeBoardPng, MAX_PNG_BYTES, rateLimited, errorMessage } from "@/lib/drawings/guard";
import { NAME_MAX } from "@/lib/drawings/types";

const GALLERY_LIMIT = 60;

/** Approved drawings for the readers' wall, newest first. */
export async function GET() {
  const store = getStore();
  if (!store) return NextResponse.json({ open: false, drawings: [] });
  try {
    const drawings = await store.list("approved", GALLERY_LIMIT);
    // The image links expire, and approvals should show up straight away.
    return NextResponse.json({ open: true, drawings }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("drawings: list failed", errorMessage(err));
    return NextResponse.json({ error: "Couldn't load drawings." }, { status: 500 });
  }
}

/** A visitor's submission. It is stored as pending until approved. */
export async function POST(request: Request) {
  const store = getStore();
  if (!store) return NextResponse.json({ error: "Submissions aren't open yet." }, { status: 503 });

  // Base64 inflates by ~4/3; leave room for the JSON around it.
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_PNG_BYTES * 1.4 + 2048) {
    return NextResponse.json({ error: "That drawing is too large." }, { status: 413 });
  }

  if (rateLimited(`submit:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many drawings at once — try again in a few minutes." }, { status: 429 });
  }

  let body: { image?: unknown; name?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Hidden field only bots fill in: pretend it worked and keep nothing.
  if (typeof body.website === "string" && body.website !== "") {
    return NextResponse.json({ ok: true });
  }

  const png = decodeBoardPng(body.image);
  if (!png) return NextResponse.json({ error: "That doesn't look like a drawing from the board." }, { status: 400 });

  try {
    await store.create({ png, name: cleanName(body.name, NAME_MAX) });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("drawings: create failed", errorMessage(err));
    return NextResponse.json({ error: "Couldn't save your drawing. Please try again." }, { status: 500 });
  }
}
