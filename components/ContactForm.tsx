"use client";

import { useCallback, useId, useRef, useState } from "react";
import { BUSINESS, SERVICES } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import styles from "./ContactForm.module.css";

// Web3Forms access key — a PUBLIC key tied to the destination inbox, safe to
// ship client-side. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local to enable
// server-side lead capture. With no key, the form degrades to a mailto: draft.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

// A hung request must not leave the button stuck on "Sending…" forever.
const SUBMIT_TIMEOUT_MS = 15000;

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "phone" | "email";
type Errors = Partial<Record<FieldName, string>>;

interface Fields {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

/**
 * Validates on the client so a mistyped number doesn't become an unreachable
 * lead. Deliberately forgiving: we accept any 10+ digit phone in any punctuation
 * style, because rejecting a real customer's formatting is worse than accepting
 * a slightly odd one. `required` attributes stay on the inputs so the form still
 * validates natively if JS fails to load.
 */
function validate(fields: Fields): Errors {
  const errors: Errors = {};

  if (!fields.name.trim()) {
    errors.name = "Please enter your name so we know who we're calling back.";
  }

  const digits = fields.phone.replace(/\D/g, "");
  if (!digits) {
    errors.phone = "Please enter a phone number we can reach you on.";
  } else if (digits.length < 10) {
    errors.phone = "That looks too short — please include the area code.";
  }

  // Email is optional; only validate it when something was typed.
  if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
    errors.email = "Please check this email address — we couldn't read it.";
  }

  return errors;
}

function mailtoFallback(fields: Fields) {
  const subject = encodeURIComponent(`Service request — ${fields.service || "General"}`);
  const body = encodeURIComponent(
    `Name: ${fields.name}\nPhone: ${fields.phone}\nEmail: ${fields.email}\nService: ${fields.service}\n\n${fields.message}`
  );
  window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);
  const uid = useId();
  const errId = (field: FieldName) => `${uid}-${field}-error`;

  // form_start fires once per mount, on the first real keystroke. Firing it on
  // focus (or on mount) is what produces "form_start with no form_submit" — a
  // tab-through or an autofill probe looks identical to genuine intent.
  // useCallback so the ref is only ever touched from an event handler, never
  // during render (react-hooks/refs).
  const handleFirstInput = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { link_position: "contact_page" });
  }, []);

  function readFields(form: HTMLFormElement): Fields {
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) || "");
    return {
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      service: get("service"),
      message: get("message"),
    };
  }

  // Clear a field's error as soon as the person starts correcting it — leaving
  // stale red text under a field they're actively fixing reads as broken.
  function clearError(field: FieldName) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = readFields(form);

    const found = validate(fields);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      track("form_error", {
        link_position: "contact_page",
        label: Object.keys(found).join(","),
        error_type: "validation",
      });
      // Move focus to the first problem so keyboard and screen-reader users are
      // taken straight to it rather than left guessing why nothing submitted.
      const first = (["name", "phone", "email"] as const).find((f) => found[f]);
      if (first) form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});

    // No key configured → preserve the original mailto behavior.
    if (!ACCESS_KEY) {
      // Reported distinctly: a mailto hand-off is NOT a captured lead. It only
      // means we opened the visitor's mail client — whether they ever pressed
      // send is unknowable. Counting it as form_submit would inflate conversions.
      track("form_submit", {
        link_position: "contact_page",
        service: fields.service || "unspecified",
        method: "mailto_fallback",
      });
      mailtoFallback(fields);
      setStatus("success");
      return;
    }

    setStatus("submitting");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Service request — ${fields.service || "General"}`,
          from_name: `${BUSINESS.name} website`,
          // Spam honeypot — real users leave this empty.
          botcheck: new FormData(form).get("botcheck") || "",
          ...fields,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
        startedRef.current = false;
        track("form_submit", {
          link_position: "contact_page",
          service: fields.service || "unspecified",
          method: "web3forms",
        });
      } else {
        setStatus("error");
        track("form_error", {
          link_position: "contact_page",
          error_type: "api_rejected",
          label: String(result.message ?? "unknown"),
        });
      }
    } catch (err) {
      setStatus("error");
      track("form_error", {
        link_position: "contact_page",
        // A timeout and a dead network look the same to the visitor but mean
        // very different things when you're debugging lost leads.
        error_type:
          err instanceof DOMException && err.name === "AbortError"
            ? "timeout"
            : "network",
      });
    } finally {
      clearTimeout(timer);
    }
  }

  const fieldProps = useCallback(
    (field: FieldName) => ({
      onInput: () => {
        handleFirstInput();
        clearError(field);
      },
      "aria-invalid": errors[field] ? (true as const) : undefined,
      "aria-describedby": errors[field] ? errId(field) : undefined,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- errId/clearError are stable
    [errors, handleFirstInput],
  );

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate={false}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={styles.input}
          autoComplete="name"
          {...fieldProps("name")}
        />
        {errors.name && (
          <p id={errId("name")} className={styles.error}>
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={styles.input}
            autoComplete="tel"
            {...fieldProps("phone")}
          />
          {errors.phone && (
            <p id={errId("phone")} className={styles.error}>
              {errors.phone}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            autoComplete="email"
            {...fieldProps("email")}
          />
          {errors.email && (
            <p id={errId("email")} className={styles.error}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="service" className={styles.label}>
          What needs service?
        </label>
        <select
          id="service"
          name="service"
          className={styles.input}
          defaultValue=""
          onChange={handleFirstInput}
        >
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
          onInput={handleFirstInput}
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
        className={styles.honeypot}
      />

      <Button disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send request"}
      </Button>

      {/*
        This region is always mounted, and only its text changes. A live region
        that is inserted at the same moment its content appears is frequently
        missed by screen readers, which is what the previous conditional render
        did. `aria-live="polite"` waits for a pause rather than interrupting.
      */}
      <div role="status" aria-live="polite" className={styles.status}>
        {status === "success" && (
          <p className={styles.note}>
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
          <p className={styles.note}>
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
      </div>
    </form>
  );
}
