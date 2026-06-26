import { ServiceDetail } from "@/components/ServiceDetail";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Appliance Repair — Lincoln, NE",
  description:
    "Factory-authorized in-home appliance repair across 200+ Nebraska & Iowa zip codes — washers, dryers, refrigerators, dishwashers and ranges, with original parts.",
  path: "/appliance",
});

export default function Page() {
  return <ServiceDetail slug="appliance" />;
}
