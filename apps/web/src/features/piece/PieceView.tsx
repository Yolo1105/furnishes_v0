"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/features/cart/cart";
import {
  ARRIVALS,
  type Arrival,
  dims,
  finishBySlug,
  FURNITURE_LEAD,
  FURNITURE_WEEKS,
  priceOf,
  sizeName,
  type Piece,
} from "@/features/catalog/catalog";
import { sgd } from "@/lib/money";
import { routes } from "@/lib/routes";
import catalog from "@/features/catalog/Catalog.module.css";
import { arrivesBetween, useToday } from "./arrives";
import styles from "./Piece.module.css";

/**
 * A piece's photos on the left, with small ones under to switch; its name,
 * price, size and finish on the right (and, for a modular piece, whether it
 * arrives built or in parts, each with its price and time), when it would
 * arrive, and the way to add it to the cart.
 */
export function PieceView({ piece }: { piece: Piece }) {
  const [photo, setPhoto] = useState(0);
  const [size, setSize] = useState(0);
  const [finish, setFinish] = useState(piece.finishes[0]!);
  const [arrival, setArrival] = useState<Arrival>("built");
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const chosen = piece.sizes[size]!;
  const modular = piece.line === "modular";
  const price = priceOf(chosen, modular ? arrival : null);
  const today = useToday();
  const weeks = modular ? ARRIVALS[arrival].weeks : FURNITURE_WEEKS;
  const lead = modular ? ARRIVALS[arrival].lead : FURNITURE_LEAD;

  return (
    <div className={styles.view}>
      <div className={styles.gallery}>
        <span className={styles.big}>
          {piece.photos.map((p, n) => (
            <Image
              key={n}
              src={p}
              alt=""
              fill
              priority={n === 0}
              sizes="(max-width: 1023px) 100vw, 55vw"
              data-shown={n === photo || undefined}
            />
          ))}
        </span>
        <ul className={styles.thumbs} aria-label="Photos">
          {piece.photos.map((p, n) => (
            <li key={n}>
              <button
                type="button"
                className={styles.thumb}
                aria-label={`Photo ${n + 1}`}
                aria-pressed={n === photo}
                onClick={() => setPhoto(n)}
              >
                <Image src={p} alt="" fill sizes="96px" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.info}>
        <h1 className={styles.name}>
          {piece.name} <span className={styles.rest}>{piece.tagline}</span>
        </h1>
        <p className={styles.price}>{sgd(price)}</p>

        {modular && (
          <fieldset className={styles.choose}>
            <legend>How it arrives</legend>
            <div className={styles.options}>
              {(Object.keys(ARRIVALS) as Arrival[]).map((a) => (
                <label key={a} className={styles.arrival}>
                  <input
                    type="radio"
                    name="arrival"
                    checked={a === arrival}
                    onChange={() => {
                      setArrival(a);
                      setAdded(false);
                    }}
                  />
                  <span>{ARRIVALS[a].name}</span>
                  <span className={styles.arrivalMeta}>
                    {sgd(priceOf(chosen, a))} · {ARRIVALS[a].weeks}
                  </span>
                </label>
              ))}
            </div>
            <p className={styles.dims}>
              {ARRIVALS[arrival].line}
              {arrival === "built" && ". Check it fits through your lift and door"}.
            </p>
          </fieldset>
        )}

        <fieldset className={styles.choose}>
          <legend>Size</legend>
          <div className={styles.options}>
            {piece.sizes.map((s, n) => (
              <label key={n} className={styles.option}>
                <input
                  type="radio"
                  name="size"
                  checked={n === size}
                  onChange={() => {
                    setSize(n);
                    setAdded(false);
                  }}
                />
                <span>{sizeName(s)}</span>
              </label>
            ))}
          </div>
          <p className={styles.dims}>{dims(chosen)} (width × depth × height)</p>
        </fieldset>

        <fieldset className={styles.choose}>
          <legend>
            Finish: <span className={styles.rest}>{finishBySlug(finish)?.name}</span>
          </legend>
          <div className={styles.options}>
            {piece.finishes.map((f) => (
              <label key={f} className={styles.option}>
                <input
                  type="radio"
                  name="finish"
                  checked={f === finish}
                  onChange={() => {
                    setFinish(f);
                    setAdded(false);
                  }}
                />
                <span className={catalog.swatch} data-finish={f} aria-hidden="true" />
                <span>{finishBySlug(f)?.name}</span>
              </label>
            ))}
          </div>
          <Link className={styles.link} href={routes.contact}>
            See the finishes first? Order samples
          </Link>
        </fieldset>

        <p className={styles.lead}>
          {today ? `Order today, and it arrives ${arrivesBetween(today, lead)} (${weeks})` : `Reaches you in ${weeks}`}
        </p>

        <button
          type="button"
          className={styles.add}
          onClick={() => {
            add({ piece: piece.slug, size, finish, arrival: modular ? arrival : null });
            setAdded(true);
          }}
        >
          Add to cart · {sgd(price)}
        </button>
        <p className={styles.status} role="status">
          {added && (
            <>
              Added to your cart.{" "}
              <Link className={styles.link} href={routes.cart}>
                View cart
              </Link>
            </>
          )}
        </p>

        <Link className={styles.link} href={routes.designYourRoom}>
          {modular
            ? "Change its size or colour in Design your room (sign in first)"
            : "Not sure it fits? Design your room first"}
        </Link>
      </div>
    </div>
  );
}
