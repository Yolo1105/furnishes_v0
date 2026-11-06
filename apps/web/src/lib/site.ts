/** The site's name and address, and the one line that says what Furnishes is. */
export const SITE = {
  name: "Furnishes",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://furnish-es.com",
  description: "Ready-made and modular furniture for Singapore homes, cut to fit and delivered built or flat-packed.",
} as const;
