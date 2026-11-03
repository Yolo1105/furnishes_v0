"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { safeNext, SESSION, SESSION_AGE, WELCOMED } from "./session";

/** Both of the stand-in's cookies: unread by the page's scripts, sent only to this site, kept as long as a log-in. */
const COOKIE = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_AGE,
} as const;

/**
 * Logs in: for now any email will do, and the password is checked for
 * nothing and kept nowhere, until real accounts replace the stand-in.
 */
export async function logIn(form: FormData) {
  const email = form.get("email");
  if (typeof email !== "string" || !email.includes("@")) redirect(routes.logIn);
  await startSession();
  const next = safeNext(form.get("next"));
  // a first log-in here asks the welcome's questions, then goes on where it was going
  if (!(await cookies()).has(WELCOMED)) redirect(`${routes.welcome}?${new URLSearchParams({ next })}`);
  redirect(next);
}

/** The welcome answered or skipped: not asked again in this browser, and on to where the visitor was going. */
export async function finishWelcome(form: FormData) {
  (await cookies()).set(WELCOMED, "1", COOKIE);
  redirect(safeNext(form.get("next")));
}

/**
 * The demo: straight into the room planner with no email, so anyone can
 * try it. The stand-in session is all a log-in is today; once real accounts
 * exist, this becomes a guest session that saves nothing to an account.
 */
export async function tryDemo() {
  await startSession();
  redirect(routes.designYourRoom);
}

async function startSession() {
  (await cookies()).set(SESSION, "1", COOKIE);
}

export async function logOut() {
  (await cookies()).delete(SESSION);
  redirect(routes.home);
}

/**
 * Google: not connected until real accounts, so it says so on the page
 * and keeps where the visitor was going.
 */
export async function logInWithGoogle(form: FormData) {
  const next = form.get("next");
  const back = new URLSearchParams({ google: "soon" });
  if (typeof next === "string") back.set("next", safeNext(next));
  redirect(`${routes.logIn}?${back}`);
}
