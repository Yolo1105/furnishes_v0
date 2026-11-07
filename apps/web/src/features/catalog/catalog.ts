import type { StaticImageData } from "next/image";
import aFrame from "@/assets/banner/a-frame.jpg";
import bunk from "@/assets/banner/bunk.jpg";
import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import logCabin from "@/assets/banner/log-cabin.jpg";
import orangeRoom from "@/assets/banner/orange-room.jpg";
import hallway from "@/assets/rooms/hallway.jpg";
import home from "@/assets/rooms/home.jpg";
import kitchen from "@/assets/rooms/kitchen.jpg";
import living from "@/assets/rooms/living.jpg";
import study from "@/assets/rooms/study.jpg";

/**
 * Everything the shop sells, in one place: the collection, the lists, the
 * piece pages and the bar's search all read from here. Two lines:
 * furniture, ready-made by the partner factory, and modular pieces and
 * separator walls, which arrive either assembled ("ready to go") or in
 * parts ("make it yourself"). Prices (SGD) are the owner's placeholders of
 * 30 Oct 2026, and the photos are rooms, not the pieces themselves.
 *
 * Only the pieces are here so far; what a piece page needs (how it
 * arrives, add-ons, assembly, sizes of your own) comes with that page.
 */

/** The two lines. */
export type LineSlug = "furniture" | "modular";

/** A finish a piece comes in. */
export type Finish = { slug: "birch" | "walnut" | "red"; name: string };

/**
 * One size of a piece, in mm, and its price in SGD: `price` as it comes
 * (ready-made, or a modular piece in parts) and `built`, assembled. A label
 * replaces "W mm wide".
 */
export type Size = { label?: string; w: number; d: number; h: number; price: number; built?: number };

/** A piece; `kind` is what it is (a desk, a wall), `wall` marks separator walls. */
export type Piece = {
  slug: string;
  line: LineSlug;
  kind: string;
  wall?: boolean;
  name: string;
  tagline: string;
  rooms: readonly string[];
  sizes: readonly Size[];
  finishes: readonly Finish["slug"][];
  photos: readonly StaticImageData[];
};

const ALL: readonly Finish["slug"][] = ["birch", "walnut", "red"];

export const PIECES: readonly Piece[] = [
  {
    slug: "low-cabinet",
    line: "modular",
    kind: "Storage",
    name: "Low cabinet",
    tagline: "Three bays of storage, the length of a wall",
    rooms: ["Living room", "Bedroom"],
    sizes: [{ w: 1800, d: 400, h: 800, price: 890, built: 1190 }],
    finishes: ALL,
    photos: [living, home],
  },
  {
    slug: "entry-pack",
    line: "modular",
    kind: "Entryway",
    name: "Entry pack",
    tagline: "A place for keys, bags and shoes by the door",
    rooms: ["Entryway"],
    sizes: [{ w: 600, d: 400, h: 1278, price: 420, built: 540 }],
    finishes: ALL,
    photos: [hallway, home],
  },
  {
    slug: "desk-side-pack",
    line: "modular",
    kind: "Work",
    name: "Desk-side pack",
    tagline: "What you use at the desk, within reach",
    rooms: ["Study", "Office"],
    sizes: [{ w: 600, d: 400, h: 1278, price: 450, built: 570 }],
    finishes: ALL,
    photos: [study, home],
  },
  {
    slug: "bedside-block",
    line: "modular",
    kind: "Bedroom",
    name: "Bedside block",
    tagline: "The book and the lamp, at hand's height",
    rooms: ["Bedroom"],
    sizes: [{ w: 600, d: 400, h: 568, price: 180, built: 260 }],
    finishes: ALL,
    photos: [aFrame, cabinSofa],
  },
  {
    slug: "kitchen-cart",
    line: "modular",
    kind: "Kitchen",
    name: "Kitchen cart",
    tagline: "Prep space on casters, wherever you cook",
    rooms: ["Kitchen"],
    sizes: [{ w: 600, d: 400, h: 800, price: 340, built: 440 }],
    finishes: ["birch", "walnut"],
    photos: [kitchen, home],
  },
  {
    slug: "coat-stand",
    line: "modular",
    kind: "Entryway",
    name: "Coat stand",
    tagline: "Coats and bags off the chair",
    rooms: ["Entryway", "Bedroom"],
    sizes: [{ w: 600, d: 400, h: 1600, price: 480, built: 620 }],
    finishes: ALL,
    photos: [logCabin, hallway],
  },
  {
    slug: "room-divider",
    line: "modular",
    kind: "Separator walls",
    wall: true,
    name: "Room divider",
    tagline: "One room as two, with storage on both sides",
    rooms: ["Bedroom", "Living room", "Office"],
    sizes: [{ w: 1200, d: 400, h: 1600, price: 1150, built: 1550 }],
    finishes: ALL,
    photos: [bunk, orangeRoom],
  },
  {
    slug: "sofa-back-divider",
    line: "modular",
    kind: "Separator walls",
    wall: true,
    name: "Sofa-back divider",
    tagline: "Behind the sofa, a wall that stores",
    rooms: ["Living room"],
    sizes: [{ w: 1800, d: 400, h: 1200, price: 1250, built: 1650 }],
    finishes: ALL,
    photos: [cabinSofa, living],
  },
  {
    slug: "office-chair",
    line: "furniture",
    kind: "Chairs",
    name: "Office chair",
    tagline: "A task chair for long days at the desk",
    rooms: ["Study", "Office"],
    sizes: [{ w: 650, d: 650, h: 1100, price: 280 }],
    finishes: ["walnut"],
    photos: [study, home],
  },
  {
    slug: "office-desk",
    line: "furniture",
    kind: "Desks",
    name: "Office desk",
    tagline: "A plain, steady desk for home or office",
    rooms: ["Study", "Office"],
    sizes: [
      { w: 1200, d: 600, h: 750, price: 450 },
      { w: 1400, d: 700, h: 750, price: 560 },
    ],
    finishes: ["birch", "walnut"],
    photos: [home, study],
  },
  {
    slug: "bookcase",
    line: "furniture",
    kind: "Storage",
    name: "Bookcase",
    tagline: "Five shelves, floor to eye level",
    rooms: ["Living room", "Study"],
    sizes: [{ w: 900, d: 350, h: 1800, price: 500 }],
    finishes: ["birch", "walnut"],
    photos: [orangeRoom, living],
  },
  {
    slug: "dining-table",
    line: "furniture",
    kind: "Tables",
    name: "Dining table",
    tagline: "Seats six, for meals and homework",
    rooms: ["Dining room", "Kitchen"],
    sizes: [
      { label: "Four seats", w: 1400, d: 800, h: 750, price: 700 },
      { label: "Six seats", w: 1800, d: 900, h: 750, price: 880 },
    ],
    finishes: ["birch", "walnut"],
    photos: [kitchen, aFrame],
  },
  {
    slug: "sofa",
    line: "furniture",
    kind: "Sofas",
    name: "Three-seat sofa",
    tagline: "Deep seats, covers that come off to wash",
    rooms: ["Living room"],
    sizes: [{ w: 2100, d: 900, h: 800, price: 1200 }],
    finishes: ["walnut"],
    photos: [cabinSofa, logCabin],
  },
  {
    slug: "executive-desk",
    line: "furniture",
    kind: "Desks",
    name: "Executive desk",
    tagline: "A large desk with drawers, for a room of its own",
    rooms: ["Office"],
    sizes: [{ w: 1800, d: 900, h: 760, price: 1800 }],
    finishes: ["walnut"],
    photos: [logCabin, study],
  },
];

/** The lowest price a piece comes at. */
export const fromPrice = (p: Piece) => Math.min(...p.sizes.map((s) => s.price));
