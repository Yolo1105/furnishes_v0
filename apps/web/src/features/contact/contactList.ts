import kitchen from "@/assets/rooms/kitchen.jpg";
import { HOURS, mailAbout, MAILTO, PLACE } from "@/lib/contact";
import { routes } from "@/lib/routes";

/**
 * The contact page's words. We answer by email and, once you log in, by the
 * AI assistant; there is no phone line or showroom, on the owner's word. The
 * visit's fee is the home visit band's.
 */
export const CONTACT = {
  label: "Contact",
  title: "Write to us, or we come to you",
  rest: "Email, a home visit, or the assistant once you log in",
  photo: kitchen,
};

export const WAYS = [
  {
    name: "Email us",
    line: "Questions about a piece, an order or a delivery. We answer on working days.",
    go: { label: "Write an email", href: MAILTO },
  },
  {
    name: "Book a home visit",
    line: "60 minutes in your home or office: we measure and suggest pieces. S$120, taken off your order if you buy.",
    go: { label: "Ask for a visit", href: mailAbout("Home visit") },
  },
  {
    name: "Ask for samples",
    line: "Birch, walnut and red, to see against your walls before you order.",
    go: { label: "Ask for samples", href: mailAbout("Samples") },
  },
  {
    name: "Ask the assistant",
    line: "Log in and the AI assistant answers questions about sizes, finishes and delivery.",
    go: { label: "Log in", href: routes.logIn },
  },
] as const;

/** Where and when, from the site's contact facts. */
export const WHEN = [
  { label: "Hours", lines: HOURS },
  { label: "Where", lines: PLACE },
] as const;
