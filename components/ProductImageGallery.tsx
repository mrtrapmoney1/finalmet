"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
  mpn: string;
  inStock: boolean;
}

export function ProductImageGallery({ images, alt, mpn, inStock }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden aspect-square">
        <Image
          src={images[active]}
          alt={`${alt} — photo ${active + 1}`}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={active === 0}
        />
        {inStock && (
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">
            In Stock
          </span>
        )}
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full font-mono">
            {active + 1}/{images.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === active
                  ? "border-primary shadow-ambient"
                  : "border-outline-variant/30 hover:border-primary/50"
              }`}
              aria-label={`View photo ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      <p className="text-xs font-mono text-on-surface-variant/50 text-center">{mpn}</p>
    </div>
  );
}
