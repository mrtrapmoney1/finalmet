"use client";

interface Part {
  name: string;
  price: string;
  condition: string;
  url: string;
  inStock: boolean;
}

export function RelevantParts({ parts }: { parts: Part[] }) {
  return (
    <div className="mt-6 p-4 bg-surface-container-low rounded-2xl">
      <p className="text-sm font-semibold font-headline mb-3">
        Available OEM Parts
      </p>
      <div className="space-y-3">
        {parts.map((part, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-surface rounded-xl"
          >
            <div>
              <p className="text-sm font-medium">{part.name}</p>
              <p className="text-xs text-on-surface-variant">
                {part.condition} — {part.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{part.price}</p>
              {part.url !== "#" && (
                <a
                  href={part.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary hover:underline"
                >
                  View on eBay
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartsSkeleton() {
  return (
    <div className="mt-6 p-4 bg-surface-container-low rounded-2xl animate-pulse">
      <div className="h-4 bg-surface-container-highest rounded w-32 mb-3" />
      <div className="h-16 bg-surface-container-highest rounded-xl" />
    </div>
  );
}
