import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { BOARD_SIZE } from "./types";

/* Server-only helpers for the drawing API: admin sessions, upload checks
   and a small rate limiter. */

/* ── Admin session ──
   The cookie holds an HMAC derived from ADMIN_PASSWORD, never the password
   itself. Changing the password signs every existing session out. */

export const ADMIN_COOKIE = "drawings_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const sessionToken = (password: string) =>
  createHmac("sha256", password).update("drawings-admin-session-v1").digest("hex");

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/** The value to store in the admin cookie, or null if the password is wrong. */
export function login(password: string): string | null {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !safeEqual(password, expected)) return null;
  return sessionToken(expected);
}

export async function isAdmin(): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!value && safeEqual(value, sessionToken(expected));
}

/* ── Upload checks ── */

const PNG_PREFIX = "data:image/png;base64,";
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
export const MAX_PNG_BYTES = 700 * 1024;

/** Decodes the board's data URL, accepting only a BOARD_SIZE-square PNG. */
export function decodeBoardPng(dataUrl: unknown): Buffer | null {
  if (typeof dataUrl !== "string" || !dataUrl.startsWith(PNG_PREFIX)) return null;
  const png = Buffer.from(dataUrl.slice(PNG_PREFIX.length), "base64");
  if (png.length < 24 || png.length > MAX_PNG_BYTES) return null;
  if (!png.subarray(0, 8).equals(PNG_SIGNATURE)) return null;
  // IHDR is always the first chunk: width and height are bytes 16–23.
  if (png.readUInt32BE(16) !== BOARD_SIZE || png.readUInt32BE(20) !== BOARD_SIZE) return null;
  return png;
}

/** Trims a signature to plain text of at most `max` characters; empty → null. */
export function cleanName(raw: unknown, max: number): string | null {
  if (typeof raw !== "string") return null;
  const name = raw.replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
  return name || null;
}

/* ── Rate limit ──
   In memory, so on serverless hosting it is per instance and resets on cold
   starts: a speed bump against floods, not a hard guarantee. */

const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Supabase errors are plain objects, which log as {} — pull the message out. */
export function errorMessage(err: unknown): string {
  if (err && typeof err === "object" && "message" in err) {
    const { message, code } = err as { message: unknown; code?: unknown };
    return code ? `${String(message)} (${String(code)})` : String(message);
  }
  return String(err);
}
