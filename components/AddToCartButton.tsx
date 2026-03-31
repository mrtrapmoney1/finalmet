"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

interface Props {
  id: string;
  mpn: string;
  title: string;
  price: number;
}

export function AddToCartButton({ id, mpn, title, price }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart({ id, mpn, title, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      onClick={handleClick}
      className="ml-auto flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
    >
      <span className="material-symbols-outlined text-lg drop-shadow-sm" aria-hidden="true">
        {added ? "check" : "shopping_cart"}
      </span>
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
