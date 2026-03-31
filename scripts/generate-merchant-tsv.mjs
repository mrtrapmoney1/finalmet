/**
 * Regenerates public/merchant-feed.tsv from lib/parts.ts data.
 * Run with:  node scripts/generate-merchant-tsv.mjs
 *
 * Upload the output file to Google Merchant Center:
 *   Merchant Center → Products → Feeds → Upload a file → Select merchant-feed.tsv
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Inline constants (mirrors lib/constants.ts and lib/parts.ts) ───────────
// Keep in sync with those files when you make changes.

const DOMAIN = "https://metrotv-audiotech.com";

/** @type {import('../lib/parts.ts').Part[]} */
const OEM_PARTS = (await import("../lib/parts.ts", { with: { type: "json" } }).catch(async () => {
  // Fallback: read via dynamic import of compiled JS if tsx not available
  const mod = await import("../lib/parts.js").catch(() => null);
  return mod ?? { default: { OEM_PARTS: [] } };
}));

// ── Simple re-import using tsx ─────────────────────────────────────────────
// This script is intended to be run via:  npx tsx scripts/generate-merchant-tsv.mjs
// If you don't have tsx:  npm i -D tsx

import { createRequire } from "module";
const require = createRequire(import.meta.url);

let parts;
try {
  // tsx registers ts loader so this works when run via: npx tsx scripts/generate-merchant-tsv.mjs
  const mod = require("../lib/parts");
  parts = mod.OEM_PARTS;
} catch {
  console.error("Could not load lib/parts. Run this script with: npx tsx scripts/generate-merchant-tsv.mjs");
  process.exit(1);
}

function googleAvailability(a) {
  switch (a) {
    case "in_stock":    return "in stock";
    case "out_of_stock": return "out of stock";
    case "preorder":    return "preorder";
    case "backorder":   return "backorder";
    default:            return "out of stock";
  }
}

function esc(str) {
  // TSV fields must not contain tabs or newlines
  return String(str ?? "").replace(/\t/g, " ").replace(/\n/g, " ").replace(/\r/g, "");
}

const COLS = [
  "id", "title", "description", "link", "image_link",
  "condition", "price", "availability", "brand", "mpn",
  "google_product_category", "identifier_exists", "shipping_weight",
];

const rows = parts.map((p) => [
  esc(p.id),
  esc(p.title),
  esc(p.description),
  esc(`${DOMAIN}/products/${p.slug}`),
  esc(p.image_link),
  esc(p.condition),
  esc(`${p.price.toFixed(2)} USD`),
  esc(googleAvailability(p.availability)),
  esc(p.brand),
  esc(p.mpn),
  esc(p.category),
  "no",
  esc(p.specs?.["Weight"] ?? ""),
].join("\t"));

const tsv = [COLS.join("\t"), ...rows].join("\n") + "\n";

const out = resolve(__dirname, "../public/merchant-feed.tsv");
writeFileSync(out, tsv, "utf8");
console.log(`✓ Wrote ${rows.length} product(s) → ${out}`);
