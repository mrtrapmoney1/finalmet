import type { Metadata } from "next";
import { ServiceDetail } from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Commercial Microwave Repair — Lincoln, NE",
  description:
    "Authorized commercial microwave repair for restaurants and food service — Amana, Sharp, Panasonic and Menumaster. Built for busy kitchens.",
};

export default function Page() {
  return <ServiceDetail slug="commercial" />;
}
