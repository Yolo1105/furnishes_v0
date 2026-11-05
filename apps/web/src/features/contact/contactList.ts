import orangeRoom from "@/assets/banner/orange-room.jpg";
import yellowChair from "@/assets/details/yellow-chair.jpg";
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
 * What people write about, each opening an email with its subject filled
 * in; `go` says what the box does.
 */
/**
 * Where we are, after the owner's map reference. There is no showroom or
 * address, so the map is Singapore itself, the area we visit, and the card
 * on it says so rather than giving a street.
 */
export const WHERE = {
  id: "where-title",
  label: "Where we are",
  title: "We come to you",
  rest: "There's no showroom yet. We visit homes and offices across Singapore, and our partner factory makes each piece after you order.",
  card: { name: "Furnishes", place: "Singapore", lines: ["No showroom yet", "We come to your home or office"] },
  map: "A map of Singapore, the whole island marked as where we visit",
  places: [
    {
      icon: "pin" as const,
      name: "Across Singapore",
      line: `Home and office visits by appointment, ${HOURS.join(", ")}`,
    },
    { icon: "office" as const, name: "Made in China", line: "By our partner factory, then shipped to Singapore" },
  ],
};

/**
 * The ways to help, after the owner's reference: three boxes, each a mark,
 * a name, a line and a button to where that help is.
 */
export const HELP_HEAD = {
  label: "Contact",
  title: "We're here to help",
  rest: "Find an answer yourself, write to us about an order, or talk to us about an office",
};

export const HELP_WAYS = [
  {
    icon: "help" as const,
    name: "Help centre",
    line: "Quick answers on finishes, sizes, delivery and returns.",
    go: { label: "Open the help centre", href: routes.help },
  },
  {
    icon: "headset" as const,
    name: "Support",
    line: `Ask about a piece or an order you've placed. We answer within ${FACTS.replyTime}, and Eva answers once you log in.`,
    go: { label: "Email support", href: mailAbout("Support") },
  },
  {
    icon: "office" as const,
    name: "Offices",
    line: "Desks, storage and walls for a team, quoted together.",
    go: { label: "See office furniture", href: routes.offices },
  },
];

export const TOPICS_HEAD = {
  label: "Write to us",
  title: "What people write to us about",
  note: `Pick the closest and the enquiry above fills itself in. We reply by email within ${FACTS.replyTime}.`,
  go: "Write to us",
};

/**
 * Who writes, as two cards, after the owner's reference: a blurred room
 * behind each (warm ones, so the blur keeps colour), its name and line, and the needs the enquiry lists for it as
 * tags. Each tag opens the enquiry with that one picked, so the needs are
 * written once, in ENQUIRY below.
 */
export const TOPICS = [
  {
    who: "home",
    title: "For your home",
    line: "A room, a flat or a house. Tell us what it needs and we suggest what fits.",
    photo: orangeRoom,
  },
  {
    who: "company",
    title: "For a company",
    line: "An office, a studio or a shop. Desks, storage and walls for a team, quoted together.",
    photo: yellowChair,
  },
] as const;

/** the link that opens the enquiry with a need picked, read back by the enquiry */
export const askHref = (who: string, need: string) => `#ask=${who}:${encodeURIComponent(need)}`;
export const ASK = /^#ask=(home|company):(.+)$/;

/**
 * The enquiry, after the owner's three references. It asks first whether
 * it is for a home or a company, and the questions after follow that: what
 * they need, picked from a list with a line each, then where the home is,
 * or what kind of company and how large. It ends on two lines with the
 * name and email to fill. Sending writes it into an email that opens in the
 * visitor's mail app, its subject the first need picked. No budget is asked
 * until there are prices to set one against, and no phone, as we answer by
 * email.
 */
export const ENQUIRY = {
  label: "Let's talk",
  /** the email's subject when no need is picked */
  subject: "Enquiry",
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
