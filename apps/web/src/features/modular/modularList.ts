import aFrame from "@/assets/banner/a-frame.jpg";
import bookwallAfter from "@/assets/before-after/bookwall-after.webp";
import bookwallBefore from "@/assets/before-after/bookwall-before.webp";
import redSofa from "@/assets/details/red-sofa.jpg";
import sewing from "@/assets/details/sewing.jpg";
import yellowChair from "@/assets/details/yellow-chair.jpg";
import hallway from "@/assets/rooms/hallway.jpg";
import shelfWall from "@/assets/rooms/shelf-wall.jpg";
import study from "@/assets/rooms/study.jpg";
import { ARRIVALS, FINISHES, FURNITURE_LEAD, FURNITURE_WEEKS } from "@/features/catalog/catalog";
import type { IconName } from "@/features/collection/Icon";
import { sgd } from "@/lib/money";
import { FACTS } from "@/lib/site";

/**
 * The Modular page's words, in one place. Sizes, limits and answers marked
 * wait on the owner's documents.
 */

/** The banner, in the collection banner's shape. */
export const MODULAR_BANNER = {
  photo: aFrame,
  room: "Living room",
  lead: "Modular furniture,",
  rest: "sized to your room. Ready to go (arrives built), or make it yourself (arrives in parts).",
};

/** How it works, in the order a visitor does it. */
export const STEPS = [
  {
    name: "Choose a piece",
    line: "Start from one of our designs: storage, an entry pack, a bedside block or a separator wall.",
  },
  { name: "Make it yours", line: "Set its width, height and finish to fit the room you have." },
  {
    name: "Choose how it arrives",
    line: `${ARRIVALS.built.name} arrives built. ${ARRIVALS.parts.name} arrives in parts, for less.`,
  },
] as const;

/** What makes a piece modular; all three are placeholders until the owner confirms them. */
export const FEATURES = [
  { name: "Sized to your room", line: "Widths in steps to fit HDB walls, alcoves and corners." },
  { name: "Put together by hand", line: "Parts slot and screw together with the tools in the box." },
  { name: "Add to it later", line: "Pieces join side by side, so a cabinet can grow when you move." },
] as const;

/** Separator walls, and what they can't do, said plainly. */
export const WALLS = {
  title: "One room, made into two",
  rest: "Separator walls",
  line: "A freestanding wall of storage, open on both sides, to give a bedroom a study or an office a meeting corner.",
  limits: [
    "Up to 1600 mm high; it stands on the floor, not fixed to the ceiling.",
    "It divides the space, not the sound: it is not a soundproof wall.",
    "It stands on its own, so most rooms need no drilling. Taller walls may need fixing to the wall for safety.",
  ],
} as const;

/** Questions people ask before they order; answers are placeholders. */
export const QUESTIONS = [
  {
    q: `How long does ${ARRIVALS.parts.name.toLowerCase()} take to put together?`,
    a: "About an hour for a cabinet, with the tools in the box.",
  },
  {
    q: "Will it fit through my lift and door?",
    a: `${ARRIVALS.parts.name} arrives in flat boxes. ${ARRIVALS.built.name} pieces are measured against your lift and door before they ship.`,
  },
  {
    q: "Can I see the finishes first?",
    a: "Yes. Ask for samples by email, or see them on a home visit.",
  },
  {
    q: "Can I change a piece after I order?",
    a: "Until it goes into production, usually within a week of ordering.",
  },
] as const;

/** What modular can't do, said once under the reasons. */
export const FEATURES_LIMIT =
  "What it isn't: built-in carpentry. Pieces stand on the floor, and taller ones may need fixing to the wall.";

/**
 * How long each way takes, as measuring lines on one week scale: the
 * catalogue's own lead times, so they change in one place.
 */
export const LEAD_HEAD = {
  label: "Lead times",
  title: "How long it takes",
  rest: "From your order to your door, in weeks",
};

export const LEADS = [
  { name: "In parts", lead: ARRIVALS.parts.lead, weeks: ARRIVALS.parts.weeks },
  { name: "Built", lead: ARRIVALS.built.lead, weeks: ARRIVALS.built.weeks },
  { name: "Ready-made furniture", lead: FURNITURE_LEAD, weeks: FURNITURE_WEEKS },
] as const;

/** One room, before and after one piece; a render of the room, not a photograph. */
export const BEFORE_AFTER = {
  label: "Before and after",
  title: "One piece, one room",
  rest: "Drag across to see the sofa-back divider in place",
  before: { photo: bookwallBefore, alt: "A render of an open living room, books piled on the floor by the sofa" },
  after: { photo: bookwallAfter, alt: "The same room with a sofa-back divider of shelves behind the sofa" },
  piece: "sofa-back-divider",
};

/** The finishes: today's three and the ones on the way, beside a collage of close-ups. */
export const SWATCHES_HEAD = {
  label: "Finishes",
  title: "Finishes and fabrics",
  lines: [
    "A piece stays in your room for years, so how it feels matters as much as how it looks.",
    "Our modular pieces come in birch, walnut and red today. Oak, cane and three fabrics are on the way, so a piece can match the room it is in.",
  ],
  line: "Ask for samples of today's finishes by email, or see them on a home visit.",
  now: "Today",
  soon: "Coming",
};

export const SWATCHES = [
  { name: "Birch", fill: "birch", now: true },
  { name: "Walnut", fill: "walnut", now: true },
  { name: "Red", fill: "red", now: true },
  { name: "Oiled oak", fill: "oiled-oak", now: false },
  { name: "Smoked oak", fill: "smoked-oak", now: false },
  { name: "Woven cane", fill: "cane", now: false },
  { name: "Natural linen", fill: "linen", now: false },
  { name: "Oat bouclé", fill: "boucle", now: false },
  { name: "Pepper wool", fill: "wool", now: false },
] as const;

/**
 * The collage: four close-ups laid over each other, as samples on a table.
 * `focus` is the part of each photo the crop keeps, as an object-position.
 */
export const COLLAGE = [
  { photo: redSofa, focus: "40% 60%", spot: "main" },
  { photo: yellowChair, focus: "55% 30%", spot: "top" },
  { photo: sewing, focus: "30% 95%", spot: "low" },
  { photo: yellowChair, focus: "70% 62%", spot: "side" },
] as const;

/**
 * One piece put together part by part as the page scrolls: the room
 * divider, drawn from the front in mm (1200 wide, 1600 high). Each part is
 * a rectangle brought in by one of the steps, from the side it comes from.
 * A drawing to show the idea, not the factory's plan; the panels are drawn
 * thicker than the board so they read at a small size.
 */
export const ASSEMBLY = {
  label: "Make it yourself",
  title: "How the pieces come together",
  rest: "Scroll to put a room divider together",
  piece: "room-divider",
  steps: [
    { name: "The base", line: "A plinth that stands level on any floor." },
    { name: "The uprights", line: "Three uprights slot into the base." },
    { name: "The shelves", line: "Six shelves, at the heights you chose." },
    { name: "The top", line: "It ties the uprights together, and it's done." },
  ],
  parts: [
    { step: 0, from: "above", x: 0, y: 1540, w: 1200, h: 60 },
    { step: 1, from: "below", x: 0, y: 0, w: 36, h: 1540 },
    { step: 1, from: "below", x: 582, y: 36, w: 36, h: 1504 },
    { step: 1, from: "below", x: 1164, y: 0, w: 36, h: 1540 },
    { step: 2, from: "left", x: 36, y: 1180, w: 546, h: 28 },
    { step: 2, from: "right", x: 618, y: 1180, w: 546, h: 28 },
    { step: 2, from: "left", x: 36, y: 790, w: 546, h: 28 },
    { step: 2, from: "right", x: 618, y: 790, w: 546, h: 28 },
    { step: 2, from: "left", x: 36, y: 400, w: 546, h: 28 },
    { step: 2, from: "right", x: 618, y: 400, w: 546, h: 28 },
    { step: 3, from: "above", x: 36, y: 0, w: 1128, h: 36 },
  ],
} as const;

/** Sets: pieces from the list that work as one in a room. */
export const SETS_HEAD = {
  label: "Sets",
  title: "Put together for a room",
  rest: "Pieces that work as one, priced together",
};

/**
 * Each set's pieces by slug, so names and prices come from the list, with
 * where its circle sits on the photo, as shares of the photo's width and
 * height. The photos are stand-in rooms until the sets are photographed:
 * each circle marks where its piece would stand.
 */
export const SETS = [
  {
    name: "Entryway set",
    line: "Keys, bags and shoes by the door, and coats off the chair.",
    photo: hallway,
    alt: "A lit open shelf beside a rail of hanging shirts",
    pieces: [
      { slug: "entry-pack", x: 32, y: 55 },
      { slug: "coat-stand", x: 62, y: 22 },
    ],
  },
  {
    name: "Study set",
    line: "What you use at the desk within reach, and a place for the jacket.",
    photo: study,
    alt: "An armchair beside open shelves and a hook on a panelled wall",
    pieces: [
      { slug: "desk-side-pack", x: 77, y: 45 },
      { slug: "coat-stand", x: 46, y: 38 },
    ],
  },
  {
    name: "Living room set",
    line: "Books, plants and pictures along the wall, and a table by the chair.",
    photo: shelfWall,
    alt: "Open shelves of books, plants and pictures beside an orange armchair",
    pieces: [
      { slug: "sofa-back-divider", x: 60, y: 62 },
      { slug: "room-divider", x: 89, y: 58 },
      { slug: "bedside-block", x: 27, y: 74 },
    ],
  },
] as const;

/**
 * Shipping and delivery, after the owner's two references (a furniture
 * guide's order process and topics, a delivery page's methods and its
 * before, during and after). Every fact is one the site already states:
 * the weeks, changes until production, the lift and door check, the hour
 * a cabinet takes, no returns on pieces made to size, the reply time. No
 * fee, payment timing or tracking is promised.
 */
export const DELIVERY = {
  id: "delivery-title",
  label: "Shipping and delivery",
  title: "From your order to your room",
  processTitle: "The order process",
  process: [
    {
      icon: "basket",
      name: "You order",
      line: "Choose each piece, its size and finish, and whether it comes ready to go or in parts.",
    },
    {
      icon: "make",
      name: "It is made",
      line: "Our partner factory in China makes each piece to the size you chose. Nothing is made before you order.",
    },
    {
      icon: "box",
      name: "It is packed",
      line: "Pieces in parts are packed flat with their steps. Pieces ready to go are built and wrapped whole.",
    },
    { icon: "ship", name: "It ships", line: "From China to Singapore. We email you when it moves." },
    {
      icon: "clock",
      name: "We set a time",
      line: "Once it lands, we email you to choose a delivery time that suits you.",
    },
    {
      icon: "home",
      name: "It arrives",
      line: "Carried into the room you choose, built pieces ready to use and flat-packed ones ready to put together.",
    },
  ] satisfies { icon: IconName; name: string; line: string }[],
  waysTitle: "Two ways it arrives",
  ways: [
    {
      icon: "home",
      name: ARRIVALS.built.name,
      weeks: ARRIVALS.built.weeks,
      points: [
        "Arrives built, ready to use",
        "Measured against your lift and door before it ships",
        "Carried into the room you choose",
        "Delivered at a time you pick",
      ],
    },
    {
      icon: "box",
      name: ARRIVALS.parts.name,
      weeks: ARRIVALS.parts.weeks,
      points: [
        "Arrives in flat boxes with its parts and steps",
        "The tools are in the box",
        "About an hour for a cabinet",
        "Carried into the room you choose",
      ],
    },
  ] satisfies { icon: IconName; name: string; weeks: string; points: string[] }[],
  stagesTitle: "Steps for a smooth delivery",
  stages: [
    {
      when: "Before",
      items: [
        {
          name: "Measure your space",
          line: "Measure the spot, and the doors, turns and lift the piece passes on its way. Not sure? Book a home visit and we measure with you.",
        },
        {
          name: "Clear the way",
          line: "Clear the spot where the piece will stand and a path to it from the door.",
        },
      ],
    },
    {
      when: "During",
      items: [
        {
          name: "Check each piece",
          line: "Look each piece over while the team is with you, and take a photo of anything that isn't right.",
        },
      ],
    },
    {
      when: "After",
      items: [
        {
          name: "Tell us",
          line: `Email us with the photo if anything is wrong. We answer within ${FACTS.replyTime}.`,
        },
      ],
    },
  ],
  topics: [
    {
      name: "Timing",
      line: "Each piece's page shows its weeks, and we email you at every step.",
    },
    {
      name: "Putting it together",
      line: "Every flat-packed piece comes with its steps and the tools to put it together.",
    },
    {
      name: "Changes and returns",
      line: "You can change a piece until it goes into production, usually within a week of ordering. Modular pieces are made to your size, so we take them back only if they arrive faulty or damaged.",
    },
    {
      name: "Questions",
      line: `Email us any time before or after your order. We answer within ${FACTS.replyTime}.`,
    },
  ],
};

/**
 * Four promises in a row under a centred line, after the owner's
 * reference; each one the site already makes elsewhere.
 */
export const MADE_FOR_YOU = {
  id: "made-for-you-title",
  title: "Four things every modular piece comes with.",
  items: [
    { icon: "mail", name: "Samples", line: "Ask for finish samples by email, and we send them to you." },
    { icon: "box", name: "The pieces", line: "Shelves, cabinets, desks and separator walls, built from parts." },
    {
      icon: "change",
      name: "Made to size",
      line: "Choose the width, the height and the finish, cut to the space you measure.",
    },
    {
      icon: "home",
      name: "Home visit",
      line: `We come and measure with you. ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
    },
  ] satisfies { icon: IconName; name: string; line: string }[],
};

/**
 * What sets the line apart, after the owner's reference: the choices down
 * the left, each in a square mark, beside the room before and after one
 * piece, dragged across.
 */
export const DIFFERENCE = {
  id: "difference-title",
  label: "The Furnishes difference",
  title: "Made just for you",
  options: [
    { icon: "change", name: "Sizes cut to your wall" },
    { icon: "spark", name: `${FINISHES.length} finishes` },
    { icon: "box", name: `${FACTS.board} birch plywood` },
    { icon: "truck", name: "Ready to go or in parts" },
    { icon: "office", name: "Separator walls" },
  ] satisfies { icon: IconName; name: string }[],
};
