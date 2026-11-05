import home from "@/assets/rooms/home.jpg";
import living from "@/assets/rooms/living.jpg";
import { mailAbout } from "@/lib/contact";
import { sgd } from "@/lib/money";
import { routes } from "@/lib/routes";
import { FACTS } from "@/lib/site";

/**
 * The planning help page's words, for a visitor not logged in: what Eva and
 * the room planner do, said as the company brief asks, honestly: both open
 * with accounts, and today the team plans by hand with the assistant's help.
 * Eva's rules follow the playground's prompt: the room first, at most three
 * pieces each with why, and never a piece or price that isn't ours.
 */
const DESIGN_NEXT = `${routes.logIn}?next=${encodeURIComponent(routes.designYourRoom)}`;

export const PLANNING = {
  label: "Planning help",
  title: "Plan a room with us",
  rest: "A room planner, open now and free with an account, and Eva, who checks the room as you draw it. The 3D view comes later.",
  lines: [
    "Draw one room from above at real size, place our pieces and what you own, and Eva says what won't fit and why.",
    "Eva's chat, where you ask her questions, opens later. Until then, a home visit or an email gets you an answer from a person.",
  ],
  photos: [
    { src: home, alt: "Shelves and two reading chairs by a tall window" },
    { src: living, alt: "A living room with a long sofa and low shelves" },
  ],
  go: { label: "Log in to start", href: DESIGN_NEXT },
  demo: { line: "No account yet?", go: "Try it as a demo" },
};

/**
 * Eva's band, after the owner's reference: the title on the left, what she
 * does on the right, then three cards, each drawn in
 * the planner's own lines, on home and on this page alike.
 */
export const EVA = {
  id: "eva-title",
  label: "The room planner",
  /* the question, then the answer on its own line */
  title: ["Ready to design?", "Meet Eva, our AI assistant, coming to the planner."],
  line: "She asks about your home, checks your room as you draw it, and suggests pieces that fit, with the reason why.",
  /* three cards, each a drawing over its name and line; the ways on are
     gone, on the owner's word */
  tiles: [
    {
      drawing: "room",
      name: "The room, then you",
      line: "Eva asks about the room and how you live in it before suggesting anything.",
    },
    {
      drawing: "three",
      name: "Three pieces at most",
      line: "Each suggestion comes with why it fits your room, so you can disagree with a reason.",
    },
    {
      drawing: "ours",
      name: "Only what we sell",
      line: "Eva never makes up a piece or a price. If nothing fits, she says so.",
    },
  ],
} as const;

export const PLANNER = {
  id: "planner-title",
  label: "The room planner",
  title: "See it before you order",
  rest: "From above, at real size",
  steps: [
    {
      name: "Draw your room",
      line: "Start from a bedroom or living room of a 3-, 4- or 5-room HDB flat, or your own size, then move the door and window.",
    },
    {
      name: "Place our pieces",
      line: "At their real size, beside what you already own, with walkways, the door and the window checked as you go.",
    },
    { name: "Send it to us", line: "The room goes to us by email, and we check it fits before you order." },
  ],
};

/**
 * The ways to get help side by side, after the rebuild's comparison: what
 * each costs, what it gives and what it doesn't, so no one logs in to find
 * what they could have had without it.
 */
export const WAYS = {
  id: "ways-title",
  label: "Ways in",
  title: "Three ways to get help",
  rest: "What each costs, and what it doesn't do",
  tiles: [
    {
      name: "On your own",
      facts: [
        { label: "Costs", value: "Nothing, no account" },
        {
          label: "You get",
          value: "Every piece and price, the quiz, the buying guide and email answers from a person",
        },
        { label: "Not included", value: "Anything saved between visits" },
      ],
      go: { label: "Find your piece", href: routes.quiz },
    },
    {
      name: "With an account",
      facts: [
        { label: "Costs", value: "Nothing" },
        { label: "You get", value: "The room planner, with Eva checking it, kept in this browser" },
        { label: "Not included", value: "Eva doesn't measure your room or judge if a piece is safe there" },
      ],
      go: { label: "Log in", href: DESIGN_NEXT },
    },
    {
      name: "In person",
      facts: [
        { label: "Costs", value: `${sgd(FACTS.visitFee)}, taken off your order if you buy` },
        { label: "You get", value: `${FACTS.visitMinutes} minutes in your room: we measure and suggest pieces` },
        { label: "Not included", value: "Renovation or building work" },
      ],
      go: { label: "Book a visit", href: mailAbout("Home visit") },
    },
  ],
};

/**
 * Tell us about a room, after the landing site's plan form: what it is,
 * what should happen there, its rough size and what stays. Sending writes
 * it all into an email, so a person can answer it.
 */
export const BRIEF = {
  id: "brief-title",
  label: "Tell us about a room",
  title: "We plan it with you",
  rest: "By email, while the planner opens",
  rooms: ["Living room", "Bedroom", "Study", "Office", "Kitchen", "Entryway", "Somewhere else"],
  fields: {
    room: "Which room",
    size: "Rough size, if you know it",
    happen: "What should happen there",
    stays: "What stays",
  },
  sizeHint: "3.2 × 2.8 m",
  happenHint: "Two children share it and both need a desk",
  staysHint: "The bed, the wardrobe on the left wall",
  line: "Photos and two measurements of the wall help. Attach them to the email that opens.",
  send: "Write the email",
  subject: "A room to plan",
};
