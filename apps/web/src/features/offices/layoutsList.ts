import { mailAbout } from "@/lib/contact";
import { routes } from "@/lib/routes";

/**
 * Office layouts, after the owner's "available offices" reference: a set of
 * fit-outs by team size, each with its area, what goes in and a drawn plan.
 * They are what we would supply for a room of that size, not offices we
 * rent or have furnished; every size and count is a placeholder until the
 * owner confirms real ones. Plans are in metres, x across from the left
 * wall, y down from the top wall; the door is in the bottom wall.
 */

/** a block of desks: `cols` across, one row or two back to back, chairs on the open sides */
export type DeskBlock = { x: number; y: number; cols: number; rows: 1 | 2 };
export type Box = { x: number; y: number; w: number; d: number };

export type OfficePlan = {
  w: number;
  d: number;
  door: number;
  desks: readonly DeskBlock[];
  meeting?: Box & { seats: number };
  storage?: readonly Box[];
  /** room dividers, each a straight run from one point to another */
  dividers?: readonly (readonly [number, number, number, number])[];
};

export type SizeGroup = "small" | "team" | "large" | "floor";

export type OfficeLayout = {
  id: string;
  name: string;
  people: number;
  area: number;
  group: SizeGroup;
  /** where it suits, then what goes in */
  place: string;
  details: readonly string[];
  plan: OfficePlan;
};

/** the filters over the cards, all first */
export const SIZE_FILTERS: readonly { id: SizeGroup | "all"; label: string }[] = [
  { id: "all", label: "All sizes" },
  { id: "small", label: "Up to 4 people" },
  { id: "team", label: "5 to 8" },
  { id: "large", label: "9 to 12" },
  { id: "floor", label: "13 and up" },
];

export const LAYOUTS_HEAD = {
  id: "office-layouts-title",
  label: "Office layouts",
  title: "Sized to your team",
  rest: "Example fit-outs, from a founders' room to a small floor",
};

export const OFFICE_LAYOUTS: readonly OfficeLayout[] = [
  {
    id: "founders",
    name: "Founders' room",
    people: 2,
    area: 12,
    group: "small",
    place: "Serviced office",
    details: ["2 desks", "Storage wall"],
    plan: {
      w: 4,
      d: 3,
      door: 3,
      desks: [{ x: 0.6, y: 1, cols: 2, rows: 1 }],
      storage: [{ x: 0.2, y: 0.15, w: 3.6, d: 0.4 }],
    },
  },
  {
    id: "studio",
    name: "Studio of four",
    people: 4,
    area: 24,
    group: "small",
    place: "Shophouse unit",
    details: ["4 desks", "Low cabinets"],
    plan: {
      w: 6,
      d: 4,
      door: 4.6,
      desks: [{ x: 1.6, y: 1, cols: 2, rows: 2 }],
      storage: [{ x: 0.2, y: 0.15, w: 5.6, d: 0.4 }],
    },
  },
  {
    id: "startup",
    name: "Startup of eight",
    people: 8,
    area: 45,
    group: "team",
    place: "Shophouse unit",
    details: ["8 desks", "Meeting corner"],
    plan: {
      w: 9,
      d: 5,
      door: 1,
      desks: [{ x: 0.5, y: 0.8, cols: 4, rows: 2 }],
      meeting: { x: 6.9, y: 0.9, w: 1.6, d: 1, seats: 4 },
      dividers: [[6.4, 0, 6.4, 3.2]],
    },
  },
  {
    id: "team",
    name: "Team of ten",
    people: 10,
    area: 60,
    group: "large",
    place: "Office tower",
    details: ["10 desks", "Call corner"],
    plan: {
      w: 10,
      d: 6,
      door: 5.4,
      desks: [{ x: 0.5, y: 0.8, cols: 5, rows: 2 }],
      meeting: { x: 8.3, y: 0.7, w: 1.4, d: 1.8, seats: 4 },
      storage: [{ x: 0.5, y: 5.4, w: 4, d: 0.45 }],
      dividers: [
        [7.9, 0, 7.9, 3],
        [7.9, 4.2, 10, 4.2],
      ],
    },
  },
  {
    id: "shared",
    name: "Shared desks for twelve",
    people: 12,
    area: 70,
    group: "large",
    place: "Co-working floor",
    details: ["12 desks", "Lounge kept apart"],
    plan: {
      w: 11,
      d: 6.6,
      door: 9.2,
      desks: [
        { x: 0.5, y: 0.6, cols: 3, rows: 2 },
        { x: 0.5, y: 3.6, cols: 3, rows: 2 },
      ],
      storage: [{ x: 7, y: 0.15, w: 3.8, d: 0.45 }],
      dividers: [[5.6, 0.8, 5.6, 5.6]],
    },
  },
  {
    id: "floor",
    name: "Small floor for sixteen",
    people: 16,
    area: 95,
    group: "floor",
    place: "Office tower",
    details: ["16 desks", "Meeting room"],
    plan: {
      w: 13,
      d: 7.5,
      door: 7.2,
      desks: [
        { x: 0.5, y: 0.6, cols: 4, rows: 2 },
        { x: 0.5, y: 3.8, cols: 4, rows: 2 },
      ],
      meeting: { x: 9.8, y: 1, w: 2.4, d: 1.2, seats: 6 },
      storage: [{ x: 9.2, y: 6.9, w: 3.6, d: 0.45 }],
      dividers: [
        [9, 0, 9, 3.4],
        [9, 3.4, 13, 3.4],
      ],
    },
  },
];

/** each card's two ways on: a quote for that layout, or drawing it in the planner */
export const LAYOUT_CALLS = {
  quote: (name: string) => ({ label: "Ask for a quote", href: mailAbout(`Office layout: ${name}`) }),
  design: { label: "Design this office", href: routes.designYourRoom },
};
