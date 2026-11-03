/**
 * Every address the site links to, in one place. Pages not built yet point
 * where they will live, so a link only changes here.
 */
export const routes = {
  home: "/",
  collection: "/collection",
  furniture: "/collection/furniture",
  modular: "/collection/modular",
  inspiration: "/inspiration",
  quiz: "/quiz",
  /* About is a part of the home page, not a page of its own */
  about: "/#about",
  contact: "/contact",
  buyingGuide: "/buying-guide",
  offices: "/offices",
  planning: "/planning",
  help: "/help",
  designYourRoom: "/design",
  logIn: "/log-in",
  cart: "/cart",
  checkout: "/checkout",
  products: "/products",
  terms: "/terms",
  privacy: "/privacy-policy",
  refund: "/refund-policy",
} as const;

/** One piece's page. */
export const pieceOf = (slug: string) => `${routes.products}/${slug}`;

/** A line's own page, or the offices'; otherwise the list, narrowed to the separator walls or to homes. */
export const lineOf = (line: "furniture" | "modular" | "walls" | "homes" | "offices") =>
  line === "furniture" || line === "modular" || line === "offices" ? routes[line] : `${routes.products}?line=${line}`;

/** The pages a visitor browses, in the bar's order and the footer's. */
export const BROWSE = [
  { href: routes.collection, label: "Collection" },
  { href: routes.inspiration, label: "Inspiration" },
  { href: routes.quiz, label: "Quiz" },
] as const;

/**
 * The footer's pages: the bar's, then About (a part of the home page, so the
 * bar leaves it out), the offices, planning help, the guide and help.
 */
export const FOOT_PAGES = [
  ...BROWSE,
  { href: routes.about, label: "About" },
  { href: routes.offices, label: "For offices" },
  { href: routes.planning, label: "Planning help" },
  { href: routes.buyingGuide, label: "Buying guide" },
  { href: routes.help, label: "Help" },
] as const;

export const LEGAL = [
  { href: routes.terms, label: "Terms and conditions" },
  { href: routes.privacy, label: "Privacy policy" },
  { href: routes.refund, label: "Refund policy" },
] as const;
