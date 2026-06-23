import type { Metadata } from "next";
import { ServiceDetail } from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "TV Repair — Lincoln, NE",
  description:
    "Board-level TV repair at our Lincoln shop — PSU, T-Con, LED driver and A-board work for homes and the local businesses that run screens all day.",
};

export default function Page() {
  return <ServiceDetail slug="tv" />;
}
