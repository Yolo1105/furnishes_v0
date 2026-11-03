import type { Metadata } from "next";
import styles from "@/features/collection/Collection.module.css";
import { Soon } from "@/features/soon/Soon";
import { DESIGN_SOON } from "@/features/soon/soonList";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Design your room",
  description: "Plan your room in 3D with our pieces; opening soon.",
};

/** Design your room: what it will do once it opens, and the ways in that work today. */
export default function DesignPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <Soon page={DESIGN_SOON} />
      </main>
    </>
  );
}
