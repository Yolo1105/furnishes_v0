import type { Metadata } from "next";
import { MakingDays, Manifesto, Story, Team, WhoWeAre, Workshop } from "@/features/about/About";
import { ABOUT_CLOSING, ABOUT_QUESTIONS } from "@/features/about/aboutList";
import { Closing } from "@/features/collection/Closing";
import { Questions } from "@/features/collection/Questions";
import { Visit } from "@/features/collection/Visit";
import styles from "@/features/collection/Collection.module.css";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Who Furnishes is, where the furniture is made, and how it reaches your home in Singapore.",
};

/**
 * About: who we are, what we believe and four figures, our story, the
 * factory that makes the pieces, the five steps from order to your home and
 * the team, then questions and the home visit, as the collection's pages
 * end, and a closing band across the page. The story's start and the team's other names are placeholders until
 * the owner sends them; recognition waits for something to show.
 */
export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <WhoWeAre />
        <Manifesto />
        <Story />
        <Workshop />
        <MakingDays />
        <Team />
        {/* Recognition comes back here once there is an award or article to show. */}
        <Questions questions={ABOUT_QUESTIONS} />
        <Visit />
        <Closing band={ABOUT_CLOSING} />
      </main>
    </>
  );
}
