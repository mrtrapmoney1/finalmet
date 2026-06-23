import type { Metadata } from "next";
import { ServiceDetail } from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Audio Equipment Repair — Lincoln, NE",
  description:
    "Our deepest specialty: receiver, amplifier and turntable repair. BJTs, RIAA phono preamps, ESR checks, VTA and azimuth alignment. Drop-off; turnaround typically 1–3 months.",
};

export default function Page() {
  return <ServiceDetail slug="audio" />;
}
