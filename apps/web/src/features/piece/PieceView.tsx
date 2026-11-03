"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/features/cart/cart";
import {
  addOnsOf,
  ARRIVALS,
  type Arrival,
  CUSTOM,
  type Custom,
  customDims,
  dims,
  finishBySlug,
  FURNITURE_LEAD,
  inWeeks,
  priceOfChoice,
  sizeName,
  type Piece,
  withCustom,
} from "@/features/catalog/catalog";
import { mailAbout } from "@/lib/contact";
import { sgd } from "@/lib/money";
import { routes } from "@/lib/routes";
import catalog from "@/features/catalog/Catalog.module.css";
import { arrivesBetween, useToday } from "./arrives";
import styles from "./Piece.module.css";

/** Centimetres typed into a field, in mm; nothing for what isn't a number. */
const mm = (cm: string) => (cm.trim() && Number.isFinite(Number(cm)) ? Math.round(Number(cm) * 10) : null);

/**
 * The size made for the space typed in, in mm, held to what the panels
 * allow; nothing while the space is smaller than the least we make.
 */
function madeFor(w: number | null, h: number | null): Custom | null {
  if (w === null || h === null || w < CUSTOM.least.w || h < CUSTOM.least.h) return null;
  return { w: Math.min(w, CUSTOM.most.w), h: Math.min(h, CUSTOM.most.h) };
}

/**
 * A piece's photos on the left, with small ones under to switch; its name,
 * price, size and finish on the right (and, for a modular piece, whether it
 * arrives built or in parts, a size made to your space, and its add-ons),
 * when it would arrive, and the way to add it to the cart.
 */
export function PieceView({ piece }: { piece: Piece }) {
  const [photo, setPhoto] = useState(0);
  const [size, setSize] = useState<number | "custom">(0);
  const [finish, setFinish] = useState(piece.finishes[0]!);
  const [arrival, setArrival] = useState<Arrival>("built");
  const [added, setAdded] = useState(false);
  const first = piece.sizes[0]!;
  const [space, setSpace] = useState({ w: String(first.w / 10), h: String(first.h / 10) });
  const [addOns, setAddOns] = useState<readonly string[]>([]);
  const { add } = useCart();
  const ownSize = size === "custom";
  const chosen = ownSize ? first : piece.sizes[size]!;
  const modular = piece.line === "modular";
  const spaceW = mm(space.w);
  const spaceH = mm(space.h);
  const custom = ownSize ? madeFor(spaceW, spaceH) : null;
  const price = priceOfChoice(piece, chosen, modular ? arrival : null, custom, addOns);
  const today = useToday();
  const usual = modular ? ARRIVALS[arrival].lead : FURNITURE_LEAD;
  const lead = ownSize ? withCustom(usual) : usual;
  const weeks = inWeeks(lead);
  const extras = addOnsOf(piece.slug);
  const changed = () => setAdded(false);

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
                      changed();
                    }}
                  />
                  <span>{ARRIVALS[a].name}</span>
                  <span className={styles.arrivalMeta}>
                    {sgd(priceOfChoice(piece, chosen, a, custom, addOns))} ·{" "}
                    {inWeeks(ownSize ? withCustom(ARRIVALS[a].lead) : ARRIVALS[a].lead)}
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
                    changed();
                  }}
                />
                <span>{sizeName(s)}</span>
              </label>
            ))}
            {modular && (
              <label className={styles.option}>
                <input
                  type="radio"
                  name="size"
                  checked={ownSize}
                  onChange={() => {
                    setSize("custom");
                    changed();
                  }}
                />
                <span>Your size</span>
              </label>
            )}
          </div>
          {ownSize ? (
            <>
              <div className={styles.space}>
                {(["w", "h"] as const).map((k) => (
                  <label key={k} className={styles.spaceField}>
                    <span>{k === "w" ? "Width of your space" : "Height of your space"}</span>
                    <span className={styles.spaceInput}>
                      <input
                        type="number"
                        inputMode="decimal"
                        min={CUSTOM.least[k] / 10}
                        value={space[k]}
                        onChange={(e) => {
                          setSpace({ ...space, [k]: e.target.value });
                          changed();
                        }}
                      />
                      cm
                    </span>
                  </label>
                ))}
              </div>
              <p className={styles.dims} role="status">
                {custom ? (
                  <>
                    Made to {customDims(custom, chosen.d)} (width × depth × height).
                    {(spaceW! > CUSTOM.most.w || spaceH! > CUSTOM.most.h) &&
                      ` Our largest is ${CUSTOM.most.w / 10} × ${CUSTOM.most.h / 10} cm; for more, stand two side by side.`}{" "}
                    The price is an estimate, confirmed by email before you pay.
                  </>
                ) : (
                  `Too small: we make it from ${CUSTOM.least.w / 10} × ${CUSTOM.least.h / 10} cm.`
                )}
              </p>
            </>
          ) : (
            <p className={styles.dims}>{dims(chosen)} (width × depth × height)</p>
          )}
        </fieldset>

        {extras.length > 0 && (
          <fieldset className={styles.choose}>
            <legend>Add-ons</legend>
            <div className={styles.options}>
              {extras.map((a) => (
                <label key={a.id} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={addOns.includes(a.id)}
                    onChange={(e) => {
                      setAddOns(e.target.checked ? [...addOns, a.id] : addOns.filter((x) => x !== a.id));
                      changed();
                    }}
                  />
                  <span>{a.name}</span>
                  <span className={styles.arrivalMeta}>+{sgd(a.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

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
                    changed();
                  }}
                />
                <span className={catalog.swatch} data-finish={f} aria-hidden="true" />
                <span>{finishBySlug(f)?.name}</span>
              </label>
            ))}
          </div>
          <a className={styles.link} href={mailAbout(`Finish samples for the ${piece.name.toLowerCase()}`)}>
            See the finishes first? Ask for samples
          </a>
        </fieldset>

        <p className={styles.lead}>
          {today ? `Order today, and it arrives ${arrivesBetween(today, lead)} (${weeks})` : `Reaches you in ${weeks}`}
        </p>

        <button
          type="button"
          className={styles.add}
          disabled={ownSize && !custom}
          onClick={() => {
            add({
              piece: piece.slug,
              size: ownSize ? 0 : size,
              finish,
              arrival: modular ? arrival : null,
              custom,
              addOns,
            });
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
            ? "See it in your room in Design your room (log in first)"
            : "Not sure it fits? Design your room first"}
        </Link>
      </div>
    </div>
  );
}
