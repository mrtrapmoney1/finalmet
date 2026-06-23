import type { Metadata } from "next";
import { ServiceDetail } from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Appliance Repair — Lincoln, NE",
  description:
    "Factory-authorized in-home appliance repair across 200+ Nebraska & Iowa zip codes. Washers, dryers, refrigerators, dishwashers and ranges, repaired with original parts.",
};

export default function Page() {
  return <ServiceDetail slug="appliance" />;
}
