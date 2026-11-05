import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import yellowSofa from "@/assets/rooms/yellow-sofa.jpg";
import redSofa from "@/assets/details/red-sofa.jpg";
import shelfWall from "@/assets/rooms/shelf-wall.jpg";
import { routes } from "@/lib/routes";

/**
 * The landing's two lines, after the owner's reference: a first card with
 * the section's title and one line on a photo, then a card for each line.
 * The words are drafts until the owner sets them.
 */
export const LINES_HEAD = {
  title: "Furniture as different as your rooms",
  rest: "Two ways to furnish a room",
  photo: redSofa,
};

/**
 * The two lines as a choice, after the owner's reference: each a photo, its
 * title as the way in, and one sentence that says how the two differ.
 */
/**
 * In the landing's pair each line leads with its plain `name`, so the two
 * tell apart at a glance; `pairText` says how it differs, and `go` names
 * where its way in goes. The cards elsewhere keep `title` and `text`.
 */
/**
 * The pair's overview, after the owner's reference: what we do as a whole,
 * on the left, a room on the right, then the two lines under both.
 */
export const LINES_PAIR = {
  label: "What we sell",
  title: "Ready to place, or made to fit",
  lines: [
    "Furniture for Singapore homes and offices, in two kinds. Ready-made pieces in set sizes, and modular pieces built from parts and cut to your wall.",
    "Start with one piece. Add to it later. Take it with you when you move.",
  ],
  go: { label: "See the collection", href: routes.collection },
  photo: yellowSofa,
};

export const LINES = [
  {
    name: "Furniture",
    title: "Ready-made, ready for your room",
    pairText: "Ready-made sofas, tables, beds and storage in set sizes, made by our partner factory.",
    go: "Shop furniture",
    text: "Sofas, tables, beds and storage in the sizes listed, made by our partner factory.",
    href: routes.furniture,
    photo: cabinSofa,
  },
  {
    name: "Modular furniture",
    title: "Modular, sized to your wall",
    pairText: "Shelves, storage and room dividers built from parts and cut to the size of your wall.",
    go: "Shop modular furniture",
    text: "Shelves, storage and room dividers built from parts, sized to your wall.",
    href: routes.modular,
    photo: shelfWall,
  },
] as const;
