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
  about: "/about",
  contact: "/contact",
  buyingGuide: "/buying-guide",
  designYourRoom: "/design",
  logIn: "/log-in",
  cart: "/cart",
  products: "/products",
  terms: "/terms",
  privacy: "/privacy-policy",
  refund: "/refund-policy",
} as const;

/** One piece's page. */
export const pieceOf = (slug: string) => `${routes.products}/${slug}`;

/** A line's own page; otherwise the list, narrowed to the separator walls or to rooms. */
export const lineOf = (line: "furniture" | "modular" | "walls" | "homes" | "offices") =>
  line === "furniture" || line === "modular" ? routes[line] : `${routes.products}?line=${line}`;

/** The pages a visitor browses, in the bar's order and the footer's. */
export const BROWSE = [
  { href: routes.collection, label: "Collection" },
  { href: routes.inspiration, label: "Inspiration" },
  { href: routes.quiz, label: "Quiz" },
  { href: routes.about, label: "About" },
] as const;

/** The footer's pages: the bar's, then the guide, which the bar leaves out. */
export const FOOT_PAGES = [...BROWSE, { href: routes.buyingGuide, label: "Buying guide" }] as const;

export const LEGAL = [
  { href: routes.terms, label: "Terms and conditions" },
  { href: routes.privacy, label: "Privacy policy" },
  { href: routes.refund, label: "Refund policy" },
] as const;
