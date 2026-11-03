import type { Metadata } from "next";
import { Inspiration } from "@/features/inspiration/Inspiration";
import { Looks } from "@/features/inspiration/Looks";
import { Journal } from "@/features/journal/Journal";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Inspiration",
  description: "Rooms to start from: living rooms, studies and kitchens with furniture made to fit.",
};

/** Inspiration: rooms to start from, one open at a time, then the journal, then four rooms to shop. */
export default function InspirationPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Inspiration />
        <Journal />
        <Looks />
      </main>
    </>
  );
}
