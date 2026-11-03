import home from "@/assets/rooms/home.jpg";
import { mailAbout } from "@/lib/contact";
import { routes } from "@/lib/routes";

/**
 * The log-in page's words, laid out as the owner's other site: a room on the
 * left with a line over it, the form on the right.
 */
export const LOG_IN = {
  photo: home,
  over: "Your rooms, in one place",
  overLine: "Your saved rooms, your orders and the assistant.",
  title: "Welcome back",
  line: "Pick up where you left off.",
  google: "Continue with Google",
  googleSoon: "Google log-in opens with accounts. Use your email for now.",
  or: "or",
  email: "Email",
  emailHint: "you@example.com",
  password: "Password",
  forgot: { label: "Forgot it?", href: mailAbout("Forgot my password") },
  go: "Log in",
  trouble: "Trouble logging in?",
  help: { label: "Email us", href: mailAbout("Logging in") },
  demo: { line: "Just looking?", go: "Try the room planner as a demo" },
  what: { line: "New here?", label: "See what an account gives you", href: routes.planning },
  back: "Back to the site",
  agree: ["By logging in you agree to our", "and", "."],
};

/** The way out, a line under the room planner's placeholder. */
export const LOG_OUT = { line: "Done for now?", go: "Log out" };
