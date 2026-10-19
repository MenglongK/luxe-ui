"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { products } from "@/data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  // Close on Escape key press
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

  // Filter products based on search query
  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ["Wool Blazer", "Cashmere", "Trench Coat", "Silk Dress", "Loafer"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#faf9f6] dark:bg-[#141414] rounded-2xl shadow-2xl border border-[#eae5de] dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar with distinct visible border */}
        <div className="p-4 sm:p-5 border-b border-[#eae5de] dark:border-neutral-800 bg-white dark:bg-[#1a1a1a]">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-800/80 focus-within:border-[#c5a880] dark:focus-within:border-[#c5a880] transition-colors shadow-2xs">
            <Search size={18} className="text-[#c5a880] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blazers, coats, knitwear, or silk dresses..."
              className="flex-1 bg-transparent text-sm sm:text-base outline-none text-[#121212] dark:text-[#f4ece1] placeholder:text-neutral-400"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 px-2 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 hover:text-black dark:hover:text-white transition cursor-pointer"
              aria-label="Close search"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {/* If no query, show popular suggestions */}
          {!query.trim() && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                <Tag size={13} />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-[#eae5de] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-[#121212] dark:hover:border-white transition cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#eae5de] dark:border-neutral-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                  Editor&apos;s Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.slice(0, 2).map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 hover:border-[#c5a880] cursor-pointer transition"
                    >
                      <div className="relative w-12 h-16 rounded overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                          {item.category}
                        </span>
                        <h5 className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                          {item.name}
                        </h5>
                        <span className="text-xs font-semibold text-[#121212] dark:text-[#c5a880]">
                          ${item.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* If query matches results */}
          {query.trim() && filteredProducts.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs text-neutral-500 mb-2">
                Found {filteredProducts.length} matching piece{filteredProducts.length > 1 ? "s" : ""}
              </div>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 hover:border-[#121212] dark:hover:border-white cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-16 rounded overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                        {product.category}
                      </span>
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-white group-hover:text-[#c5a880] transition">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                          ${product.price}
                        </span>
                        {product.compareAtPrice && (
                          <del className="text-xs text-neutral-400">
                            ${product.compareAtPrice}
                          </del>
                        )}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-neutral-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition" />
                </Link>
              ))}
            </div>
          )}

          {/* If query has NO matches */}
          {query.trim() && filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-neutral-500">
                No matching garments found for &ldquo;<span className="font-semibold text-neutral-800 dark:text-neutral-200">{query}</span>&rdquo;
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Try searching for broader terms like &ldquo;blazer&rdquo;, &ldquo;knitwear&rdquo;, or &ldquo;silk&rdquo;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
