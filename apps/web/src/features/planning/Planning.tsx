import Link from "next/link";
import { tryDemo } from "@/features/account/actions";
import account from "@/features/account/Account.module.css";
import collection from "@/features/collection/Collection.module.css";
import { Opening } from "@/features/collection/Opening";
import { Index, Section, Steps } from "@/features/collection/Sections";
import { Brief } from "./Brief";
import { EVA, PLANNER, PLANNING, WAYS } from "./planningList";

/**
 * Planning help, for a visitor not logged in: what Eva and the room planner
 * do, from the site's own parts, then the three ways to get help side by
 * side, and a room told to us by email.
 */
export function Planning() {
  return (
    <>
      <Opening
        label={PLANNING.label}
        title={PLANNING.title}
        photos={PLANNING.photos}
        rest={PLANNING.rest}
        lines={PLANNING.lines}
      >
        <Link className={collection.outline} href={PLANNING.go.href}>
          {PLANNING.go.label}
        </Link>
        <form className={account.logOutLine} action={tryDemo}>
          {PLANNING.demo.line}{" "}
          <button className={`${account.link} ${account.logOut}`} type="submit">
            {PLANNING.demo.go}
          </button>
        </form>
      </Opening>

      <Section id={EVA.id} label={EVA.label} title={EVA.title} rest={EVA.rest}>
        <Index entries={EVA.tiles} />
      </Section>

      <Steps {...PLANNER} />

      <Section id={WAYS.id} label={WAYS.label} title={WAYS.title} rest={WAYS.rest}>
        <Index entries={WAYS.tiles} />
      </Section>

      <Brief />
    </>
  );
}
