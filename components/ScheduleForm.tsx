"use client";

import { useState, useMemo } from "react";
import { BUSINESS } from "@/lib/constants";
import { COVERED_ZIPS, getDiagnosticFee } from "@/lib/zip-codes";

const SERVICE_TYPES = [
  { value: "appliance-inhome", label: "Appliance Repair (In-Home)" },
  { value: "tv-dropoff", label: "TV Repair (Drop-Off)" },
  { value: "audio-dropoff", label: "Audio Equipment Repair (Drop-Off)" },
  { value: "commercial-dropoff", label: "Commercial Microwave Repair (Drop-Off)" },
  { value: "not-sure", label: "Not sure — need help deciding" },
];

const APPLIANCE_TYPES = [
  "Refrigerator / Freezer",
  "Washer",
  "Dryer",
  "Dishwasher",
  "Range / Oven / Cooktop",
  "Microwave",
  "Television",
  "Audio / Receiver / Amplifier",
  "Commercial Microwave",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  zip: string;
  serviceType: string;
  applianceType: string;
  brand: string;
  issue: string;
}

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  zip: "",
  serviceType: "",
  applianceType: "",
  brand: "",
  issue: "",
};

const INPUT_CLASS =
  "w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition";

export function ScheduleForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const isDropOff = form.serviceType.includes("dropoff");
  const zipFee = useMemo(() => {
    if (form.zip.length === 5) return getDiagnosticFee(form.zip);
    return null;
  }, [form.zip]);

  const isCovered = form.zip.length === 5 && (COVERED_ZIPS as readonly string[]).includes(form.zip);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm(empty);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Please call us directly.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please call us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-surface-container-low rounded-2xl p-10 text-center shadow-ambient">
        <span className="material-symbols-outlined text-5xl text-secondary mb-4 block" aria-hidden="true">
          check_circle
        </span>
        <h2 className="text-2xl font-bold font-headline text-on-surface mb-3">
          Request Received
        </h2>
        <p className="text-on-surface-variant leading-relaxed">
          We&apos;ll review your request and call you back during business hours
          (Monday–Friday, 8:30 AM – 6:00 PM). If you need to reach us sooner,
          call <a href={`tel:${BUSINESS.phone}`} className="text-primary font-medium hover:underline">{BUSINESS.phone}</a>.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-primary hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sf-name" className="block text-sm font-semibold text-on-surface mb-2">
            Full Name <span className="text-secondary">*</span>
          </label>
          <input
            id="sf-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Smith"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="sf-phone" className="block text-sm font-semibold text-on-surface mb-2">
            Phone Number <span className="text-secondary">*</span>
          </label>
          <input
            id="sf-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(402) 555-0100"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* Email + ZIP */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sf-email" className="block text-sm font-semibold text-on-surface mb-2">
            Email Address
          </label>
          <input
            id="sf-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@example.com"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="sf-zip" className="block text-sm font-semibold text-on-surface mb-2">
            ZIP Code <span className="text-secondary">*</span>
          </label>
          <input
            id="sf-zip"
            type="text"
            required
            value={form.zip}
            onChange={(e) => update("zip", e.target.value)}
            placeholder="68505"
            maxLength={5}
            className={INPUT_CLASS}
          />
          {/* Zip-based pricing feedback */}
          {form.zip.length === 5 && (
            <div className="mt-2" role="status" aria-live="polite">
              {isCovered ? (
                <div className="flex items-start gap-2 text-xs">
                  <span className="material-symbols-outlined text-sm text-secondary mt-px" aria-hidden="true">check_circle</span>
                  <span className="text-on-surface-variant">
                    {isDropOff ? (
                      <>Drop-off diagnostic: <strong className="text-on-surface">{BUSINESS.diagnosticDropOff}</strong></>
                    ) : zipFee ? (
                      <>In-home diagnostic: <strong className="text-on-surface">{zipFee.amount}</strong> — deductible toward repair</>
                    ) : (
                      <>We cover your area!</>
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-xs">
                  <span className="material-symbols-outlined text-sm text-error mt-px" aria-hidden="true">info</span>
                  <span className="text-on-surface-variant">
                    Not in our standard coverage area. Call <a href={`tel:${BUSINESS.phone}`} className="text-primary hover:underline">{BUSINESS.phone}</a> to check availability.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="sf-service" className="block text-sm font-semibold text-on-surface mb-2">
          Type of Service <span className="text-secondary">*</span>
        </label>
        <select
          id="sf-service"
          required
          value={form.serviceType}
          onChange={(e) => update("serviceType", e.target.value)}
          className={INPUT_CLASS}
        >
          <option value="">Select a service type…</option>
          {SERVICE_TYPES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Appliance Type + Brand */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sf-appliance" className="block text-sm font-semibold text-on-surface mb-2">
            What needs repair? <span className="text-secondary">*</span>
          </label>
          <select
            id="sf-appliance"
            required
            value={form.applianceType}
            onChange={(e) => update("applianceType", e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="">Select appliance / device…</option>
            {APPLIANCE_TYPES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sf-brand" className="block text-sm font-semibold text-on-surface mb-2">
            Brand / Make
          </label>
          <input
            id="sf-brand"
            type="text"
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            placeholder="e.g. Samsung, LG, Maytag"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* Issue description */}
      <div>
        <label htmlFor="sf-issue" className="block text-sm font-semibold text-on-surface mb-2">
          Describe the Issue <span className="text-secondary">*</span>
        </label>
        <textarea
          id="sf-issue"
          required
          value={form.issue}
          onChange={(e) => update("issue", e.target.value)}
          placeholder="What's happening? When did it start? Any error codes or unusual sounds?"
          rows={4}
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-error bg-error-container rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-secondary text-on-secondary py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "sending" ? (
          <>
            <span className="material-symbols-outlined text-base animate-spin" aria-hidden="true">autorenew</span>
            Sending…
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-base" aria-hidden="true">send</span>
            Submit Service Request
          </>
        )}
      </button>

      <p className="text-xs text-outline text-center">
        We&apos;ll follow up by phone during business hours. For urgent needs, call{" "}
        <a href={`tel:${BUSINESS.phone}`} className="text-primary hover:underline">{BUSINESS.phone}</a>.
      </p>
    </form>
  );
}
