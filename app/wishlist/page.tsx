"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight, Check, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data";
import { Product } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export default function WishlistPage() {
  const { t } = useLanguage();

  // Initial wishlisted items (demonstrating pagination with 6 items, 4 per page)
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    products[0], // The Double-Breasted Wool Blazer
    products[1], // Cashmere Turtleneck Sweater
    products[2], // Belted Trench Coat
    products[3], // Bias-Cut Silk Slip Dress
    products[4], // Tailored Wide-Leg Trouser
    products[6], // Minimalist Leather Tote Bag
  ]);

  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleRemove = (id: string) => {
    setWishlistItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      const newTotalPages = Math.ceil(updated.length / itemsPerPage) || 1;
      if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
      return updated;
    });
  };

  const handleClearAll = () => {
    setWishlistItems([]);
    setCurrentPage(1);
  };

  const handleAddToCart = (id: string) => {
    setAddedIds((prev) => [...prev, id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((item) => item !== id));
    }, 2000);
  };

  // Pagination calculations
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = wishlistItems.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#111111] py-10 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="mb-10 pb-6 border-b border-[#eae5de] dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
            <Link href="/" className="hover:text-black dark:hover:text-white transition">{t("nav_home")}</Link>
            <span>/</span>
            <span className="text-neutral-800 dark:text-neutral-200 font-medium">{t("nav_wishlist")}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase mb-1">
                <Sparkles size={12} />
                <span>Personal Capsule</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white font-serif">
                {t("wishlist_title")} ({wishlistItems.length})
              </h1>
            </div>

            {wishlistItems.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-neutral-500 hover:text-red-600 transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Trash2 size={14} />
                <span>{t("btn_clear_all")}</span>
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Items Grid */}
        {wishlistItems.length > 0 ? (
          <div>
            {/* 1 col on mobile, 2 cols on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentItems.map((product) => {
                const isAdded = addedIds.includes(product.id);

                return (
                  <div
                    key={product.id}
                    className="group bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#eae5de] dark:border-neutral-800 hover:border-[#c5a880]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image container */}
                    <div className="relative aspect-[3/4] w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      {product.badge && (
                        <span className="absolute top-3 left-3 z-10 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded uppercase bg-[#121212] dark:bg-white text-white dark:text-black">
                          {product.badge}
                        </span>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={() => handleRemove(product.id)}
                        aria-label="Remove from wishlist"
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800 text-neutral-500 hover:text-red-600 flex items-center justify-center transition shadow-xs cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>

                      <Link href={`/products/${product.slug}`} className="block h-full w-full">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>

                    {/* Details */}
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                          {product.category}
                        </span>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-[#c5a880] transition line-clamp-1">
                          <Link href={`/products/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h3>

                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-base font-bold text-neutral-900 dark:text-white">
                            ${product.price}
                          </span>
                          {product.compareAtPrice && (
                            <del className="text-xs text-neutral-400">
                              ${product.compareAtPrice}
                            </del>
                          )}
                        </div>
                      </div>

                      {/* Move to Bag Action */}
                      <div className="mt-4 pt-3 border-t border-[#eae5de] dark:border-neutral-800">
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          disabled={isAdded}
                          className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition cursor-pointer ${
                            isAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-[#121212] dark:bg-[#f4ece1] text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-white"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} />
                              <span>{t("btn_added")}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={14} />
                              <span>{t("btn_move_to_bag")}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Always visible Pagination Controls */}
            <div className="mt-12 pt-6 border-t border-[#eae5de] dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {t("page_showing")} {startIndex + 1}–{Math.min(startIndex + itemsPerPage, wishlistItems.length)} {t("page_of")} {wishlistItems.length} {t("page_pieces")}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-700 dark:text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black dark:hover:border-white transition cursor-pointer"
                >
                  <ChevronLeft size={14} />
                  <span>{t("page_prev")}</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        currentPage === page
                          ? "bg-[#121212] dark:bg-white text-white dark:text-black shadow-xs"
                          : "bg-white dark:bg-neutral-900 border border-[#eae5de] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-700 dark:text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black dark:hover:border-white transition cursor-pointer"
                >
                  <span>{t("page_next")}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Heart size={28} className="stroke-1" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white font-serif">
              {t("wishlist_empty")}
            </h2>
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Explore our architectural tailoring, cashmere knitwear, and silk dresses to curate your seasonal capsule.
            </p>
            <div className="mt-6">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#121212] dark:bg-white text-white dark:text-black text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-sm"
              >
                <span>{t("btn_explore_collections")}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
