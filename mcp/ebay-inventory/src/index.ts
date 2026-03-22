import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "mcp-ebay-inventory", version: "0.1.0" },
  { capabilities: { tools: {}, resources: {} } },
);

// Tool: search-inventory
server.setRequestHandler("tools/list" as never, async () => ({
  tools: [
    {
      name: "search-inventory",
      description: "Search eBay store inventory by keyword",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search keywords (e.g., 'samsung drain pump OEM')",
          },
          store: { type: "string", description: "eBay store ID" },
          limit: { type: "number", description: "Max results (default 3)" },
        },
        required: ["query"],
      },
    },
    {
      name: "get-part-details",
      description: "Get details for a specific eBay listing",
      inputSchema: {
        type: "object",
        properties: {
          itemId: { type: "string", description: "eBay item ID" },
        },
        required: ["itemId"],
      },
    },
    {
      name: "check-availability",
      description: "Check if a part is in stock",
      inputSchema: {
        type: "object",
        properties: {
          itemId: { type: "string", description: "eBay item ID" },
        },
        required: ["itemId"],
      },
    },
  ],
}));

// Tool handler — returns mock data until real eBay creds are configured
server.setRequestHandler(
  "tools/call" as never,
  async (request: { params: { name: string; arguments: Record<string, string> } }) => {
    const { name, arguments: args } = request.params;

    if (name === "search-inventory") {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              parts: [
                {
                  name: `${args.query} — OEM Replacement`,
                  price: "$45.99",
                  condition: "New",
                  url: `https://www.ebay.com/str/${process.env.EBAY_STORE_ID || "metro-parts"}`,
                  inStock: true,
                },
              ],
              note: "Mock data — configure EBAY_APP_ID for live inventory",
            }),
          },
        ],
      };
    }

    return { content: [{ type: "text", text: "Unknown tool" }] };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
