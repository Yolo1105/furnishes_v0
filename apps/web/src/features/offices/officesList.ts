import showroom from "@/assets/banner/showroom.jpg";
import yellowSofa from "@/assets/rooms/yellow-sofa.jpg";
import { PIECES } from "@/features/catalog/catalog";
import { mailAbout } from "@/lib/contact";
import { sgd } from "@/lib/money";
import { FACTS } from "@/lib/site";

/**
 * The offices page's words, after the rebuild's workspaces page: for a
 * startup's first office. Quotes are by email, pieces priced together; no
 * invoice or bulk terms are promised until the owner confirms them. The
 * photos stand in until there is one of an office we furnished.
 */
const QUOTE = mailAbout("Office or bulk order");

/** the lounge photo, on this page and in the band before home's footer */
const LOUNGE = { src: yellowSofa, alt: "A yellow sofa and low tables in an office lounge" };

/** the example offices' title, over the stacked cards */
export const EXAMPLES_TITLE = "What a fit-out looks like";
export const EXAMPLES_REST = "Three offices, from a studio to a shared floor";

export const OFFICES = {
  label: "For offices",
  title: "An office that changes with your team",
  rest: "Desks, chairs, storage and separator walls for a startup's first office in Singapore.",
  lines: [
    "Start with what the team needs now. Add a desk when someone joins, and move a wall when a project changes.",
    "Tell us the team's size and the space, and we send one quote for the pieces together.",
  ],
  quote: { label: "Ask for a quote", href: QUOTE },
  photos: [{ src: showroom, alt: "A bright room with tables, chairs and shelves" }, LOUNGE],
};

/** The band before the footer on home, after the owner's reference: a
 *  photo, a line selling the offices line, and its ask for a quote. */
export const OFFICE_BAND = {
  label: OFFICES.label,
  title: "Your team's first office, sorted.",
  line: "Desks, chairs, storage and walls that grow with your startup. Tell us how many you are and the space you have, and we send one quote for the lot.",
  /* the quote by email, as the offices page asks; no trade scheme is promised */
  go: { label: "Get your quote today", href: QUOTE },
  photo: LOUNGE,
};

/** Every piece made for an office, in the catalogue's order. */
export const OFFICE_PIECES = PIECES.filter((p) => p.rooms.includes("Office"));

export const PIECES_HEAD = {
  id: "office-pieces-title",
  label: "The pieces",
  title: "For an office",
  rest: "Ready-made and modular",
};

/** Why the pieces suit a team that grows, each as a tile; with its limits said plainly. */
export const WHY = {
  id: "office-why-title",
  label: "Why it suits a team",
  title: "Made to change",
  rest: "What a growing team asks of its furniture",
  tiles: [
    {
      name: "Layouts that change",
      line: "Modular pieces bolt together and come apart, so a desk-side pack or a wall moves when the team does.",
    },
    {
      name: "Corners for calls",
      line: "A room divider makes a corner that feels apart for a call. It gives privacy from view, not from sound.",
    },
    {
      name: "Ready-made when it's enough",
      line: "Office chairs and desks in standard sizes, for when a standard size is all you need.",
    },
  ],
};

/** How an office order goes, from the first email to the pieces in place. */
export const ORDER_STEPS = {
  id: "office-steps-title",
  label: "How it works",
  title: "From one email to a furnished office",
  rest: "Three steps, by email or in person",
  steps: [
    { name: "Tell us", line: "The team's size, the space and when you need it. A floor plan or photos help." },
    {
      name: "We come and measure",
      line: `${FACTS.visitMinutes} minutes in your office, ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
    },
    {
      name: "One quote, then set up",
      line: "The pieces for the whole office priced together by email, then carried in and put together.",
    },
  ],
};

/** The questions an office asks first; answers follow the rest of the site. */
export const OFFICE_QUESTIONS = [
  {
    q: "Do you take bulk orders?",
    a: "Yes. Tell us the team's size and the space, and we send one quote for the pieces together.",
  },
  {
    q: "Can we add pieces as we grow?",
    a: "Yes. Modular pieces take more parts later, and the same pieces stay on sale, so a new desk matches the old ones.",
  },
  {
    q: "Are the dividers soundproof?",
    a: "No. A room divider hides a corner from view and stores on both sides, but people nearby can still hear a call.",
  },
  {
    q: "Can you come and look at the space?",
    a: `Yes. A visit is ${FACTS.visitMinutes} minutes and ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
  },
] as const;
