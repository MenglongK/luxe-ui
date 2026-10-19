"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-neutral-900 text-white">
      {/* Background Editorial Visual with subtle zoom and gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90"
          alt="Luxe Atelier Autumn/Winter Fashion Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.78] contrast-[1.05]"
        />
        {/* Subtle luxury vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        
        {/* Top Concept Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e4cbb0] text-xs font-medium tracking-[0.2em] uppercase mb-6 animate-fadeIn">
          <Sparkles size={12} className="text-[#c5a880]" />
          <span>Autumn / Winter Ready-to-Wear</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white max-w-4xl leading-[1.1] font-serif">
          The Art of Modern <br />
          <span className="italic font-normal text-[#f4ece1]">Sartorial Tailoring</span>
        </h1>

        {/* Subtitle explanation */}
        <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed">
          Curated wardrobe essentials crafted from pure Italian Biella wool, grade-A Mongolian cashmere, 
          and fluid Mulberry silk. Built for effortless distinction.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/collections"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#faf9f6] text-[#121212] font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:shadow-xl transition-all duration-300"
          >
            <span>Explore Collection</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-black/40 hover:bg-black/60 text-white border border-white/30 backdrop-blur-md font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
          >
            <span>View Atelier Story</span>
          </Link>
        </div>

        {/* Creative Floating Micro-Pills */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 text-left">
          <div className="flex items-center gap-3">
            <span className="text-[#c5a880] text-xl font-serif font-bold">100%</span>
            <div className="text-xs">
              <strong className="block text-white font-medium">Traceable Wool</strong>
              <span className="text-neutral-400 text-[11px]">Milled in Biella, Italy</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#c5a880] text-xl font-serif font-bold">300+</span>
            <div className="text-xs">
              <strong className="block text-white font-medium">Atelier Artisans</strong>
              <span className="text-neutral-400 text-[11px]">Ethical family workshops</span>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start gap-3">
            <ShieldCheck size={22} className="text-[#c5a880]" />
            <div className="text-xs">
              <strong className="block text-white font-medium">Carbon Neutral</strong>
              <span className="text-neutral-400 text-[11px]">Zero-waste certified</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
