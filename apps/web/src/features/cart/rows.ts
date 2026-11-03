import {
  addOnsOf,
  customDims,
  finishBySlug,
  pieceBySlug,
  priceOfChoice,
  sizeName,
  ARRIVALS,
} from "@/features/catalog/catalog";
import type { Line } from "./cart";

/**
 * The cart's lines as the pages show them: each with its piece, its choices
 * in words and its price, and the total. Lines whose piece is no longer sold
 * are left out. The cart and checkout both read this, so they never differ.
 */
export function cartRows(lines: readonly Line[]) {
  const rows = lines.flatMap((line, n) => {
    const piece = pieceBySlug(line.piece);
    const size = piece?.sizes[line.size];
    if (!piece || !size) return [];
    const custom = line.custom ?? null;
    const addOns = line.addOns ?? [];
    const extras = addOnsOf(piece.slug).filter((a) => addOns.includes(a.id));
    const choice = [
      custom ? `${customDims(custom, size.d)}, your size` : sizeName(size),
      finishBySlug(line.finish)?.name,
      line.arrival && ARRIVALS[line.arrival].name,
      extras.length > 0 && `With ${extras.map((a) => a.name.toLowerCase()).join(", ")}`,
    ]
      .filter(Boolean)
      .join(" · ");
    return [
      { n, line, piece, choice, estimate: !!custom, price: priceOfChoice(piece, size, line.arrival, custom, addOns) },
    ];
  });
  return { rows, total: rows.reduce((sum, r) => sum + r.price * r.line.qty, 0) };
}
