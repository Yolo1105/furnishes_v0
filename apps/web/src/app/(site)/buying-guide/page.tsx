import type { Metadata } from "next";
import styles from "@/features/collection/Collection.module.css";
import { Guide } from "@/features/guide/Guide";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Buying guide",
  description:
    "What to measure, what usually fits an HDB flat, what an order holds, delivery, returns, care and samples.",
};

/** The buying guide: what to know before ordering, in one page. */
export default function BuyingGuidePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <Guide />
      </main>
    </>
  );
}
