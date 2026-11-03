import { MakingDays, Manifesto, Story, Team, WhoWeAre, Workshop } from "@/features/about/About";
import { ABOUT_CLOSING, ABOUT_QUESTIONS } from "@/features/about/aboutList";
import { Banner } from "@/features/banner/Banner";
import { Closing } from "@/features/collection/Closing";
import { Questions } from "@/features/collection/Questions";
import { Visit } from "@/features/collection/Visit";
import styles from "@/features/collection/Collection.module.css";
import { Partners } from "@/features/partners/Partners";
import { Assistant } from "@/features/planning/Assistant";
import { RoomProvider } from "@/features/rooms/RoomContext";
import { FlatTour } from "@/features/tour/FlatTour";
import { SiteHeader } from "@/shell/SiteHeader";

/**
 * The landing: the banner of rooms, the partners, the flat toured a step at
 * a time, Eva the assistant, then About in full (who we are, what we believe and four figures,
 * our story, the factory, the five steps to your home, the team, questions
 * and the home visit) and the closing band. The story's start and the
 * team's other names are placeholders until the owner sends them;
 * recognition waits for something to show.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <RoomProvider>
        <main id="main" className={styles.page}>
          <Banner />
          <Partners />
          <FlatTour />
          <Assistant />
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
      </RoomProvider>
    </>
  );
}
