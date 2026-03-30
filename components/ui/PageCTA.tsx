import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

interface PageCTAProps {
  heading: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryExternal?: boolean;
  secondaryIcon?: string | null;
}

export function PageCTA({
  heading,
  body,
  primaryLabel = "Schedule Service",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  secondaryExternal = false,
  secondaryIcon = "phone",
}: PageCTAProps) {
  const resolvedSecondaryLabel = secondaryLabel ?? `Call ${BUSINESS.phone}`;
  const resolvedSecondaryHref = secondaryHref ?? `tel:${BUSINESS.phone}`;

  return (
    <div className="bg-primary rounded-2xl p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <p className="text-white font-bold font-headline text-xl mb-1">{heading}</p>
        <p className="text-white/70 text-sm max-w-md">{body}</p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button href={primaryHref} variant="ghost" className="border-white/30 text-white hover:bg-white/10">
          {primaryLabel}
        </Button>
        <Button
          href={resolvedSecondaryHref}
          variant="ghost"
          external={secondaryExternal}
          className="border-white/30 text-white hover:bg-white/10"
        >
          {secondaryIcon && (
            <span className="material-symbols-outlined text-base">{secondaryIcon}</span>
          )}
          {resolvedSecondaryLabel}
        </Button>
      </div>
    </div>
  );
}
