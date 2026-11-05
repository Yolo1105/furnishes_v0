import showroom from "@/assets/banner/showroom.jpg";
import bunk from "@/assets/banner/bunk.jpg";
import hallway from "@/assets/rooms/hallway.jpg";
import living from "@/assets/rooms/living.jpg";
import study from "@/assets/rooms/study.jpg";
import type { StaticImageData } from "next/image";
import { ARRIVALS, FURNITURE_WEEKS } from "@/features/catalog/catalog";
import { routes } from "@/lib/routes";

/**
 * Example rooms, after the owner's "client stories" reference, but as what
 * we would supply, not results: there are no customers to quote yet. Each
 * is a room, a sentence on it, three figures of what goes in, and the
 * pieces used. The rooms, counts and photos are placeholders until there
 * is a real one to show; the weeks are read from the catalogue.
 */
export type Example = {
  id: string;
  photo: StaticImageData;
  /** the sentence's opening words, set in red; `line` runs on from them */
  lead: string;
  line: string;
  figures: readonly { value: string; line: string }[];
  pieces: readonly string[];
};

const EXAMPLES = {
  livingStudy: {
    id: "living-study",
    photo: living,
    lead: "A 4-room HDB living room",
    line: " with a study corner walled off, for working from home.",
    figures: [
      { value: "1", line: "Room divider, storage on both sides" },
      { value: "1", line: "Desk and chair for the study corner" },
      { value: ARRIVALS.parts.weeks, line: "For the modular pieces, order to door" },
    ],
    pieces: ["room-divider", "office-desk", "office-chair", "sofa"],
  },
  entrance: {
    id: "entrance",
    photo: hallway,
    lead: "A 3-room HDB flat",
    line: " whose front door needed a place for shoes, bags and keys.",
    figures: [
      { value: "1", line: "Entry pack by the door" },
      { value: "1", line: "Coat stand for the coats off the chairs" },
      { value: ARRIVALS.parts.weeks, line: "Order to door, in parts to put together" },
    ],
    pieces: ["entry-pack", "coat-stand", "bedside-block"],
  },
  startup: {
    id: "startup",
    photo: study,
    lead: "An 8-person startup",
    line: " in a shophouse unit, with a meeting corner walled off.",
    figures: [
      { value: "8", line: "Desks and chairs, one for each person" },
      { value: "2", line: "Room dividers round the meeting corner" },
      { value: FURNITURE_WEEKS, line: "Made after the order, to the door" },
    ],
    pieces: ["office-desk", "office-chair", "room-divider", "low-cabinet"],
  },
  studio: {
    id: "studio",
    photo: showroom,
    lead: "A 4-person design studio",
    line: " that wanted its storage along one long wall.",
    figures: [
      { value: "4", line: "Desks, with room for two more" },
      { value: "3", line: "Low cabinets, one wall long" },
      { value: "1", line: "Executive desk for the founder" },
    ],
    pieces: ["office-desk", "low-cabinet", "executive-desk", "coat-stand"],
  },
  shared: {
    id: "shared",
    photo: bunk,
    lead: "A hot-desk area for 12",
    line: " on a co-working floor, kept apart from the lounge.",
    figures: [
      { value: "12", line: "Desk-side packs, one for each seat" },
      { value: "6", line: "Shared desks, two to a desk" },
      { value: "3", line: "Sofa-back dividers along the lounge" },
    ],
    pieces: ["desk-side-pack", "office-desk", "sofa-back-divider"],
  },
} satisfies Record<string, Example>;

/** The landing's title and way on, over its examples */
export const HOME_EXAMPLES_HEAD = {
  title: "Rooms, put together.",
  answer: "Two homes and an office, as we'd furnish them.",
  rest: "Each lists the pieces we'd use and how long they take, so you can picture yours.",
  go: { label: "See the collection", href: routes.collection },
};

/** The landing's: both kinds of customer, two homes and an office. */
export const HOME_EXAMPLES = [EXAMPLES.livingStudy, EXAMPLES.entrance, EXAMPLES.startup];

/** The offices page's: three offices of different sizes. */
export const OFFICE_EXAMPLES = [EXAMPLES.startup, EXAMPLES.studio, EXAMPLES.shared];

export const EXAMPLES_LABEL = "Examples";
