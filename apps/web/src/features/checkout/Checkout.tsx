"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import account from "@/features/account/Account.module.css";
import { useCart } from "@/features/cart/cart";
import cart from "@/features/cart/Cart.module.css";
import { cartRows } from "@/features/cart/rows";
import { MAILTO } from "@/lib/contact";
import { sgd } from "@/lib/money";
import { routes } from "@/lib/routes";
import { CHECKOUT } from "./checkoutList";
import styles from "./Checkout.module.css";

const F = CHECKOUT.fields;

/**
 * Checkout, until payment opens: the delivery details on the left, the
 * order and its total on the right, and sending opens an email with both
 * written out, so we can confirm it and reply with a link to pay.
 */
export function Checkout() {
  const { lines } = useCart();
  const { rows, total } = cartRows(lines);
  const [sent, setSent] = useState(false);
  const estimate = rows.some((r) => r.estimate);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const field = (k: keyof typeof F) => `${F[k]}: ${String(d.get(k) ?? "").trim() || "-"}`;
    const body = [
      "Order",
      ...rows.map((r) => `${r.line.qty} × ${r.piece.name} (${r.choice}): ${sgd(r.price * r.line.qty)}`),
      `Total: ${sgd(total)}${estimate ? " (estimate)" : ""}`,
      "",
      CHECKOUT.details,
      ...(Object.keys(F) as (keyof typeof F)[]).map(field),
    ].join("\n");
    // an email address, not a page, so the mail app opens and the page stays
    window.open(`${MAILTO}?subject=${encodeURIComponent(CHECKOUT.subject)}&body=${encodeURIComponent(body)}`, "_self");
    setSent(true);
  };

  return (
    <section className={cart.cart} aria-labelledby="checkout-title">
      <h1 id="checkout-title" className={cart.title}>
        {CHECKOUT.title}
      </h1>

      {rows.length === 0 ? (
        <p className={cart.empty}>
          {CHECKOUT.nothing}{" "}
          <Link className={cart.back} href={routes.collection}>
            See the collection
          </Link>
        </p>
      ) : (
        <div className={cart.layout}>
          <form className={styles.form} onSubmit={send}>
            <p className={styles.line}>{CHECKOUT.line}</p>
            <div className={styles.grid}>
              <label className={account.field}>
                <span className={account.fieldLabel}>{F.name}</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label className={account.field}>
                <span className={account.fieldLabel}>{F.email}</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label className={account.field}>
                <span className={account.fieldLabel}>{F.phone}</span>
                <input name="phone" type="tel" autoComplete="tel" inputMode="tel" />
              </label>
              <label className={account.field}>
                <span className={account.fieldLabel}>{F.postal}</span>
                <input
                  name="postal"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  title="Six digits"
                  required
                />
              </label>
              <label className={`${account.field} ${styles.wide}`}>
                <span className={account.fieldLabel}>{F.address}</span>
                <input name="address" autoComplete="address-line1" required />
              </label>
              <label className={account.field}>
                <span className={account.fieldLabel}>{F.unit}</span>
                <input name="unit" autoComplete="address-line2" placeholder="#05-12" />
              </label>
              <label className={account.field}>
                <span className={account.fieldLabel}>{F.lift}</span>
                <select name="lift" defaultValue={CHECKOUT.lifts[0]}>
                  {CHECKOUT.lifts.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
              <label className={account.field}>
                <span className={account.fieldLabel}>{F.when}</span>
                <select name="when" defaultValue={CHECKOUT.whens[2]}>
                  {CHECKOUT.whens.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              </label>
              <label className={`${account.field} ${styles.wide}`}>
                <span className={account.fieldLabel}>{F.note}</span>
                <textarea name="note" rows={3} placeholder={CHECKOUT.notePlaceholder} />
              </label>
            </div>
            <button type="submit" className={cart.checkout}>
              {CHECKOUT.send}
            </button>
            <p className={styles.line} role="status">
              {sent && (
                <>
                  {CHECKOUT.sent} {CHECKOUT.noMail}
                </>
              )}
            </p>
          </form>

          <aside className={cart.summary} aria-label="Your order">
            {rows.map((r) => (
              <div key={r.n} className={styles.item}>
                <p className={cart.row}>
                  <span>
                    {r.line.qty} × {r.piece.name}
                  </span>
                  <span>{sgd(r.price * r.line.qty)}</span>
                </p>
                <p className={cart.note}>{r.choice}</p>
              </div>
            ))}
            <p className={`${cart.row} ${styles.total}`}>
              <span>Total</span>
              <span>{sgd(total)}</span>
            </p>
            {estimate && <p className={cart.note}>{CHECKOUT.estimate}</p>}
            <Link className={cart.back} href={routes.cart}>
              Change the cart
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
