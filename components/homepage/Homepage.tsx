"use client";

import React from "react";
import HeroSection from "./HeroSection";
import TrustFeatures from "./TrustFeatures";
import CategoryShowcase from "./CategoryShowcase";
import FeaturedCollection from "./FeaturedCollection";
import EditorialStory from "./EditorialStory";
import PromoBanner from "./PromoBanner";
import TestimonialsSection from "./TestimonialsSection";
import InstagramFeed from "./InstagramFeed";

/**
 * Master Homepage Component for LUXE ATELIER
 * 
 * Organizes the luxury e-commerce experience into distinct, modular sections:
 * 1. HeroSection - High-impact editorial branding & main CTAs
 * 2. TrustFeatures - Store guarantees (shipping, craftsmanship, returns, concierge)
 * 3. CategoryShowcase - Visual interactive category browsing
 * 4. FeaturedCollection - Tabbed product catalog with quick-add & wishlist
 * 5. EditorialStory - Brand philosophy & slow fashion craftsmanship narrative
 * 6. PromoBanner - Seasonal promotional drop with countdown timer
 * 7. TestimonialsSection - Press validation & customer reviews
 * 8. InstagramFeed - Community styling and social proof
 */
export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] dark:bg-[#111111] text-[#121212] dark:text-[#f4ece1] transition-colors">
      {/* 1. Hero Editorial Banner */}
      <HeroSection />

      {/* 2. Value Propositions / Trust Pillars */}
      <TrustFeatures />

      {/* 3. Shop By Category Grid */}
      <CategoryShowcase />

      {/* 4. Filterable Featured Products Catalog */}
      <FeaturedCollection />

      {/* 5. Editorial Magazine Story */}
      <EditorialStory />

      {/* 6. Flash Promotional Capsule Banner */}
      <PromoBanner />

      {/* 7. Press Accolades & Discerning Customer Reviews */}
      <TestimonialsSection />

      {/* 8. Social Community Aesthetic Gallery */}
      <InstagramFeed />
    </div>
  );
}
