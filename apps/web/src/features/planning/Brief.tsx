"use client";

import type { FormEvent } from "react";
import account from "@/features/account/Account.module.css";
import checkout from "@/features/checkout/Checkout.module.css";
import collection from "@/features/collection/Collection.module.css";
import { Section } from "@/features/collection/Sections";
import { MAILTO } from "@/lib/contact";
import { BRIEF } from "./planningList";

const F = BRIEF.fields;

/**
 * A room told to us in four answers, written into an email that opens in
 * the visitor's mail app; the fields are the checkout's, two across.
 */
export function Brief() {
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = (Object.keys(F) as (keyof typeof F)[])
      .map((k) => `${F[k]}: ${String(d.get(k) ?? "").trim() || "-"}`)
      .join("\n\n");
    // an email address, not a page, so the mail app opens and the page stays
    window.open(`${MAILTO}?subject=${encodeURIComponent(BRIEF.subject)}&body=${encodeURIComponent(body)}`, "_self");
  };

  return (
    <Section id={BRIEF.id} label={BRIEF.label} title={BRIEF.title} rest={BRIEF.rest}>
      <form className={checkout.form} onSubmit={send}>
        <div className={checkout.grid}>
          <label className={account.field}>
            <span className={account.fieldLabel}>{F.room}</span>
            <select name="room" defaultValue={BRIEF.rooms[0]}>
              {BRIEF.rooms.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className={account.field}>
            <span className={account.fieldLabel}>{F.size}</span>
            <input name="size" placeholder={BRIEF.sizeHint} />
          </label>
          <label className={`${account.field} ${checkout.wide}`}>
            <span className={account.fieldLabel}>{F.happen}</span>
            <textarea name="happen" rows={3} placeholder={BRIEF.happenHint} required />
          </label>
          <label className={`${account.field} ${checkout.wide}`}>
            <span className={account.fieldLabel}>{F.stays}</span>
            <textarea name="stays" rows={2} placeholder={BRIEF.staysHint} />
          </label>
        </div>
        <p className={checkout.line}>{BRIEF.line}</p>
        <button type="submit" className={collection.outline}>
          {BRIEF.send}
        </button>
      </form>
    </Section>
  );
}
