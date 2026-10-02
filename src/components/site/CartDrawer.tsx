import React from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart, inr } from "@/lib/cart";
import { useNavigate } from "react-router-dom";

export function CartDrawer() {
  const navigate = useNavigate();
  const {
    items = [], // Fallback empty array taaki .length crash na kare
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    totalAmount = 0,
    clearCart,
  } = useCart();

  if (!cartOpen) return null;

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-border bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-base font-bold tracking-tight text-foreground">
                Your Shopping Cart ({safeItems.length})
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close cart"
              onClick={() => setCartOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {safeItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-muted/60 text-muted-foreground">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                  Aapne abhi tak koi Makhana pack add nahi kiya hai. Hamari fresh pantry explore karein!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/products");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-95"
                >
                  Explore Products <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {safeItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl border border-border/70 bg-card p-3 shadow-sm transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover bg-muted shrink-0"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start gap-1">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-1">
                            {item.name}
                          </h4>
                          {item.weight && (
                            <p className="text-[11px] text-muted-foreground">
                              {item.weight}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-extrabold text-primary">
                          {inr(item.price * item.quantity)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[14px] text-center text-xs font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {safeItems.length > 0 && (
            <div className="border-t border-border bg-card px-5 py-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {inr(totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Free
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-sm font-bold text-foreground">
                  <span>Total Amount</span>
                  <span className="text-primary text-base font-extrabold">
                    {inr(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-xl border border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    // Checkout flow trigger
                    navigate("/checkout");
                  }}
                  className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-95"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;