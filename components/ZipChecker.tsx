"use client";

import { useState, useRef } from "react";
import { COVERED_ZIPS } from "@/lib/zip-codes";
import { BUSINESS } from "@/lib/constants";

export function ZipChecker() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<"covered" | "not-covered" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function check() {
    const v = zip.trim();
    if (v.length !== 5 || !/^\d+$/.test(v)) return;
    setResult((COVERED_ZIPS as readonly string[]).includes(v) ? "covered" : "not-covered");
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex rounded-2xl overflow-hidden shadow-ambient border border-outline-variant/30">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => { setZip(e.target.value.replace(/\D/g, "")); setResult(null); }}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Enter your zip code"
          aria-label="Enter your zip code to check coverage"
          className="flex-1 px-5 py-4 text-lg bg-surface text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
        />
        <button
          onClick={check}
          className="px-7 py-4 bg-secondary text-on-secondary font-semibold font-label hover:opacity-90 transition-opacity text-sm"
          aria-label="Check zip code coverage"
        >
          Check
        </button>
      </div>

      {result === "covered" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <span className="text-2xl" aria-hidden>✓</span>
          <div>
            <p className="font-semibold text-emerald-800">Zip code {zip} is covered!</p>
            <p className="text-sm text-emerald-700">
              Call <a href={`tel:${BUSINESS.phone}`} className="font-semibold underline">{BUSINESS.phone}</a> to schedule in-home service.
            </p>
          </div>
        </div>
      )}

      {result === "not-covered" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <span className="text-2xl" aria-hidden>→</span>
          <div>
            <p className="font-semibold text-amber-800">Zip code {zip} is outside our in-home area.</p>
            <p className="text-sm text-amber-700">
              TV, audio &amp; commercial microwave drop-off is open to everyone.{" "}
              <a href={`tel:${BUSINESS.phone}`} className="font-semibold underline">Call us</a> to confirm.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
