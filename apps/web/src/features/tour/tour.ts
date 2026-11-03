/**
 * The flat's tour, a step at a time: each step's headline (its lead, then
 * the softer rest, a line each), and its name and line. The first step has
 * no name or line of its own: it tells of the room chosen on the banner.
 */
export type Step = { lead: string; soft: readonly string[]; name?: string; line?: string };

export const TOUR: readonly Step[] = [
  { lead: "Start at the door,", soft: ["and walk through", "every room."] },
  {
    lead: "Then the walls",
    soft: ["go up."],
    name: "The walls",
    line: "The drawing becomes rooms you can stand in, at their real height, with light through their windows. What was a line on paper now has a corner to look into and a wall you can place something against.",
  },
  {
    lead: "Step inside.",
    soft: [],
    name: "Inside",
    line: "Through the front door at eye level, the way you will walk in on the first day. Look around from where you would actually stand, and see how each room opens onto the next before anything is moved.",
  },
  {
    lead: "A piece for that wall,",
    soft: ["within clear limits."],
    name: "The Furnishes bookcase",
    line: "Built from 18 mm birch panels, in set heights and widths. Choose what suits the wall, the corner and the things you already own. Anything outside the limits goes to our team for a quote.",
  },
  {
    lead: "Then choose",
    soft: ["its finish."],
    name: "Materials",
    line: "We start with white matte faces and birch edges, with more colours and textures to follow once real samples are confirmed. See how a finish sits beside the floor, the walls and everything else that stays.",
  },
  {
    lead: "Try another layout.",
    soft: ["Make it yours."],
    name: "Your turn",
    line: "Move the piece along the wall, see what fits. Try the arrangement you have always wondered about, and put it back if it does not work. Then start on your own room.",
  },
  {
    lead: "Seen one you like?",
    soft: ["Try it in your room."],
    name: "Pick a piece",
    line: "Choose a piece and it is drawn in where it would go, at its real size, before anything is ordered. You see how much room it takes and what it sits beside, not just how it looks on its own.",
  },
  {
    lead: "Change what you like,",
    soft: ["and watch it change."],
    name: "Your choices",
    line: "Try each finish on the piece itself, in your room's light, and keep the one that suits it. Every change shows straight away, so you are deciding from the piece in its place, not from a swatch.",
  },
  {
    lead: "Into the cart,",
    soft: ["and it is ordered."],
    name: "Cart and checkout",
    line: "The piece with every choice on it, so you can read through exactly what you are getting. Pick where and when it comes, check it over once more, then place the order.",
  },
  {
    lead: "On its way,",
    soft: ["and you can see where."],
    name: "Delivery",
    line: "Made to your choices by our partner factory in China, then shipped to Singapore. Each stage shows as it happens, so you know when to be home.",
  },
  {
    lead: "Here it is.",
    soft: ["Just as you saw it."],
    name: "In your room",
    line: "It arrives already built, or flat-packed with its steps, whichever you chose. The same wall, the same finish, the same size you saw before you ordered, now there to use.",
  },
];

/**
 * The bookcase the tour draws on the living room's north wall, in the plan's
 * millimetres: where it stands, its size, and how many bays its boards make.
 */
export const BOOKCASE = { x: 13300, y: 90, w: 1600, d: 400, bays: 4 } as const;
/** Where its size is written, mm: under its middle, clear of the living room's name. */
export const BOOKCASE_LABEL_Y = 800;
export const BOOKCASE_SIZE = `${BOOKCASE.w / 10} × ${BOOKCASE.d / 10} cm`;

/** The order's card: what was ordered, and the stages it goes through. */
export const ORDER = {
  name: `Bookcase, ${BOOKCASE_SIZE}`,
  finish: "White matte faces, birch edges",
  stages: ["Ordered", "Made", "Shipped to Singapore", "At your door"],
} as const;

/** How many of the order's stages each of the last steps has reached, by step. */
export const ORDER_DONE: Readonly<Record<number, number>> = { 8: 1, 9: 3, 10: 4 };
