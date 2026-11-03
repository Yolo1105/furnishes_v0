import showroom from "@/assets/banner/showroom.jpg";
import { EMAIL, HOURS, mailAbout, MAILTO, PLACE } from "@/lib/contact";
import type { ClosingBand } from "@/features/collection/Closing";
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
};

/** How to reach us, a row each beside the opening's line. */
export const DETAILS = [
  { label: "Email", icon: "mail", lines: [EMAIL], href: MAILTO },
  { label: "Hours", icon: "clock", lines: HOURS },
  { label: "Reply", icon: "reply", lines: [`Within ${FACTS.replyTime}`] },
  { label: "Where", icon: "pin", lines: PLACE },
  { label: "Assistant", icon: "spark", lines: ["What the AI assistant does"], href: routes.planning },
] as const;

/**
 * The ways in, after the owner's reference: four framed cards in a row
 * under a centred title, each a mark, a name, a line and its link.
 */
export const WAYS_HEAD = {
  label: "Other ways we help",
  title: "Not ready to write yet",
  rest: "Read, ask, or have us come to you",
};

export const WAYS = [
  {
    name: "Email us",
    icon: "mail",
    line: "A question about a piece, an order or a room.",
    go: { label: EMAIL, href: MAILTO },
  },
  {
    name: "Ask the assistant",
    icon: "spark",
    line: "Log in and ask at any hour. It answers from what we sell.",
    go: { label: "Meet the assistant", href: routes.planning },
  },
  {
    name: "A home visit",
    icon: "pin",
    line: `${FACTS.visitMinutes} minutes in your room, ${sgd(FACTS.visitFee)} taken off your order.`,
    go: { label: "Book a visit", href: mailAbout("Home visit") },
  },
  {
    name: "Help centre",
    icon: "help",
    line: "Every question asked before and after ordering.",
    go: { label: "Find an answer", href: routes.help },
  },
] as const;

/**
 * What people write about, each opening an email with its subject filled
 * in; `get` is what comes back, said the same way on every tile.
 */
export const TOPICS_HEAD = {
  label: "Write to us",
  title: "What people write to us about",
  rest: "Pick the closest and your email opens with its subject written in",
};

export const TOPICS = [
  {
    name: "A piece or an order",
    line: "Sizes, finishes, an order you've placed, or a delivery.",
    get: "An answer",
    go: "Ask about a piece",
    href: mailAbout("A piece or an order"),
  },
  {
    name: "Advice on a room",
    line: "Send a photo and the size of the room, and we suggest what fits.",
    get: "Ideas for the room",
    go: "Ask about a room",
    href: mailAbout("Advice on a room"),
  },
  {
    name: "A home visit",
    line: `${FACTS.visitMinutes} minutes in your home or office: we measure and suggest pieces. ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
    get: `${FACTS.visitMinutes} minutes in your room`,
    go: "Ask for a visit",
    href: mailAbout("Home visit"),
  },
  {
    name: "An office or bulk order",
    line: "Desks, storage and separator walls for a team, priced together.",
    get: "A quote",
    go: "Ask for a quote",
    href: mailAbout("Office or bulk order"),
  },
  {
    name: "A custom size or design",
    line: "A modular piece in a size or shape the list doesn't have.",
    get: "A quote",
    go: "Ask for a quote",
    href: mailAbout("Custom size or design"),
  },
  {
    name: "Samples of the finishes",
    line: "Birch, walnut and red, to see against your walls before you order.",
    get: "Swatches to hold",
    go: "Ask for samples",
    href: mailAbout("Samples"),
  },
] as const;

/**
 * The enquiry, after the owner's three references. It asks first whether
 * it is for a home or a company, and the questions after follow that: what
 * they need, picked from a list with a line each, then where the home is,
 * or what kind of company and how large. It ends on one sentence with the
 * name and email to fill. Sending writes it into an email that opens in the
 * visitor's mail app, its subject the first need picked. No budget is asked
 * until there are prices to set one against, and no phone, as we answer by
 * email.
 */
export const ENQUIRY = {
  label: "Let's talk",
  who: {
    legend: "Is it for your home or for a company",
    options: [
      { value: "home" as const, name: "My home", line: "A room, a flat or a house" },
      { value: "company" as const, name: "A company", line: "An office, a studio or a shop" },
    ],
  },
  needs: {
    legend: "What do you need help with",
    home: [
      { name: "A piece or an order", line: "I have a question about a piece, or an order I've placed" },
      { name: "Advice on a room", line: "I want to know what fits my room" },
      { name: "A home visit", line: `I'd like you to measure and suggest, ${FACTS.visitMinutes} minutes` },
      { name: "A custom size or design", line: "I need a piece the list doesn't have" },
      { name: "Samples of the finishes", line: "I want to hold the birch, walnut and red" },
      { name: "Something else", line: "Ask us anything" },
    ],
    company: [
      { name: "An office or bulk order", line: "We need desks, storage or walls for a team" },
      { name: "Advice on a space", line: "We want to know what fits our office" },
      { name: "A visit to the office", line: "We'd like you to measure and suggest" },
      { name: "A custom size or design", line: "We need a piece the list doesn't have" },
      { name: "Samples of the finishes", line: "We want to hold the birch, walnut and red" },
      { name: "Something else", line: "Ask us anything" },
    ],
  },
  space: {
    legend: "Where is it",
    options: ["An HDB flat", "A condo", "A landed house", "Somewhere else"],
  },
  kind: {
    legend: "What kind of company are you",
    options: [
      "A startup",
      "A design studio or agency",
      "A consultancy",
      "A clinic",
      "A school",
      "A shop or café",
      "Something else",
    ],
  },
  size: {
    legend: "How large is the team",
    steps: ["1 to 10 people", "11 to 30 people", "31 to 100 people", "More than 100 people"],
  },
  found: {
    legend: "How did you find us",
    options: ["Instagram", "Google", "A friend", "Xiaohongshu", "Somewhere else"],
  },
  reach: { legend: "How do we reach you" },
  hi: "Hi, my name is",
  from: "from",
  write: "Write back to me at",
  name: "your name",
  company: "your company",
  email: "your email",
  more: {
    legend: "Anything else",
    hint: "Tell us about the room or the space, its size, who uses it, what you have now and what you have in mind",
  },
  agree: "I agree to the",
  terms: "terms",
  and: "and the",
  privacy: "privacy policy",
  send: "Send enquiry",
  /** the email written for the visitor, a line for each answer given */
  body: (lines: readonly (readonly [string, string])[]) =>
    lines
      .filter(([, v]) => v)
      .map(([k, v]) => (k ? `${k}: ${v}` : v))
      .join("\n\n"),
};

/** What happens once the email is sent. */
export const NEXT = {
  label: "After you write",
  title: "Once it's sent",
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
    icon: "clock",
    a: `Within ${FACTS.replyTime}. We read email ${HOURS.join(", ")}.`,
  },
  {
    q: "Is there a phone line or a showroom?",
    icon: "pin",
    a: `Not yet. Write to us, or log in to ask the assistant, and we come to you: a home visit is ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
  },
  {
    q: "Do you take office and bulk orders?",
    icon: "office",
    a: "Yes. Tell us the team's size and the space, and we send a quote for the pieces together.",
  },
  {
    q: "Can I change my order?",
    icon: "change",
    a: "Until it goes into production, usually within a week of ordering.",
  },
  {
    q: "Do you deliver outside Singapore?",
    icon: "truck",
    a: "Not yet. We start in Singapore and may deliver further once that works well.",
  },
] as const;

/** The closing band: what to do before writing, if seeing comes first. */
export const CONTACT_CLOSING: ClosingBand = {
  label: "Prefer to see it first",
  title: "We bring the room to you",
  line: `Ask for samples of the birch, walnut and red, or for a visit of ${FACTS.visitMinutes} minutes in your room, with ${sgd(FACTS.visitFee)} taken off your order if you buy.`,
  photo: showroom,
  calls: [
    { label: "Book a home visit", href: mailAbout("Home visit") },
    { label: "See the furniture", href: routes.collection },
  ],
};
