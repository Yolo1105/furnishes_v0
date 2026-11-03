import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { logOut } from "@/features/account/actions";
import { LOG_OUT } from "@/features/account/accountList";
import account from "@/features/account/Account.module.css";
import { isLoggedIn } from "@/features/account/session";
import styles from "@/features/collection/Collection.module.css";
import { Soon } from "@/features/soon/Soon";
import { DESIGN_SOON } from "@/features/soon/soonList";
import { routes } from "@/lib/routes";
import { SiteHeader } from "@/shell/SiteHeader";

export const metadata: Metadata = {
  title: "Design your room",
  description: "Plan your room in 3D with our pieces; opening soon.",
};

/**
 * Design your room needs an account: anyone not logged in is sent to log in
 * first and brought back. Once in, a placeholder says what the planner will
 * do and the ways in that work today, with a way to log out.
 */
export default async function DesignPage() {
  if (!(await isLoggedIn())) redirect(`${routes.logIn}?next=${encodeURIComponent(routes.designYourRoom)}`);
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <Soon page={DESIGN_SOON}>
          <form className={account.logOutLine} action={logOut}>
            {LOG_OUT.line}{" "}
            <button className={`${styles.qaMail} ${account.logOut}`} type="submit">
              {LOG_OUT.go}
            </button>
          </form>
        </Soon>
      </main>
    </>
  );
}
