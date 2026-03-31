import { OEM_PARTS } from "@/lib/parts";
import { BUSINESS } from "@/lib/constants";
import { NextResponse } from "next/server";

// Maps internal availability values to Google's required strings
function googleAvailability(a: string): string {
  switch (a) {
    case "in_stock":   return "in stock";
    case "out_of_stock": return "out of stock";
    case "preorder":   return "preorder";
    case "backorder":  return "backorder";
    default:           return "out of stock";
  }
}

export async function GET() {
  const domain = BUSINESS.url;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${BUSINESS.name} Parts Catalog</title>
    <link>${domain}/products</link>
    <description>Genuine OEM appliance repair parts from ${BUSINESS.name}</description>
    ${OEM_PARTS.map((part) => {
      const weight = part.specs?.["Weight"] ?? "";
      return `
    <item>
      <g:id>${part.id}</g:id>
      <g:title><![CDATA[${part.title}]]></g:title>
      <g:description><![CDATA[${part.description}]]></g:description>
      <g:link>${domain}/products/${part.slug}</g:link>
      <g:image_link>${part.image_link}</g:image_link>
      <g:condition>${part.condition}</g:condition>
      <g:availability>${googleAvailability(part.availability)}</g:availability>
      <g:price>${part.price.toFixed(2)} USD</g:price>
      <g:brand><![CDATA[${part.brand}]]></g:brand>
      <g:mpn>${part.mpn}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category><![CDATA[${part.category}]]></g:google_product_category>${weight ? `\n      <g:shipping_weight>${weight}</g:shipping_weight>` : ""}
    </item>`;
    }).join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
