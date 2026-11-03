import aFrame from "@/assets/banner/a-frame.jpg";
import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import orangeRoom from "@/assets/banner/orange-room.jpg";
import kitchen from "@/assets/rooms/kitchen.jpg";
import living from "@/assets/rooms/living.jpg";
import study from "@/assets/rooms/study.jpg";
import yellowSofa from "@/assets/rooms/yellow-sofa.jpg";
import { FURNITURE_WEEKS } from "@/features/catalog/catalog";
import { shopHref } from "@/features/catalog/filters";
import { pieceOf, routes } from "@/lib/routes";

/**
 * The Furniture page's words, in one place. Furniture is ready-made by the
 * partner factory, so there is no choice of size beyond what is listed;
 * answers marked wait on the owner.
 */

/** The banner, in the collection banner's shape. */
export const FURNITURE_BANNER = {
  photo: cabinSofa,
  room: "Living room",
  lead: "Furniture, ready-made,",
  rest: `and delivered to your room in ${FURNITURE_WEEKS}.`,
};

/** How a piece reaches you, from order to room. */
export const FURNITURE_STEPS = [
  { name: "Choose a piece", line: "Pick its size and finish from those listed, and order online." },
  {
    name: "Made for your order",
    line: "Our partner factory in China makes it and checks it before it ships.",
  },
  {
    name: "Delivered and placed",
    line: `In ${FURNITURE_WEEKS}, at a time you choose, carried in and set where you want it.`,
  },
] as const;

/** What every furniture order comes with; returns are placeholder terms. */
export const FURNITURE_PROMISES = [
  { icon: "truck", name: "Delivered in Singapore", line: "At a time you choose, carried in and placed." },
  { icon: "parts", name: "Arrives assembled", line: "Ready to use, with nothing to put together." },
  { icon: "return", name: "Returns within 14 days", line: "Unused and boxed [placeholder terms]." },
  { icon: "factory", name: "Made by our partner factory", line: "In China, to our sizes and finishes." },
] as const;

/** Questions people ask before they order; answers are placeholders. */
export const FURNITURE_QUESTIONS = [
  {
    q: "Can I have a piece in another size or colour?",
    a: "Furniture comes in the sizes and finishes listed. For a piece made to your size, see our modular furniture.",
  },
  {
    q: "Will it fit through my lift and door?",
    a: "Each piece's size is on its page. Measure your lift and door first, or book a visit and we'll measure for you.",
  },
  {
    q: "Can I see a piece before I buy?",
    a: "We have no showroom, but we can bring finish samples on a home visit, or send them by request.",
  },
  {
    q: `Why does it take ${FURNITURE_WEEKS}?`,
    a: "Each piece is made for your order, then shipped from China to Singapore.",
  },
] as const;

/** Beside the pieces' title, the way to a piece made to measure. */
export const TO_MODULAR = { href: routes.modular, label: "Need your own size? See modular furniture" };

/**
 * The kinds of furniture as tiles, two a row, a wide one beside a narrow
 * one and the other way round on the next row, as the owner's reference.
 * The photos are rooms that stand in for the pieces.
 */
export const FURNITURE_KINDS = [
  {
    name: "Sofas",
    line: "Deep seats, with covers that come off to wash",
    photo: cabinSofa,
    wide: true,
    href: shopHref({ kind: ["sofas"] }),
  },
  {
    name: "Tables",
    line: "For meals, and homework after",
    photo: kitchen,
    wide: false,
    href: shopHref({ kind: ["tables"] }),
  },
  {
    name: "Storage",
    line: "Shelves from floor to eye level",
    photo: orangeRoom,
    wide: false,
    href: shopHref({ kind: ["storage"] }),
  },
  {
    name: "Desks and chairs",
    line: "For a study at home, or a startup's first office",
    photo: study,
    wide: true,
    href: shopHref({ kind: ["desks", "chairs"] }),
  },
];

/** Every furniture piece in the list, for the "all" links beside titles. */
const ALL_FURNITURE = `${routes.products}?line=furniture`;

/** The pieces people order most, by slug; a placeholder pick until there are sales. */
export const BESTSELLERS = {
  title: "Bestsellers",
  rest: "What people order most",
  slugs: ["sofa", "dining-table", "office-desk", "bookcase"],
  aside: { href: ALL_FURNITURE, label: "Browse all furniture" },
};

/** The dark half and the photo half: the way to a piece in your own size. */
export const OWN_SIZE = {
  title: "Need another size?",
  rest: "Have it made to measure.",
  line: "Our modular pieces are made to the width of your wall, in the same finishes, and arrive ready to go or in parts.",
  go: { href: routes.modular, label: "See modular furniture" },
  photo: aFrame,
};

/** One piece large, four beside it, by slug; the first is the large one. */
export const FEATURED = {
  title: "Featured",
  rest: "Picked for HDB flats",
  slugs: ["executive-desk", "office-chair", "dining-table", "sofa", "bookcase"],
  aside: { href: ALL_FURNITURE, label: "Browse all furniture" },
};

/** Who makes it: a photo, then the words on a tile beside it; placeholder story. */
export const MADE_BY = {
  title: "Made well",
  rest: "By people we know",
  line: "Every piece is made to order by our partner factory in China, to our sizes and finishes, checked before it ships, and carried into your room in Singapore.",
  go: { href: routes.about, label: "Read our story" },
  photo: living,
};

/**
 * One piece over a full-width photo, after the owner's reference: a small
 * label, a short headline and a line, centred, with a light button. The
 * sofa, as the piece a living room is built around.
 */
export const SPOTLIGHT = {
  label: "Meet the sofa",
  title: "Sits deep. Washes easy.",
  line: "Deep seats and covers that come off to wash, for a living room that gets lived in.",
  go: { label: "Shop now", href: pieceOf("sofa") },
  photo: yellowSofa,
};
