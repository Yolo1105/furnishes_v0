/**
 * Every address the site links to, in one place. Pages not built yet point
 * where they will live, so a link only changes here.
 */
export const routes = {
  home: "/",
  collection: "/collection",
  inspiration: "/inspiration",
  quiz: "/quiz",
  contact: "/contact",
  designYourRoom: "/design",
  logIn: "/log-in",
  products: "/products",
} as const;

/** One piece's page. */
export const pieceOf = (slug: string) => `${routes.products}/${slug}`;

/** The pages a visitor browses, in the bar's order. */
export const BROWSE = [
  { href: routes.collection, label: "Collection" },
  { href: routes.inspiration, label: "Inspiration" },
  { href: routes.quiz, label: "Quiz" },
] as const;
