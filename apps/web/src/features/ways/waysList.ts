import kitchen from "@/assets/rooms/kitchen.jpg";
import sewing from "@/assets/details/sewing.jpg";
import study from "@/assets/rooms/study.jpg";
import { EVA } from "@/features/planning/planningList";
import { sgd } from "@/lib/money";
import { routes } from "@/lib/routes";
import { FACTS } from "@/lib/site";

/**
 * The three ways we help a visitor choose, after the owner's reference:
 * a home visit, samples by post, or planning the room with Eva. Each card
 * has two ways on, each with its mark; Eva's second is the demo, which is
 * a form, not a link.
 */
export const WAYS_HEAD = { id: "ways-title", title: "Shop how you like. We'll help." };

export const WAYS = [
  {
    title: "Book a home visit",
    line: `${FACTS.visitMinutes} minutes in your room: we measure and suggest pieces. ${sgd(FACTS.visitFee)}, taken off your order.`,
    photo: kitchen,
    go: [
      { label: "Book a visit", href: routes.contact, icon: "home" },
      { label: "How visits work", href: routes.help, icon: "help" },
    ],
  },
  {
    title: "Order samples",
    line: "Hold the birch, walnut and red before you choose. We post them to you.",
    photo: sewing,
    go: [
      { label: "Order samples", href: routes.contact, icon: "mail" },
      { label: "See the finishes", href: `${routes.modular}#swatches-title`, icon: "spark" },
    ],
  },
  {
    title: "Plan with Eva",
    line: "Draw your room and Eva suggests what fits, from what we sell.",
    photo: study,
    go: [{ label: EVA.start.label, href: EVA.start.href, icon: "change" }],
    demo: { label: "Try the demo", icon: "box" },
  },
] as const;
