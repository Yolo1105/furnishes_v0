import showroom from "@/assets/banner/showroom.jpg";
import bunk from "@/assets/banner/bunk.jpg";
import hallway from "@/assets/rooms/hallway.jpg";
import home from "@/assets/rooms/home.jpg";
import kitchen from "@/assets/rooms/kitchen.jpg";
import living from "@/assets/rooms/living.jpg";
import study from "@/assets/rooms/study.jpg";
import { PIECES } from "@/features/catalog/catalog";
import { shopHref, slug } from "@/features/catalog/filters";
import { routes } from "@/lib/routes";

/**
 * The quiz page's words, in one place: every kind of piece as a way into
 * the list, then the rooms, each with its photo. The office photo stands in
 * until there is one of an office.
 */

export const FIND = { lead: "Find your piece.", rest: "Make it personal." };

/** Every kind of piece, with how many there are, after "All pieces". */
const kinds = [...new Set(PIECES.map((p) => p.kind))];

export const KINDS = [
  { label: "All pieces", count: PIECES.length, href: shopHref({}) },
  ...kinds.map((k) => ({
    label: k,
    count: PIECES.filter((p) => p.kind === k).length,
    href: shopHref({ kind: [slug(k)] }),
  })),
];

export const ROOMS_HEAD = {
  label: "Room by room",
  title: "Storage to sofas, sized to the rooms you have",
  rest: "Pick a room to see what fits it",
};

const room = (name: string, line: string, photo: typeof living) => ({
  name,
  line,
  photo,
  href: shopHref({ room: [slug(name)] }),
});

export const ROOMS = [
  room("Living room", "Sofas, storage and the walls between", living),
  room("Bedroom", "The book and the lamp, within reach", bunk),
  room("Study", "A desk and the shelves around it", home),
  room("Office", "Desks, chairs and a quiet corner", showroom),
  room("Kitchen", "Prep space, wherever you cook", kitchen),
  room("Entryway", "Keys, bags and shoes by the door", hallway),
];

/**
 * The band over the page, after the owner's reference: the showroom, three
 * words that run across it, then a title, a line and the way to draw a room.
 */
export const BANNER = {
  photo: showroom,
  words: ["Design", "Cut", "Assemble"],
  title: "Create with intention",
  line: "Not sure which piece? Draw your room first, and we will suggest the pieces that fit it.",
  call: "Design your room",
};

/**
 * Two short guides at the page's foot, from the rebuild's help and HDB
 * pages, set here on the page rather than as links to pages not built yet.
 */
export const GUIDES_HEAD = {
  label: "Before you order",
  title: "Measure first, then choose",
  rest: "Two short guides, before you order",
  photo: study,
};

export const GUIDES = [
  {
    name: "How to measure",
    points: [
      "The spot: its width, depth and height, measured above any skirting board.",
      "The way in: the lift, the door and any tight corner, for the piece or its largest box.",
      "Room around it: to put it together and to open its doors and drawers.",
    ],
  },
  {
    name: "Furniture for HDB flats",
    points: [
      "A tight way in? Choose a modular piece in parts: its largest box is smaller than the piece.",
      "Check HDB's rules before you drill or change anything fixed.",
      "Still not sure? We come to your flat, measure with you and suggest what fits.",
    ],
  },
];

export const GUIDES_CALL = { label: "Book a visit", href: routes.contact };

/**
 * What's bothering you: a room, then three problems in it, each answered by
 * one piece from the catalogue (by its slug), after the rebuild's picker.
 * Each room shows its own photo, so the picture follows the room chosen;
 * they are rooms, not the pieces themselves.
 */
export const PROBLEMS_HEAD = {
  label: "Start from the problem",
  title: "What's bothering you?",
  line: "Pick a room, then the problem that sounds most like yours.",
  call: "See this piece",
};

export const PROBLEMS = [
  {
    room: "Entryway",
    photo: hallway,
    items: [
      { line: "Coats pile up on the chair by the door", piece: "coat-stand" },
      { line: "Keys and bags end up on the floor", piece: "entry-pack" },
      { line: "Shoes spread along the wall", piece: "low-cabinet" },
    ],
  },
  {
    room: "Bedroom",
    photo: bunk,
    items: [
      { line: "Phone and book on the floor by the bed", piece: "bedside-block" },
      { line: "Two people share one room", piece: "room-divider" },
      { line: "Books stacked wherever there's space", piece: "bookcase" },
    ],
  },
  {
    room: "Work",
    photo: home,
    items: [
      { line: "The printer lives on the floor", piece: "desk-side-pack" },
      { line: "My back aches after a day at the desk", piece: "office-chair" },
      { line: "The desk is too small for the work", piece: "executive-desk" },
    ],
  },
  {
    room: "Kitchen",
    photo: kitchen,
    items: [
      { line: "The counter is too short when I cook", piece: "kitchen-cart" },
      { line: "Homework and dinner share one table", piece: "dining-table" },
      { line: "Pots and pans have nowhere to go", piece: "low-cabinet" },
    ],
  },
  {
    room: "Living room",
    photo: living,
    items: [
      { line: "The sofa floats in the middle of the room", piece: "sofa-back-divider" },
      { line: "There's no seat for guests", piece: "sofa" },
      { line: "One room has to be living and study", piece: "room-divider" },
    ],
  },
] as const;

/**
 * Four short questions, after the rebuild's quiz: where, what it should do,
 * how wide the spot is and what one piece may cost. Any can be skipped; the
 * pieces on the right follow every answer, and `short` names the
 * answer in the summary. `pieces` are the catalogue slugs
 * that do the job, `fits` the reason each gives. Widths are in mm and
 * budgets in SGD, read against a piece's narrowest size and lowest price.
 */
/** The page's opening, as every page without a banner opens: its label, then the finder's title and line. */
export const OPENING_LABEL = "Find your piece";

export const FINDER_HEAD = {
  label: "Four short questions",
  title: "Not sure what you need?",
  line: "Answer what you can and skip the rest. The pieces change with each answer.",
  found: ["Nothing fits all of that yet", "One piece fits", "Two pieces fit", "Three pieces fit"],
  none: "Change an answer, or we come to your room and suggest what fits.",
  visit: { label: "Book a home visit", href: routes.contact },
  back: "Back",
  skip: "Skip",
  again: "Start again",
  skipped: "Any",
  of: "of",
};

/**
 * The quiz page's first screen: the questions one at a time, each asked in
 * its two longer "lines" over its "big" word, then the answers below as the
 * finder's summary.
 */
export const STAGE = {
  question: "Question",
  next: "Next",
  last: "See what fits",
  back: "Back",
};

export const FINDER = [
  {
    id: "room",
    lines: ["Which room in your home", "is the new piece going in?"],
    big: "room",
    short: "Room",
    title: "Which room is it for?",
    options: [
      { id: "entryway", name: "Entryway", room: "Entryway" },
      { id: "bedroom", name: "Bedroom", room: "Bedroom" },
      { id: "living-room", name: "Living room", room: "Living room" },
      { id: "study", name: "Study", room: "Study" },
      { id: "office", name: "Office", room: "Office" },
      { id: "kitchen", name: "Kitchen", room: "Kitchen" },
    ],
  },
  {
    id: "want",
    lines: ["What would you like", "the new piece to do for you?"],
    big: "use",
    short: "To do",
    title: "What should it do?",
    options: [
      {
        id: "hang",
        name: "Hold coats, bags and keys",
        pieces: ["coat-stand", "entry-pack"],
        fits: "It gives coats, bags and keys a place by the door.",
      },
      {
        id: "store",
        name: "Store more along a wall",
        pieces: ["low-cabinet", "bookcase", "sofa-back-divider", "room-divider"],
        fits: "It stores along the wall instead of across the floor.",
      },
      {
        id: "split",
        name: "Split one room in two",
        pieces: ["room-divider", "sofa-back-divider"],
        fits: "It makes one room two, and stores on both sides.",
      },
      {
        id: "reach",
        name: "Keep things within reach",
        pieces: ["bedside-block", "desk-side-pack", "kitchen-cart"],
        fits: "It keeps what you use at hand's height.",
      },
      {
        id: "work",
        name: "Make room to work",
        pieces: ["office-desk", "executive-desk", "desk-side-pack", "office-chair"],
        fits: "It's made for a day at the desk.",
      },
      {
        id: "sit",
        name: "Add a seat or a table",
        pieces: ["sofa", "dining-table", "office-chair"],
        fits: "It adds a seat or a table where one is missing.",
      },
    ],
  },
  {
    id: "width",
    lines: ["How wide is the spot", "where the piece will stand?"],
    big: "width",
    short: "Width",
    title: "How wide is the spot?",
    options: [
      { id: "narrow", name: "Under 80 cm", up: 800 },
      { id: "medium", name: "80 cm to 1.5 m", up: 1500 },
      { id: "wide", name: "Wider than 1.5 m", up: Infinity },
    ],
  },
  {
    id: "budget",
    lines: ["How much would you like", "to spend on one piece?"],
    big: "budget",
    short: "Budget",
    title: "What would you spend on one piece?",
    options: [
      { id: "300", name: "Up to $300", up: 300 },
      { id: "600", name: "Up to $600", up: 600 },
      { id: "1000", name: "Up to $1,000", up: 1000 },
      { id: "more", name: "More than that", up: Infinity },
    ],
  },
] as const;
