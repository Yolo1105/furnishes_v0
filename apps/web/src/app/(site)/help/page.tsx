import type { Metadata } from "next";
import styles from "@/features/collection/Collection.module.css";
import { HelpCentre } from "@/features/help/HelpCentre";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Every question asked before and after ordering: choosing, sizes, delivery, paying, returns and living with it.",
};

/** Help: a room beside the title and a search, then every question by topic, two topics across. */
export default function HelpPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <HelpCentre />
      </main>
    </>
  );
}
