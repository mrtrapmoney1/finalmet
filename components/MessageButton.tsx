"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/business";

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
  const [href, setHref] = useState("/contact");

  useEffect(() => {
    const mobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches;
    if (mobile) setHref(BUSINESS.smsHref);
  }, []);

  return (
    <Button href={href} variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
}
