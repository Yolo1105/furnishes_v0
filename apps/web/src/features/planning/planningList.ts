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
  rest: "Eva, our AI assistant, and a 3D room planner. Both are free with an account, and both are opening soon.",
  lines: [
    "Today our team plans each room by hand, and the assistant helps. Eva and the planner make that help yours to use any time.",
    "Until they open, a home visit or an email gets you the same answer from a person.",
  ],
  photos: [
    { src: home, alt: "Shelves and two reading chairs by a tall window" },
    { src: living, alt: "A living room with a long sofa and low shelves" },
  ],
  go: { label: "Log in to start", href: DESIGN_NEXT },
};

export const EVA = {
  id: "eva-title",
  label: "Eva, the assistant",
  title: "Asks about the room first",
  rest: "Then suggests, and says why",
  tiles: [
    {
      name: "The room, then you",
      line: "Eva asks about the room and how you live in it before suggesting anything.",
    },
    {
      name: "Three pieces at most",
      line: "Each suggestion comes with why it fits your room, so you can disagree with a reason.",
    },
    {
      name: "Only what we sell",
      line: "Eva never makes up a piece or a price. If nothing fits, she says so.",
    },
  ],
};

export const PLANNER = {
  id: "planner-title",
  label: "The room planner",
  title: "See it before you order",
  rest: "In 3D, at real size",
  steps: [
    {
      name: "Draw your room",
      line: "Start from a 3-, 4- or 5-room HDB layout, then set your own walls, doors and windows.",
    },
    {
      name: "Place our pieces",
      line: "At their real size, in the size and finish you choose, with walkways checked as you go.",
    },
    { name: "Send it to us", line: "We check it fits, then the pieces go into your cart with your choices kept." },
  ],
};

/** What each way in gives, so no one logs in to find what they could have had without it. */
export const WAYS = {
  id: "ways-title",
  label: "Ways in",
  title: "What needs an account",
  rest: "And what doesn't",
  tiles: [
    {
      name: "Without logging in",
      line: "Every piece and price, the quiz, the buying guide, and email answers from a person.",
      go: { label: "Find your piece", href: routes.quiz },
    },
    {
      name: "With an account",
      line: "Eva, the room planner and your saved rooms, once they open. Free.",
      go: { label: "Log in", href: DESIGN_NEXT },
    },
    {
      name: "In person",
      line: `A ${FACTS.visitMinutes}-minute visit: we measure and suggest. ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
      go: { label: "Book a visit", href: mailAbout("Home visit") },
    },
  ],
};
