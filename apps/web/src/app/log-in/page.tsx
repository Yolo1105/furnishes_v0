import type { Metadata } from "next";
import styles from "@/features/collection/Collection.module.css";
import { Soon } from "@/features/soon/Soon";
import { LOG_IN_SOON } from "@/features/soon/soonList";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Log in",
  description: "Your rooms, orders and the assistant; opening soon.",
  robots: { index: false },
};

/** Log in: what it will do once it opens, and the ways in that work today. */
export default function LogInPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <Soon page={LOG_IN_SOON} />
      </main>
    </>
  );
}
