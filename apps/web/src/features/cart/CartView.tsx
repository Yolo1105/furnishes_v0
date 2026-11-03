"use client";

import Image from "next/image";
import Link from "next/link";
import { ARRIVALS, finishBySlug, pieceBySlug, priceOf, sizeName } from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";
import { pieceOf, routes } from "@/lib/routes";
import { MAX_QTY, useCart } from "./cart";
import styles from "./Cart.module.css";

/**
 * The cart page: each line with its photo, choices, how many and its price,
 * then the total. Lines whose piece is no longer sold are left out.
 */
export function CartView() {
  const { lines, setQty, remove } = useCart();

  const rows = lines.flatMap((line, n) => {
    const piece = pieceBySlug(line.piece);
    const size = piece?.sizes[line.size];
    return piece && size ? [{ n, line, piece, size, price: priceOf(size, line.arrival) }] : [];
  });
  const total = rows.reduce((sum, r) => sum + r.price * r.line.qty, 0);

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
            {rows.map(({ n, line, piece, size, price }) => (
              <li key={`${line.piece}-${line.size}-${line.finish}-${line.arrival}`} className={styles.line}>
                <Link className={styles.thumb} href={pieceOf(piece.slug)} tabIndex={-1}>
                  <Image src={piece.photos[0]!} alt="" fill sizes="120px" />
                </Link>
                <div className={styles.about}>
                  <Link className={styles.name} href={pieceOf(piece.slug)}>
                    {piece.name}
                  </Link>
                  <p className={styles.choice}>
                    {sizeName(size)} · {finishBySlug(line.finish)?.name}
                    {line.arrival && ` · ${ARRIVALS[line.arrival].name}`}
                  </p>
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
            {/* payment opens once a payment provider is chosen */}
            <button type="button" className={styles.checkout} disabled aria-describedby="checkout-note">
              Check out
            </button>
            <p id="checkout-note" className={styles.note}>
              Paying online opens soon.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
