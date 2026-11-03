"use client";

import Image from "next/image";
import Link from "next/link";
import { sgd } from "@/lib/money";
import { pieceOf, routes } from "@/lib/routes";
import { extrasKey, MAX_QTY, useCart } from "./cart";
import { cartRows } from "./rows";
import styles from "./Cart.module.css";

/**
 * The cart page: each line with its photo, choices, how many and its price,
 * then the total. Lines whose piece is no longer sold are left out.
 */
export function CartView() {
  const { lines, setQty, remove } = useCart();

  const { rows, total } = cartRows(lines);

  return (
    <section className={styles.cart} aria-labelledby="cart-title">
      <h1 id="cart-title" className={styles.title}>
        Your cart
      </h1>

      {rows.length === 0 ? (
        <p className={styles.empty}>
          Nothing in it yet.{" "}
          <Link className={styles.back} href={routes.collection}>
            See the collection
          </Link>
        </p>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.lines}>
            {rows.map(({ n, line, piece, choice, price }) => (
              <li
                key={`${line.piece}-${line.size}-${line.finish}-${line.arrival}-${extrasKey(line)}`}
                className={styles.line}
              >
                <Link className={styles.thumb} href={pieceOf(piece.slug)} tabIndex={-1}>
                  <Image src={piece.photos[0]!} alt="" fill sizes="120px" />
                </Link>
                <div className={styles.about}>
                  <Link className={styles.name} href={pieceOf(piece.slug)}>
                    {piece.name}
                  </Link>
                  <p className={styles.choice}>{choice}</p>
                  <div className={styles.qty} role="group" aria-label={`How many ${piece.name}`}>
                    <button
                      type="button"
                      aria-label="One fewer"
                      disabled={line.qty <= 1}
                      onClick={() => setQty(n, line.qty - 1)}
                    >
                      −
                    </button>
                    <output aria-live="polite">{line.qty}</output>
                    <button
                      type="button"
                      aria-label="One more"
                      disabled={line.qty >= MAX_QTY}
                      onClick={() => setQty(n, line.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.end}>
                  <p className={styles.price}>{sgd(price * line.qty)}</p>
                  <button type="button" className={styles.remove} onClick={() => remove(n)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className={styles.summary} aria-label="Order summary">
            <p className={styles.row}>
              <span>Subtotal</span>
              <span>{sgd(total)}</span>
            </p>
            <p className={styles.row}>
              <span>Delivery and putting together</span>
              <span>At checkout</span>
            </p>
            <Link className={styles.checkout} href={routes.checkout}>
              Check out
            </Link>
            <p className={styles.note}>We confirm your order by email and send a link to pay.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
