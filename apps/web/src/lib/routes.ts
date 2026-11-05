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
  welcome: "/welcome",
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
 * The footer's links, after the owner's reference: groups under a heading
 * in capitals, then single pages standing alone in capitals, then the
 * small print.
 */
export const FOOT_GROUPS = [
  [
    {
      label: "Shop",
      links: [
        { href: routes.collection, label: "The collection" },
        { href: routes.furniture, label: "Ready-made" },
        { href: routes.modular, label: "Modular" },
      ],
    },
    { label: "For offices", href: routes.offices, links: [] },
  ],
  [
    {
      label: "Ideas",
      links: [
        { href: routes.inspiration, label: "Inspiration" },
        { href: routes.quiz, label: "Quiz" },
        { href: routes.planning, label: "Planning help" },
      ],
    },
    {
      label: "Who we are",
      links: [
        { href: routes.about, label: "About us" },
        { href: routes.contact, label: "Contact" },
      ],
    },
  ],
] as const;

export const FOOT_SINGLES = [
  { href: routes.buyingGuide, label: "Buying guide" },
  { href: routes.help, label: "Help" },
  { href: routes.designYourRoom, label: "Design your room" },
] as const;

export const LEGAL = [
  { href: routes.terms, label: "Terms and conditions" },
  { href: routes.privacy, label: "Privacy policy" },
  { href: routes.refund, label: "Refund policy" },
] as const;
