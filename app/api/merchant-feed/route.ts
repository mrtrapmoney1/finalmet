import { OEM_PARTS } from "@/lib/parts";
import { BUSINESS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  const rssHeaders = {
    "Content-Type": "application/xml",
    "Cache-Control": "s-maxage=86400, stale-while-revalidate", // cache for a day
  };

  const domain = BUSINESS.url;

  const xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${BUSINESS.name} Parts Catalog</title>
    <link>${domain}/products</link>
    <description>Genuine OEM appliance repair parts from ${BUSINESS.name}</description>
    ${OEM_PARTS.map((part) => `
    <item>
      <g:id>${part.id}</g:id>
      <g:title><![CDATA[${part.title}]]></g:title>
      <g:description><![CDATA[${part.description}]]></g:description>
      <g:link>${domain}/products/${part.slug}</g:link>
      <g:image_link>${part.image_link}</g:image_link>
      <g:condition>${part.condition}</g:condition>
      <g:availability>${part.availability}</g:availability>
      <g:price>${part.price.toFixed(2)} USD</g:price>
      <g:gtin></g:gtin>
      <g:mpn>${part.mpn}</g:mpn>
      <g:brand><![CDATA[${part.brand}]]></g:brand>
      <g:google_product_category><![CDATA[${part.category}]]></g:google_product_category>
    </item>`).join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, { headers: rssHeaders });
}
