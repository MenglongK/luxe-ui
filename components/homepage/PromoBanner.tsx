"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Tag, Clock } from "lucide-react";

export default function PromoBanner() {
  // Simulated countdown for limited promo drop
  const [timeLeft, setTimeLeft] = useState({
    hours: 38,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="promotions" className="w-full bg-[#121212] text-white py-14 sm:py-18 relative overflow-hidden">
      {/* Subtle gold radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 sm:p-12 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-2xl backdrop-blur-md">
          
          {/* Left Text Content */}
          <div className="max-w-xl text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/20 text-[#e4cbb0] text-xs font-semibold uppercase tracking-wider border border-[#c5a880]/30">
              <Tag size={12} />
              <span>Limited Atelier Invitation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white font-serif leading-tight">
              Enjoy 20% Off the <br />
              <span className="font-semibold text-[#f4ece1]">Minimalist Capsule Edit</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Experience the unmatched feel of pure Biella tailoring at an introductory seasonal courtesy. 
              Use promotional code <strong className="text-white font-mono bg-neutral-800 px-1.5 py-0.5 rounded">LUXE20</strong> at checkout.
            </p>
          </div>

          {/* Right Timer & CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Countdown Display */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mr-1">
                <Clock size={16} className="text-[#c5a880]" />
                <span className="hidden sm:inline">Expires In:</span>
              </div>
              <div className="flex items-center gap-2 text-center font-mono">
                <div className="bg-neutral-800/90 border border-neutral-700 px-3 py-2 rounded-lg min-w-[50px]">
                  <span className="text-lg font-bold text-white block">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase text-neutral-400">Hours</span>
                </div>
                <span className="text-neutral-500 font-bold">:</span>
                <div className="bg-neutral-800/90 border border-neutral-700 px-3 py-2 rounded-lg min-w-[50px]">
                  <span className="text-lg font-bold text-white block">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase text-neutral-400">Mins</span>
                </div>
                <span className="text-neutral-500 font-bold">:</span>
                <div className="bg-neutral-800/90 border border-neutral-700 px-3 py-2 rounded-lg min-w-[50px]">
                  <span className="text-lg font-bold text-[#c5a880] block">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase text-neutral-400">Secs</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#c5a880] hover:bg-[#b0936b] text-neutral-950 font-semibold text-xs tracking-wider uppercase transition shadow-md whitespace-nowrap"
            >
              <span>Claim Privilege</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
