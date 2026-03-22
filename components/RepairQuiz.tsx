"use client";

import { useState } from "react";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    question: "What type of appliance needs repair?",
    options: [
      { label: "Refrigerator", emoji: "❄️", val: 0 },
      { label: "Washer", emoji: "👕", val: 0 },
      { label: "Dryer", emoji: "🔥", val: 0 },
      { label: "Dishwasher", emoji: "🍽️", val: 0 },
      { label: "Range / Oven", emoji: "🍳", val: 0 },
      { label: "Other", emoji: "📦", val: 0 },
    ],
  },
  {
    question: "How old is the appliance?",
    options: [
      { label: "Under 5 years", emoji: "🆕", val: 0 },
      { label: "5–10 years", emoji: "📅", val: 1 },
      { label: "10–15 years", emoji: "🗓️", val: 2 },
      { label: "15+ years", emoji: "🏚️", val: 3 },
    ],
  },
  {
    question: "Estimated repair cost vs. replacement cost?",
    options: [
      { label: "Under 25%", emoji: "✅", val: 0 },
      { label: "25–50%", emoji: "🟡", val: 1 },
      { label: "50–75%", emoji: "🟠", val: 2 },
      { label: "Over 75%", emoji: "🔴", val: 3 },
    ],
  },
] as const;

type Result = { verdict: string; color: string; detail: string };

function getResult(ageVal: number, costVal: number): Result {
  const score = ageVal + costVal;
  if (score <= 1) return {
    verdict: "Worth Repairing",
    color: "text-emerald-400",
    detail: "Young appliance, manageable repair cost — fix it. Factory-authorized repair with genuine OEM parts will extend its working life significantly.",
  };
  if (score <= 3) return {
    verdict: "Probably Worth Repairing",
    color: "text-amber-300",
    detail: "Likely still cost-effective to repair. We'll give you an honest assessment — if it doesn't make financial sense, we'll tell you.",
  };
  return {
    verdict: "Consider Replacing",
    color: "text-red-400",
    detail: "An older appliance with a high repair-to-replacement ratio may not be worth the investment. We can diagnose and give you a real number to work with.",
  };
}

export function RepairQuiz() {
  const [step, setStep] = useState(0);
  const [ageVal, setAgeVal] = useState(0);
  const [costVal, setCostVal] = useState(0);
  const [done, setDone] = useState(false);

  function pick(val: number) {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setAgeVal(val);
      setStep(2);
    } else {
      setCostVal(val);
      setDone(true);
    }
  }

  function restart() {
    setStep(0); setAgeVal(0); setCostVal(0); setDone(false);
  }

  const progress = done ? 100 : (step / steps.length) * 100;
  const result = getResult(ageVal, costVal);

  return (
    <div className="bg-primary-container/20 border border-primary/20 rounded-3xl p-8 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="w-full bg-white/10 rounded-full h-1.5 mb-8" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Quiz progress">
        <div className="bg-primary h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {!done ? (
        <div key={step} className="animate-in fade-in slide-in-from-right-4 duration-300">
          <p className="text-lg font-semibold text-on-surface mb-6">{steps[step].question}</p>
          <div className={`grid gap-3 ${steps[step].options.length > 4 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
            {steps[step].options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => pick(opt.val)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface border border-outline-variant/30 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-sm font-medium font-label text-on-surface group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200" aria-hidden>{opt.emoji}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500 text-center">
          <p className="text-sm text-on-surface-variant mb-2">Our recommendation:</p>
          <p className={`text-3xl font-bold font-headline mb-4 ${result.color}`}>{result.verdict}</p>
          <p className="text-on-surface-variant leading-relaxed mb-8 max-w-md mx-auto">{result.detail}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={`tel:${BUSINESS.phone}`} variant="primary">
              Call for a Free Estimate
            </Button>
            <Button onClick={restart} variant="ghost">
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
