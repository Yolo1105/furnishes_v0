import type { Metadata } from "next";
import { MakingDays, Manifesto, Recognition, Story, Team, WhoWeAre, Workshop } from "@/features/about/About";
import { ABOUT_QUESTIONS } from "@/features/about/aboutList";
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
 * factory that makes the pieces, the five steps from order to your home,
 * the team and recognition, then questions and the home visit, as the
 * collection's pages end. The story's start, the team's other names and
 * every award are placeholders until the owner sends them.
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
        <Recognition />
        <Questions questions={ABOUT_QUESTIONS} />
        <Visit />
      </main>
    </>
  );
}
