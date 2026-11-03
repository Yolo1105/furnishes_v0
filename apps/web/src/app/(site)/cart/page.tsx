import type { Metadata } from "next";
import { CartView } from "@/features/cart/CartView";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = { title: "Your cart", robots: { index: false } };

/** The cart: what is chosen, and the total. */
export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <CartView />
      </main>
    </>
  );
}
