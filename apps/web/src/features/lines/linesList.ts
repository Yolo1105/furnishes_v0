import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import shelfWall from "@/assets/rooms/shelf-wall.jpg";
import { routes } from "@/lib/routes";

/**
 * The landing's two lines, after the owner's reference: a title with a short
 * note and a way into the collection beside it, then a panel for each line.
 * The words are drafts until the owner sets them.
 */
export const LINES_HEAD = {
  label: "What we sell",
  title: "Furniture as different as your rooms",
  rest: "Two ways to furnish a room",
  note: "Ready-made pieces in the sizes listed, or modular ones sized to your wall. Both made by our partner factory and delivered across Singapore.",
};

/**
 * The two lines side by side as a choice, after the owner's reference: a
 * title, one sentence that says how the two differ, the way in, then a
 * photo. The words are drafts until the owner sets them.
 */

export const LINES = [
  {
    title: "Ready-made, ready for your room",
    text: "Sofas, tables, beds and storage in the sizes listed, made by our partner factory.",
    go: "Shop furniture",
    href: routes.furniture,
    photo: cabinSofa,
  },
  {
    title: "Modular, sized to your wall",
    text: "Shelves, storage and room dividers built from parts, sized to your wall.",
    go: "Shop modular",
    href: routes.modular,
    photo: shelfWall,
  },
] as const;
