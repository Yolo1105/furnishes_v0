import type { Metadata } from "next";
import { CartView } from "@/features/cart/CartView";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = { title: "Your cart", robots: { index: false } };

/** The cart: what is chosen, and the total. */
export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Sora, as on the other pages, on the owner's word */}
        <TypeTrial page="cart">
          <CartView />
        </TypeTrial>
      </main>
    </>
  );
}
