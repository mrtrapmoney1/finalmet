"use client";

import { useState } from "react";
import { BUSINESS, SERVICES } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import styles from "./ContactForm.module.css";

// Web3Forms access key — a PUBLIC key tied to the destination inbox, safe to
// ship client-side. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local to enable
// server-side lead capture. With no key, the form degrades to a mailto: draft.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

function mailtoFallback(fields: Record<string, string>) {
  const subject = encodeURIComponent(`Service request — ${fields.service || "General"}`);
  const body = encodeURIComponent(
    `Name: ${fields.name}\nPhone: ${fields.phone}\nEmail: ${fields.email}\nService: ${fields.service}\n\n${fields.message}`
  );
  window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || ""),
    };

    // No key configured → preserve the original mailto behavior.
    if (!ACCESS_KEY) {
      mailtoFallback(fields);
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Service request — ${fields.service || "General"}`,
          from_name: `${BUSINESS.name} website`,
          // Spam honeypot — real users leave this empty.
          botcheck: data.get("botcheck") || "",
          ...fields,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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

      {/* Honeypot: hidden from people, tempting to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      <Button disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send request"}
      </Button>

      {status === "success" && (
        <p className={styles.note} role="status">
          {ACCESS_KEY ? (
            <>Thanks! Your request is on its way — we&apos;ll follow up shortly.</>
          ) : (
            <>Thanks! Your email draft should be open.</>
          )}{" "}
          Prefer to talk now? Call{" "}
          <a href={BUSINESS.phoneHref} className={styles.noteLink}>
            {BUSINESS.phone}
          </a>
          .
        </p>
      )}

      {status === "error" && (
        <p className={styles.note} role="alert">
          Something went wrong sending your request. Please call{" "}
          <a href={BUSINESS.phoneHref} className={styles.noteLink}>
            {BUSINESS.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${BUSINESS.email}`} className={styles.noteLink}>
            {BUSINESS.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
