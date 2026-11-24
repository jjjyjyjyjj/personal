/* Shared by the drawing board, the admin page and the API routes. */

export type DrawingStatus = "pending" | "approved" | "rejected";

export const DRAWING_STATUSES: readonly DrawingStatus[] = ["pending", "approved", "rejected"];

export interface Drawing {
  id: string;
  /** What the visitor signed it with; null means anonymous. */
  name: string | null;
  status: DrawingStatus;
  createdAt: string;
  /** Short-lived URL for the PNG — fetch the list again rather than storing it. */
  imageUrl: string;
}

/** The board's canvas size in pixels. The server rejects anything else. */
export const BOARD_SIZE = 600;

export const NAME_MAX = 40;
