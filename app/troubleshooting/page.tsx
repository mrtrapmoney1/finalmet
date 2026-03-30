import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { PageCTA } from "@/components/ui/PageCTA";

export const metadata = buildMetadata({
  title: "Troubleshooting Guides — Appliance, TV, Audio & Commercial",
  description:
    "Diagnose common appliance, TV, audio, and commercial microwave issues. Expert troubleshooting guides from Metro TV & Appliances, Lincoln NE.",
  path: "/troubleshooting",
  keywords: ["appliance troubleshooting", "TV repair guide", "error code lookup"],
});

const guides = [
  {
    title: "Appliance Troubleshooting",
    href: "/troubleshooting/appliances",
    icon: "home_repair_service",
    description:
      "Refrigerators, washers, dryers, dishwashers, ranges, and induction cooktops. Diagnose common faults before calling for repair.",
  },
  {
    title: "TV Troubleshooting",
    href: "/troubleshooting/tv",
    icon: "tv",
    description:
      "Black screen, lines, flickering, sound problems, and smart TV issues. Brand-specific guides for Samsung, LG, Sony, and more.",
  },
  {
    title: "Audio Troubleshooting",
    href: "/troubleshooting/audio",
    icon: "speaker",
    description:
      "Receivers, amplifiers, speakers, turntables, soundbars, and vintage equipment. Check common audio issues at home.",
  },
  {
    title: "Commercial Microwave Troubleshooting",
    href: "/troubleshooting/commercial",
    icon: "microwave_gen",
    description:
      "Not heating, sparking, error codes, and door issues. Safe external checks for restaurant and business equipment.",
  },
];

export default function TroubleshootingHub() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Self-Help Resources
        </p>
        <h1 className="text-display-lg font-headline font-bold text-on-surface mb-4">
          Troubleshooting Guides
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mb-12">
          Diagnose common problems before calling for service. Some issues have
          simple fixes you can handle yourself — for everything else, we are
          here to help.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="bg-surface-container-low rounded-2xl p-8 hover:shadow-ambient transition-shadow group"
            >
              <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">
                {g.icon}
              </span>
              <h2 className="text-xl font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                {g.title}
              </h2>
              <p className="text-body-lg text-on-surface-variant">
                {g.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4">
                View guide
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <PageCTA
            heading="Issue too complex to self-diagnose?"
            body="Our factory-authorized technicians diagnose to the root cause. Starting at $42.90 for drop-off."
            primaryLabel="Schedule Service"
            primaryHref="/contact"
          />
        </div>
      </div>
    </section>
  );
}
