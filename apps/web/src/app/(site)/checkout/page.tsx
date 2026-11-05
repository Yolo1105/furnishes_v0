import type { Metadata } from "next";
import { Checkout } from "@/features/checkout/Checkout";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = { title: "Check out", robots: { index: false } };

/** Checkout: the delivery details and the order, sent to us by email until payment opens. */
export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Sora, as on the other pages, with Before/After while the owner decides */}
        <TypeTrial page="checkout" compare>
          <Checkout />
        </TypeTrial>
      </main>
    </>
  );
}
