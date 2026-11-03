import home from "@/assets/rooms/home.jpg";
import yellowSofa from "@/assets/rooms/yellow-sofa.jpg";
import { EMAIL, HOURS, mailAbout, MAILTO, PLACE } from "@/lib/contact";
import { routes } from "@/lib/routes";
import { sgd } from "@/lib/money";
import { FACTS } from "@/lib/site";

/**
 * The contact page's words, after the rebuild's contact page. We answer by
 * email and, once you log in, by the AI assistant; there is no phone line or
 * showroom, on the owner's word. The reply time is a placeholder.
 */
export const CONTACT = {
  label: "Contact",
  title: "How can we help?",
  rest: "A question about a piece, advice on a room, or a visit. Write to us and we reply by email.",
  photos: [
    { src: yellowSofa, alt: "A yellow sofa and low tables in an office lounge" },
    { src: home, alt: "Shelves and two chairs by a tall window at the foot of a stair" },
  ],
};

/** How to reach us, a row each beside the opening's line. */
export const DETAILS = [
  { label: "Email", lines: [EMAIL], href: MAILTO },
  { label: "Hours", lines: HOURS },
  { label: "Reply", lines: [`Within ${FACTS.replyTime}`] },
  { label: "Where", lines: PLACE },
  { label: "Assistant", lines: ["Log in to ask the AI assistant"], href: routes.logIn },
] as const;

/** What people write about, each opening an email with its subject filled in, and what it leads to. */
export const TOPICS_HEAD = {
  label: "Write to us",
  title: "What can we help with?",
  rest: "Pick the closest; the email opens with its subject written in",
};

export const TOPICS = [
  {
    name: "A piece or an order",
    line: "Sizes, finishes, an order you've placed, or a delivery.",
    runs: "By email",
    go: "Ask about a piece",
    href: mailAbout("A piece or an order"),
  },
  {
    name: "Advice on a room",
    line: "Send a photo and the size of the room, and we suggest what fits.",
    runs: "By email",
    go: "Ask about a room",
    href: mailAbout("Advice on a room"),
  },
  {
    name: "A home visit",
    line: `${FACTS.visitMinutes} minutes in your home or office: we measure and suggest pieces. ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
    runs: `${FACTS.visitMinutes} minutes`,
    go: "Ask for a visit",
    href: mailAbout("Home visit"),
  },
  {
    name: "An office or bulk order",
    line: "Desks, storage and separator walls for a team, priced together.",
    runs: "A quote",
    go: "Ask for a quote",
    href: mailAbout("Office or bulk order"),
  },
  {
    name: "A custom size or design",
    line: "A modular piece in a size or shape the list doesn't have.",
    runs: "A quote",
    go: "Ask for a quote",
    href: mailAbout("Custom size or design"),
  },
  {
    name: "Samples of the finishes",
    line: "Birch, walnut and red, to see against your walls before you order.",
    runs: "By email",
    go: "Ask for samples",
    href: mailAbout("Samples"),
  },
] as const;

/** What happens once the email is sent. */
export const NEXT = {
  label: "After you write",
  title: "What happens next",
  rest: `We answer within ${FACTS.replyTime}`,
  steps: [
    {
      name: "You send the email",
      line: "Its subject is written in, so our first reply is already about what you need.",
    },
    { name: "We reply", line: "We answer your question, or send a quote if you asked for one." },
    {
      name: "If you asked for a visit",
      line: `We agree a time to come to your room. ${sgd(FACTS.visitFee)}, taken off your order.`,
    },
  ],
};

/** Questions asked before writing; answers follow the rest of the site. */
export const CONTACT_QUESTIONS = [
  {
    q: "How soon do you answer?",
    a: `Within ${FACTS.replyTime}. We read email ${HOURS.join(", ")}.`,
  },
  {
    q: "Is there a phone line or a showroom?",
    a: `Not yet. Write to us, or log in to ask the assistant, and we come to you: a home visit is ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
  },
  {
    q: "Do you take office and bulk orders?",
    a: "Yes. Tell us the team's size and the space, and we send a quote for the pieces together.",
  },
  {
    q: "Can I change my order?",
    a: "Until it goes into production, usually within a week of ordering.",
  },
  {
    q: "Do you deliver outside Singapore?",
    a: "Not yet. We start in Singapore and may deliver further once that works well.",
  },
] as const;
