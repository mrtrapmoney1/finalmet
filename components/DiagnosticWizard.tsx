"use client";

import { useState, useEffect } from "react";
import {
  SAMSUNG_CODES,
  LG_CODES,
  type ErrorCode,
} from "@/lib/error-codes";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { RelevantParts, PartsSkeleton } from "@/components/RelevantParts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type Brand = "samsung" | "lg";
type Step = "brand" | "code" | "result";

const SEVERITY_COLORS: Record<string, string> = {
  low: "bg-primary/10 text-primary",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-error-container text-on-error-container",
};

const CERTIFICATIONS = [
  "Samsung Established ASC",
  "Factory-trained technicians",
  "OEM parts only",
  "90-day parts & labor warranty",
  "In-home service (appliances)",
  "200+ zip code coverage",
  `${BUSINESS.diagnostic} diagnostic (applied to repair)`,
  "BBB A+ accredited",
  "High-voltage safety certified",
  "Lockout/tagout protocol",
  "77+ years continuous operation",
  "No subcontractors",
];

const PIVOT_TABLE = [
  {
    diy: "Read an error code from a display",
    pro: "Verify the code against live sensor data",
  },
  {
    diy: "Watch a YouTube video",
    pro: "Follow factory service bulletins and TSB updates",
  },
  {
    diy: "Order a part that might fix it",
    pro: "Test the failed component to confirm root cause before ordering",
  },
  {
    diy: "Risk voiding manufacturer warranty",
    pro: "Maintain Samsung ASC seal integrity and full warranty coverage",
  },
  {
    diy: "No safety training",
    pro: "High-voltage safety protocol, lockout/tagout, PPE",
  },
];

export function DiagnosticWizard() {
  const [step, setStep] = useState<Step>("brand");
  const [brand, setBrand] = useState<Brand | null>(null);
  const [selectedCode, setSelectedCode] = useState<ErrorCode | null>(null);
  const [showPivot, setShowPivot] = useState(false);
  const [parts, setParts] = useState<{ name: string; price: string; condition: string; url: string; inStock: boolean }[]>([]);
  const [partsLoading, setPartsLoading] = useState(false);

  const codes = brand === "samsung" ? SAMSUNG_CODES : brand === "lg" ? LG_CODES : [];

  useEffect(() => {
    if (step !== "result" || !selectedCode) return;
    const timer = setTimeout(() => setShowPivot(true), 2000);
    return () => clearTimeout(timer);
  }, [step, selectedCode]);

  useEffect(() => {
    if (!selectedCode) return;
    setPartsLoading(true);
    fetch(
      `/api/parts?component=${encodeURIComponent(selectedCode.components[0])}&brand=${selectedCode.brand}`,
    )
      .then((res) => res.json())
      .then((data) => setParts(data.parts ?? []))
      .catch(() => setParts([]))
      .finally(() => setPartsLoading(false));
  }, [selectedCode]);

  function selectBrand(b: Brand) {
    setBrand(b);
    setStep("code");
  }

  function selectCode(code: ErrorCode) {
    setSelectedCode(code);
    setStep("result");
  }

  function restart() {
    setStep("brand");
    setBrand(null);
    setSelectedCode(null);
    setShowPivot(false);
  }

  return (
    <div className="rounded-2xl bg-surface-container-low p-6 md:p-8">
      {/* Brand Selection */}
      {step === "brand" && (
        <div>
          <p className="text-sm font-semibold font-headline text-on-surface-variant mb-4">
            Select your appliance brand
          </p>
          <div className="grid grid-cols-2 gap-4">
            {(["samsung", "lg"] as Brand[]).map((b) => (
              <button
                key={b}
                onClick={() => selectBrand(b)}
                className="min-h-[48px] p-6 rounded-2xl bg-surface hover:shadow-ambient transition-shadow text-center font-bold font-headline text-lg capitalize"
              >
                {b === "samsung" ? "Samsung" : "LG"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Code Selection */}
      {step === "code" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold font-headline text-on-surface-variant">
              Select the error code on your display
            </p>
            <button
              onClick={restart}
              className="text-xs text-primary hover:underline"
            >
              Change brand
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {codes.map((code) => (
              <button
                key={code.code}
                onClick={() => selectCode(code)}
                className="min-h-[48px] p-3 rounded-xl bg-surface hover:shadow-ambient transition-shadow text-center"
              >
                <span className="block text-lg font-bold font-headline text-primary">
                  {code.code}
                </span>
                <span className="block text-[10px] text-on-surface-variant leading-tight mt-1">
                  {code.displayName}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Diagnosis Result */}
      {step === "result" && selectedCode && (
        <div aria-live="polite">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={restart}
              className="text-xs text-primary hover:underline"
            >
              Start over
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold font-headline text-primary">
              {selectedCode.code}
            </span>
            <div>
              <p className="font-bold font-headline">
                {selectedCode.displayName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  className={SEVERITY_COLORS[selectedCode.severity]}
                >
                  {selectedCode.severity} severity
                </Badge>
                <span className="text-xs text-on-surface-variant capitalize">
                  {selectedCode.brand} &middot;{" "}
                  {selectedCode.appliances.join(", ")}
                </span>
              </div>
            </div>
          </div>

          <p className="text-body-md text-on-surface-variant mb-6">
            {selectedCode.description}
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold font-headline mb-2">
              Common Causes
            </p>
            <ul className="space-y-2">
              {selectedCode.causes.map((cause, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-base text-secondary mt-0.5">
                    arrow_right
                  </span>
                  {cause}
                </li>
              ))}
            </ul>
          </div>

          {selectedCode.safetyNote && (
            <div className="rounded-xl border-l-4 border-error bg-error-container/20 p-4 mb-6">
              <p className="text-sm">
                <span className="font-semibold text-error">Safety: </span>
                {selectedCode.safetyNote}
              </p>
            </div>
          )}

          {/* Parts from MCP integration */}
          {partsLoading ? (
            <PartsSkeleton />
          ) : parts.length > 0 ? (
            <RelevantParts parts={parts} />
          ) : (
            <p className="mt-4 text-sm text-on-surface-variant">
              Call{" "}
              <a
                href={`tel:${BUSINESS.phone}`}
                className="text-primary hover:underline"
              >
                {BUSINESS.phone}
              </a>{" "}
              for parts availability.
            </p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href="/schedule" variant="primary">
              Schedule Factory-Authorized Repair
            </Button>
            <Button href={`tel:${BUSINESS.phone}`} variant="ghost">
              Call {BUSINESS.phone}
            </Button>
          </div>
        </div>
      )}

      {/* Professionalism Pivot Modal */}
      <Dialog open={showPivot} onOpenChange={setShowPivot}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-headline">
              Reading the Code Is the Easy Part
            </DialogTitle>
            <DialogDescription className="text-sm text-on-surface-variant">
              Understanding the difference between looking up an error code and
              diagnosing the root cause.
            </DialogDescription>
          </DialogHeader>

          {/* Contrast table */}
          <div className="mt-4 rounded-xl overflow-hidden border border-outline-variant/30">
            <div className="grid grid-cols-2">
              <div className="bg-surface-container-high p-3 text-xs font-semibold font-headline">
                DIY Diagnosis
              </div>
              <div className="bg-primary/10 p-3 text-xs font-semibold font-headline text-primary">
                Professional Execution
              </div>
            </div>
            {PIVOT_TABLE.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-t border-outline-variant/20"
              >
                <div className="p-3 text-xs text-on-surface-variant">
                  {row.diy}
                </div>
                <div className="p-3 text-xs bg-primary/5">{row.pro}</div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-6">
            <p className="text-xs font-semibold font-headline mb-3">
              Metro TV &amp; Appliances Credentials
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CERTIFICATIONS.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-[11px] text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-sm text-primary mt-px">
                    verified
                  </span>
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/schedule" variant="primary">
              Schedule Factory-Authorized Repair
            </Button>
            <button
              onClick={() => setShowPivot(false)}
              className="text-xs text-on-surface-variant hover:text-on-surface text-center py-2"
            >
              I understand the risks — continue reading
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
