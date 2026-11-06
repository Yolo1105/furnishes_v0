import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Jost, Sora } from "next/font/google";
import type { ReactNode } from "react";
import { BRAND } from "@/lib/brand";
import { SITE } from "@/lib/site";
import "./globals.css";

/* The three families: Sora for the text, Instrument Sans for the banner's
   capitals, Jost for the logo. globals.css names their jobs (--font-text,
   --font-banner, --font-logo), so swapping one is one edit there. */
const sora = Sora({ subsets: ["latin"], weight: "variable", variable: "--font-sora" });
const instrument = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-instrument" });
const jost = Jost({ subsets: ["latin"], weight: "variable", variable: "--font-jost" });

/* Every page's name ends with the site's ("Low cabinet · Furnishes"); a
   page with no name of its own shows the site's alone. Shared links show
   the site's name, its one line and the preview image (opengraph-image). */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: "website", siteName: SITE.name, locale: "en_SG" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: BRAND.paper };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-SG" className={`${sora.variable} ${instrument.variable} ${jost.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
