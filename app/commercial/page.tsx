import { ServiceDetail } from "@/components/ServiceDetail";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Commercial Microwave Repair, Lincoln",
  description:
    "Authorized commercial microwave repair for restaurants and food service — Amana, Sharp, Panasonic and Menumaster. Built for busy kitchens.",
  path: "/commercial",
});

export default function Page() {
  return <ServiceDetail slug="commercial" />;
}
