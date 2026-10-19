"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote } from "lucide-react";
import { customerTestimonials, pressQuotes } from "@/data";

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrev = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? customerTestimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveTestimonial((prev) =>
      (prev + 1) % customerTestimonials.length
    );
  };

  const current = customerTestimonials[activeTestimonial];

  return (
    <section className="w-full py-16 sm:py-24 bg-white dark:bg-[#121212] border-b border-[#eae5de] dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Press Quotes Strip */}
        <div className="mb-16 pb-12 border-b border-[#eae5de] dark:border-neutral-800">
          <div className="text-center mb-8">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
              Critical Acclaim
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {pressQuotes.map((press) => (
              <div key={press.id} className="p-4 space-y-2">
                <span className="text-base sm:text-lg font-bold tracking-[0.2em] text-neutral-900 dark:text-white font-serif block">
                  {press.publication}
                </span>
                <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 italic leading-relaxed">
                  {press.quote}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Discerning Client Testimonial Showcase */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
              Collector Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white mt-1 font-serif">
              Worn &amp; Revered Globally
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="relative p-8 sm:p-12 rounded-2xl bg-[#faf9f6] dark:bg-[#181818] border border-[#eae5de] dark:border-neutral-800 shadow-xs">
            <Quote size={40} className="text-[#c5a880]/30 absolute top-6 left-6 -z-0" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              {/* Star Rating */}
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg md:text-xl font-light text-neutral-800 dark:text-neutral-200 leading-relaxed font-serif max-w-2xl">
                “{current.quote}”
              </blockquote>

              {/* Customer Info */}
              <div className="pt-4 border-t border-[#eae5de] dark:border-neutral-800 flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <strong className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {current.author}
                  </strong>
                  {current.verifiedBuyer && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle size={10} />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {current.location} • Acquired: {current.productName}
                </span>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-[#eae5de] dark:border-neutral-700 hover:border-black dark:hover:border-white flex items-center justify-center text-neutral-700 dark:text-neutral-200 transition"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-1.5">
                {customerTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeTestimonial === idx
                        ? "w-6 bg-[#121212] dark:bg-white"
                        : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next review"
                className="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-[#eae5de] dark:border-neutral-700 hover:border-black dark:hover:border-white flex items-center justify-center text-neutral-700 dark:text-neutral-200 transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
