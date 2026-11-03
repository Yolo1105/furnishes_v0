import type { Metadata } from "next";
import styles from "@/features/collection/Collection.module.css";
import Link from "next/link";
import { Opening } from "@/features/collection/Opening";
import { Questions } from "@/features/collection/Questions";
import { HELP, HELP_GROUPS } from "@/features/help/helpList";
import { routes } from "@/lib/routes";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Every question asked before and after ordering: choosing, sizes, delivery, paying, returns and living with it.",
};

/** Help: the opening, then every question by topic, each as the site's question list; the way to ask something else only once. */
export default function HelpPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <Opening label={HELP.label} title={HELP.title} photos={[]} rest={HELP.rest} lines={HELP.lines}>
          <Link className={styles.outline} href={routes.buyingGuide}>
            {HELP.guide}
          </Link>
        </Opening>
        {HELP_GROUPS.map((g, i) => (
          <Questions key={g.label} questions={g.questions} label={g.label} title={g.title} rest="" ask={i === 0} />
        ))}
      </main>
    </>
  );
}
