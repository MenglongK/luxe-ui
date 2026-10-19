"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, SlidersHorizontal, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { products, categories } from "@/data";
import ProductCard from "@/components/homepage/ProductCard";
import { useLanguage } from "@/context/LanguageContext";

export default function CollectionsPage() {
  const { t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  // Filter products by category slug
  const filtered = products.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.categorySlug === selectedCategory;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // featured default
  });

  // Pagination calculation
  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sorted.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const categoryFilters = [
    { label: "All Collections", slug: "all" },
    { label: "Tailoring & Blazers", slug: "tailoring" },
    { label: "Fine Knitwear", slug: "knitwear" },
    { label: "Outerwear & Coats", slug: "outerwear" },
    { label: "Silk & Dresses", slug: "dresses" },
    { label: "Footwear", slug: "footwear" },
    { label: "Accessories", slug: "accessories" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#111111] py-10 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
          <Link href="/" className="hover:text-black dark:hover:text-white transition">{t("nav_home")}</Link>
          <span>/</span>
          <span className="text-neutral-800 dark:text-neutral-200 font-medium">{t("nav_collections")}</span>
        </div>

        {/* Editorial Collection Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white p-8 sm:p-14 mb-12 shadow-xl border border-[#eae5de] dark:border-neutral-800">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85"
              alt="Luxe Atelier Curated Wardrobe"
              fill
              className="object-cover brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e4cbb0] text-xs font-semibold tracking-[0.2em] uppercase">
              <Sparkles size={12} className="text-[#c5a880]" />
              <span>Full Archive &amp; Lookbook</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif leading-tight">
              Curated Atelier <br />
              <span className="italic font-normal text-[#f4ece1]">Wardrobe Collections</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              Meticulously tailored garments crafted from Italian Biella wool, grade-A Mongolian cashmere, 
              and Mulberry silk. Invest in timeless silhouettes designed to endure.
            </p>
          </div>
        </div>

        {/* Browse by Department Visual Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white font-serif">
              Explore by Department
            </h2>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{categories.length} Categories</span>
          </div>

          {/* 1 col on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(0, 3).map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`group relative h-48 rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 ${
                  selectedCategory === cat.slug
                    ? "border-black dark:border-white ring-2 ring-black dark:ring-white"
                    : "border-[#eae5de] dark:border-neutral-800 hover:border-[#c5a880]"
                }`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-300 block">
                      {cat.itemCount} Pieces
                    </span>
                    <strong className="text-sm font-semibold">{cat.name}</strong>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#c5a880] text-white group-hover:text-black flex items-center justify-center transition">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 mb-8 border-y border-[#eae5de] dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] px-4 rounded-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categoryFilters.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => handleCategoryChange(tab.slug)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  selectedCategory === tab.slug
                    ? "bg-[#121212] dark:bg-white text-white dark:text-black shadow-xs"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300 shrink-0 self-end md:self-auto">
            <SlidersHorizontal size={14} />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent border border-[#eae5de] dark:border-neutral-700 rounded-md px-2.5 py-1 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden font-medium"
            >
              <option value="featured" className="dark:bg-neutral-900">Featured First</option>
              <option value="price-low" className="dark:bg-neutral-900">Price: Low to High</option>
              <option value="price-high" className="dark:bg-neutral-900">Price: High to Low</option>
              <option value="rating" className="dark:bg-neutral-900">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid: 1 col on mobile, 2 cols on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Always visible Pagination Controls */}
        <div className="mt-12 pt-6 border-t border-[#eae5de] dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {t("page_showing")} {startIndex + 1}–{Math.min(startIndex + itemsPerPage, sorted.length)} {t("page_of")} {sorted.length} {t("page_pieces")}
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
    </div>
  );
}
