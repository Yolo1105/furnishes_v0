import living from "@/assets/rooms/living.jpg";
import shelfWall from "@/assets/rooms/shelf-wall.jpg";
import sewing from "@/assets/details/sewing.jpg";
import yellowChair from "@/assets/details/yellow-chair.jpg";
import redSofa from "@/assets/details/red-sofa.jpg";
import aFrame from "@/assets/banner/a-frame.jpg";
import { ARRIVALS, FURNITURE_WEEKS } from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";
import { FACTS } from "@/lib/site";
import type { ClosingBand } from "@/features/collection/Closing";
import { routes } from "@/lib/routes";

/**
 * The about page's words, after the rebuild's about page, cut down. Every
 * figure is read from v0's own facts (the catalogue's lead times, the home
 * visit's fee, the returns answer), so the page never says a second thing;
 * those facts are still placeholders until the owner confirms them.
 */

/**
 * Who we are: the title, the line beside it, and the paragraphs from the
 * rebuild's about page, under two rooms.
 */
export const WHO = {
  label: "About Furnishes",
  title: "Furniture that fits how you live and work",
  rest: "Ready-made pieces, modular designs, and modular pieces you make your own, for Singapore homes and small offices.",
  lines: [
    "Some of our pieces are ready-made. Others are modular, built from birch panels to your wall's size and colour. All are made by our partner factory in China and carried into your room in Singapore.",
    "A change at home can start small: a place for the bag by the door, or a bedside that keeps the book within reach. It can be bigger: a tall cabinet that divides a rented room, or a work area that grows with a team.",
    "Each piece should be good on its own today; adding to it later is a bonus. If you need help choosing, we come to your room, and the AI assistant can help once you log in.",
  ],
  photos: [
    { src: living, alt: "A living room with a long sofa and low shelves" },
    { src: shelfWall, alt: "A wall of shelves holding books and boxes" },
  ],
};

/**
 * The statement, as the rebuild's manifesto: its words light up as it
 * scrolls past, with two small photos set in the line. `photo` marks where
 * each sits, after the word before it.
 */
export const MANIFESTO = {
  label: "What we believe",
  words: [
    "A",
    "room",
    "should",
    "fit",
    "the",
    "people",
    "in",
    "it,",
    { photo: yellowChair },
    "not",
    "the",
    "other",
    "way",
    "round.",
    "So",
    "we",
    "make",
    "furniture",
    { photo: sewing },
    "to",
    "your",
    "wall,",
    "not",
    "to",
    "a",
    "catalogue.",
  ] as const,
};

/** Four figures in one row, each read from the facts the rest of the site states. */
export const FIGURES = [
  { value: FACTS.board, line: "Birch plywood in every modular panel" },
  { value: ARRIVALS.parts.weeks, line: "For a modular piece, from order to your door" },
  { value: FURNITURE_WEEKS, line: "For a ready-made piece, made after you order" },
  { value: sgd(FACTS.visitFee), line: "For a home visit, taken off your order" },
] as const;

/** Where it is made, as short label and value lines beside a photo. */
export const WORKSHOP = {
  label: "Workshop",
  title: "Made by our partner factory in China",
  rest: "We choose the designs and the materials",
  line: "The factory makes each piece after you order and ships it to Singapore.",
  facts: [
    { label: "Made in", value: "China" },
    { label: "Factory", value: "Our partner factory in China" },
    { label: "Material", value: `${FACTS.board} birch plywood, in birch, walnut or red` },
    { label: "Arrives", value: "Flat-packed or already built" },
    { label: "Delivered to", value: "Singapore" },
  ],
  photo: redSofa,
};

/** From order to your home, in five steps on one line. */
export const MAKING = {
  label: "How it reaches you",
  title: "From order to your home",
  rest: `Made after you order: modular pieces take ${ARRIVALS.parts.weeks} flat-packed, ${ARRIVALS.built.weeks} built`,
  steps: [
    { name: "You order", line: "You choose the piece, its size and finish, and how it arrives." },
    { name: "It is made", line: "Our partner factory in China makes the version you chose." },
    { name: "It is packed", line: "Packed with its parts and, if flat-packed, its steps." },
    { name: "It ships", line: "From China to Singapore. We email you when it moves." },
    {
      name: "It arrives",
      line: "Carried into your room at a time you choose: built pieces ready to use, flat-packed ones ready to put together.",
    },
  ],
};

/** The questions asked before buying from a new name; answers follow the rest of the site. */
export const ABOUT_QUESTIONS = [
  {
    q: "Who is Furnishes?",
    a: "A Singapore company selling ready-made and modular furniture for homes and small offices.",
  },
  {
    q: "Where is the furniture made?",
    a: "By our partner factory in China, then shipped to Singapore and carried into your room.",
  },
  {
    q: "How long does it take?",
    a: `Modular pieces take ${ARRIVALS.parts.weeks} flat-packed and ${ARRIVALS.built.weeks} built. Ready-made pieces take ${FURNITURE_WEEKS}.`,
  },
  {
    q: "Can I see the finishes first?",
    a: "Yes. Ask for samples by email, or see them on a home visit.",
  },
  {
    q: "Can I return a piece?",
    a: `Ready-made pieces can be returned within ${FACTS.returnDays} days of delivery. Modular pieces are made to your size, so they can't.`,
  },
] as const;

/**
 * Who is behind Furnishes. Mohan's card is real; the other two are
 * placeholders, marked as such, until the owner sends names, roles and
 * photos. Each card shows its initial until there is a portrait.
 */
export const TEAM = {
  label: "The team",
  title: "Who is behind Furnishes",
  rest: "The people you are buying from, based in Singapore",
  people: [
    { name: "Mohan", role: "Cofounder and CTO", line: "Leads the website, the 3D view and the AI assistant." },
    { name: "Name to come", role: "Cofounder", line: "What this person looks after, to come.", initial: "?" },
    { name: "Name to come", role: "Design and sourcing", line: "What this person looks after, to come.", initial: "?" },
  ],
};

/**
 * Our story, in three parts after the rebuild's, as a numbered list that
 * opens. How it started is a draft line until the owner writes it from
 * fact; the other two follow what the rest of the site says.
 */
export const STORY = {
  label: "Our story",
  title: "How Furnishes came about",
  rest: "Where we started, and where we are going",
  parts: [
    {
      name: "How we started",
      line: "Rooms in Singapore are small, and standard furniture doesn't always fit them. The full story is to come.",
    },
    {
      name: "What we do today",
      line: "Ready-made and modular furniture, made by our partner factory in China, for homes and small offices in Singapore.",
    },
    {
      name: "Where we are going",
      line: "HDB families and startup offices first, then further once that works well.",
    },
  ],
};

/**
 * Awards and press, as the rebuild's recognition rows; every row a
 * placeholder, so the page leaves it out until there is one to show.
 */
export const RECOGNITION = {
  label: "Recognition",
  title: "Awards and press",
  rest: "What others have said about our work",
  rows: [1, 2, 3].map((n) => ({
    year: "Year",
    name: `Award or article ${n}, to come`,
    project: "The piece or project it was for",
  })),
};

/** The closing band: the next step after reading who we are. */
export const ABOUT_CLOSING: ClosingBand = {
  label: "Your room next",
  title: "Start with the room you have",
  line: "Draw it at real size in the room planner, place our pieces, and see what fits before you order.",
  photo: aFrame,
  calls: [
    { label: "Design your room", href: routes.designYourRoom },
    { label: "See the furniture", href: routes.collection },
  ],
};
