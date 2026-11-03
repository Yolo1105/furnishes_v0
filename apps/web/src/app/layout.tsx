import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Jost } from "next/font/google";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import "./globals.css";

const instrument = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-instrument" });
const jost = Jost({ subsets: ["latin"], weight: "variable", variable: "--font-jost" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
};

export const viewport: Viewport = {
  // the paper token in globals.css, which metadata cannot read
  themeColor: "#f8ebcb",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${jost.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
