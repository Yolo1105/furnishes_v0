import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { logOut } from "@/features/account/actions";
import { LOG_OUT } from "@/features/account/accountList";
import account from "@/features/account/Account.module.css";
import { isLoggedIn } from "@/features/account/session";
import styles from "@/features/collection/Collection.module.css";
import { Opening } from "@/features/collection/Opening";
import { DESIGN } from "@/features/design/designList";
import { Planner } from "@/features/design/Planner";
import { routes } from "@/lib/routes";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Design your room",
  description: "Draw one room at real size, place our pieces, and see what fits.",
};

/**
 * Design your room needs an account: anyone not logged in is sent to log in
 * first and brought back. Once in, the room planner, with a way to log out.
 */
export default async function DesignPage() {
  if (!(await isLoggedIn())) redirect(`${routes.logIn}?next=${encodeURIComponent(routes.designYourRoom)}`);
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <Opening label={DESIGN.label} title={DESIGN.title} photos={[]} rest={DESIGN.rest} lines={[DESIGN.line]}>
          <form className={account.logOutLine} action={logOut}>
            {LOG_OUT.line}{" "}
            <button className={`${styles.qaMail} ${account.logOut}`} type="submit">
              {LOG_OUT.go}
            </button>
          </form>
        </Opening>
        <Planner />
      </main>
    </>
  );
}
