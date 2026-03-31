"use client";

import { useState } from "react";
import { SERVICE_REGIONS } from "@/lib/zip-codes";

// Geographic approximate positions within Nebraska SVG viewBox 0 0 520 300
const REGION_POSITIONS: Record<string, { cx: number; cy: number }> = {
  "Lincoln":                { cx: 375, cy: 195 },
  "Omaha":                  { cx: 460, cy: 160 },
  "Council Bluffs":         { cx: 480, cy: 175 },
  "Southeast Nebraska":     { cx: 385, cy: 240 },
  "Grand Island":           { cx: 230, cy: 170 },
  "North Omaha Suburbs":    { cx: 455, cy: 130 },
};

export function NebraskaMap() {
  const [active, setActive] = useState<string | null>(null);
  const activeRegion = SERVICE_REGIONS.find(r => r.name === active);

  return (
    <div className="rounded-2xl overflow-hidden border border-outline-variant/20 shadow-ambient bg-surface-container-low">
      {/* SVG Map */}
      <div className="relative">
        <svg
          viewBox="0 0 520 300"
          className="w-full"
          style={{ maxHeight: 340 }}
          aria-label="Nebraska service area map"
          role="img"
        >
          {/* Nebraska state outline — simplified shape with panhandle */}
          <path
            d="M 10,10 L 220,10 L 220,80 L 510,80 L 510,275 L 10,275 Z"
            fill="#e8f0fe"
            stroke="#1a4494"
            strokeWidth="2"
            opacity="0.4"
          />
          {/* Iowa border (Council Bluffs) — small extension */}
          <path
            d="M 510,80 L 515,80 L 515,200 L 510,200"
            fill="#fce8d5"
            stroke="#ae3100"
            strokeWidth="1.5"
            strokeDasharray="4,3"
            opacity="0.6"
          />
          {/* State label */}
          <text x="120" y="180" fontSize="13" fill="#1a4494" opacity="0.35" fontFamily="sans-serif" fontWeight="bold">
            NEBRASKA
          </text>
          <text x="502" y="155" fontSize="9" fill="#ae3100" opacity="0.5" fontFamily="sans-serif" transform="rotate(90, 502, 155)">
            IOWA
          </text>

          {/* Service region circles */}
          {SERVICE_REGIONS.map((region) => {
            const pos = REGION_POSITIONS[region.name];
            if (!pos) return null;
            const isActive = active === region.name;
            return (
              <g
                key={region.name}
                onClick={() => setActive(isActive ? null : region.name)}
                className="cursor-pointer"
                role="button"
                aria-label={`${region.name} — ${region.zips.length} zip codes`}
              >
                {/* Pulse ring */}
                {isActive && (
                  <circle cx={pos.cx} cy={pos.cy} r="28" fill="#ae3100" opacity="0.15" />
                )}
                {/* Main dot */}
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r="16"
                  fill={isActive ? "#ae3100" : "#1a4494"}
                  opacity={isActive ? 1 : 0.75}
                  stroke="white"
                  strokeWidth="2"
                />
                {/* Zip count */}
                <text
                  x={pos.cx}
                  y={pos.cy + 4}
                  textAnchor="middle"
                  fontSize="9"
                  fill="white"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  {region.zips.length}
                </text>
                {/* Region name label */}
                <text
                  x={pos.cx}
                  y={pos.cy + 28}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill={isActive ? "#ae3100" : "#1a4494"}
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  opacity="0.9"
                >
                  {region.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 left-4 flex items-center gap-4 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary inline-block opacity-75" />
            In-home service region
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
            Selected
          </span>
        </div>
      </div>

      {/* Detail card — shows when a region is clicked */}
      <div className="border-t border-outline-variant/20 px-6 py-4 min-h-[100px]">
        {activeRegion ? (
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-on-surface font-headline">{activeRegion.name}</h3>
                <span className="text-xs font-semibold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                  {activeRegion.zips.length} zip codes
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-3">{activeRegion.description}</p>
              <div className="flex flex-wrap gap-1">
                {activeRegion.zips.slice(0, 10).map((zip) => (
                  <span key={zip} className="text-xs bg-surface px-2 py-0.5 rounded border border-outline-variant/20 text-on-surface-variant font-mono">
                    {zip}
                  </span>
                ))}
                {activeRegion.zips.length > 10 && (
                  <span className="text-xs text-on-surface-variant px-1 py-0.5">
                    +{activeRegion.zips.length - 10} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">touch_app</span>
            Tap a region to see coverage details and zip codes.
          </p>
        )}
      </div>
    </div>
  );
}
