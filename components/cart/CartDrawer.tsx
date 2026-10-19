"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { CartItem } from "@/types/cart";
import { products } from "@/data";
import { useLanguage } from "@/context/LanguageContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const { t } = useLanguage();

  // Close drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 200;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Suggested cross-sell pieces
  const suggestions = products.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        aria-label="Shopping bag drawer"
        className="relative w-full max-w-md bg-[#faf9f6] dark:bg-[#141414] text-[#121212] dark:text-[#f4ece1] h-full shadow-2xl flex flex-col z-10 border-l border-[#eae5de] dark:border-neutral-800 animate-slideLeft transition-colors"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#eae5de] dark:border-neutral-800 bg-white dark:bg-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#c5a880]" />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white tracking-tight font-serif">
              {t("cart_title")} ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3.5 bg-[#f4ece1]/50 dark:bg-neutral-850 border-b border-[#eae5de] dark:border-neutral-800 text-xs">
          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300 font-medium mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#9e7d53] dark:text-[#c5a880]" />
              {remainingForFreeShipping === 0
                ? "Complimentary express delivery unlocked!"
                : `Add $${remainingForFreeShipping} more for free shipping`}
            </span>
            <span className="font-semibold text-neutral-900 dark:text-white">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#121212] dark:bg-[#c5a880] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag size={42} className="mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
              <h4 className="text-sm font-semibold text-neutral-800 dark:text-white">{t("cart_empty")}</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                Explore our curated seasonal tailoring and cashmere knitwear to begin your collection.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-lg bg-[#121212] dark:bg-white text-white dark:text-black text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition cursor-pointer"
              >
                {t("btn_explore_collections")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={onClose}
                          className="text-xs font-semibold text-neutral-900 dark:text-white hover:text-[#c5a880] transition truncate"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Remove item"
                          className="text-neutral-400 hover:text-red-500 transition p-0.5 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 space-x-2">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                      </div>

                      <div className="text-xs font-bold text-neutral-900 dark:text-white mt-1">
                        ${item.product.price}
                      </div>
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex items-center border border-[#eae5de] dark:border-neutral-700 rounded-md bg-[#faf9f6] dark:bg-neutral-800">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-30 transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-medium text-neutral-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-[11px] text-neutral-400 ml-auto font-mono">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Suggestions Section: 1 col on mobile, 2 cols on tablet */}
              <div className="pt-4 border-t border-[#eae5de] dark:border-neutral-800">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                  {t("prod_complete_look")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {suggestions.map((sug) => (
                    <Link
                      key={sug.id}
                      href={`/products/${sug.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 hover:border-black dark:hover:border-white transition"
                    >
                      <div className="relative w-12 h-14 rounded overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                        <Image
                          src={sug.images[0]}
                          alt={sug.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[11px] font-medium text-neutral-900 dark:text-white truncate">
                          {sug.name}
                        </h5>
                        <div className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200">
                          ${sug.price}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#eae5de] dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">
              <span>{t("cart_subtotal")}</span>
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">${subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">
              <span>{t("cart_shipping")}</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                {remainingForFreeShipping === 0 ? t("cart_free") : "$15.00"}
              </span>
            </div>

            <div className="pt-2 border-t border-[#eae5de] dark:border-neutral-800 flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">{t("cart_total")}</span>
              <span className="text-base font-bold text-neutral-900 dark:text-white">
                ${remainingForFreeShipping === 0 ? subtotal : subtotal + 15}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full py-3.5 px-4 rounded-lg bg-[#121212] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <span>{t("btn_checkout")}</span>
              <ArrowRight size={14} />
            </Link>

            <p className="text-[10px] text-center text-neutral-400">
              Taxes calculated at checkout. 30-day effortless returns on all orders.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
