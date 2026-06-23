import { ServiceDetail } from "@/components/ServiceDetail";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "TV Repair — Lincoln, NE",
  description:
    "Board-level TV repair at our Lincoln shop — PSU, T-Con, LED driver and A-board work for homes and the local businesses that run screens all day.",
  path: "/tv",
});

export default function Page() {
  return <ServiceDetail slug="tv" />;
}
