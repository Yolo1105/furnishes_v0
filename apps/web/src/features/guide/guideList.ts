import kitchen from "@/assets/rooms/kitchen.jpg";
import study from "@/assets/rooms/study.jpg";
import { ARRIVALS, CUSTOM, inWeeks, SHARED } from "@/features/catalog/catalog";
import { EMAIL, mailAbout } from "@/lib/contact";
import { FACTS } from "@/lib/site";

/**
 * The buying guide's words, after the rebuild's guide, cut to what v0
 * already says elsewhere: delivery, returns and care are read from the
 * catalogue's shared lines, so the guide never says a second thing. The
 * HDB lines are a rule of thumb from the playground's flat data, not a
 * promise; measuring your own flat comes first.
 */
export const GUIDE = {
  label: "Buying guide",
  title: "Before you order",
  rest: "What to measure, what fits an HDB flat, and what happens once you order.",
  lines: [
    "A photo of your room helps to compare ideas, but only a tape measure confirms a fit.",
    "Tight spots and tall pieces may need a closer look first. We come to your flat, or answer by email.",
  ],
  photos: [
    { src: study, alt: "A desk by a window, with shelves beside it" },
    { src: kitchen, alt: "A kitchen counter with stools along it" },
  ],
};

export const MEASURE = {
  id: "measure-title",
  label: "Measure",
  title: "Three things to measure",
  rest: "Before choosing a piece or a size",
  steps: [
    {
      name: "Where it will stand",
      line: "The width, depth and height of the spot, above any skirting board. Note switches, sockets and windows.",
    },
    {
      name: "How it gets there",
      line: "The lift, the door and any tight corner on the way in. A room can fit a piece the lift can't carry.",
    },
    {
      name: "Room to use it",
      line: "Space to open its doors and drawers, pull out a chair and walk past. Leave about 60 cm for a walkway.",
    },
  ],
};

/** What fits each common flat, against the pieces we sell; a rule of thumb. */
export const HDB = {
  id: "hdb-title",
  label: "HDB flats",
  title: "What usually fits",
  rest: "A rule of thumb for new flats; your own measures come first",
  flats: [
    {
      name: "3-room",
      size: "About 65 m²",
      lines: [
        "Living room: a three-seat sofa, about 2.1 m. An L-shaped sofa is a squeeze.",
        "Dining: a four-seat table, 1.4 m.",
        "Common bedroom: a single bed leaves room for a bedside block, not much more.",
      ],
    },
    {
      name: "4-room",
      size: "About 90 m²",
      lines: [
        "Living room: a three-seat sofa with a sofa-back divider behind it.",
        "Dining: a four-seat table is comfortable; six seats is tight.",
        "Common bedroom: a single bed with a desk and a desk-side pack.",
      ],
    },
    {
      name: "5-room",
      size: "About 110 m²",
      lines: [
        "Living room: room for a sofa, a low cabinet and a divider to make a study corner.",
        "Dining: a six-seat table, 1.8 m.",
        "Common bedroom: a room divider can make it two for siblings.",
      ],
    },
  ],
  way: "Getting it in: older blocks have smaller lifts. If the way in is tight, choose a modular piece in parts; its largest box is far smaller than the piece.",
};

/** What an order holds, and what the photos show that it doesn't. */
export const ORDER = {
  id: "order-title",
  label: "Your order",
  title: "What comes, and what doesn't",
  rest: "So the photos don't promise more than the box",
  lists: [
    {
      name: "In your order",
      items: [
        "The piece, in the size and finish you chose",
        "The add-ons you ticked",
        "Its fixings, and its steps if it comes in parts",
        "Delivery in Singapore, carried into your room",
      ],
    },
    {
      name: "Not in your order",
      items: [
        "Lamps, books, plants and anything else in the photos",
        "Moving your own furniture, or work on your walls",
        "Putting together a piece in parts, unless you choose it built",
      ],
    },
  ],
};

/** The basics, each as its own tile; read from the facts the rest of the site states. */
export const BASICS = {
  id: "basics-title",
  label: "The basics",
  title: "Delivery, returns and care",
  rest: "The short version; the policies have the rest",
  tiles: [
    {
      name: "How long",
      line: `Modular pieces take ${ARRIVALS.parts.weeks} in parts and ${ARRIVALS.built.weeks} built. A size of your own adds ${inWeeks(CUSTOM.extra)}.`,
    },
    { name: "Delivery", line: SHARED.delivery },
    { name: "Returns", line: SHARED.returns },
    { name: "Care", line: SHARED.care },
    {
      name: "Samples",
      line: "See the birch, walnut and red before you choose. We post samples, or bring them on a home visit.",
      go: { label: "Ask for samples", href: mailAbout("Finish samples") },
    },
    {
      name: "Help",
      line: `By email at ${EMAIL}, answered within ${FACTS.replyTime}.`,
      go: { label: "Email us", href: mailAbout("A question before ordering") },
    },
  ],
};

/** Putting together a piece that arrives in parts, in order. */
export const BUILD = {
  id: "build-title",
  label: "In parts",
  title: "If you put it together",
  rest: "For a piece that arrives in parts",
  steps: [
    {
      name: "Before you open the boxes",
      line: "Count the boxes. Clear floor to lay out the parts and stand the piece up.",
    },
    { name: "Start from the base", line: "Follow the steps for your piece in order, base first, so it stands steady." },
    {
      name: "Two people for tall parts",
      line: "Get a second person for tall or heavy parts. Never leave one standing unsupported.",
    },
    { name: "Check it over", line: "Check the fixings, doors and drawers before you load it." },
    {
      name: "If something's wrong",
      line: "Stop. Don't force a part or widen a hole. Email us your order number and a photo.",
    },
    { name: "If you'd rather not", line: "Choose it built instead: it arrives assembled and is carried in." },
  ],
};
