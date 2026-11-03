import { ARRIVALS, finishBySlug, type Piece } from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";

/**
 * What can be changed on a modular piece, after the rebuild's "Customize",
 * cut to four lines, each with what it costs. Sizes, finishes and building
 * come from the catalogue; add-ons have no prices yet, so they say so.
 */
export function changesOf(piece: Piece) {
  const prices = piece.sizes.map((s) => s.price);
  const lo = Math.min(...prices);
  const hi = Math.max(...prices);
  const extra = piece.sizes.find((s) => s.built)?.built;
  const finishes = piece.finishes.map((f) => finishBySlug(f)?.name).filter(Boolean);
  return [
    {
      name: "Size",
      line: piece.sizes.length > 1 ? `${piece.sizes.length} sizes` : "One size, or yours on request",
      cost: lo === hi ? sgd(lo) : `${sgd(lo)} to ${sgd(hi)}`,
    },
    { name: "Finish", line: finishes.join(", "), cost: "Same price" },
    { name: "Add-ons", line: "Doors, drawers and hooks, where the piece takes them", cost: "Priced when you ask" },
    {
      name: "How it arrives",
      line: `${ARRIVALS.built.name} or ${ARRIVALS.parts.name.toLowerCase()}`,
      cost: extra ? `Built adds ${sgd(extra - piece.sizes.find((s) => s.built)!.price)}` : "Same price",
    },
  ];
}
