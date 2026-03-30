import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-20 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <p className="text-6xl font-bold font-headline text-primary mb-4">
          404
        </p>
        <h1 className="text-display-sm font-headline font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-body-md text-on-surface-variant mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button href="/" variant="primary">
            Go Home
          </Button>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
        <div className="text-left bg-surface-container-low rounded-2xl p-6">
          <p className="text-sm font-semibold font-headline mb-3">
            Popular pages:
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/appliance"
                className="text-sm text-primary hover:underline"
              >
                Appliance Repair
              </Link>
            </li>
            <li>
              <Link
                href="/tv"
                className="text-sm text-primary hover:underline"
              >
                TV Repair
              </Link>
            </li>
            <li>
              <Link
                href="/service-area"
                className="text-sm text-primary hover:underline"
              >
                Service Area
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-sm text-primary hover:underline"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/schedule"
                className="text-sm text-primary hover:underline"
              >
                Schedule Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
