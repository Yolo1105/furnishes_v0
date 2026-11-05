import type { Metadata } from "next";
import styles from "@/features/collection/Collection.module.css";
import { Planning } from "@/features/planning/Planning";
import { TypeTrial } from "@/features/trial/TypeTrial";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Planning help",
  description: "Eva, our AI assistant, and a 3D room planner: what they do, and what needs an account.",
};

/** Planning help: Eva and the room planner explained before logging in. */
export default function PlanningPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        {/* Sora, as on the other pages, on the owner's word */}
        <TypeTrial page="planning">
          <Planning />
        </TypeTrial>
      </main>
    </>
  );
}
