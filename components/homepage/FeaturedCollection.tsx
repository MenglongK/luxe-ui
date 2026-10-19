"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/data";
import ProductCard from "./ProductCard";

type FilterTab = "ALL" | "NEW" | "BESTSELLER" | "TAILORING" | "KNITWEAR";

export default function FeaturedCollection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");

  // Filter products based on active tab
  const filteredProducts = products.filter((item) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "NEW") return item.badge === "NEW" || item.isNew;
    if (activeTab === "BESTSELLER") return item.badge === "BESTSELLER";
    if (activeTab === "TAILORING") return item.categorySlug === "tailoring";
    if (activeTab === "KNITWEAR") return item.categorySlug === "knitwear";
    return true;
  });

  const tabs: { label: string; value: FilterTab }[] = [
    { label: "All Items", value: "ALL" },
    { label: "New In", value: "NEW" },
    { label: "Best Sellers", value: "BESTSELLER" },
    { label: "Tailoring & Blazers", value: "TAILORING" },
    { label: "Fine Knitwear", value: "KNITWEAR" },
  ];

  return (
    <section id="featured-collection" className="w-full py-16 sm:py-20 bg-white dark:bg-[#141414] border-y border-[#eae5de] dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase mb-2">
            <Sparkles size={12} />
            <span>Seasonal Capsule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white font-serif">
            Essential Wardrobe Pieces
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Crafted for effortless daily distinction. From sharp tailoring to comforting cashmere.
          </p>
        </div>

        {/* Filter Tabs Navigation */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                activeTab === tab.value
                  ? "bg-[#121212] dark:bg-white text-white dark:text-black shadow-xs"
                  : "bg-[#faf9f6] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border border-[#eae5de] dark:border-neutral-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid: 1 column on mobile, 2 columns on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to view full archive on /collections (which has pagination) */}
        <div className="mt-14 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-[#121212] dark:border-white text-[#121212] dark:text-white hover:bg-[#121212] hover:text-white dark:hover:bg-white dark:hover:text-black font-medium text-xs tracking-wider uppercase transition-all duration-300"
          >
            <span>View All Curated Pieces ({products.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
