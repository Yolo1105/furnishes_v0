import { MakingDays, Manifesto, Workshop } from "@/features/about/About";
import { ABOUT_CLOSING } from "@/features/about/aboutList";
import { Banner } from "@/features/banner/Banner";
import { Closing } from "@/features/collection/Closing";
import styles from "@/features/collection/Collection.module.css";
import { Partners } from "@/features/partners/Partners";
import { RoomProvider } from "@/features/rooms/RoomContext";
import { FlatTour } from "@/features/tour/FlatTour";
import { SiteHeader } from "@/shell/SiteHeader";

/**
 * The landing: the banner of rooms, the partners, the flat toured a step at
 * a time, then a short about (the statement and its figures, the workshop,
 * the five steps to your home) and the closing band. The full story, team
 * and questions stay on the about page.
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
          <Manifesto />
          <Workshop />
          <MakingDays />
          <Closing band={ABOUT_CLOSING} />
        </main>
      </RoomProvider>
    </>
  );
}
