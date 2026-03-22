import { buildMetadata } from "@/lib/metadata";
import { ScheduleForm } from "@/components/ScheduleForm";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Schedule Service — Factory-Authorized Repair",
  description: `Schedule factory-authorized appliance, TV, or commercial microwave repair. Diagnostic fee from ${BUSINESS.diagnosticDropOff} (drop-off) or ${BUSINESS.diagnosticLincolnOmaha} (in-home), deductible toward repair. Call ${BUSINESS.phone} or book online.`,
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-display-md font-headline font-bold mb-4">
          Schedule Service
        </h1>
        <p
          className="text-body-md text-on-surface-variant mb-8"
          data-speakable
        >
          Request factory-authorized repair service from Metro TV &amp;
          Appliances. We&apos;ll confirm your appointment within one business
          day. Diagnostic starts at {BUSINESS.diagnosticDropOff} (drop-off) or{" "}
          {BUSINESS.diagnosticLincolnOmaha} (in-home) — deductible toward your repair.
        </p>
        <ScheduleForm />
      </div>
    </section>
  );
}
