import type { Metadata } from "next";
import { FindYourPiece, Guides, QuizBanner, RoomByRoom } from "@/features/quiz/Quiz";
import { Finder } from "@/features/quiz/Finder";
import { readAnswers } from "@/features/quiz/match";
import { Problems } from "@/features/quiz/Problems";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Find your piece",
  description: "Every kind of piece we make, and the rooms they're made for.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

/** Quiz: the showroom band, four short questions with the pieces that fit, then find a piece by what it is, by the problem it answers, or by the room it is for, and two short guides before ordering. */
export default async function QuizPage({ searchParams }: Props) {
  const initial = readAnswers(await searchParams);
  return (
    <>
      <SiteHeader />
      <main id="main">
        <QuizBanner />
        <Finder initial={initial} />
        <FindYourPiece />
        <Problems />
        <RoomByRoom />
        <Guides />
      </main>
    </>
  );
}
