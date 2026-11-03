import { PIECES } from "@/features/catalog/catalog";
import { OWN, type Plan, type Room, type RoomKind, type Wall } from "./room";

/**
 * Rooms to start from: the main rooms of new 3-, 4- and 5-room HDB flats,
 * from the old playground's flat data, in mm. The door is in the bottom
 * wall, on the corridor side, and the window is centred in the top wall,
 * as that data lays them out. Sizes are typical and rounded, not any one
 * flat's; the page says to measure.
 */
const SILL = 900;
type Spec = { flat: string; room: string; kind: Room["kind"]; w: number; d: number; door: number; window: number };
/** The room the planner starts with, the commonest room people plan. */
const FOUR_COMMON: Spec = {
  flat: "4-room",
  room: "common bedroom",
  kind: "Bedroom",
  w: 3000,
  d: 2700,
  door: 500,
  window: 1200,
};
const SPECS: readonly Spec[] = [
  { flat: "3-room", room: "master bedroom", kind: "Bedroom", w: 3000, d: 3000, door: 600, window: 1500 },
  { flat: "3-room", room: "common bedroom", kind: "Bedroom", w: 3000, d: 2500, door: 500, window: 1200 },
  { flat: "3-room", room: "living and dining", kind: "Living room", w: 6000, d: 3200, door: 800, window: 2000 },
  { flat: "4-room", room: "master bedroom", kind: "Bedroom", w: 3500, d: 3000, door: 600, window: 1500 },
  FOUR_COMMON,
  { flat: "4-room", room: "living and dining", kind: "Living room", w: 6500, d: 4000, door: 800, window: 2000 },
  { flat: "5-room", room: "master bedroom", kind: "Bedroom", w: 4000, d: 3500, door: 600, window: 1500 },
  { flat: "5-room", room: "common bedroom", kind: "Bedroom", w: 3000, d: 3000, door: 500, window: 1200 },
  { flat: "5-room", room: "living and dining", kind: "Living room", w: 7000, d: 4500, door: 800, window: 2000 },
];

/** HDB doors are about 900 mm wide, in the same data. */
const DOOR = 900;

const roomOf = (s: Spec): Room => ({
  kind: s.kind,
  w: s.w,
  d: s.d,
  door: { wall: "bottom", at: s.door, width: DOOR },
  window: { wall: "top", at: (s.w - s.window) / 2, width: s.window, sill: SILL },
});

export const HDB_ROOMS: readonly { key: string; name: string; room: Room }[] = SPECS.map((s) => ({
  key: `${s.flat} ${s.room}`,
  name: `${s.flat} flat, ${s.room}, ${s.w / 1000} × ${s.d / 1000} m`,
  room: roomOf(s),
}));

/** The planner's first room, its bed along the window wall, under the sill. */
export const START: Plan = {
  room: roomOf(FOUR_COMMON),
  pieces: [{ id: "start-bed", own: "single-bed", x: 0, y: 0, turn: 90 }],
};

export const DESIGN = {
  label: "Design your room",
  title: "Draw one room",
  rest: "At real size, from above. The 3D view comes later.",
  line: "Set the walls, the door and the window, then place our pieces and what you already own. Eva checks the room as you go.",
  plan: "Your room, drawn from above",
  room: {
    title: "The room",
    from: "Start from",
    own: "Your own size",
    fromNote: "Typical sizes of new HDB flats, rounded; yours may differ by a little, so measure before you order.",
    kind: "What room it is",
    w: "Width, mm",
    d: "Depth, mm",
    door: "Door",
    window: "Window",
    wall: "On the wall",
    at: "From the corner, mm",
    width: "Width, mm",
    sill: "Sill height, mm",
    sillNote: "Most HDB sills are near 900 mm. Measure yours if a tall piece goes by the window.",
  },
  add: {
    title: "Add to the room",
    ours: "Our pieces",
    own: "Already yours",
    go: "Add",
  },
  chosen: {
    title: "The piece you picked",
    none: "Pick a piece in the drawing to move it. Drag it, or use the arrow keys; R turns it.",
    turn: "Turn",
    fix: "Find it a place",
    remove: "Take it out",
  },
  eva: {
    title: "Eva's notes",
    rest: "Checked against the room as drawn",
    clear: "Nothing in the way. Measure the walls again before you order.",
    stop: "Can't work as drawn",
    note: "Worth a look",
    limits:
      "Eva checks the drawing, not your room: she can't see skirting, sockets or a sloping floor, and doesn't judge whether a piece is safe there.",
  },
  list: {
    title: "Our pieces in this room",
    empty: "None yet.",
    finish: "Finish",
    arrives: "Arrives",
    together: "Together",
    extras: "A size of your own is set on each piece's page.",
    toCart: "Add them to the cart",
    added: (n: number) => `${n === 1 ? "One piece" : `${n} pieces`} added to your cart.`,
    see: "See your cart",
    send: "Send it to us to check",
    subject: "My room plan",
    reset: "Start again",
  },
};

export const KINDS: readonly RoomKind[] = ["Bedroom", "Study", "Living room", "Dining room", "Office"];

export const WALLS: readonly { wall: Wall; name: string }[] = [
  { wall: "top", name: "Top" },
  { wall: "right", name: "Right" },
  { wall: "bottom", name: "Bottom" },
  { wall: "left", name: "Left" },
];

/** Everything that can go in the room: each size of our pieces, then what's already yours. */
export const ADDABLE = [
  ...PIECES.flatMap((p) =>
    p.sizes.map((s, i) => ({
      key: `${p.slug}:${i}`,
      group: "ours" as const,
      name: p.sizes.length > 1 ? `${p.name}, ${s.label ?? `${s.w} mm`}` : p.name,
      slug: p.slug,
      size: i,
    })),
  ),
  ...(Object.keys(OWN) as (keyof typeof OWN)[]).map((own) => ({
    key: own,
    group: "own" as const,
    name: OWN[own].name,
    own,
  })),
];
