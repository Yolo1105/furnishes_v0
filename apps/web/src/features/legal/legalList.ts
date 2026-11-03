import { ARRIVALS, FURNITURE_WEEKS } from "@/features/catalog/catalog";
import { EMAIL } from "@/lib/contact";

/**
 * The three legal pages' words: drafts written from what the rest of the
 * site already promises, for a lawyer to check before launch. What the
 * business has still to decide is in [brackets], as elsewhere on the site.
 */
export type LegalPage = {
  title: string;
  lead: string;
  sections: readonly { name: string; lines: readonly string[] }[];
};

export const UPDATED = "Last updated 2 November 2026. A draft, to be checked before launch.";

export const TERMS: LegalPage = {
  title: "Terms and conditions",
  lead: "The terms on which Furnishes sells furniture and home visits through this site.",
  sections: [
    {
      name: "Who we are",
      lines: [
        `Furnishes Pte. Ltd., a company registered in Singapore [UEN and registered address]. You can reach us at ${EMAIL}.`,
      ],
    },
    {
      name: "Orders and prices",
      lines: [
        "Prices are in Singapore dollars [and include GST, or not]. An order is accepted when we confirm it by email.",
        "If a price on the site is wrong, we tell you before your order is made, and you can change or cancel it.",
      ],
    },
    {
      name: "Making and delivery",
      lines: [
        `Pieces are made by our partner factory in China after you order. Ready-made furniture takes ${FURNITURE_WEEKS}; modular pieces take ${ARRIVALS.parts.weeks} in parts and ${ARRIVALS.built.weeks} built.`,
        "We deliver in Singapore only, at a time agreed with you. These are estimates; we tell you by email if a date moves.",
      ],
    },
    {
      name: "Pieces in parts",
      lines: [
        "Pieces that arrive in parts come with their steps. Put them together as the steps say; taller pieces may need fixing to the wall.",
      ],
    },
    {
      name: "Home visits",
      lines: [
        "A home visit is 60 minutes and costs S$120, taken off your order if you buy within [period]. [Rescheduling and cancelling a visit.]",
      ],
    },
    {
      name: "Returns and faults",
      lines: ["Returns follow our refund policy. Nothing in these terms takes away your rights under Singapore law."],
    },
    {
      name: "Law",
      lines: ["These terms are governed by the laws of Singapore."],
    },
  ],
};

export const PRIVACY: LegalPage = {
  title: "Privacy policy",
  lead: "What we collect about you, why, and what you can ask of us, under Singapore's Personal Data Protection Act.",
  sections: [
    {
      name: "What we collect",
      lines: [
        "Your name, email, phone number and delivery address when you order or book a visit.",
        "Your room's measurements and plans when you use the room planner or book a visit.",
        "Your account and the questions you ask the assistant, once you log in.",
        "Your region and language choice, kept in your own browser.",
      ],
    },
    {
      name: "Why",
      lines: [
        "To make, deliver and support your order, to arrange visits, and to answer your questions. We don't sell your data.",
      ],
    },
    {
      name: "Who sees it",
      lines: [
        "Our partner factory, for what it needs to make your piece; our delivery partner, for your address; and our payment provider [name], for payment.",
      ],
    },
    {
      name: "How long we keep it",
      lines: ["As long as needed for your order and its warranty, then [period], unless the law asks for longer."],
    },
    {
      name: "What you can ask",
      lines: [
        `To see the data we hold about you, to correct it, or to withdraw your consent. Write to ${EMAIL}; our data protection officer is [name].`,
      ],
    },
  ],
};

export const REFUND: LegalPage = {
  title: "Refund policy",
  lead: "When you can return a piece, and how a refund is made.",
  sections: [
    {
      name: "Ready-made furniture",
      lines: ["You can return it within 14 days of delivery, unused and in its boxes. [Who pays to collect it.]"],
    },
    {
      name: "Modular pieces",
      lines: [
        "These are made to your size and finish, so they can be returned only if they arrive faulty, damaged or not as ordered.",
      ],
    },
    {
      name: "Faulty or damaged",
      lines: [
        `Email ${EMAIL} within [days] of delivery with your order number and photos. We repair, replace or refund it, as you prefer.`,
      ],
    },
    {
      name: "How refunds are made",
      lines: ["To the way you paid, within [days] of the piece reaching us, or of our agreeing that it is faulty."],
    },
    {
      name: "Home visits",
      lines: ["[Whether a visit fee is refunded if the visit is cancelled.]"],
    },
  ],
};
