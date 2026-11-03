import type { StaticImageData } from "next/image";
import orangeRoom from "@/assets/banner/orange-room.jpg";
import study from "@/assets/rooms/study.jpg";
import { mailAbout, MAILTO } from "@/lib/contact";
import { routes } from "@/lib/routes";

/**
 * Pages the bar links to whose tools aren't built yet: the 3D room planner
 * waits on the owner's 3D work, and logging in waits on a choice of how
 * accounts work. Each says what is coming and the ways in that work today.
 */
export type SoonPage = {
  label: string;
  title: string;
  rest: string;
  line: string;
  photo: StaticImageData;
  ways: readonly { label: string; href: string }[];
};

export const DESIGN_SOON: SoonPage = {
  label: "Opening soon",
  title: "Design your room",
  rest: "See it before you order",
  line: "Draw your room in 3D, place our pieces, set each one's size and finish, and see it before you order. Until it opens, we can plan it with you.",
  photo: orangeRoom,
  ways: [
    { label: "Book a home visit", href: routes.contact },
    { label: "Find your piece", href: routes.quiz },
    { label: "Tell me when it opens", href: mailAbout("Room planner") },
  ],
};

export const LOG_IN_SOON: SoonPage = {
  label: "Opening soon",
  title: "Log in",
  rest: "Your rooms, orders and the assistant",
  line: "Accounts open with the room planner: your saved rooms, your orders, and the AI assistant to answer questions. Until then, write to us and we answer by email.",
  photo: study,
  ways: [
    { label: "Email us", href: MAILTO },
    { label: "See your cart", href: routes.cart },
    { label: "Tell me when it opens", href: mailAbout("Accounts") },
  ],
};
