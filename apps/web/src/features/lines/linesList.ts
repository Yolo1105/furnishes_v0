import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
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
export const LINES = [
  {
    title: "Ready-made, ready for your room",
    text: "Sofas, tables, beds and storage in the sizes listed, made by our partner factory.",
    href: routes.furniture,
    photo: cabinSofa,
  },
  {
    title: "Modular, sized to your wall",
    text: "Shelves, storage and room dividers built from parts, sized to your wall.",
    href: routes.modular,
    photo: shelfWall,
  },
] as const;
