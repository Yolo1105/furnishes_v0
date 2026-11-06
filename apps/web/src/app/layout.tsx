import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Jost, Sora } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

/* The three families: Sora for the text, Instrument Sans for the banner's
   capitals, Jost for the logo. globals.css names their jobs (--font-text,
   --font-banner, --font-logo), so swapping one is one edit there. */
const sora = Sora({ subsets: ["latin"], weight: "variable", variable: "--font-sora" });
const instrument = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-instrument" });
const jost = Jost({ subsets: ["latin"], weight: "variable", variable: "--font-jost" });

/* The bar and the footer arrive in the next steps of Milestone 0. */
export const metadata: Metadata = { title: "Furnishes" };

export const viewport: Viewport = {
  // the paper token in globals.css, which metadata cannot read
  themeColor: "#f8ebcb",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${instrument.variable} ${jost.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
