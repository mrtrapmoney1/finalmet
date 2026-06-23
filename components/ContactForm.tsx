"use client";

import { useState } from "react";
import { BUSINESS, SERVICES } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const service = String(data.get("service") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`Service request — ${service || "General"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\n${message}`
    );
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input id="name" name="name" type="text" required className={styles.input} autoComplete="name" />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required className={styles.input} autoComplete="tel" />
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input id="email" name="email" type="email" className={styles.input} autoComplete="email" />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="service" className={styles.label}>
          What needs service?
        </label>
        <select id="service" name="service" className={styles.input} defaultValue="">
          <option value="" disabled>
            Choose a service…
          </option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Home Warranty Claim">Home warranty claim</option>
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Tell us what&apos;s going on
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={styles.input}
          placeholder="Brand, model, and the symptoms you're seeing help us come prepared."
        />
      </div>

      <Button>Send request</Button>

      {sent && (
        <p className={styles.note} role="status">
          Thanks! Your email draft should be open. Prefer to talk now? Call{" "}
          <a href={BUSINESS.phoneHref} className={styles.noteLink}>
            {BUSINESS.phone}
          </a>
          .
        </p>
      )}
    </form>
  );
}
