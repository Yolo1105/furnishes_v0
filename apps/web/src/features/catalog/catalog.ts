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
import { FACTS } from "@/lib/site";

/**
 * Everything the shop sells, in one place: the collection, the lists and
 * the piece pages all read from here. Two lines: furniture, ready-made by
 * the partner factory, and modular pieces and separator walls, which arrive
 * either assembled ("ready to go") or in parts ("make it yourself"). Prices
 * (SGD) and lead times are the owner's placeholders of 30 Oct 2026, and the
 * photos are rooms, not the pieces themselves.
 */

/** The two lines, in the order the collection shows them. */
export type LineSlug = "furniture" | "modular";

export type Line = { slug: LineSlug; name: string; line: string };

export const LINES: readonly Line[] = [
  {
    slug: "furniture",
    name: "Furniture",
    line: "Desks, chairs, tables, sofas and storage, ready to use as they arrive.",
  },
  {
    slug: "modular",
    name: "Modular",
    line: "Pieces and separator walls sized to your room. Ready to go, or make it yourself.",
  },
];

/** A lead time in weeks, shortest to longest; placeholders. */
export type Lead = readonly [number, number];

export const inWeeks = ([from, to]: Lead) => `${from}–${to} weeks`;

/** How a modular piece arrives; both can be customized. */
export type Arrival = "built" | "parts";

const BUILT: Lead = [8, 10];
const PARTS: Lead = [6, 8];

export const ARRIVALS: Record<Arrival, { name: string; line: string; lead: Lead; weeks: string }> = {
  built: { name: "Ready to go", line: "Arrives assembled, ready to use", lead: BUILT, weeks: inWeeks(BUILT) },
  parts: {
    name: "Make it yourself",
    line: "Arrives in parts, and you put it together",
    lead: PARTS,
    weeks: inWeeks(PARTS),
  },
};

/** Ready-made furniture reaches you in this time. */
export const FURNITURE_LEAD: Lead = [8, 12];
export const FURNITURE_WEEKS = inWeeks(FURNITURE_LEAD);

/** A finish a piece comes in; its swatch colour is set in the CSS by slug. */
export type Finish = { slug: "birch" | "walnut" | "red"; name: string };

export const FINISHES: readonly Finish[] = [
  { slug: "birch", name: "Birch" },
  { slug: "walnut", name: "Walnut" },
  { slug: "red", name: "Red" },
];

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

/** What every piece shares, shown under its choices; placeholders. */
export const SHARED = {
  materials:
    "Modular pieces: birch plywood, edges sanded and oiled; walnut and red are veneers over the same core. Furniture: as listed by the factory.",
  care: "Wipe with a damp cloth. Re-oil birch once a year, and keep it out of hours of direct sun.",
  delivery: "Delivered anywhere in Singapore, at a time you choose. Ready to go pieces are carried in and placed.",
  returns: `Standard pieces within ${FACTS.returnDays} days, unused and in their boxes. Pieces changed to your size: only if faulty or damaged [placeholder terms].`,
} as const;

/** The kinds in a line, in the catalogue's order, for a line page's chips. */
export const kindsOf = (line: LineSlug) => [...new Set(PIECES.filter((p) => p.line === line).map((p) => p.kind))];

export const lineBySlug = (slug: string) => LINES.find((l) => l.slug === slug);
export const pieceBySlug = (slug: string) => PIECES.find((p) => p.slug === slug);
export const finishBySlug = (slug: string) => FINISHES.find((f) => f.slug === slug);

/** The lowest price a piece comes at. */
export const fromPrice = (p: Piece) => Math.min(...p.sizes.map((s) => s.price));

/** A size's name: its label, or its width. */
export const sizeName = (s: Size) => s.label ?? `${s.w} mm wide`;

/** A size in words, width × depth × height. */
export const dims = (s: Size) => `${s.w} × ${s.d} × ${s.h} mm`;

/** A size's price as it arrives. */
export const priceOf = (s: Size, arrival: Arrival | null) => (arrival === "built" && s.built ? s.built : s.price);

/**
 * Add-ons a modular piece takes, after the rebuild's kits, keeping the ones
 * it offers first. Prices (SGD) are drafts inside the rebuild's ranges
 * ($12 to $35 small, $45 to $160 large), placeholders until confirmed.
 */
export type AddOn = { id: string; name: string; price: number };

const DRAWER: AddOn = { id: "drawer", name: "Drawer", price: 60 };
const FABRIC: AddOn = { id: "fabric", name: "Fabric face panels", price: 35 };

export const ADD_ONS: Record<string, readonly AddOn[]> = {
  "entry-pack": [{ id: "door", name: "Door on the lower tier", price: 45 }, DRAWER, FABRIC],
  "desk-side-pack": [
    { id: "rail", name: "Aluminium rail", price: 35 },
    { id: "monitor-arm", name: "Monitor arm", price: 120 },
    DRAWER,
    FABRIC,
  ],
  "bedside-block": [{ id: "casters", name: "Casters", price: 45 }, DRAWER],
  "kitchen-cart": [DRAWER, { id: "hooks", name: "Hooks, a set of four", price: 12 }],
  "low-cabinet": [{ id: "doors", name: "Doors on all three bays", price: 135 }, DRAWER],
  "coat-stand": [{ id: "hooks", name: "Hooks, a set of four", price: 12 }],
  "room-divider": [{ id: "doors", name: "Doors on one side", price: 90 }, DRAWER],
  "sofa-back-divider": [{ id: "doors", name: "Doors on one side", price: 90 }, DRAWER],
};

export const addOnsOf = (slug: string) => ADD_ONS[slug] ?? [];

/**
 * A modular piece made to your space: width and height in mm, between the
 * least and the most the panels allow, at the piece's own depth. It costs
 * its size's price for the area, plus `markup`, and takes `extra` longer;
 * the rebuild's drafts, so an estimate until we confirm it by email.
 */
export const CUSTOM = {
  least: { w: 400, h: 400 },
  most: { w: 1800, h: 1600 },
  markup: 0.15,
  extra: [2, 3] as Lead,
} as const;

/** A size you asked for, in mm. */
export type Custom = { w: number; h: number };

/** Rounds a price to the nearest $10. */
const tens = (n: number) => Math.round(n / 10) * 10;

/** What one of a choice costs: its size (or yours), how it arrives, and its add-ons. */
export function priceOfChoice(
  piece: Piece,
  size: Size,
  arrival: Arrival | null,
  custom: Custom | null,
  addOns: readonly string[],
) {
  const base = priceOf(size, arrival);
  const made = custom ? tens(((base * custom.w * custom.h) / (size.w * size.h)) * (1 + CUSTOM.markup)) : base;
  return made + addOnsOf(piece.slug).reduce((sum, a) => sum + (addOns.includes(a.id) ? a.price : 0), 0);
}

/** A size you asked for, in words, in cm, at the piece's depth. */
export const customDims = (c: Custom, d: number) => `${c.w / 10} × ${d / 10} × ${c.h / 10} cm`;

/** A lead time with the weeks a size of your own adds. */
export const withCustom = ([from, to]: Lead): Lead => [from + CUSTOM.extra[0], to + CUSTOM.extra[1]];
