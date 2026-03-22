import { NextRequest, NextResponse } from "next/server";

export interface Part {
  name: string;
  price: string;
  condition: string;
  url: string;
  inStock: boolean;
}

export async function GET(req: NextRequest) {
  const component = req.nextUrl.searchParams.get("component");
  const brand = req.nextUrl.searchParams.get("brand");

  if (!component || !brand) {
    return NextResponse.json({ parts: [] });
  }

  // TODO: Wire to MCP server when eBay creds are configured
  // For now, return mock data to prove the integration pattern
  const mockParts: Part[] = [
    {
      name: `${brand.charAt(0).toUpperCase() + brand.slice(1)} ${component.replace(/-/g, " ")} — OEM`,
      price: "$45.99",
      condition: "New",
      url: "#",
      inStock: true,
    },
  ];

  return NextResponse.json({ parts: mockParts });
}
