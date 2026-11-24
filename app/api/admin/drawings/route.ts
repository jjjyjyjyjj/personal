import { NextResponse, type NextRequest } from "next/server";
import { getStore } from "@/lib/drawings/store";
import { isAdmin, errorMessage } from "@/lib/drawings/guard";
import { DRAWING_STATUSES, type DrawingStatus } from "@/lib/drawings/types";

/** Drawings in one status, for the approval page. */
export async function GET(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const store = getStore();
  if (!store) return NextResponse.json({ error: "Storage isn't set up yet." }, { status: 503 });

  const status = (request.nextUrl.searchParams.get("status") ?? "pending") as DrawingStatus;
  if (!DRAWING_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Unknown status." }, { status: 400 });
  }

  try {
    return NextResponse.json({ drawings: await store.list(status, 200) });
  } catch (err) {
    console.error("drawings: admin list failed", errorMessage(err));
    return NextResponse.json({ error: "Couldn't load drawings." }, { status: 500 });
  }
}
