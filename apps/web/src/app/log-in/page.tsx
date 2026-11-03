import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogIn } from "@/features/account/LogIn";
import { isLoggedIn, safeNext } from "@/features/account/session";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your rooms, orders and the assistant.",
  robots: { index: false },
};

/** Log in: a room beside the form, with no bar or footer; once logged in, straight on to where you were going. */
export default async function LogInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  if (await isLoggedIn()) redirect(safeNext(next));
  return <LogIn {...(next && { next: safeNext(next) })} />;
}
