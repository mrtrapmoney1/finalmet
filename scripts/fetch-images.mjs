// Downloads curated, free-license (Unsplash / Pexels) photos, optimizes them to
// self-hosted JPG sources (max 1920w, mozjpeg), and records intrinsic dimensions +
// a tiny blur placeholder in a manifest. next/image emits AVIF/WebP + responsive
// sizes from these sources at request time (see next.config images.formats).
//
// Run: node scripts/fetch-images.mjs
// License note: Unsplash (unsplash.com/license) and Pexels (pexels.com/license)
// both grant free commercial use with no attribution required and no watermark.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "images");

const U = (id, w = 1920) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fm=jpg&fit=max`;
const P = (id, w = 1920) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// name → { url, alt, credit }
// NOTE: names + alt verified against the actual full-resolution image content
// (a first pass mislabeled several because thumbnail crops differed from the full frame).
const IMAGES = [
  { name: "repair-hands", url: U("1581092918056-0c4c3acd3789"),
    alt: "A technician's hands working on the opened circuit board of an electronic device at a repair bench.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/-koZRchD5V8", license: "Unsplash License" } },
  { name: "control-room", url: U("1581092795360-fd1ca04f0952"),
    alt: "Technicians at a control desk lined with monitors and instrument readouts.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/control-room", license: "Unsplash License" } },
  { name: "circuit-board", url: U("1518770660439-4636190af475"),
    alt: "Macro view of a green printed circuit board with surface-mounted components.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/circuit-board", license: "Unsplash License" } },
  { name: "cpu-board", url: U("1555617981-dac3880eac6e"),
    alt: "Close-up of a processor seated in a motherboard socket.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/cpu-board", license: "Unsplash License" } },
  { name: "tools", url: U("1530124566582-a618bc2615dc"),
    alt: "An organized set of hand tools laid out on a workbench.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/tools", license: "Unsplash License" } },
  { name: "kitchen", url: U("1556911220-bff31c812dba"),
    alt: "A clean modern kitchen with built-in appliances.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/kitchen", license: "Unsplash License" } },
  { name: "washer", url: U("1626806787461-102c1bfaaea1"),
    alt: "A front-loading washing machine in a tidy laundry room.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/washer", license: "Unsplash License" } },
  { name: "tv-living", url: U("1461151304267-38535e780c79"),
    alt: "A modern flat-screen television on a media console in a living room.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/tv-living", license: "Unsplash License" } },
  { name: "display", url: U("1588508065123-287b28e013da"),
    alt: "Flat-panel displays on a desk showing a warm gradient.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/display", license: "Unsplash License" } },
  { name: "speaker", url: U("1545454675-3531b543be5d"),
    alt: "A studio monitor loudspeaker on a desk.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/speaker", license: "Unsplash License" } },
  { name: "bt-speaker", url: U("1558537348-c0f8e733989d"),
    alt: "A portable loudspeaker dramatically lit in red.",
    credit: { source: "Unsplash", url: "https://unsplash.com/photos/bt-speaker", license: "Unsplash License" } },
  { name: "electrical-panel", url: P("257736"),
    alt: "A hand testing connections on an electrical breaker panel.",
    credit: { source: "Pexels", url: "https://www.pexels.com/photo/257736/", license: "Pexels License" } },
];

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 metrotv-build" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const manifest = {};
  const credits = [];
  for (const img of IMAGES) {
    process.stdout.write(`• ${img.name} … `);
    try {
      const src = await fetchBuffer(img.url);
      const pipe = sharp(src).resize({ width: 1920, withoutEnlargement: true });
      const meta = await pipe.metadata();
      const jpg = await sharp(src)
        .resize({ width: 1920, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();
      const finalMeta = await sharp(jpg).metadata();
      await writeFile(path.join(OUT, `${img.name}.jpg`), jpg);
      const blur = await sharp(src).resize(16).webp({ quality: 40 }).toBuffer();
      manifest[img.name] = {
        src: `/images/${img.name}.jpg`,
        width: finalMeta.width,
        height: finalMeta.height,
        alt: img.alt,
        blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      };
      credits.push(
        `| \`${img.name}.jpg\` | ${finalMeta.width}×${finalMeta.height} | ${img.credit.source} | [link](${img.credit.url}) | ${img.credit.license} |`,
      );
      console.log(`ok ${finalMeta.width}×${finalMeta.height} (${(jpg.length / 1024) | 0}KB)`);
    } catch (e) {
      console.log(`FAIL ${e.message}`);
    }
  }
  await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
  const md = `# Image credits

All photography below is self-hosted from free-license sources that permit commercial use
with **no attribution required and no watermark**. Sources: Unsplash (<https://unsplash.com/license>)
and Pexels (<https://www.pexels.com/license/>). Originals were downsized to ≤1920px and re-encoded;
\`next/image\` serves AVIF/WebP + responsive sizes at request time. Photos are illustrative only —
not depictions of Metro TV staff, customers, or specific jobs.

| File | Intrinsic size | Source | Original | License |
| --- | --- | --- | --- | --- |
${credits.join("\n")}
`;
  await writeFile(path.join(process.cwd(), "standards", "image-credits.md"), md);
  console.log(`\nManifest + credits written. ${Object.keys(manifest).length}/${IMAGES.length} images.`);
}

main();
