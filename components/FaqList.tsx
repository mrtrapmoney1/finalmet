"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import styles from "./FaqList.module.css";

export interface Faq {
  q: string;
  a: string;
  link?: { href: string; label: string };
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

/**
 * The FAQ list with a type-to-filter box.
 *
 * Progressive enhancement: this renders on the server with every question
 * present and expanded-on-demand exactly as before, so no-JS visitors and
 * crawlers get the full content. The filter box is only shown once mounted —
 * a search field that silently does nothing without JS is worse than none.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  // Deep links (/faq#what-does-a-diagnostic-cost) should land with that answer
  // already open rather than making the visitor hunt for it and click again.
  // Opened by touching the DOM node directly rather than through state: <details>
  // owns its own open/closed state natively, so mirroring it into React would
  // fight the element and force a re-render for something the browser handles.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash || !faqs.some((f) => slugify(f.q) === hash)) return;
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (!(el instanceof HTMLDetailsElement)) return;
      el.open = true;
      el.scrollIntoView({ block: "center" });
    });
    return () => cancelAnimationFrame(id);
  }, [faqs]);

  const terms = useMemo(
    () => normalize(query).split(/\s+/).filter(Boolean),
    [query],
  );

  const matches = useMemo(() => {
    if (terms.length === 0) return faqs;
    // Every term must appear somewhere in the question or answer — an AND match
    // keeps "warranty cost" from returning every question containing either word.
    return faqs.filter((f) => {
      const haystack = normalize(`${f.q} ${f.a}`);
      return terms.every((t) => haystack.includes(t));
    });
  }, [faqs, terms]);

  return (
    <div className={styles.wrap}>
      {/* Hidden until <html class="js"> is set (the layout's pre-paint script), so
          a no-JS visitor never sees a search box that can't do anything. Same
          progressive-enhancement hook the scroll reveals use. */}
      <div className={styles.searchRow}>
          <label htmlFor={inputId} className={styles.searchLabel}>
            Search questions
          </label>
          <div className={styles.searchBox}>
            <Icon name="search" size={18} className={styles.searchIcon} />
            <input
              id={inputId}
              type="search"
              className={styles.search}
              placeholder="e.g. diagnostic, warranty, turnaround"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className={styles.clear}
                onClick={() => setQuery("")}
              >
                Clear<span className={styles.srOnly}> search</span>
              </button>
            )}
          </div>
          {/* Announced politely so a screen-reader user hears the result count
              change as they type, instead of silently filtering underneath them. */}
          <p className={styles.count} role="status" aria-live="polite">
            {query
              ? `${matches.length} of ${faqs.length} question${matches.length === 1 ? "" : "s"} match`
              : ""}
          </p>
      </div>

      <div className={styles.list} ref={listRef}>
        {matches.map((f) => {
          const slug = slugify(f.q);
          return (
            <details
              key={f.q}
              id={slug}
              className={styles.item}
              // `toggle` fires for open AND close; only the open is interesting.
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) {
                  track("faq_expand", { link_position: "faq", label: f.q });
                }
              }}
              /* Open state is owned by the element itself; the deep-link effect
                 above sets it directly on the DOM node when the URL has a hash. */
            >
              {/* The +/− affordance is the ::after on .q, matching the rest of
                  the site's accordions — no icon element needed. */}
              <summary className={styles.q}>{f.q}</summary>
              <div className={styles.a}>
                <p>{f.a}</p>
                {f.link && (
                  <p>
                    {f.link.href.startsWith("http") ? (
                      <a
                        href={f.link.href}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {f.link.label}
                      </a>
                    ) : (
                      <Link href={f.link.href} className={styles.link}>
                        {f.link.label}
                      </Link>
                    )}
                  </p>
                )}
              </div>
            </details>
          );
        })}

        {matches.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>
              No question matches &ldquo;{query}&rdquo;.
            </p>
            <p className={styles.emptyBody}>
              That doesn&apos;t mean we can&apos;t answer it — give us a call and
              we&apos;ll talk it through.
            </p>
            <a href={BUSINESS.phoneHref} className={styles.emptyPhone}>
              <Icon name="phone" size={18} />
              {BUSINESS.phone}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
