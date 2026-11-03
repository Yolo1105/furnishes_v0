import study from "@/assets/rooms/study.jpg";
import { ENQUIRY } from "@/features/contact/contactList";
import { routes } from "@/lib/routes";

export type Who = (typeof ENQUIRY.who.options)[number]["value"];

type Choice = { value: string; name: string; line?: string };

/** One question a screen: one answer, or `many`. */
export type Ask = { id: string; title: string; line: string; many?: boolean; options: readonly Choice[] };

const plain = (names: readonly string[]): Choice[] => names.map((name) => ({ value: name, name }));

/**
 * The questions a new account answers once, after its first log-in: who it
 * is for, the space, what they're after, the finish they lean to and when.
 * Home and office share the first and the last two; the middle two follow
 * the first answer. The space and team sizes are the enquiry's, so the two
 * forms ask alike.
 */
export function asks(who: Who): Ask[] {
  return [
    {
      id: "who",
      title: "Who are you furnishing for",
      line: "A home and an office get a few different questions.",
      options: ENQUIRY.who.options,
    },
    who === "home"
      ? {
          id: "space",
          title: "What kind of home is it",
          line: "So we know the rooms and their sizes.",
          options: plain(ENQUIRY.space.options),
        }
      : {
          id: "size",
          title: "How large is the team",
          line: "Today, and the size it may grow to this year.",
          options: plain(ENQUIRY.size.steps),
        },
    {
      id: "looking",
      title: "What are you looking for",
      line: "Pick as many as fit.",
      many: true,
      options:
        who === "home"
          ? [
              { value: "home", name: "A whole home", line: "Moving in, or starting again after a renovation" },
              { value: "room", name: "One room", line: "A bedroom, a study or a living room to set up" },
              { value: "storage", name: "More storage", line: "Shelves and cabinets for what you own" },
              { value: "piece", name: "One piece", line: "A sofa, a table or a bed you have in mind" },
              { value: "ideas", name: "Ideas first", line: "Not sure yet, show me what works" },
            ]
          : [
              { value: "office", name: "A new office", line: "Moving in, or fitting out an empty space" },
              { value: "desks", name: "Desks and seating", line: "For the whole team, or for new people" },
              { value: "storage", name: "Storage", line: "Shelves and cabinets the team shares" },
              { value: "walls", name: "Separator walls", line: "Parting a room without building work" },
              { value: "ideas", name: "Ideas first", line: "Not sure yet, show me what works" },
            ],
    },
    {
      id: "finish",
      title: "Which finish do you lean to",
      line: "It sets which pieces we show you first. Ask for samples if you'd like to hold them.",
      options: [
        { value: "birch", name: "Birch", line: "Light and pale" },
        { value: "walnut", name: "Walnut", line: "Warm and dark" },
        { value: "red", name: "Red", line: "Our own colour" },
        { value: "unsure", name: "Not sure yet", line: "Show me all three" },
      ],
    },
    {
      id: "when",
      title: "When do you need it",
      line: "So we know whether to hurry.",
      options: plain(["Within a month", "In one to three months", "Later this year", "Just looking for now"]),
    },
  ];
}

/**
 * What each "looking for" answer points to among our pieces: the rooms a
 * piece is made for, its kind, or a separator wall. "Ideas first" and a
 * whole home or office point to nothing narrower, so every piece stays in.
 */
export const LOOKS_FOR: Record<string, { rooms?: readonly string[]; kinds?: readonly string[]; wall?: boolean }> = {
  room: { rooms: ["Bedroom", "Living room", "Study"] },
  storage: { kinds: ["Storage"] },
  piece: { kinds: ["Sofas", "Tables", "Desks", "Chairs"] },
  desks: { kinds: ["Desks", "Chairs", "Work"] },
  walls: { wall: true },
};

/** The welcome's words around the questions, laid out as the log-in page. */
export const WELCOME = {
  photo: study,
  over: "A few questions first",
  overLine: "So Eva and our team start from your home rather than from nothing. It takes a minute.",
  step: (n: number, of: number) => `Question ${n} of ${of}`,
  back: "Back",
  next: "Continue",
  skip: "Skip for now",
  done: {
    title: "Thanks, that's all",
    line: "This is kept in this browser for now. You can answer again from your account later.",
    go: { label: "Start the room planner", next: routes.designYourRoom },
    on: "Go on to the site",
    none: "Nothing picked",
  },
  /** the way back to the questions, from a page that uses the answers */
  again: "Answer again",
  /** the welcome's words around its answers on other pages */
  told: { title: "From your answers", none: "Answer a few questions and we show what suits you first." },
  /** where the answers are kept in this browser until accounts store them */
  key: "furnishes-profile",
};
