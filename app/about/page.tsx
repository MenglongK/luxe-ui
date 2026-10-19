"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  HeartHandshake,
  MapPin,
  Code2,
  Cpu,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const salons = [
    {
      city: "Paris Atelier",
      address: "28 Rue Saint-Honoré, 75001 Paris, France",
      phone: "+33 1 42 68 00 00",
      hours: "Mon - Sat: 10:00 - 19:00",
    },
    {
      city: "Milan Showroom",
      address: "Via Montenapoleone 8, 20121 Milano, Italy",
      phone: "+39 02 76 00 12 34",
      hours: "Mon - Sat: 10:30 - 19:30",
    },
    {
      city: "New York Salon",
      address: "740 Madison Avenue, New York, NY 10065",
      phone: "+1 212 555 0198",
      hours: "Mon - Sat: 11:00 - 19:00",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#111111] text-[#121212] dark:text-[#f4ece1] py-10 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black dark:hover:text-white transition">{t("nav_home")}</Link>
          <span>/</span>
          <span className="text-neutral-800 dark:text-neutral-200 font-medium">{t("nav_about")} The Atelier</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white p-8 sm:p-16 mb-16 shadow-2xl border border-[#eae5de] dark:border-neutral-800">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85"
              alt="Luxe Atelier Craftsmanship"
              fill
              className="object-cover brightness-[0.6] grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e4cbb0] text-xs font-semibold tracking-[0.2em] uppercase">
              <Sparkles size={12} className="text-[#c5a880]" />
              <span>Heritage &amp; Philosophy</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif leading-tight">
              {t("about_title")}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              LUXE was conceived as an antidote to disposable fashion. We design garments with sculptural 
              proportions and obsessive precision, honoring the body&apos;s natural movement through pure natural fibers.
            </p>
          </div>
        </div>

        {/* The Manifesto & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase block">
              The Atelier Manifesto
            </span>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900 dark:text-white font-serif leading-tight">
              &ldquo;True elegance resides in what is omitted, not what is added.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
              In an era dominated by hyper-speed trend churn, LUXE Atelier operates on the cadence of permanence. 
              We believe a singular, impeccably tailored double-breasted blazer or a featherlight cashmere mockneck 
              carries infinitely more value than a closet full of transient trends.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
              Every pattern is drafted in our Paris studio, utilizing principles borrowed from brutalist architecture 
              and Savile Row geometry. The result is effortless poise that transcends seasons.
            </p>
          </div>

          <div className="lg:col-span-6 relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-[#eae5de] dark:border-neutral-800">
            <Image
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85"
              alt="Pattern Making & Tailoring"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* FOUNDER & LEAD SYSTEM ARCHITECT SECTION (Developer Spotlight) */}
        {/* ---------------------------------------------------------------- */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Founder Portrait Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border border-[#eae5de] dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
                  alt="Founder & Lead System Architect"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#e4cbb0] font-semibold block">
                    Chief Architect &amp; Founder
                  </span>
                  <strong className="text-lg sm:text-xl font-serif">Menglong Keo</strong>
                </div>
              </div>
            </div>

            {/* Founder Vision & Engineering Architecture */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 text-[#9e7d53] dark:text-[#d4b88f] text-xs font-semibold tracking-wider uppercase border border-[#c5a880]/30">
                <Code2 size={13} />
                <span>{t("founder_section_title")}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 dark:text-white font-serif">
                Engineering Modern Luxury: <br />
                <span className="italic font-normal">Where Design Meets Systems</span>
              </h2>

              <blockquote className="text-xs sm:text-sm italic font-serif text-neutral-700 dark:text-neutral-300 border-l-2 border-[#c5a880] pl-4 leading-relaxed">
                &ldquo;{t("founder_quote")}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                As the founding fullstack engineer and creative technologist behind LUXE Atelier, 
                Menglong Keo envisioned a storefront where technical performance, clean architecture, 
                and tactile aesthetic refinement unite seamlessly.
              </p>

              {/* Technical Craft Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#faf9f6] dark:bg-neutral-800/60 border border-[#eae5de] dark:border-neutral-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
                    <Cpu size={14} className="text-[#c5a880]" />
                    <span>Next.js 16 SSG</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Sub-second page speeds</p>
                </div>

                <div className="p-3 rounded-xl bg-[#faf9f6] dark:bg-neutral-800/60 border border-[#eae5de] dark:border-neutral-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
                    <Layers size={14} className="text-[#c5a880]" />
                    <span>Spring Boot API</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Scalable enterprise core</p>
                </div>

                <div className="p-3 rounded-xl bg-[#faf9f6] dark:bg-neutral-800/60 border border-[#eae5de] dark:border-neutral-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
                    <Sparkles size={14} className="text-[#c5a880]" />
                    <span>i18n &amp; Theming</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">English / Khmer / Dark</p>
                </div>
              </div>

              {/* Social connect links */}
              <div className="pt-2 flex items-center gap-4 text-xs">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.76v8.37H6.46V10.9M7.84 6.88a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-1">
              Our Commitments
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white font-serif">
              The Three Pillars of LUXE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#f4ece1] dark:bg-neutral-800 flex items-center justify-center text-[#9e7d53] dark:text-[#c5a880]">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white font-serif">
                Traceable Italian Mills
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                Our virgin wool is milled exclusively in Biella, Italy, using pure Alpine stream water and 
                regenerative farms certified for animal welfare and zero toxic chemical dyes.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#f4ece1] dark:bg-neutral-800 flex items-center justify-center text-[#9e7d53] dark:text-[#c5a880]">
                <Award size={24} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white font-serif">
                Bespoke Artisanship
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                Crafted in family-owned workshops across Florence and Porto. Each seam is hand-checked 
                by master tailors with over three decades of sartorial mastery.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#f4ece1] dark:bg-neutral-800 flex items-center justify-center text-[#9e7d53] dark:text-[#c5a880]">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white font-serif">
                Lifetime Wardrobe Care
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                We believe in circular luxury. We offer complimentary button replacement, seam rejuvenation, 
                and private tailoring adjustments across all our global flagship salons.
              </p>
            </div>
          </div>
        </div>

        {/* Flagship Salons */}
        <div className="mb-20 pt-12 border-t border-[#eae5de] dark:border-neutral-800">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-1">
              Private Showrooms
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white font-serif">
              Visit Our Flagship Salons
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Experience the tactile weight of our fabrics and receive personal styling consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {salons.map((salon) => (
              <div
                key={salon.city}
                className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-white">
                  <MapPin size={16} className="text-[#c5a880]" />
                  <span>{salon.city}</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">{salon.address}</p>
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1">
                  <div>Telephone: {salon.phone}</div>
                  <div>Hours: {salon.hours}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center py-14 px-6 rounded-2xl bg-[#121212] dark:bg-[#1a1a1a] text-white space-y-4 border border-transparent dark:border-neutral-800">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold block">
            Begin Your Capsule
          </span>
          <h2 className="text-2xl sm:text-3xl font-light font-serif">
            Discover the Autumn / Winter &apos;26 Collection
          </h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Explore tailoring, fine cashmere, and silk pieces crafted for a lifetime of distinction.
          </p>
          <div className="pt-2">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#c5a880] hover:bg-[#b0936b] text-neutral-950 font-semibold text-xs tracking-wider uppercase transition shadow-md"
            >
              <span>{t("btn_explore_collections")}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
