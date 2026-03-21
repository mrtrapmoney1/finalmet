"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition";

  const labelClass = "block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2";

  return (
    <div className="bg-surface-container-low rounded-2xl p-8 shadow-ambient">
      <h2 className="text-xl font-bold font-headline text-on-surface mb-1">
        Send Us a Message
      </h2>
      <p className="text-sm text-on-surface-variant mb-6">
        We&apos;ll get back to you within one business day.
      </p>

      {status === "success" ? (
        <div className="flex flex-col items-center text-center py-8 gap-4">
          <span className="material-symbols-outlined text-5xl text-secondary">check_circle</span>
          <p className="text-lg font-bold font-headline text-on-surface">Message Sent!</p>
          <p className="text-sm text-on-surface-variant">
            Thanks for reaching out. We&apos;ll be in touch shortly.
          </p>
          <Button variant="ghost" onClick={() => setStatus("idle")} type="button">
            Send Another
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className={labelClass}>Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className={labelClass}>Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(402) 000-0000"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="service" className={labelClass}>Service Type</label>
              <select id="service" name="service" className={inputClass}>
                <option value="">Select a service…</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Other">Other / Not sure</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>Message *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Describe your issue or question…"
              className={inputClass}
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-error font-medium">
              Something went wrong. Please try again or call us directly.
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={status === "loading"}
            className="w-full justify-center"
          >
            {status === "loading" ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                Sending…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">send</span>
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
