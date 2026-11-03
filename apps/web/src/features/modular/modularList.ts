import aFrame from "@/assets/banner/a-frame.jpg";
import bookwallAfter from "@/assets/before-after/bookwall-after.webp";
import bookwallBefore from "@/assets/before-after/bookwall-before.webp";
import { ARRIVALS, FURNITURE_LEAD, FURNITURE_WEEKS } from "@/features/catalog/catalog";

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

/** The finishes we are looking at next; none is on sale yet. */
export const SWATCHES_HEAD = {
  label: "Finishes",
  title: "What comes next",
  rest: "Birch, walnut and red today; these are on the way",
  line: "Ask for samples of today's finishes by email, or see them on a home visit.",
  soon: "Coming",
};

export const SWATCHES = [
  { name: "Oiled oak", fill: "oiled-oak" },
  { name: "Smoked oak", fill: "smoked-oak" },
  { name: "Woven cane", fill: "cane" },
  { name: "Natural linen", fill: "linen" },
  { name: "Oat bouclé", fill: "boucle" },
  { name: "Pepper wool", fill: "wool" },
] as const;
