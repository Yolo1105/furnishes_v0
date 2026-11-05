import type { StaticImageData } from "next/image";
import living from "@/assets/rooms/living.jpg";
import shelfWall from "@/assets/rooms/shelf-wall.jpg";
import boxes from "@/assets/details/boxes.jpg";
import armchair from "@/assets/details/armchair.jpg";
import sewing from "@/assets/details/sewing.jpg";
import yellowChair from "@/assets/details/yellow-chair.jpg";
import redSofa from "@/assets/details/red-sofa.jpg";
import hallway from "@/assets/rooms/hallway.jpg";
import study from "@/assets/rooms/study.jpg";
import { ARRIVALS, FURNITURE_WEEKS } from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";
import { FACTS } from "@/lib/site";

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
  sub: "What we make, and who it is for",
  rest: "Ready-made pieces, modular designs, and modular pieces you make your own, for Singapore homes and small offices.",
  lines: [
    "We started because rooms in Singapore are small, and standard furniture doesn't always fit them. Some of our pieces are ready-made. Others are modular, built from birch panels to your wall's size and colour. All are made by our partner factory in China and carried into your room in Singapore.",
    "A change at home can start small: a place for the bag by the door, or a bedside that keeps the book within reach. It can be bigger: a tall cabinet that divides a rented room, or a work area that grows with a team.",
    "Each piece should be good on its own today; adding to it later is a bonus. If you need help choosing, we come to your room, and the AI assistant can help once you log in. We start with HDB families and startup offices.",
  ],
  photos: [
    { src: living, alt: "A living room with a long sofa and low shelves" },
    { src: shelfWall, alt: "A wall of shelves holding books and boxes" },
  ],
};

/**
 * The statement, as the rebuild's manifesto, in the page's brown with only
 * its three key phrases in the red (`hot`): its words light up as it
 * scrolls past, with two small photos set in the line. `photo` marks where
 * a photo sits, after the words before it. `label` names it for readers
 * only; on the page it has no title.
 */
export const MANIFESTO = {
  label: "What we believe",
  parts: [
    "A room should",
    { hot: "fit the people in it," },
    { photo: yellowChair },
    "not the other way round. So we make furniture",
    { photo: sewing },
    { hot: "to your wall," },
    "not to a catalogue. Ready-made pieces come in set sizes for the rooms most flats have, and modular pieces are built from parts and cut to the space you measure.",
    { photo: shelfWall },
    `Every modular panel is ${FACTS.board} birch plywood,`,
    { photo: redSofa },
    "every piece is made after you order, and if you aren't sure what fits,",
    { photo: study },
    { hot: "we come to your home" },
    { photo: hallway },
    "and measure it with you.",
  ],
} as const;

/** Four figures in one row, each read from the facts the rest of the site states. */
export const FIGURES = [
  { value: FACTS.board, line: "Birch plywood in every modular panel" },
  { value: ARRIVALS.parts.weeks, line: "For a modular piece, from order to your door" },
  { value: FURNITURE_WEEKS, line: "For a ready-made piece, made after you order" },
  { value: sgd(FACTS.visitFee), line: "For a home visit, taken off your order" },
] as const;

/** A photo tile, or a placeholder saying what photo goes there until one comes. */
export type Tile = { caption: string; photo?: StaticImageData };

/**
 * From the factory to your room, in four steps each over a tile; the factory
 * is the first step rather than a section of its own, on the owner's word.
 * A caption says what each photo shows, for its alt text.
 */
export const MAKING = {
  label: "How it gets to you",
  title: ["Made by our partner factory.", "Carried into your room."],
  rest: "We choose every design, the factory makes it after you order, and we email you at each step until it stands in your room.",
  steps: [
    {
      name: "Made",
      caption: "Sewing a cushion cover",
      photo: sewing,
      line: `Made in China after you order. Modular pieces take ${ARRIVALS.parts.weeks} flat-packed and ${ARRIVALS.built.weeks} built.`,
    },
    {
      name: "Shipped",
      caption: "Packed for Singapore",
      photo: boxes,
      line: "Packed with its parts and shipped to Singapore. We email you as it moves.",
    },
    {
      name: "Booked",
      caption: "A quiet corner, waiting for its day",
      photo: armchair,
      line: "Once it lands in Singapore, we email you to pick the day it comes.",
    },
    {
      name: "Carried in",
      caption: "A shelf wall in its room",
      photo: shelfWall,
      line: "Carried into the room you choose, built pieces ready to use and flat-packed ones ready to put together.",
    },
  ] satisfies (Tile & { name: string; line: string })[],
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
    a: `Ready-made pieces can be returned within ${FACTS.returnDays} days of delivery. Modular pieces are made to your size, so we take them back only if they arrive faulty or damaged.`,
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
