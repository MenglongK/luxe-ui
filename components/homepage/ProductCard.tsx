"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  // Quick Add to Cart simulation
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Compute discount percentage if compareAtPrice is present
  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  // Decide image source based on hover and available images
  const currentImage =
    isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <article
      className="group flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#eae5de] dark:border-neutral-800 hover:border-[#c5a880]/60 dark:hover:border-[#c5a880]/60 hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        {/* Badge Indicator */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span
              className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded uppercase ${
                product.badge === "SALE"
                  ? "bg-red-600 text-white"
                  : product.badge === "NEW"
                  ? "bg-[#121212] dark:bg-white text-white dark:text-black"
                  : "bg-[#c5a880] text-neutral-950"
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/80 text-white backdrop-blur-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
            isWishlisted
              ? "bg-red-50 text-red-600"
              : "bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800"
          }`}
        >
          <Heart
            size={16}
            className={`transition ${isWishlisted ? "fill-red-600 text-red-600" : ""}`}
          />
        </button>

        {/* Product Photography with smooth zoom */}
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <Image
            src={currentImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-all duration-200 cursor-pointer ${
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
                <span>{t("btn_quick_add")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white dark:bg-[#1a1a1a]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
            <span className="uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-neutral-700 dark:text-neutral-300 font-medium text-[11px]">
                {product.rating}
              </span>
              <span className="text-neutral-400 text-[10px]">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-[#c5a880] transition line-clamp-1">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(idx)}
                  title={color.name}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor === idx
                      ? "ring-1 ring-black dark:ring-white ring-offset-1 border-transparent scale-110"
                      : "border-neutral-300 dark:border-neutral-700 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              <span className="text-[10px] text-neutral-400 ml-1">
                {product.colors[selectedColor].name}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="mt-3 pt-3 border-t border-[#eae5de] dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <del className="text-xs text-neutral-400">
                ${product.compareAtPrice}
              </del>
            )}
          </div>

          {/* Mobile visible Quick Add Button */}
          <button
            onClick={handleAddToCart}
            aria-label="Add to bag"
            className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-medium tracking-wide shadow-xs active:scale-95 transition cursor-pointer"
          >
            {isAdded ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span>{t("btn_added")}</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>{t("btn_add_to_bag")}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
