/** The site's name and address, and the one line that says what Furnishes is. */
export const SITE = {
  name: "Furnishes",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://furnish-es.com",
  description: "Ready-made and modular furniture for Singapore homes, cut to fit and delivered built or flat-packed.",
} as const;

/**
 * Facts the site states in many places, each set once here: the home
 * visit's length (minutes) and fee (SGD), the days a ready-made piece can
 * be returned in, the modular boards' thickness, and how soon an email is
 * answered. All are the owner's placeholders until confirmed.
 */
export const FACTS = {
  visitMinutes: 60,
  visitFee: 120,
  returnDays: 14,
  board: "18 mm",
  replyTime: "one working day",
} as const;
