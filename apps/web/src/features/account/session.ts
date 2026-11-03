import { cookies } from "next/headers";
import { routes } from "@/lib/routes";

/**
 * A stand-in for accounts until the owner chooses how they work: logging in
 * sets this cookie and logging out clears it. It proves nothing about who
 * someone is, so it only decides which page to show, never what to trust.
 */
export const SESSION = "furnishes-session";

/** How long a log-in lasts, in seconds: 30 days. */
export const SESSION_AGE = 60 * 60 * 24 * 30;

export async function isLoggedIn() {
  return (await cookies()).has(SESSION);
}

/** Where to go after logging in: a page on this site, or home; never another site. */
export const safeNext = (next: unknown) =>
  typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : routes.home;
