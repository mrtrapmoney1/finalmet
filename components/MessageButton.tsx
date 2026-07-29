"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/business";

const MOBILE_QUERY = "(pointer: coarse), (max-width: 768px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getHref = () =>
  window.matchMedia(MOBILE_QUERY).matches ? BUSINESS.smsHref : "/contact";

// Server + hydration pass always render the crawlable /contact link; React swaps
// in the real value right after hydration without a mismatch warning.
const getServerHref = () => "/contact";

interface MessageButtonProps {
  children?: ReactNode;
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
}

/**
 * "Send a message" CTA. On a desktop it links to the full contact form; on a
 * phone (or any coarse-pointer device) it opens the native messaging app to our
 * texting line, recipient prefilled and ready to write.
 *
 * It renders the /contact link on the server (safe default + crawlable), then
 * swaps to the `sms:` link after mount once we can detect a touch device — so
 * there's no hydration mismatch.
 */
export function MessageButton({
  children = "Send a message",
  variant = "outline",
  size = "lg",
  className,
}: MessageButtonProps) {
  const href = useSyncExternalStore(subscribe, getHref, getServerHref);

  return (
    <Button href={href} variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
}
