import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function EditorialStory() {
  return (
    <section id="editorial" className="w-full py-16 sm:py-24 bg-[#faf9f6] dark:bg-[#151515] overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Dual Layered Editorial Photography */}
          <div className="lg:col-span-7 relative">
            {/* Primary Large Image */}
            <div className="relative h-[420px] sm:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-[#eae5de] dark:border-neutral-800">
              <Image
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=90"
                alt="Editorial: The Art of Structured Minimalism"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 text-white max-w-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#e4cbb0] block">
                  Look 07 / Editorial Drop
                </span>
                <p className="text-sm font-serif italic mt-1 text-neutral-200">
                  “Structure is the soul of confidence.”
                </p>
              </div>
            </div>

            {/* Overlapping Floating Inset Image (Macro Fabric Detail) */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-48 h-64 rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#222] bg-white dark:bg-[#222]">
              <Image
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=85"
                alt="Biella Wool Fabric Detail"
                fill
                sizes="200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-2 left-2 right-2 p-1 bg-black/70 backdrop-blur-xs rounded text-center">
                <span className="text-[9px] font-medium text-white tracking-widest uppercase">
                  Biella Super 130s
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
              <Sparkles size={12} />
              <span>The Atelier Journal • Vol. IV</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 dark:text-white leading-[1.15] font-serif">
              Sculptural Forms, <br />
              <span className="italic font-normal">Fluid Modernity</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
              We reject rapid trends in favor of architectural purity. Every seam, 
              lapel notch, and hem is calibrated to create clothing that honors the body’s natural movement.
            </p>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
              Spun exclusively from regenerative Italian wool mills and cruelty-free silk ateliers, our capsule is engineered to become an enduring pillar of your personal wardrobe.
            </p>

            {/* Micro Feature Bullet points */}
            <div className="pt-2 border-t border-[#eae5de] dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-3 text-xs text-neutral-800 dark:text-neutral-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                <strong>Zero Synthetic Microfibers:</strong> 100% natural, biodegradable yarns.
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-800 dark:text-neutral-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                <strong>Limited Artisanal Runs:</strong> Strictly numbered production batches.
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#121212] dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium text-xs tracking-wider uppercase transition shadow-sm"
              >
                <span>Shop The Editorial Look</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
