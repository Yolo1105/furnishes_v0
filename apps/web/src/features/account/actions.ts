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
  (await cookies()).set(SESSION, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_AGE,
  });
  redirect(safeNext(form.get("next")));
}

export async function logOut() {
  (await cookies()).delete(SESSION);
  redirect(routes.home);
}
