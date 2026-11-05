import { pieceBySlug, type Piece } from "@/features/catalog/catalog";
import { mailAbout } from "@/lib/contact";

/**
 * Our pieces in real rooms, after the owner's "in the real world"
 * reference. There are no customers' photos yet, so nothing here poses as
 * one: each card is one of our pieces in a room photo, with the room it
 * suits where a customer's name would go. Once people send their rooms,
 * these become theirs, with their leave.
 */
export const REAL_HEAD = {
  label: "Real rooms",
  title: ["Furnishes in real rooms.", "Yours could be next."],
  rest: "Send us a photo of your room, and with your leave we may show it here.",
  send: { label: "Send us your room", href: mailAbout("My room, to share") },
};

/** The pieces shown, in order; each card's photo and words come from the catalogue. */
const SLUGS = ["sofa", "low-cabinet", "office-desk", "entry-pack", "room-divider", "bedside-block", "dining-table"];

export const REAL_ROOMS: readonly Piece[] = SLUGS.flatMap((slug) => pieceBySlug(slug) ?? []);
