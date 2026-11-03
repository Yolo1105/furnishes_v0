import type { StaticImageData } from "next/image";
import aFrame from "@/assets/banner/a-frame.jpg";
import bunk from "@/assets/banner/bunk.jpg";
import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import shelfWall from "@/assets/rooms/shelf-wall.jpg";
import yellowSofa from "@/assets/rooms/yellow-sofa.jpg";
import redSofa from "@/assets/details/red-sofa.jpg";
import sewing from "@/assets/details/sewing.jpg";
import yellowChair from "@/assets/details/yellow-chair.jpg";
import showroom from "@/assets/banner/showroom.jpg";
import orangeRoom from "@/assets/banner/orange-room.jpg";
import lounge from "@/assets/banner/lounge.jpg";
import hallway from "@/assets/rooms/hallway.jpg";
import home from "@/assets/rooms/home.jpg";
import kitchen from "@/assets/rooms/kitchen.jpg";
import living from "@/assets/rooms/living.jpg";
import study from "@/assets/rooms/study.jpg";
import { ARRIVALS, fromPrice, FURNITURE_WEEKS, type LineSlug, PIECES } from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";
import { shopHref } from "@/features/catalog/filters";
import { lineOf, routes } from "@/lib/routes";
import { FACTS } from "@/lib/site";

/**
 * The collection overview's words, in one place. Prices and terms here are
 * placeholders until the owner sets them.
 */

/**
 * The overview's banner, as the owner's reference: its photo, and over its
 * foot a small label, the title and two ways in. `spots` mark pieces in the photo, each at its place as a
 * share of the photo's width and height, with the nearest piece we sell; the
 * photo stands in, so they are the closest match, not the piece itself. The
 * lamp is not in our list yet, so its name and price are written here.
 */
export const BANNER = {
  photo: lounge,
  hero: {
    label: "Furniture for Singapore homes",
    title: "Made to fit your room",
    links: [
      { label: "Shop furniture", href: routes.furniture },
      { label: "Shop modular", href: routes.modular },
    ],
  },
  spots: [
    {
      name: "Pendant lamp",
      price: "$120",
      href: routes.products,
      line: "A folded shade that throws a warm light",
      x: 32,
      y: 34,
      zoom: 14,
    },
    { slug: "room-divider", x: 20, y: 57, zoom: 9 },
    { slug: "office-chair", x: 42, y: 76, zoom: 9 },
    { slug: "dining-table", x: 74, y: 64, zoom: 6 },
    { slug: "sofa", x: 91, y: 79, zoom: 6 },
  ],
};

/** The statement under the banner: what we are, then what we make. */
export const INTRO = {
  label: "Who we are",
  lead: "Made by our partner factory in China, delivered across Singapore.",
  rest: "For HDB flats and offices, ready-made or sized to your room.",
};

/**
 * The two things we sell, each as a photo band with its name, a title, one
 * short line and the way in, then a row of its pieces read from the catalogue.
 */
export type Tile = {
  key: string;
  /** the line's own heading over its band, so the second line reads as a
   *  section of its own and is not missed after the first one's row */
  head: { label: string; title: string; rest: string };
  /** the line's name, a small label over the band's title, which is a phrase */
  label: string;
  title: string;
  intro: string;
  photo: StaticImageData;
  show: "furniture" | "modular";
  /** the link's words */
  go: string;
};

export const TILES: readonly Tile[] = [
  {
    key: "furniture",
    head: { label: "Line one", title: "What we sell", rest: "Starting with ready-made pieces" },
    label: "Furniture",
    title: "Ready for your home",
    intro: `Desks, chairs, tables, sofas and storage, delivered in ${FURNITURE_WEEKS}.`,
    photo: yellowSofa,
    show: "furniture",
    go: "Shop furniture",
  },
  {
    key: "modular",
    head: { label: "Line two", title: "And what we make to size", rest: "Modular pieces, built to fit your wall" },
    label: "Modular furniture",
    title: "Customize your pieces",
    intro: `Made to your size and colour. ${ARRIVALS.built.name}, or ${ARRIVALS.parts.name.toLowerCase()}.`,
    photo: shelfWall,
    show: "modular",
    go: "Start customizing",
  },
];

/**
 * Over ready-made, as the owner's reference: one large photo with its title
 * at the top left, two smaller ones stacked beside it with theirs in the
 * middle; each opens what it names. The photos stand in for our own.
 */
export const MOSAIC = {
  main: {
    title: "Furniture made for the rooms you live in",
    go: "Shop furniture",
    href: routes.furniture,
    photo: bunk,
  },
  side: [
    { title: "Sized to your wall", go: "Shop modular", href: routes.modular, photo: aFrame },
    { title: "One room, made into two", go: "Shop separator walls", href: lineOf("walls"), photo: hallway },
  ],
};

/** The lowest price in a line, read from the catalogue so it follows the prices. */
const lowest = (line: LineSlug) => sgd(Math.min(...PIECES.filter((p) => p.line === line).map(fromPrice)));

/**
 * The three ways to buy, side by side, after the rebuild's comparison cut
 * to four rows. Designing your own is priced with the design, so its price
 * and time are words rather than figures until the owner sets them.
 */
export const COMPARE = {
  label: "Which kind",
  title: "Three kinds of furniture, and why",
  rest: "Ready-made, modular, or your own design",
  rows: { is: "What it is", takes: "How long it takes", price: "Price" } as const,
  kinds: [
    {
      name: "Ready-made",
      is: "Sofas, desks, chairs and tables in the sizes listed",
      takes: FURNITURE_WEEKS,
      price: `From ${lowest("furniture")}`,
      go: { label: "Shop ready-made", href: routes.furniture },
    },
    {
      name: "Modular",
      is: "Birch pieces sized to your wall, built or in parts",
      takes: `${ARRIVALS.parts.weeks} in parts, ${ARRIVALS.built.weeks} built`,
      price: `From ${lowest("modular")}`,
      go: { label: "Shop modular", href: routes.modular },
    },
    {
      name: "Design your own",
      is: "Your room drawn in 3D, with pieces set to fit it",
      takes: "Quoted with your design",
      price: "Priced on your design",
      go: { label: "Design your room", href: routes.designYourRoom },
    },
  ],
};

/**
 * Ready-made, as the owner's "Design Edit" reference: its label and title,
 * the kinds as tabs, and its pieces in a row that scrolls sideways by hand.
 */
export const READY = {
  title: "Ready-made",
  line: `Delivered in ${FURNITURE_WEEKS}`,
};

/**
 * Who it's for and the look it comes in, as four uneven tiles: homes and
 * offices, then birch and walnut. The offices photo stands in until there is
 * one of an office; the others are rooms, not our pieces.
 */
export const FOR_AND_LOOKS = {
  title: "Who it's for",
  rest: "Homes, offices and two finishes",
  tiles: [
    {
      name: "For homes",
      line: "Pieces sized for HDB flats, room by room",
      photo: living,
      wide: true,
      href: lineOf("homes"),
    },
    {
      name: "For offices",
      line: "Desks, chairs and storage for a startup's first office",
      photo: showroom,
      wide: false,
      href: lineOf("offices"),
    },
    {
      name: "Birch",
      line: "Light and calm, for a small flat",
      photo: study,
      wide: false,
      href: shopHref({ finish: ["birch"] }),
    },
    {
      name: "Walnut",
      line: "Warm and dark, for a room to settle in",
      photo: cabinSofa,
      wide: true,
      href: shopHref({ finish: ["walnut"] }),
    },
  ],
};

/** The pieces to start with, two from each line, by slug. */
export const START = ["office-desk", "low-cabinet", "room-divider", "dining-table"] as const;

/** What every order comes with; returns are placeholder terms. */
export const PROMISES = [
  { icon: "truck", name: "Delivered in Singapore", line: "At a time you choose, carried in and placed." },
  {
    icon: "parts",
    name: "Ready to go, or make it yourself",
    line: "Modular pieces arrive assembled, or in parts for less.",
  },
  {
    icon: "return",
    name: `Returns within ${FACTS.returnDays} days`,
    line: "Standard pieces, unused and boxed [placeholder terms].",
  },
  { icon: "factory", name: "Made by our partner factory", line: "In China, to our sizes and finishes." },
] as const;

/**
 * Design your own, as the owner's reference: a large photo, then the
 * title, one line and the way in. The 3D visualizer needs an account, so the
 * button leads to log in. The photo stands in until there is one of the
 * visualizer.
 */
export const DESIGN = {
  title: "Design your own",
  rest: "See it before you order",
  line: "Plan your room in our 3D visualizer: place our pieces, set each one's size and finish, and see it before you order. Sign in to start; it's free.",
  go: "Customize",
  photo: orangeRoom,
};

/** The in-room visit; the fee is a placeholder. */
export const VISIT = {
  label: "Home visits",
  title: "Not sure what fits?",
  rest: "We come to your room",
  line: `${FACTS.visitMinutes} minutes in your home or office: we measure, answer your questions and suggest pieces. ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
  go: "Book a visit",
  photo: kitchen,
};

/**
 * Four rooms as tall cards, as the owner's reference: each room's name and
 * line in the middle of its photo, and the way into its pieces. The rooms
 * and their lines are the quiz page's, so they live in one place.
 */
export const ROOM_CARDS = {
  title: "Room by room",
  rest: "Pick the room you're furnishing",
  names: ["Living room", "Bedroom", "Study", "Kitchen"],
};

/**
 * What every order comes with, as the owner's "Atelier" reference: a wide
 * photo, then a dark panel with the title, a short line, each promise with
 * its drawing, and the way in. The photo stands in until there is our own.
 */
export const ORDER_BAND = {
  title: "With every order",
  line: "Made by our partner factory, shipped to Singapore, and carried into your room at a time you choose.",
  go: { label: "Shop every piece", href: routes.products },
  photo: home,
};

/**
 * Quick ways into the list, as the owner's reference: a short title over
 * a set of links, each opening the list on one choice. Only choices the
 * catalogue can answer; prices and widths follow the list's own ranges.
 */
export const QUICK = {
  title: "Quick ways to the right piece",
  rest: "By price, room or finish",
  links: [
    { label: "Ready-made", href: routes.furniture },
    { label: "Modular", href: routes.modular },
    { label: "Separator walls", href: lineOf("walls") },
    { label: "Under $300", href: shopHref({ price: ["under-300"] }) },
    { label: "Under $600", href: shopHref({ price: ["under-300", "300-600"] }) },
    { label: "Over $1,000", href: shopHref({ price: ["over-1000"] }) },
    { label: "Small spaces", href: shopHref({ width: ["under-800"] }) },
    { label: "Long walls", href: shopHref({ width: ["over-1400"] }) },
    { label: "Living room", href: shopHref({ room: ["living-room"] }) },
    { label: "Bedroom", href: shopHref({ room: ["bedroom"] }) },
    { label: "For the study", href: shopHref({ room: ["study"] }) },
    { label: "Kitchen", href: shopHref({ room: ["kitchen"] }) },
    { label: "Entryway", href: shopHref({ room: ["entryway"] }) },
    { label: "For offices", href: lineOf("offices") },
    { label: "Storage", href: shopHref({ kind: ["storage"] }) },
    { label: "Desks and chairs", href: shopHref({ kind: ["desks", "chairs"] }) },
    { label: "In birch", href: shopHref({ finish: ["birch"] }) },
    { label: "In walnut", href: shopHref({ finish: ["walnut"] }) },
    { label: "In red", href: shopHref({ finish: ["red"] }) },
    { label: "Design your room", href: routes.designYourRoom },
    { label: "Take the quiz", href: routes.quiz },
  ],
};

/** Questions about either line, on the overview; answers are placeholders. */
export const COLLECTION_QUESTIONS = [
  {
    q: "What is the difference between ready-made and modular?",
    a: `Ready-made pieces come in the sizes and finishes listed and arrive in ${FURNITURE_WEEKS}. Modular pieces are made to your wall's size and colour.`,
  },
  {
    q: "Where is the furniture made?",
    a: "By our partner factory in China, then shipped to Singapore and carried into your room.",
  },
  {
    q: "Will it fit through my lift and door?",
    a: "Each piece's size is on its page. Measure your lift and door first, or book a visit and we'll measure for you.",
  },
  {
    q: "Can I see the finishes first?",
    a: "Yes. Ask for samples by email, or see them on a home visit.",
  },
  {
    q: "Do you furnish offices too?",
    a: "Yes: desks, chairs, storage and separator walls for startup offices, delivered and set up.",
  },
  {
    q: "Can I return a piece?",
    a: `Ready-made pieces can be returned within ${FACTS.returnDays} days of delivery. Modular pieces are made to your size, so they can't.`,
  },
] as const;

/**
 * What goes into each piece, as the owner's reference: three close photos,
 * each over a panel in one of our finishes' colours. The photos stand in
 * until there are ones of our own pieces.
 */
export const DETAILS = {
  title: "In every piece",
  rest: "Made, sized and finished for you",
  cards: [
    {
      name: "Made by hand",
      line: "Every seam and joint finished at our partner factory.",
      href: routes.furniture,
      photo: sewing,
      tone: "walnut",
    },
    {
      name: "Sized for HDB",
      line: "Drawn to fit small rooms, lifts and doors.",
      href: shopHref({ width: ["under-800"] }),
      photo: redSofa,
      tone: "red",
    },
    {
      name: "In your colour",
      line: "Modular pieces in the size and finish you choose.",
      href: routes.modular,
      photo: yellowChair,
      tone: "birch",
    },
  ],
} as const;
