import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Welcome } from "@/features/account/Welcome";
import { isLoggedIn, safeNext } from "@/features/account/session";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Welcome",
  description: "A few questions so Eva and our team start from your home.",
  robots: { index: false },
};

/** The welcome's questions, for someone logged in; anyone else logs in first and comes back here. */
export default async function WelcomePage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  if (!(await isLoggedIn())) redirect(`${routes.logIn}?${new URLSearchParams({ next: routes.welcome })}`);
  return <Welcome next={safeNext(next)} />;
}
