"use client";

import { useState } from "react";
import { SERVICE_REGIONS } from "@/lib/zip-codes";

// Geographic approximate positions within Nebraska SVG viewBox 0 0 520 300
const REGION_POSITIONS: Record<string, { cx: number; cy: number }> = {
  "Lincoln":             { cx: 430, cy: 203 },
  "Omaha":               { cx: 468, cy: 160 },
  "Council Bluffs":      { cx: 500, cy: 155 },
  "Southeast Nebraska":  { cx: 415, cy: 248 },
  "Grand Island":        { cx: 336, cy: 194 },
  "North Omaha Suburbs": { cx: 465, cy: 128 },
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
          {/* Nebraska state outline — correct shape with panhandle on west side
              Panhandle is a narrow strip along the top-west; the notch/step-down
              is at the bottom of the panhandle where it meets the main body. */}
          <path
            d="M 10,10 L 510,10 L 510,275 L 70,275 L 70,187 L 10,187 Z"
            fill="#e8f0fe"
            stroke="#1a4494"
            strokeWidth="2"
            opacity="0.4"
          />

          {/* Missouri River — curved blue line along the eastern border */}
          <path
            d="M 510,60 Q 505,100 510,150 Q 508,200 500,275"
            stroke="#6baed6"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />

          {/* State abbreviation — large, centered, subtle watermark */}
          <text
            x="260"
            y="145"
            fontSize="28"
            fill="#1a4494"
            opacity="0.12"
            fontFamily="sans-serif"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="8"
          >
            NEBRASKA
          </text>

          {/* Panhandle label */}
          <text
            x="35"
            y="100"
            fontSize="7.5"
            fill="#1a4494"
            opacity="0.4"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            PANHANDLE
          </text>

          {/* Neighbor state labels */}
          <text x="80"  y="8"   fontSize="8" fill="#999" opacity="0.5" fontFamily="sans-serif" textAnchor="middle">SD</text>
          <text x="6"   y="100" fontSize="8" fill="#999" opacity="0.5" fontFamily="sans-serif" transform="rotate(-90, 6, 100)">WY</text>
          <text x="35"  y="288" fontSize="8" fill="#999" opacity="0.5" fontFamily="sans-serif" textAnchor="middle">CO</text>
          <text x="260" y="288" fontSize="8" fill="#999" opacity="0.5" fontFamily="sans-serif" textAnchor="middle">KS</text>
          <text x="490" y="288" fontSize="8" fill="#999" opacity="0.5" fontFamily="sans-serif" textAnchor="middle">MO</text>
          <text x="512" y="180" fontSize="8" fill="#999" opacity="0.5" fontFamily="sans-serif" textAnchor="middle">IA</text>

          {/* Reference city dots — orientation only, not interactive */}
          {/* Lincoln */}
          <circle cx="430" cy="203" r="4" fill="#666" opacity="0.4" />
          <text x="430" y="215" fontSize="8" fill="#555" opacity="0.6" fontFamily="sans-serif" textAnchor="middle">Lincoln</text>

          {/* Omaha */}
          <circle cx="468" cy="160" r="4" fill="#666" opacity="0.4" />
          <text x="468" y="172" fontSize="8" fill="#555" opacity="0.6" fontFamily="sans-serif" textAnchor="middle">Omaha</text>

          {/* Grand Island */}
          <circle cx="336" cy="194" r="4" fill="#666" opacity="0.4" />
          <text x="336" y="206" fontSize="8" fill="#555" opacity="0.6" fontFamily="sans-serif" textAnchor="middle">Grand Island</text>

          {/* Service region interactive circles — rendered last (on top) */}
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
