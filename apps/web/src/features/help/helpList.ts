import chair from "@/assets/details/yellow-chair.jpg";
import { ARRIVALS, CUSTOM, FINISHES, FURNITURE_WEEKS, inWeeks } from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";
import { FACTS } from "@/lib/site";

/**
 * Every question in one place, by topic, after the rebuild's help page,
 * answered from v0's own facts so no page says a second thing. Where the
 * owner hasn't settled an answer (weight limits, warranty, parts sold
 * alone), it says so rather than promise.
 */
export const HELP = {
  label: "Help",
  title: "Questions, answered",
  rest: "Choosing a piece, ordering it, and living with it once it's home.",
  lines: ["Not here? Email us and a person replies.", "Measuring first? The buying guide has the steps."],
  guide: "Read the buying guide",
  photo: chair,
  search: "Search the questions",
  searchHint: "Finishes, sizes, returns",
  /** said when nothing matches, before the email */
  none: "Nothing matches that. Email us at",
};

const finishes = FINISHES.map((f) => f.name.toLowerCase()).join(", ");

export const HELP_GROUPS = [
  {
    label: "Choosing",
    title: "Choosing a piece",
    questions: [
      {
        q: "What do you sell?",
        a: "Ready-made furniture, modular pieces we have designed, and modular pieces made to your size. All are made by our partner factory in China and delivered in Singapore.",
      },
      {
        q: "Are the pictures real photographs?",
        a: "The room photos show ideas, not our furniture. What you get is the list on a piece's page; lamps, books and plants aren't included.",
      },
      {
        q: "What finishes can I choose?",
        a: `Modular pieces come in ${finishes}. Ready-made pieces list their own. Ask for samples to see them first.`,
      },
      {
        q: "Will it work with furniture I already have?",
        a: "Yes. Our pieces stand beside your own desk, bed or cabinet; they don't fix to them.",
      },
      {
        q: "Can a bedside block go beside the sofa?",
        a: "It can, but check the height first. A good height by a bed may sit low against a sofa arm.",
      },
      {
        q: "Can I have it opening to the left or the right?",
        a: "It depends on the piece, so ask us about the one you want before you order.",
      },
      {
        q: "I rent. Will it work?",
        a: "Yes, most pieces stand on their own and come apart to move. Check your landlord's rules before fixing anything to a wall.",
      },
    ],
  },
  {
    label: "Ordering",
    title: "Ordering and delivery",
    questions: [
      {
        q: "How long does it take?",
        a: `Modular pieces take ${ARRIVALS.parts.weeks} in parts and ${ARRIVALS.built.weeks} built. Ready-made pieces take ${FURNITURE_WEEKS}.`,
      },
      {
        q: "Can I change the size?",
        a: `Yes, on modular pieces: choose "Your size" and type your space. It costs about ${CUSTOM.markup * 100}% more and takes ${inWeeks(CUSTOM.extra)} longer; we confirm the price by email before you pay.`,
      },
      {
        q: "Does it come built?",
        a: "Modular pieces arrive built and carried in, or in parts with their steps. You choose before you order.",
      },
      {
        q: "How do I pay?",
        a: "Check out sends us your order by email. We confirm it and reply with a link to pay; nothing is charged on the site.",
      },
      {
        q: "Do you ship outside Singapore?",
        a: "Not for now. Write to us and we tell you if that changes.",
      },
      {
        q: "Can I buy for an office?",
        a: "Yes. Tell us the team's size and the space, and we send one quote for the pieces together.",
      },
    ],
  },
  {
    label: "Living with it",
    title: "Once it's home",
    questions: [
      {
        q: "Can I return it?",
        a: `Ready-made pieces within ${FACTS.returnDays} days, unused and in their boxes. Pieces made to your size only if they are faulty or damaged.`,
      },
      {
        q: "What if a part breaks or goes missing?",
        a: "Email us your order number and a photo. Whether a part can be sent alone is still being settled, so we tell you case by case.",
      },
      {
        q: "Can I add to it later?",
        a: "Often, yes: an add-on can go on a piece that takes it. Bigger changes we check against the piece you have.",
      },
      {
        q: "Will new parts match the ones I have?",
        a: "They fit the same, but colour and grain can differ between batches, and older parts change with use and sun.",
      },
      {
        q: "Do I have to drill into the wall?",
        a: "It depends on the piece. Tall pieces may need fixing to the wall, so we don't promise no drilling.",
      },
      {
        q: "Will a room divider block sound?",
        a: "No. It hides a corner from view and stores on both sides, but it isn't soundproofing.",
      },
      {
        q: "Is it made for children?",
        a: "We don't claim any piece is safe for children to climb, even a low one. Keep children off it, and fix tall pieces as their steps say.",
      },
      {
        q: "Can someone look at my room first?",
        a: `Yes: a home visit is ${FACTS.visitMinutes} minutes and ${sgd(FACTS.visitFee)}, taken off your order if you buy.`,
      },
    ],
  },
] as const;
