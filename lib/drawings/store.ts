import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import type { Drawing, DrawingStatus } from "./types";

/* Server-only. Where submitted drawings live.

   Production uses Supabase: a `drawings` table plus a private `drawings`
   storage bucket (see supabase/drawings.sql). Everything goes through the
   secret key on the server, so visitors can never read pending drawings or
   change a status themselves.

   In development without Supabase keys, drawings are kept in .data/ instead,
   so the board and the admin page can be tried locally. */

export interface DrawingStore {
  create(input: { png: Buffer; name: string | null }): Promise<void>;
  list(status: DrawingStatus, limit: number): Promise<Drawing[]>;
  setStatus(id: string, status: DrawingStatus): Promise<boolean>;
  remove(id: string): Promise<boolean>;
}

const BUCKET = "drawings";
const SIGNED_URL_SECONDS = 60 * 60;

function supabaseStore(url: string, serviceKey: string): DrawingStore {
  const db = createClient(url, serviceKey, { auth: { persistSession: false } });

  return {
    async create({ png, name }) {
      const id = randomUUID();
      const imagePath = `${id}.png`;
      const upload = await db.storage.from(BUCKET).upload(imagePath, png, { contentType: "image/png" });
      if (upload.error) throw upload.error;

      const insert = await db.from("drawings").insert({ id, name, image_path: imagePath, status: "pending" });
      if (insert.error) {
        // Don't leave an orphaned file behind if the row failed.
        await db.storage.from(BUCKET).remove([imagePath]);
        throw insert.error;
      }
    },

    async list(status, limit) {
      const rows = await db
        .from("drawings")
        .select("id, name, status, created_at, image_path")
        .eq("status", status)
        .order("created_at", { ascending: false })
        .limit(limit);
      if (rows.error) throw rows.error;
      if (rows.data.length === 0) return [];

      const signed = await db.storage
        .from(BUCKET)
        .createSignedUrls(rows.data.map((r) => r.image_path), SIGNED_URL_SECONDS);
      if (signed.error) throw signed.error;
      const urlFor = new Map(signed.data.map((s) => [s.path, s.signedUrl]));

      return rows.data.map((r) => ({
        id: r.id,
        name: r.name,
        status: r.status,
        createdAt: r.created_at,
        imageUrl: urlFor.get(r.image_path) ?? "",
      }));
    },

    async setStatus(id, status) {
      const res = await db.from("drawings").update({ status }).eq("id", id).select("id");
      if (res.error) throw res.error;
      return res.data.length > 0;
    },

    async remove(id) {
      const res = await db.from("drawings").delete().eq("id", id).select("image_path");
      if (res.error) throw res.error;
      if (res.data.length === 0) return false;
      await db.storage.from(BUCKET).remove(res.data.map((r) => r.image_path));
      return true;
    },
  };
}

/* Development stand-in: one JSON index plus a PNG per drawing in .data/. */
function localStore(): DrawingStore {
  const dir = path.join(process.cwd(), ".data", "drawings");
  const indexFile = path.join(dir, "index.json");

  type Row = Omit<Drawing, "imageUrl">;

  const readIndex = async (): Promise<Row[]> => {
    try {
      return JSON.parse(await readFile(indexFile, "utf8")) as Row[];
    } catch {
      return [];
    }
  };
  const writeIndex = (rows: Row[]) => writeFile(indexFile, JSON.stringify(rows, null, 2));
  const pngPath = (id: string) => path.join(dir, `${id}.png`);

  return {
    async create({ png, name }) {
      await mkdir(dir, { recursive: true });
      const id = randomUUID();
      await writeFile(pngPath(id), png);
      const rows = await readIndex();
      rows.push({ id, name, status: "pending", createdAt: new Date().toISOString() });
      await writeIndex(rows);
    },

    async list(status, limit) {
      const rows = (await readIndex())
        .filter((r) => r.status === status)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, limit);
      return Promise.all(
        rows.map(async (r) => ({
          ...r,
          imageUrl: `data:image/png;base64,${(await readFile(pngPath(r.id))).toString("base64")}`,
        }))
      );
    },

    async setStatus(id, status) {
      const rows = await readIndex();
      const row = rows.find((r) => r.id === id);
      if (!row) return false;
      row.status = status;
      await writeIndex(rows);
      return true;
    },

    async remove(id) {
      const rows = await readIndex();
      const next = rows.filter((r) => r.id !== id);
      if (next.length === rows.length) return false;
      await writeIndex(next);
      await rm(pngPath(id), { force: true });
      return true;
    },
  };
}

let cached: DrawingStore | null | undefined;

/** null when submissions aren't set up (production without Supabase keys). */
export function getStore(): DrawingStore | null {
  if (cached !== undefined) return cached;
  const url = process.env.SUPABASE_URL;
  // Supabase's new "sb_secret_" key; older projects call it the service_role key.
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) cached = supabaseStore(url, key);
  else if (process.env.NODE_ENV !== "production") cached = localStore();
  else cached = null;
  return cached;
}
