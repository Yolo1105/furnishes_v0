import aFrame from "@/assets/banner/a-frame.jpg";
import { ARRIVALS } from "@/features/catalog/catalog";

/**
 * The Modular page's words, in one place. Sizes, limits and answers marked
 * wait on the owner's documents.
 */

/** The banner, in the collection banner's shape. */
export const MODULAR_BANNER = {
  photo: aFrame,
  room: "Living room",
  lead: "Modular furniture,",
  rest: "sized to your room. Ready to go, or make it yourself.",
};

/** How it works, in the order a visitor does it. */
export const STEPS = [
  {
    name: "Choose a piece",
    line: "Start from one of our designs: storage, an entry pack, a bedside block or a separator wall.",
  },
  { name: "Make it yours", line: "Set its width, height and finish to fit the room you have [placeholder limits]." },
  {
    name: "Choose how it arrives",
    line: `${ARRIVALS.built.name}: assembled, in ${ARRIVALS.built.weeks}. ${ARRIVALS.parts.name}: in parts, in ${ARRIVALS.parts.weeks}, for less.`,
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
    "No drilling into your walls, so it suits HDB flats and rented offices.",
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
