"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Search,
  Heart,
  User,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  ArrowRight,
} from "lucide-react";
import { navLinks, socialLinks } from "@/data";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  wishlistCount: number;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onOpenSearch,
  wishlistCount,
}: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const getNavLabel = (label: string) => {
    switch (label) {
      case "New Arrivals":
        return t("nav_new_arrivals");
      case "Collections":
        return t("nav_collections");
      case "Women":
        return t("nav_women");
      case "Men":
        return t("nav_men");
      case "About":
        return t("nav_about");
      case "Sale":
        return t("nav_sale");
      default:
        return label;
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <aside
        aria-label="Mobile navigation"
        className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#faf9f6] dark:bg-[#141414] text-[#121212] dark:text-[#f4ece1] shadow-2xl flex flex-col z-10 border-r border-[#eae5de] dark:border-neutral-800 animate-slideRight"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#eae5de] dark:border-neutral-800">
          <div>
            <span className="text-xl font-bold tracking-[0.2em] text-[#121212] dark:text-[#f4ece1]">
              LUXE
            </span>
            <span className="block text-[8px] tracking-[0.3em] text-[#c5a880] uppercase">
              Atelier Paris
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              title="Switch Language"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border border-[#eae5de] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:border-[#c5a880] transition shadow-2xs cursor-pointer"
            >
              <Globe size={13} className="text-[#c5a880]" />
              <span>{language === "en" ? "EN" : "ខ្មែរ"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 1. Prominent Mobile Wishlist Banner */}
        <div className="p-4 bg-white dark:bg-neutral-900 border-b border-[#eae5de] dark:border-neutral-800">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl bg-[#faf9f6] dark:bg-neutral-800/80 border border-[#eae5de] dark:border-neutral-700 hover:border-[#c5a880] transition shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center">
                <Heart size={16} className="fill-red-600 text-red-600" />
              </div>
              <div>
                <span className="text-xs font-semibold block text-neutral-900 dark:text-white">
                  {t("nav_wishlist")}
                </span>
                <span className="text-[10px] text-neutral-400">
                  {wishlistCount} {t("page_pieces")} saved
                </span>
              </div>
            </div>
            <ArrowRight size={14} className="text-neutral-400 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* 2. Quick Search Bar with Border */}
        <div className="p-4 border-b border-[#eae5de] dark:border-neutral-800">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-[#eae5de] dark:border-neutral-700 text-sm text-neutral-500 dark:text-neutral-400 hover:border-black dark:hover:border-white transition shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Search size={16} className="text-[#c5a880]" />
              {t("nav_search")}
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">⌘K</span>
          </button>
        </div>

        {/* 3. Navigation Links with Expandable Subcategories */}
        <nav className="flex-1 overflow-y-auto px-5 py-3 space-y-1">
          {navLinks.map((link, idx) => {
            const hasSubcategories = link.subCategoryGroups && link.subCategoryGroups.length > 0;
            const isExpanded = expandedIndex === idx;

            return (
              <div key={link.label} className="border-b border-[#eae5de]/50 dark:border-neutral-800/60 py-1">
                <div className="flex items-center justify-between py-2">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`flex-1 flex items-center gap-2 text-sm font-medium transition ${
                      link.isHighlight
                        ? "text-[#c5a880] font-semibold"
                        : "text-[#121212] dark:text-[#f4ece1] hover:text-[#c5a880]"
                    }`}
                  >
                    <span>{getNavLabel(link.label)}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#121212] dark:bg-neutral-800 text-white tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </Link>

                  {hasSubcategories && (
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="p-1 text-neutral-400 hover:text-black dark:hover:text-white transition"
                      aria-label="Toggle subcategories"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-black dark:text-white" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {/* Subcategories accordion */}
                {hasSubcategories && isExpanded && (
                  <div className="pl-3 pb-3 pt-1 space-y-3 bg-neutral-100/60 dark:bg-neutral-900/60 rounded-lg my-1">
                    {link.subCategoryGroups?.map((group) => (
                      <div key={group.title} className="space-y-1.5">
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 block px-2">
                          {group.title}
                        </span>
                        <ul className="space-y-1">
                          {group.items.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                onClick={onClose}
                                className="block px-2 py-1 text-xs text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick links: Sign In & About */}
          <div className="pt-3 space-y-1 border-t border-[#eae5de] dark:border-neutral-800">
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-2.5 py-2.5 text-sm font-medium text-neutral-900 dark:text-white hover:text-[#c5a880]"
            >
              <User size={16} className="text-[#c5a880]" />
              <span>{t("auth_signin")} / {t("auth_register")}</span>
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-2.5 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            >
              <span>{t("nav_about")} The Atelier</span>
            </Link>
          </div>
        </nav>

        {/* 4. Footer controls: Theme, Language, Concierge */}
        <div className="p-4 border-t border-[#eae5de] dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
          <div className="flex items-center justify-between">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:border-[#c5a880]"
            >
              <Globe size={14} className="text-[#c5a880]" />
              <span>{language === "en" ? "English (EN)" : "ភាសាខ្មែរ (KM)"}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:border-[#c5a880]"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={14} className="text-[#c5a880]" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={14} className="text-neutral-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-[#eae5de] dark:border-neutral-800">
            <span>Currency: USD ($)</span>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
