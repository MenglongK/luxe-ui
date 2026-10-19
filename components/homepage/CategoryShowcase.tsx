"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data";

export default function CategoryShowcase() {
  return (
    <section id="collections" className="w-full py-16 sm:py-20 bg-[#faf9f6] dark:bg-[#111111] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#eae5de] dark:border-neutral-800">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
              Curated Wardrobe
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white mt-1 font-serif">
              Shop by Category
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
            Explore architectural cuts, sustainable natural materials, and timeless pieces designed for years to come.
          </p>
        </div>

        {/* Category Visual Cards Grid: 1 col on mobile, 2 cols on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`#category-${cat.slug}`}
              className="group relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden bg-neutral-200 border border-[#eae5de] block shadow-xs hover:shadow-xl transition-all duration-500"
            >
              {/* Category Photography with Smooth Zoom */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity group-hover:from-black/90" />

              {/* Item Count Pill at Top Right */}
              <div className="absolute top-3 right-3 z-10">
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-black/60 text-white backdrop-blur-xs border border-white/20">
                  {cat.itemCount} Items
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] tracking-wider text-neutral-300 uppercase block mb-1">
                    {cat.tagline}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-[#e4cbb0] transition">
                    {cat.name}
                  </h3>
                </div>

                {/* Arrow Icon Circle */}
                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#c5a880] text-white group-hover:text-black flex items-center justify-center backdrop-blur-xs transition-all duration-300 shrink-0 ml-2">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
