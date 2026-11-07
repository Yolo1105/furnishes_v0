import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import shelfWall from "@/assets/rooms/shelf-wall.jpg";
import yellowSofa from "@/assets/rooms/yellow-sofa.jpg";
import { routes } from "@/lib/routes";

/**
 * What we sell, on the landing, after the owner's reference: what we do as
 * a whole on the left, a room on the right, then the two lines under both.
 * The words are drafts until the owner sets them.
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

/** The two lines, each its plain name, a sentence on how it differs, and the way in. */
export const LINES = [
  {
    name: "Furniture",
    text: "Ready-made sofas, tables, beds and storage in set sizes, made by our partner factory.",
    go: "Shop furniture",
    href: routes.furniture,
    photo: cabinSofa,
  },
  {
    name: "Modular furniture",
    text: "Shelves, storage and room dividers built from parts and cut to the size of your wall.",
    go: "Shop modular furniture",
    href: routes.modular,
    photo: shelfWall,
  },
] as const;
