import { PIECES } from "@/features/catalog/catalog";
import { OWN, type Plan, type RoomKind, type Wall } from "./room";

/**
 * The room planner's words, and the room it starts with: a common bedroom
 * in a 4-room HDB flat, about 3.0 × 3.2 m, its door in the top wall and
 * its window opposite. Sizes are rounded and the sill height is a common
 * one, not a measured one; the page says so.
 */
export const START: Plan = {
  room: {
    kind: "Bedroom",
    w: 3000,
    d: 3200,
    door: { wall: "top", at: 200, width: 800 },
    window: { wall: "bottom", at: 900, width: 1200, sill: 900 },
  },
  pieces: [{ id: "start-bed", own: "single-bed", x: 0, y: 2200, turn: 90 }],
};

export const DESIGN = {
  label: "Design your room",
  title: "Draw one room",
  rest: "At real size, from above. The 3D view comes later.",
  line: "Set the walls, the door and the window, then place our pieces and what you already own. Eva checks the room as you go.",
  plan: "Your room, drawn from above",
  room: {
    title: "The room",
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
    from: "From",
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
