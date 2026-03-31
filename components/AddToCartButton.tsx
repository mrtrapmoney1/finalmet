"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { MAX_QTY } from "@/components/CartProvider";

interface Props {
  id: string;
  mpn: string;
  title: string;
  price: number;
}

export function AddToCartButton({ id, mpn, title, price }: Props) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart({ id, mpn, title, price }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Quantity selector */}
      <div className="flex items-center border border-outline-variant/50 rounded-full overflow-hidden bg-surface">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          className="px-3 py-2 text-on-surface-variant hover:bg-surface-container transition disabled:opacity-30"
          aria-label="Decrease quantity"
        >
          <span className="material-symbols-outlined text-base leading-none" aria-hidden="true">remove</span>
        </button>
        <span className="w-8 text-center text-sm font-semibold text-on-surface select-none">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
          disabled={qty >= MAX_QTY}
          className="px-3 py-2 text-on-surface-variant hover:bg-surface-container transition disabled:opacity-30"
          aria-label="Increase quantity"
        >
          <span className="material-symbols-outlined text-base leading-none" aria-hidden="true">add</span>
        </button>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        className="flex-1 flex items-center justify-center gap-2 bg-secondary text-on-secondary px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
      >
        <span className="material-symbols-outlined text-lg" aria-hidden="true">
          {added ? "check" : "shopping_cart"}
        </span>
        {added ? "Added to Cart!" : "Add to Cart"}
      </button>
    </div>
  );
}
