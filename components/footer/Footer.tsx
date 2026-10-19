"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, ShieldCheck } from "lucide-react";
import { footerSections, socialLinks } from "@/data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#111111] text-[#f7f5f0] border-t border-neutral-800">
      {/* 1. Newsletter & VIP Atelier Club Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
              The Atelier Society
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-serif">
              Join the Luxe Club &amp; Receive 15% Off
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed">
              Enjoy private salon pre-access, invitations to bespoke seasonal previews,
              and complimentary monogramming on your inaugural tailoring order.
            </p>
          </div>

          <div className="lg:col-span-6">
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-neutral-900 border border-[#c5a880]/40 text-[#e4cbb0]">
                <CheckCircle2 size={18} className="text-[#c5a880]" />
                <span className="text-xs font-medium">
                  Welcome to the Atelier. Your 15% voucher code has been sent to your inbox.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3 bg-neutral-900/90 text-sm text-white placeholder:text-neutral-500 rounded border border-neutral-700 focus:outline-hidden focus:border-[#c5a880] transition"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#c5a880] hover:bg-[#b0936b] text-neutral-950 font-semibold text-xs tracking-wider uppercase rounded transition"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <p className="text-[10px] text-neutral-500">
                  By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-[0.25em] text-white">
                LUXE
              </span>
              <span className="block text-[8px] tracking-[0.4em] text-[#c5a880] font-medium uppercase">
                Atelier
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curating modern sartorial elegance, timeless silhouettes, and uncompromising artisanal craftsmanship.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#c5a880]">
              <ShieldCheck size={14} />
              <span>Certified Sustainable Mill</span>
            </div>
          </div>

          {/* Dynamic Link Groups */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-200">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-neutral-400 hover:text-[#c5a880] transition duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Bottom Utility & Copyright Bar */}
      <div className="bg-[#0b0b0b] border-t border-neutral-900 text-neutral-500 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Regional Selector & Copyright */}
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Globe size={14} />
              <span>United States (USD $)</span>
            </div>
            <span>•</span>
            <span>&copy; {new Date().getFullYear()} LUXE Atelier Inc. All rights reserved.</span>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-5">
            {socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 hover:text-white transition text-xs"
              >
                {s.platform}
              </a>
            ))}
          </div>

          {/* Payment Badges (Clean SVG / Text representation) */}
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono tracking-wider">
            <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">VISA</span>
            <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">MASTERCARD</span>
            <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">AMEX</span>
            <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">APPLE PAY</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
