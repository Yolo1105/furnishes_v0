import showroom from "@/assets/banner/showroom.jpg";
import bunk from "@/assets/banner/bunk.jpg";
import hallway from "@/assets/rooms/hallway.jpg";
import home from "@/assets/rooms/home.jpg";
import kitchen from "@/assets/rooms/kitchen.jpg";
import living from "@/assets/rooms/living.jpg";
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

export const ROOMS_HEAD = { label: "Room by room", title: "Storage to sofas, sized to the rooms you have" };

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
export const GUIDES_HEAD = { label: "Before you order", title: "Measure first, then choose" };

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
