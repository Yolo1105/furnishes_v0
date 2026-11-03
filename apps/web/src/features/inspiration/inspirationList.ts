import type { StaticImageData } from "next/image";
import cabinSofa from "@/assets/banner/cabin-sofa.jpg";
import hallway from "@/assets/rooms/hallway.jpg";
import home from "@/assets/rooms/home.jpg";
import kitchen from "@/assets/rooms/kitchen.jpg";
import living from "@/assets/rooms/living.jpg";
import shelfWall from "@/assets/rooms/shelf-wall.jpg";
import study from "@/assets/rooms/study.jpg";
import yellowSofa from "@/assets/rooms/yellow-sofa.jpg";
import { shopHref, slug } from "@/features/catalog/filters";
import { routes } from "@/lib/routes";

/** The short line under the page's title, in brown, so the red title has a different colour beside it. */
export const SUB = "Pick a room to see what goes in it";

/** A room to start from: its name, a line about what is in it, and its photo. */
export type Idea = { key: string; name: string; line: string; photo: StaticImageData };

/** The rooms shown on the inspiration page, in order; the first is open at rest. */
export const IDEAS: readonly Idea[] = [
  {
    key: "living",
    name: "Living room",
    line: "A sideboard the length of the wall",
    photo: living,
  },
  {
    key: "study",
    name: "Study",
    line: "A desk and shelves for a corner",
    photo: study,
  },
  {
    key: "kitchen",
    name: "Kitchen",
    line: "Shelves from counter to ceiling",
    photo: kitchen,
  },
  {
    key: "family",
    name: "Family room",
    line: "Low storage under the window",
    photo: cabinSofa,
  },
];

/** The last card, leading on to every piece. */
export const ALL_ROOMS = {
  name: "All rooms",
  line: "Every piece, room by room",
  href: routes.collection,
} as const;

/**
 * The row at the page's foot, after the owner's reference: four rooms, each
 * named and leading to the pieces for that room. Rooms the page above
 * doesn't show, so the row adds to it.
 */
const look = (name: string, room: string, photo: StaticImageData) => ({
  name,
  photo,
  href: shopHref({ room: [slug(room)] }),
});

export const LOOKS = [
  look("A wall of books", "Living room", shelfWall),
  look("The yellow sofa", "Living room", yellowSofa),
  look("A desk by the window", "Study", home),
  look("By the front door", "Entryway", hallway),
];

export const LOOK_CALL = "Shop the look";

/** The row's heading, in the journal's shape above it: a title, then a band with a label and a note. */
export const LOOKS_HEAD = {
  title: "Shop the look",
  label: "Rooms to take home",
  note: "The pieces in each, ready to order",
};

/**
 * Small things people stop seeing, after the rebuild's "not noticed": each
 * the problem as its title, one line, and the piece that answers it.
 */
export const NOTICED_HEAD = {
  title: "You may have got used to these",
  label: "Small fixes",
  note: "Everyday problems, and the piece for each",
};

export const NOTICED = [
  {
    name: "The chair by the door holds every coat",
    line: "Coats and bags on a stand of their own.",
    piece: "coat-stand",
    photo: hallway,
  },
  {
    name: "The phone sleeps on the floor",
    line: "The phone, the book and the lamp at hand's height.",
    piece: "bedside-block",
    photo: cabinSofa,
  },
  {
    name: "The printer lives under the desk",
    line: "What you use at the desk, within reach.",
    piece: "desk-side-pack",
    photo: study,
  },
  {
    name: "Chopping on the edge of the sink",
    line: "Prep space on casters, wherever you cook.",
    piece: "kitchen-cart",
    photo: kitchen,
  },
] as const;
