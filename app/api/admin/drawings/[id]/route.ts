import { NextResponse, type NextRequest } from "next/server";
import { getStore } from "@/lib/drawings/store";
import { isAdmin, errorMessage } from "@/lib/drawings/guard";
import { DRAWING_STATUSES, type DrawingStatus } from "@/lib/drawings/types";

type Ctx = { params: Promise<{ id: string }> };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function guard(ctx: Ctx) {
  if (!(await isAdmin())) return { error: NextResponse.json({ error: "Sign in first." }, { status: 401 }) };
  const store = getStore();
  if (!store) return { error: NextResponse.json({ error: "Storage isn't set up yet." }, { status: 503 }) };
  const { id } = await ctx.params;
  if (!UUID.test(id)) return { error: NextResponse.json({ error: "Not found." }, { status: 404 }) };
  return { store, id };
}

/** Approve, reject, or move a drawing back to pending. */
export async function PATCH(request: NextRequest, ctx: Ctx) {
  const g = await guard(ctx);
  if (g.error) return g.error;

  let status: unknown;
  try {
    ({ status } = await request.json());
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  if (!DRAWING_STATUSES.includes(status as DrawingStatus)) {
    return NextResponse.json({ error: "Unknown status." }, { status: 400 });
  }

  try {
    const found = await g.store.setStatus(g.id, status as DrawingStatus);
    return found ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found." }, { status: 404 });
  } catch (err) {
    console.error("drawings: status update failed", errorMessage(err));
    return NextResponse.json({ error: "Couldn't update it." }, { status: 500 });
  }
}

/** Delete a drawing and its image for good. */
export async function DELETE(_request: NextRequest, ctx: Ctx) {
  const g = await guard(ctx);
  if (g.error) return g.error;

  try {
    const found = await g.store.remove(g.id);
    return found ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found." }, { status: 404 });
  } catch (err) {
    console.error("drawings: delete failed", errorMessage(err));
    return NextResponse.json({ error: "Couldn't delete it." }, { status: 500 });
  }
}
