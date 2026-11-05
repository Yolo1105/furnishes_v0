import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import shelfWall from "@/assets/rooms/shelf-wall.jpg";
import { ARRIVALS, FURNITURE_WEEKS } from "@/features/catalog/catalog";
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
 * `tone` picks the panel's ground: filled red orange, or the page's cream
 * inside a red-orange line.
 * `top` runs across the panel's head, after the owner's journal reference:
 * its number, its kind and how long it takes, read from the catalogue.
 */
export const LINES = [
  {
    top: ["01", "Ready-made", FURNITURE_WEEKS],
    title: "Ready-made, ready for your room",
    name: "Ready-made furniture",
    go: "Shop furniture",
    href: routes.furniture,
    photo: cabinSofa,
    tone: "outline",
  },
  {
    top: ["02", "Modular", ARRIVALS.parts.weeks],
    title: "Modular, sized to your wall",
    name: "Modular furniture",
    go: "Shop modular",
    href: routes.modular,
    photo: shelfWall,
    tone: "warm",
  },
] as const;
