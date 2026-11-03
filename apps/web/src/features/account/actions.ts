"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { safeNext, SESSION, SESSION_AGE } from "./session";

/**
 * Logs in: for now any email will do, and the password is checked for
 * nothing and kept nowhere, until real accounts replace the stand-in.
 */
export async function logIn(form: FormData) {
  const email = form.get("email");
  if (typeof email !== "string" || !email.includes("@")) redirect(routes.logIn);
  await startSession();
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
  (await cookies()).set(SESSION, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_AGE,
  });
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
