"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: Props) {
  const { items, count, subtotal, removeFromCart, updateQuantity, clearCart } = useCart();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 h-full z-50 w-full max-w-sm bg-surface shadow-2xl flex flex-col"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/30">
          <h2 className="text-lg font-bold font-headline text-on-surface">
            Cart
            {count > 0 && (
              <span className="ml-2 text-sm font-normal text-on-surface-variant">({count} item{count !== 1 ? "s" : ""})</span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition"
            aria-label="Close cart"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
              <span className="material-symbols-outlined text-5xl text-outline" aria-hidden="true">shopping_cart</span>
              <p className="text-on-surface-variant text-sm">Your cart is empty.</p>
              <Link
                href="/products"
                onClick={onClose}
                className="text-sm text-primary font-medium hover:underline"
              >
                Browse OEM Parts →
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-surface-container-low rounded-xl p-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-on-surface truncate">{item.title}</p>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">MPN: {item.mpn}</p>
                  <p className="text-sm font-bold text-on-surface mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-on-surface-variant hover:text-error transition"
                    aria-label={`Remove ${item.title}`}
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">delete</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition text-sm"
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="text-sm font-medium text-on-surface w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition text-sm"
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-outline-variant/30 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-on-surface-variant">Subtotal</span>
              <span className="text-xl font-bold font-headline text-on-surface">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Parts available for in-store pickup at 1107 N. Cotner Blvd, Lincoln, NE. Call to confirm stock.
            </p>
            <a
              href={`tel:4024669090`}
              className="flex items-center justify-center gap-2 w-full bg-secondary text-on-secondary rounded-full py-3 text-sm font-semibold hover:opacity-90 transition"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">phone</span>
              Call to Order — (402) 466-9090
            </a>
            <button
              onClick={clearCart}
              className="w-full text-xs text-on-surface-variant hover:text-error transition text-center py-1"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
