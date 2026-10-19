"use client";

import React, { useState, useEffect } from "react";
import { announcements } from "@/data";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate announcement messages every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const current = announcements[currentIndex];

  return (
    <aside aria-label="Store announcement" className="relative bg-[#121212] text-[#f7f5f0] text-[11px] sm:text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left helper: Currency indicator */}
        <div className="hidden md:flex items-center gap-3 text-neutral-400 text-[11px]">
          <span>USD ($)</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>EN / GLOBAL</span>
        </div>

        {/* Center: Rotating announcement with creative pill */}
        <div className="flex-1 flex items-center justify-center gap-2 overflow-hidden px-2">
          <button
            onClick={handlePrev}
            aria-label="Previous announcement"
            className="p-0.5 text-neutral-400 hover:text-white transition"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex items-center gap-2 text-center animate-fadeIn min-h-[18px]">
            {current.highlight && (
              <span className="inline-flex items-center gap-1 rounded bg-[#c5a880]/20 text-[#e4cbb0] px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase border border-[#c5a880]/30">
                <Sparkles size={10} />
                {current.highlight}
              </span>
            )}
            <span className="tracking-wide text-neutral-200">
              {current.message}
            </span>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next announcement"
            className="p-0.5 text-neutral-400 hover:text-white transition"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Right helper: Concierge helpline */}
        <div className="hidden md:flex items-center gap-3 text-neutral-400 text-[11px]">
          <a href="#concierge" className="hover:text-white transition underline-offset-4 hover:underline">
            Client Concierge
          </a>
        </div>
      </div>
    </aside>
  );
}
