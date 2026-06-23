import { ServiceDetail } from "@/components/ServiceDetail";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Audio Equipment Repair — Lincoln, NE",
  description:
    "Our deepest specialty: receiver, amplifier and turntable repair. BJTs, RIAA phono preamps, ESR checks, VTA and azimuth alignment. Drop-off; turnaround typically 1–3 months.",
  path: "/audio",
});

export default function Page() {
  return <ServiceDetail slug="audio" />;
}
