import type { Metadata } from "next";
import { Checkout } from "@/features/checkout/Checkout";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = { title: "Check out", robots: { index: false } };

/** Checkout: the delivery details and the order, sent to us by email until payment opens. */
export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Checkout />
      </main>
    </>
  );
}
