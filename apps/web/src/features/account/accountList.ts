import lounge from "@/assets/banner/lounge.jpg";
import { mailAbout } from "@/lib/contact";

/**
 * The log-in page's words, laid out as the owner's other site: a room on the
 * left with a line over it, the form on the right.
 */
export const LOG_IN = {
  photo: lounge,
  over: "Your rooms, kept for you",
  overLine: "Log in to keep your rooms, your orders and the assistant in one place.",
  label: "Log in",
  title: "Welcome back",
  line: "Log in to pick up where you left off.",
  email: "Email",
  password: "Password",
  go: "Log in",
  trouble: "Trouble logging in?",
  help: { label: "Email us", href: mailAbout("Logging in") },
};

/** The placeholder shown once logged in, until the room planner opens. */
export const LOG_OUT = "Log out";
