import { PIECES, type Arrival, type Finish, type Piece } from "@/features/catalog/catalog";

/**
 * One room, drawn from above, in mm, and the checks run on it. After the
 * old playground's layout validator, cut down to what a person drawing one
 * room needs: pieces inside the walls, not on top of each other, clear of
 * the door's swing and the window, room to use each one, and the room's
 * basics there. Pure: no React, no browser, so the checks can be trusted
 * on their own.
 *
 * The room's top-left inside corner is (0, 0); x runs right, y runs down.
 */

export type Wall = "top" | "right" | "bottom" | "left";

/** A turn in degrees; at 0 a piece's back is to the top wall and it faces down. */
export type Turn = 0 | 90 | 180 | 270;

/** What a piece is for, so the room can say what it is missing. */
export type Use = "sleep" | "sit" | "work" | "store" | "eat";

/** A door or window: its wall, where it starts along that wall and how wide, in mm. */
export type Opening = { wall: Wall; at: number; width: number };

export type RoomKind = "Bedroom" | "Study" | "Living room" | "Dining room" | "Office";

export type Room = {
  kind: RoomKind;
  w: number;
  d: number;
  door: Opening;
  window: Opening & { sill: number };
};

/**
 * A piece in the room: one of ours by slug and size, or something the
 * person already owns by its key in OWN. `x` and `y` are its top-left corner.
 */
export type Placed = {
  id: string;
  slug?: string;
  size?: number;
  own?: keyof typeof OWN;
  /** For our pieces, the finish and how it arrives, as the cart takes them. */
  finish?: Finish["slug"];
  arrival?: Arrival | null;
  addOns?: readonly string[];
  x: number;
  y: number;
  turn: Turn;
};

export type Plan = { room: Room; pieces: readonly Placed[] };

/** What the checks need to know of a piece, ours or not. */
export type Shape = {
  name: string;
  w: number;
  d: number;
  h: number;
  use?: Use | undefined;
  front: number;
  sides?: number | undefined;
  wall?: boolean;
  /** Hinged doors across its front, each the same width; none if left out. */
  leaves?: number;
};

/**
 * Things already in most rooms that we don't sell, so they can be drawn
 * round: common Singapore sizes in mm, rounded. A bed needs one long side
 * clear (`sides`) and wants a wall, as the old validator's rules.
 */
export const OWN = {
  "single-bed": { name: "Single bed", w: 1000, d: 2000, h: 500, use: "sleep", front: 0, sides: 600, wall: true },
  "queen-bed": { name: "Queen bed", w: 1600, d: 2000, h: 500, use: "sleep", front: 0, sides: 600, wall: true },
  wardrobe: { name: "Wardrobe", w: 1200, d: 600, h: 2000, use: "store", front: 600, wall: true, leaves: 2 },
  "own-sofa": { name: "Your sofa", w: 2000, d: 900, h: 800, use: "sit", front: 500 },
} as const satisfies Record<string, Shape>;

/**
 * Room to stand in front of each of our kinds of piece, in mm, and what
 * the kind is for: a door or drawer needs about 600 to open and stand at,
 * a desk 800 for the chair pulled out, a sofa 500 for legs. From the old
 * validator's usage zones; a separator wall needs a walkway on both faces.
 */
const KINDS: Record<string, { front: number; back?: number; use?: Use; wall?: boolean }> = {
  Storage: { front: 600, use: "store", wall: true },
  Entryway: { front: 600, use: "store", wall: true },
  Work: { front: 600, use: "store", wall: true },
  Bedroom: { front: 0, use: "store", wall: true },
  Kitchen: { front: 600, use: "store", wall: true },
  "Separator walls": { front: 600, back: 600 },
  Chairs: { front: 0, use: "sit" },
  Desks: { front: 800, use: "work", wall: true },
  Tables: { front: 750, back: 750, use: "eat" },
  Sofas: { front: 500, use: "sit" },
};

/** What each kind of room should hold, by use, for the "missing" check. */
export const NEEDS: Record<RoomKind, readonly Use[]> = {
  Bedroom: ["sleep", "store"],
  Study: ["work", "sit"],
  "Living room": ["sit", "store"],
  "Dining room": ["eat", "sit"],
  Office: ["work", "sit", "store"],
};

/** The narrowest walkway a person passes through comfortably, in mm. */
export const WALKWAY = 600;

/** A piece within this of a wall counts as against it, in mm. */
const AGAINST = 150;

const pieceOf = (slug?: string): Piece | undefined => PIECES.find((p) => p.slug === slug);

export function shapeOf(p: Placed): Shape | null {
  if (p.own) return OWN[p.own];
  const piece = pieceOf(p.slug);
  const size = piece?.sizes[p.size ?? 0];
  if (!piece || !size) return null;
  const kind = KINDS[piece.kind] ?? { front: WALKWAY };
  // the doors add-on hangs a door on each bay of about LEAF mm across the front
  const doors = p.addOns?.some((a) => DOOR_ADD_ONS.has(a)) ?? false;
  return {
    name: piece.name,
    w: size.w,
    d: size.d,
    h: size.h,
    use: kind.use,
    front: kind.front,
    sides: kind.back,
    wall: kind.wall ?? false,
    leaves: doors ? Math.max(1, Math.round(size.w / LEAF)) : 0,
  };
}

/** A cabinet door's width, in mm: our panels' bay, so a door swings out as far. */
export const LEAF = 600;

/** The add-ons that hang doors on a piece's front. */
const DOOR_ADD_ONS = new Set(["door", "doors"]);

/** How far a piece's doors swing out, in mm: a leaf's width. */
export const swingOf = (s: Shape) => (s.leaves ? s.w / s.leaves : 0);

type Box = { x: number; y: number; w: number; h: number };

/** The floor a piece covers, turned. */
export function boxOf(p: Placed, s: Shape): Box {
  const across = p.turn % 180 === 0;
  return { x: p.x, y: p.y, w: across ? s.w : s.d, h: across ? s.d : s.w };
}

const overlaps = (a: Box, b: Box) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

const inside = (a: Box, r: Room) => a.x >= 0 && a.y >= 0 && a.x + a.w <= r.w && a.y + a.h <= r.d;

/** A strip of `deep` mm along one face of a box, outside it. */
function strip(b: Box, face: Wall, deep: number): Box {
  if (face === "top") return { x: b.x, y: b.y - deep, w: b.w, h: deep };
  if (face === "bottom") return { x: b.x, y: b.y + b.h, w: b.w, h: deep };
  if (face === "left") return { x: b.x - deep, y: b.y, w: deep, h: b.h };
  return { x: b.x + b.w, y: b.y, w: deep, h: b.h };
}

/** The face a piece's front is on, and its back, from its turn. */
const FRONT: Record<Turn, Wall> = { 0: "bottom", 90: "left", 180: "top", 270: "right" };
const BACK: Record<Turn, Wall> = { 0: "top", 90: "right", 180: "bottom", 270: "left" };
const LONG_SIDES: Record<Turn, readonly Wall[]> = {
  0: ["left", "right"],
  90: ["top", "bottom"],
  180: ["left", "right"],
  270: ["top", "bottom"],
};

/** An opening as a span on the room's edge: the box it makes a hair inside the wall. */
export function openingBox(o: Opening, r: Room, deep = 1): Box {
  if (o.wall === "top") return { x: o.at, y: 0, w: o.width, h: deep };
  if (o.wall === "bottom") return { x: o.at, y: r.d - deep, w: o.width, h: deep };
  if (o.wall === "left") return { x: 0, y: o.at, w: deep, h: o.width };
  return { x: r.w - deep, y: o.at, w: deep, h: o.width };
}

/** How long a wall is, in mm. */
export const wallLength = (wall: Wall, r: Room) => (wall === "top" || wall === "bottom" ? r.w : r.d);

/** Distance from a box to a wall, in mm. */
function toWall(b: Box, wall: Wall, r: Room) {
  if (wall === "top") return b.y;
  if (wall === "bottom") return r.d - (b.y + b.h);
  if (wall === "left") return b.x;
  return r.w - (b.x + b.w);
}

export type Issue = {
  /** "stop" can't be built as drawn; "note" works but is worth a look. */
  level: "stop" | "note";
  line: string;
  ids: readonly string[];
};

/**
 * Every check on the room, in the order a person would care: what can't
 * work first, then what makes the room hard to live in, then what's missing.
 */
export function check(plan: Plan): Issue[] {
  const { room } = plan;
  const issues: Issue[] = [];
  const placed = plan.pieces.flatMap((p) => {
    const s = shapeOf(p);
    return s ? [{ p, s, b: boxOf(p, s) }] : [];
  });
  const door = openingBox(room.door, room, room.door.width);
  const win = openingBox(room.window, room, AGAINST);

  for (const { p, s, b } of placed) {
    if (!inside(b, room))
      issues.push({ level: "stop", line: `The ${lower(s.name)} goes through a wall.`, ids: [p.id] });
    if (overlaps(b, door))
      issues.push({ level: "stop", line: `The ${lower(s.name)} is in the door's swing.`, ids: [p.id] });
    if (overlaps(b, win) && s.h > room.window.sill)
      issues.push({
        level: "note",
        line: `The ${lower(s.name)} stands ${s.h} mm tall, over the ${room.window.sill} mm sill: it covers part of the window.`,
        ids: [p.id],
      });
  }

  placed.forEach((a, i) =>
    placed.slice(i + 1).forEach((b) => {
      if (overlaps(a.b, b.b))
        issues.push({
          level: "stop",
          line: `The ${lower(a.s.name)} and the ${lower(b.s.name)} are on top of each other.`,
          ids: [a.p.id, b.p.id],
        });
    }),
  );

  // room to use each piece: the strip in front (and behind, or one long
  // side for a bed) must be free of other pieces and inside the room
  const blocked = (self: string, zone: Box) =>
    !inside(zone, room) || placed.some((o) => o.p.id !== self && overlaps(zone, o.b));
  for (const { p, s, b } of placed) {
    const swing = swingOf(s);
    const front = Math.max(s.front, swing);
    if (front > 0 && blocked(p.id, strip(b, FRONT[p.turn], front)))
      issues.push({
        level: "note",
        line: swing
          ? `The ${lower(s.name)}'s doors swing out ${Math.round(swing)} mm: leave ${front} mm clear in front.`
          : `The ${lower(s.name)} needs ${front} mm clear in front to use it.`,
        ids: [p.id],
      });
    const sides = s.sides ?? 0;
    if (sides > 0 && s.use === "sleep" && LONG_SIDES[p.turn].every((f) => blocked(p.id, strip(b, f, sides))))
      issues.push({
        level: "note",
        line: `The ${lower(s.name)} needs ${sides} mm clear on one long side to get in and out.`,
        ids: [p.id],
      });
    if (sides > 0 && s.use !== "sleep" && blocked(p.id, strip(b, BACK[p.turn], sides)))
      issues.push({
        level: "note",
        line: `The ${lower(s.name)} needs ${sides} mm clear behind it as well.`,
        ids: [p.id],
      });
    // a piece with a front wants its back to the wall; a bed, any side
    const backs = s.front > 0 ? [BACK[p.turn]] : (["top", "right", "bottom", "left"] as const);
    if (s.wall && backs.every((w) => toWall(b, w, room) > AGAINST))
      issues.push({
        level: "note",
        line: `The ${lower(s.name)} sits better with its ${s.front > 0 ? "back" : "side"} to a wall.`,
        ids: [p.id],
      });
  }

  // a walkway in from the door: the strip past its swing must be clear
  const inFrom = strip(door, flip(room.door.wall), WALKWAY);
  if (placed.some((o) => overlaps(inFrom, o.b)))
    issues.push({
      level: "note",
      line: `Leave a ${WALKWAY} mm walkway in from the door.`,
      ids: placed.filter((o) => overlaps(inFrom, o.b)).map((o) => o.p.id),
    });

  const has = new Set(placed.map((o) => o.s.use));
  for (const use of NEEDS[room.kind])
    if (!has.has(use))
      issues.push({ level: "note", line: `A ${lower(room.kind)} usually has ${MISSING[use]}.`, ids: [] });

  return issues;
}

const MISSING: Record<Use, string> = {
  sleep: "a bed",
  sit: "somewhere to sit",
  work: "a desk",
  store: "somewhere to put things away",
  eat: "a table",
};

/** The face of a box that looks into the room from a wall. */
const flip = (w: Wall): Wall => ({ top: "bottom", bottom: "top", left: "right", right: "left" })[w] as Wall;

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** How badly the room sits: anything that can't be built weighs far more than a note. */
const weigh = (issues: readonly Issue[]) => issues.reduce((n, i) => n + (i.level === "stop" ? 100 : 1), 0);

/** The search's step, in mm: fine enough to slot a piece in, coarse enough to stay quick. */
const STEP = 100;

/**
 * Moves one piece to the nearest place, at any turn, where the fewest
 * checks fail on the whole room, so it doesn't fix itself by crowding
 * another piece; the rest of the room stays put. Nearest wins a tie,
 * so a piece that is nearly right only moves a little.
 */
export function fix(plan: Plan, id: string): Plan {
  const at = plan.pieces.findIndex((p) => p.id === id);
  const p = plan.pieces[at];
  if (!p) return plan;
  const with_ = (q: Placed): Plan => ({ ...plan, pieces: plan.pieces.map((o, i) => (i === at ? q : o)) });
  const now = check(plan);
  // what's missing from the room stays missing wherever the piece goes, so
  // once only that is left, nothing nearer can do better
  const floor = weigh(now.filter((i) => i.ids.length === 0));
  let best = { plan, score: weigh(now), far: 0 };
  for (const turn of [0, 90, 180, 270] as const)
    for (let y = 0; y <= plan.room.d; y += STEP)
      for (let x = 0; x <= plan.room.w; x += STEP) {
        const next = with_({ ...p, x, y, turn });
        const far = Math.hypot(x - p.x, y - p.y) + (turn === p.turn ? 0 : 1);
        if (best.score === floor && far >= best.far) continue;
        const score = weigh(check(next));
        if (score < best.score || (score === best.score && far < best.far)) best = { plan: next, score, far };
      }
  return best.plan;
}
