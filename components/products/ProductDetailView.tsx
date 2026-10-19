"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Check,
  ChevronDown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  CheckCircle2,
  X,
} from "lucide-react";
import { Product } from "@/types";
import { products, mockReviews } from "@/data";
import { ProductReview } from "@/types/review";
import ProductCard from "@/components/homepage/ProductCard";
import { useLanguage } from "@/context/LanguageContext";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const { t } = useLanguage();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || "M");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Accordion state
  const [openSection, setOpenSection] = useState<"details" | "materials" | "shipping" | null>("details");

  // Recommended Products Slider state
  const [recSlideIndex, setRecSlideIndex] = useState(0);

  // Reviews Tab state ("this" product vs "all" products)
  const [reviewTab, setReviewTab] = useState<"this" | "all">("this");
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(mockReviews);

  // New review form state
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const toggleSection = (section: "details" | "materials" | "shipping") => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Recommended products list (all other items in the catalog)
  const recommendedProducts = products.filter((p) => p.id !== product.id);
  const recItemsPerSlide = 4;
  const maxRecSlide = Math.max(0, recommendedProducts.length - recItemsPerSlide);

  const handleNextSlide = () => {
    setRecSlideIndex((prev) => (prev + 1 > maxRecSlide ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setRecSlideIndex((prev) => (prev - 1 < 0 ? maxRecSlide : prev - 1));
  };

  // Reviews for this specific product
  const thisProductReviews = reviewsList.filter(
    (r) => r.productId === product.id || r.productSlug === product.slug
  );

  // Handle new review submit
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      author: newAuthor,
      rating: newRating,
      title: newTitle || "Excellent quality",
      comment: newComment,
      date: "Just now",
      verified: true,
      fitFeedback: "True to size",
      sizePurchased: selectedSize,
      colorPurchased: product.colors?.[selectedColorIndex]?.name || "Original",
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsWriteReviewOpen(false);
      setNewAuthor("");
      setNewTitle("");
      setNewComment("");
    }, 2000);
  };

  const images = product.images.length > 0 ? product.images : [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85"
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#111111] text-[#121212] dark:text-[#f4ece1] py-8 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-black dark:hover:text-white transition">{t("nav_home")}</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-black dark:hover:text-white transition">{t("nav_collections")}</Link>
          <span>/</span>
          <span className="text-neutral-500 uppercase">{product.category}</span>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-medium truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Main Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Interactive Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Strip */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? "border-black dark:border-white shadow-xs ring-1 ring-black dark:ring-white"
                      : "border-[#eae5de] dark:border-neutral-800 hover:border-neutral-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Photo */}
            <div className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-[#eae5de] dark:border-neutral-800 shadow-xs">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded uppercase bg-[#121212] dark:bg-white text-white dark:text-black">
                  {product.badge}
                </span>
              )}
              <Image
                src={images[selectedImageIndex] || images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Product Customization & Ordering */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="uppercase tracking-[0.2em] font-semibold text-[#c5a880]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-neutral-900 dark:text-white font-semibold text-xs">
                    {product.rating}
                  </span>
                  <span className="text-neutral-400 text-xs">
                    ({product.reviewCount} {t("prod_reviews")})
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 dark:text-white font-serif leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                  ${product.price}
                </span>
                {product.compareAtPrice && (
                  <del className="text-sm text-neutral-400">
                    ${product.compareAtPrice}
                  </del>
                )}
                {product.compareAtPrice && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                    Save ${product.compareAtPrice - product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                {product.description ||
                  "A masterwork of restrained contemporary tailoring, calibrated for timeless proportions and effortless daily wear."}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="pt-4 border-t border-[#eae5de] dark:border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">{t("prod_color")}</span>
                  <strong className="text-neutral-900 dark:text-white">
                    {product.colors[selectedColorIndex].name}
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      title={color.name}
                      className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                        selectedColorIndex === idx
                          ? "ring-2 ring-black dark:ring-white ring-offset-2 scale-110"
                          : "border-neutral-300 dark:border-neutral-700 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-4 border-t border-[#eae5de] dark:border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">{t("prod_select_size")}</span>
                  <span className="text-[11px] text-[#9e7d53] dark:text-[#c5a880] hover:underline cursor-pointer">
                    {t("prod_size_guide")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-11 px-3 rounded-lg text-xs font-semibold tracking-wider transition cursor-pointer ${
                        selectedSize === size
                          ? "bg-[#121212] dark:bg-white text-white dark:text-black shadow-xs"
                          : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-[#eae5de] dark:border-neutral-700 hover:border-black dark:hover:border-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-400">
                  Model is 178cm / 5&apos;10&quot; wearing size {selectedSize}. True to atelier size.
                </p>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="pt-4 border-t border-[#eae5de] dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-[#eae5de] dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 h-12 px-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-neutral-500 hover:text-black dark:hover:text-white transition cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold text-neutral-900 dark:text-white font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-neutral-500 hover:text-black dark:hover:text-white transition cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 h-12 rounded-lg text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 shadow-md transition cursor-pointer ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-[#121212] dark:bg-[#f4ece1] text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={16} />
                      <span>{t("btn_added")}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>{t("btn_add_to_bag")} • ${(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                  className={`h-12 w-12 rounded-lg border flex items-center justify-center transition shrink-0 cursor-pointer ${
                    isWishlisted
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-[#eae5de] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:border-black dark:hover:border-white"
                  }`}
                >
                  <Heart
                    size={18}
                    className={isWishlisted ? "fill-red-600 text-red-600" : ""}
                  />
                </button>
              </div>

              {/* Complimentary delivery note */}
              <div className="p-3.5 rounded-xl bg-[#f4ece1]/50 dark:bg-neutral-800/50 border border-[#eae5de] dark:border-neutral-700 flex items-center gap-3 text-xs text-neutral-700 dark:text-neutral-300">
                <Sparkles size={16} className="text-[#9e7d53] dark:text-[#c5a880] shrink-0" />
                <span>
                  {t("ann_free_shipping")}
                </span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="pt-4 border-t border-[#eae5de] dark:border-neutral-800 space-y-2">
              {/* 1. Tailoring Details */}
              <div className="border border-[#eae5de] dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a]">
                <button
                  onClick={() => toggleSection("details")}
                  className="w-full p-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white cursor-pointer"
                >
                  <span>Silhouette &amp; Tailoring</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openSection === "details" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSection === "details" && (
                  <div className="p-4 pt-0 text-xs text-neutral-600 dark:text-neutral-300 space-y-2 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 font-light">
                    <p>• Clean architectural shoulders with soft canvassing for fluid movement.</p>
                    <p>• Hand-stitched lapel pick-stitching honoring traditional bespoke methods.</p>
                    <p>• Dual rear vents and interior horn button passport pocket.</p>
                  </div>
                )}
              </div>

              {/* 2. Sustainable Materials */}
              <div className="border border-[#eae5de] dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a]">
                <button
                  onClick={() => toggleSection("materials")}
                  className="w-full p-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white cursor-pointer"
                >
                  <span>Materials &amp; Provenance</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openSection === "materials" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSection === "materials" && (
                  <div className="p-4 pt-0 text-xs text-neutral-600 dark:text-neutral-300 space-y-2 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 font-light">
                    <p>• 100% Super 130s Pure Virgin Wool milled in Biella, Italy.</p>
                    <p>• 100% Cupro lining for breathable, static-free comfort.</p>
                    <p>• Care: Specialist eco dry-clean only. Steam gently to refresh.</p>
                  </div>
                )}
              </div>

              {/* 3. Delivery & Returns */}
              <div className="border border-[#eae5de] dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a]">
                <button
                  onClick={() => toggleSection("shipping")}
                  className="w-full p-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white cursor-pointer"
                >
                  <span>Complimentary Delivery &amp; Returns</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openSection === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSection === "shipping" && (
                  <div className="p-4 pt-0 text-xs text-neutral-600 dark:text-neutral-300 space-y-2 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 font-light">
                    <p>• Express global transit: 2-4 business days via carbon-neutral courier.</p>
                    <p>• 30-day effortless returns with prepaid courier label inside every parcel.</p>
                    <p>• Direct atelier concierge support available 24/7.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Icons */}
            <div className="grid grid-cols-3 gap-3 pt-4 text-center text-neutral-600 dark:text-neutral-300">
              <div className="p-3 rounded-lg bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 space-y-1">
                <Truck size={18} className="mx-auto text-[#c5a880]" />
                <span className="text-[10px] font-semibold block text-neutral-900 dark:text-white">Express Post</span>
                <span className="text-[9px] text-neutral-400">Complimentary</span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 space-y-1">
                <RefreshCw size={18} className="mx-auto text-[#c5a880]" />
                <span className="text-[10px] font-semibold block text-neutral-900 dark:text-white">30 Days</span>
                <span className="text-[9px] text-neutral-400">Prepaid labels</span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 space-y-1">
                <ShieldCheck size={18} className="mx-auto text-[#c5a880]" />
                <span className="text-[10px] font-semibold block text-neutral-900 dark:text-white">Biella Milled</span>
                <span className="text-[9px] text-neutral-400">100% Traceable</span>
              </div>
            </div>

          </div>

        </div>

        {/* ---------------------------------------------------------------- */}
        {/* REVIEWS SECTION: Reviews of One Product & Reviews of All Products */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-20 pt-14 border-t border-[#eae5de] dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-1">
                Verified Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white font-serif">
                {t("prod_reviews")}
              </h2>
            </div>

            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#121212] dark:bg-white text-white dark:text-black text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <MessageSquare size={14} />
              <span>{t("btn_write_review")}</span>
            </button>
          </div>

          {/* Review Tabs */}
          <div className="flex items-center gap-3 border-b border-[#eae5de] dark:border-neutral-800 pb-3 mb-8">
            <button
              onClick={() => setReviewTab("this")}
              className={`text-xs font-semibold uppercase tracking-wider pb-1 transition cursor-pointer border-b-2 -mb-3.5 ${
                reviewTab === "this"
                  ? "border-[#121212] dark:border-white text-neutral-900 dark:text-white"
                  : "border-transparent text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {t("prod_reviews_for_this")} ({thisProductReviews.length})
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <button
              onClick={() => setReviewTab("all")}
              className={`text-xs font-semibold uppercase tracking-wider pb-1 transition cursor-pointer border-b-2 -mb-3.5 ${
                reviewTab === "all"
                  ? "border-[#121212] dark:border-white text-neutral-900 dark:text-white"
                  : "border-transparent text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {t("prod_reviews_all")} ({reviewsList.length})
            </button>
          </div>

          {/* Active Review List */}
          <div className="space-y-4">
            {(reviewTab === "this" ? thisProductReviews : reviewsList).map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-300 dark:text-neutral-700"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      {review.title}
                    </span>
                  </div>

                  <span className="text-[11px] text-neutral-400">{review.date}</span>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                  {review.comment}
                </p>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200">
                    <strong className="font-semibold">{review.author}</strong>
                    {review.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 size={10} />
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  {reviewTab === "all" && (
                    <span className="text-neutral-400 italic">
                      Garment: <strong className="text-neutral-700 dark:text-neutral-300">{review.productName}</strong>
                    </span>
                  )}
                </div>
              </div>
            ))}

            {reviewTab === "this" && thisProductReviews.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-[#eae5de] dark:border-neutral-800 space-y-2">
                <Star size={24} className="mx-auto text-amber-400" />
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Be the first to review this atelier piece
                </h4>
                <p className="text-xs text-neutral-400">
                  Share your sizing feedback and impressions on fabric and drape.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RECOMMENDED PRODUCTS: Interactive Carousel with Next/Prev Slide Toggle */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-20 pt-14 border-t border-[#eae5de] dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-1">
                Atelier Pairing
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white font-serif">
                {t("prod_recommended")}
              </h2>
            </div>

            {/* Next / Previous Slide Toggles */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-neutral-400 font-mono mr-2">
                Slide {recSlideIndex + 1} / {maxRecSlide + 1}
              </span>

              <button
                onClick={handlePrevSlide}
                aria-label="Previous recommended products slide"
                className="w-10 h-10 rounded-full border border-[#eae5de] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:border-black dark:hover:border-white flex items-center justify-center transition cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={handleNextSlide}
                aria-label="Next recommended products slide"
                className="w-10 h-10 rounded-full border border-[#eae5de] dark:border-neutral-700 bg-[#121212] dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 flex items-center justify-center transition cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Slider Window (1 col on mobile, 2 on tablet, 4 on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
            {recommendedProducts
              .slice(recSlideIndex, recSlideIndex + recItemsPerSlide)
              .map((recProduct) => (
                <ProductCard key={recProduct.id} product={recProduct} />
              ))}
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {Array.from({ length: maxRecSlide + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setRecSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  recSlideIndex === idx
                    ? "w-6 bg-[#121212] dark:bg-white"
                    : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Write a Review Modal */}
      {/* ---------------------------------------------------------------- */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#eae5de] dark:border-neutral-800 overflow-hidden p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#eae5de] dark:border-neutral-800">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white font-serif">
                Write a Review
              </h3>
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="text-neutral-400 hover:text-black dark:hover:text-white"
                aria-label="Close review modal"
              >
                <X size={18} />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-12 text-center space-y-2">
                <CheckCircle2 size={40} className="mx-auto text-emerald-500" />
                <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Thank you for your review
                </h4>
                <p className="text-xs text-neutral-500">
                  Your feedback has been verified and posted to the Atelier community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="mt-5 space-y-4">
                {/* Star rating selector */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Overall Rating
                  </label>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer transition hover:scale-110"
                      >
                        <Star
                          size={20}
                          className={star <= newRating ? "fill-amber-400 text-amber-400" : "text-neutral-300 dark:text-neutral-700"}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-neutral-500 ml-2">{newRating} of 5 stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Jacqueline M."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Unbelievable tailoring drape"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Detailed Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe the fabric feel, shoulder canvassing, sizing fit, and occasions..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#121212] dark:bg-white text-white dark:text-black text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
