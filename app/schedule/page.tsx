import { buildMetadata } from "@/lib/metadata";
import { ScheduleForm } from "@/components/ScheduleForm";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Schedule Service — Factory-Authorized Repair",
  description: `Schedule factory-authorized appliance, TV, or commercial microwave repair. ${BUSINESS.diagnostic} diagnostic fee applied to repair. Call (402) 466-9090 or book online.`,
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
          day. {BUSINESS.diagnostic} diagnostic fee is applied to the total if
          you proceed with repair.
        </p>
        <ScheduleForm />
      </div>
    </section>
  );
}
