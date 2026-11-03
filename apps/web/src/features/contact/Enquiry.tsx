"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import collection from "@/features/collection/Collection.module.css";
import { mailAbout } from "@/lib/contact";
import { routes } from "@/lib/routes";
import { ENQUIRY } from "./contactList";
import styles from "./Contact.module.css";

type Who = (typeof ENQUIRY.who.options)[number]["value"];

/** One question answered by picking buttons: checkboxes for many, radios for one. */
function Pick({
  name,
  legend,
  options,
  many = false,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  many?: boolean;
}) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.groupLegend}>{legend}</legend>
      <div className={styles.chips}>
        {options.map((o) => (
          <label key={o} className={styles.chip}>
            <input className="visually-hidden" type={many ? "checkbox" : "radio"} name={name} value={o} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** A choice with a line under its name, in a thin frame that turns red once picked. */
function Option({
  type,
  name,
  value,
  title,
  line,
  onChange,
  checked,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  title: string;
  line: string;
  onChange?: () => void;
  checked?: boolean;
}) {
  return (
    <label className={styles.option}>
      <input className="visually-hidden" type={type} name={name} value={value} onChange={onChange} checked={checked} />
      <span className={styles.optionName}>{title}</span>
      <span className={styles.optionLine}>{line}</span>
    </label>
  );
}

/**
 * The enquiry, after the owner's three references: home or company first,
 * then what they need and the questions that follow from it, then the
 * sentence with the name and email. Sending opens an email in the
 * visitor's mail app, as the planning brief does: there is no form inbox.
 */
export function Enquiry() {
  // a home to start, as most who write are families, so the whole form shows at once
  const [who, setWho] = useState<Who>("home");

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const say = (k: string) => String(d.get(k) ?? "").trim();
    const needs = d.getAll("needs").map(String);
    const company = who === "company";
    const body = ENQUIRY.body([
      [
        "",
        `Hi, my name is ${say("name")}${company && say("company") ? ` from ${say("company")}` : ""}. Write back to me at ${say("email")}.`,
      ],
      [ENQUIRY.who.legend, ENQUIRY.who.options.find((o) => o.value === who)?.name ?? ""],
      [ENQUIRY.needs.legend, needs.join(", ")],
      company ? [ENQUIRY.kind.legend, say("kind")] : [ENQUIRY.space.legend, say("space")],
      company ? [ENQUIRY.size.legend, say("size")] : ["", ""],
      ["", say("more")],
    ]);
    // an email address, not a page, so the mail app opens and the page stays
    window.open(`${mailAbout(needs[0] ?? ENQUIRY.subject)}&body=${encodeURIComponent(body)}`, "_self");
  };

  return (
    <form className={styles.enquiry} onSubmit={send} aria-labelledby="enquiry-title">
      {/* the enquiry's name in the small capitals of the page's own label across from it, so the title on the left stays the one big line */}
      <h2 id="enquiry-title" className={collection.headingLabel}>
        {ENQUIRY.label}
      </h2>
      <fieldset className={styles.group}>
        <legend className={styles.groupLegend}>{ENQUIRY.who.legend}</legend>
        <div className={styles.options}>
          {ENQUIRY.who.options.map((o) => (
            <Option
              key={o.value}
              type="radio"
              name="who"
              value={o.value}
              title={o.name}
              line={o.line}
              checked={who === o.value}
              onChange={() => setWho(o.value)}
            />
          ))}
        </div>
      </fieldset>

      {/* the rest follows the first answer; a home's questions show until a company is picked */}
      <fieldset className={styles.group} key={who}>
        <legend className={styles.groupLegend}>{ENQUIRY.needs.legend}</legend>
        <div className={styles.options}>
          {ENQUIRY.needs[who].map((o) => (
            <Option key={o.name} type="checkbox" name="needs" value={o.name} title={o.name} line={o.line} />
          ))}
        </div>
      </fieldset>

      {who === "home" ? (
        <Pick name="space" {...ENQUIRY.space} />
      ) : (
        <>
          <Pick name="kind" {...ENQUIRY.kind} />
          <Pick name="size" legend={ENQUIRY.size.legend} options={ENQUIRY.size.steps} />
        </>
      )}

      <fieldset className={styles.group}>
        <legend className={styles.groupLegend}>{ENQUIRY.reach.legend}</legend>
        <p className={styles.sentence}>
          {ENQUIRY.hi}{" "}
          <label className={styles.blank}>
            <span className="visually-hidden">{ENQUIRY.name}</span>
            <input name="name" placeholder={ENQUIRY.name} autoComplete="name" required />
          </label>
          {who === "company" && (
            <>
              {" "}
              {ENQUIRY.from}{" "}
              <label className={styles.blank}>
                <span className="visually-hidden">{ENQUIRY.company}</span>
                <input name="company" placeholder={ENQUIRY.company} autoComplete="organization" />
              </label>
            </>
          )}
          <span className={styles.stop}>.</span>
        </p>
        <p className={styles.sentence}>
          {ENQUIRY.write}{" "}
          <label className={`${styles.blank} ${styles.blankWide}`}>
            <span className="visually-hidden">{ENQUIRY.email}</span>
            <input name="email" type="email" placeholder={ENQUIRY.email} autoComplete="email" required />
          </label>
          <span className={styles.stop}>.</span>
        </p>
      </fieldset>

      <label className={styles.group}>
        <span className={styles.groupLegend}>{ENQUIRY.more.legend}</span>
        <textarea className={styles.more} name="more" rows={8} placeholder={ENQUIRY.more.hint} />
      </label>
      <div className={styles.send}>
        <label className={styles.agree}>
          <input type="checkbox" name="agree" required />
          <span>
            {ENQUIRY.agree}{" "}
            <Link className={styles.link} href={routes.terms}>
              {ENQUIRY.terms}
            </Link>{" "}
            {ENQUIRY.and}{" "}
            <Link className={styles.link} href={routes.privacy}>
              {ENQUIRY.privacy}
            </Link>
          </span>
        </label>
        <button type="submit" className={styles.sendGo}>
          {ENQUIRY.send}
        </button>
      </div>
    </form>
  );
}
