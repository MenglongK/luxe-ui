"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
  ArrowRight,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { navLinks, products } from "@/data";
import { CartItem } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import AnnouncementBar from "./AnnouncementBar";
import SearchModal from "./SearchModal";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock initial cart items for interactive demo
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "cart-item-1",
      product: products[0],
      quantity: 1,
      selectedColor: "Charcoal Noir",
      selectedSize: "M",
    },
    {
      id: "cart-item-2",
      product: products[1],
      quantity: 1,
      selectedColor: "Alabaster Cream",
      selectedSize: "S",
    },
  ]);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Dynamic counts
  const [wishlistCount] = useState(3);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Monitor window scroll to apply subtle shadow and border refinement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle menu hover with graceful timeout
  const handleNavMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredNavIndex(index);
  };

  const handleNavMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNavIndex(null);
    }, 180);
  };

  // Dynamic translated nav labels
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
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Main Navbar */}
        <nav
          className={`relative w-full transition-all duration-300 border-b ${
            isScrolled
              ? "bg-[#faf9f6]/95 dark:bg-[#111111]/95 backdrop-blur-md border-[#eae5de] dark:border-neutral-800 shadow-xs py-3"
              : "bg-[#faf9f6] dark:bg-[#111111] border-[#eae5de]/60 dark:border-neutral-800 py-3.5"
          }`}
          onMouseLeave={handleNavMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              
              {/* Left Side: Mobile Menu Button & Desktop Nav Links */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open navigation menu"
                  className="lg:hidden p-1.5 -ml-1 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white focus:outline-hidden"
                >
                  <Menu size={22} />
                </button>

                {/* Desktop Primary Nav with Hover Subcategories */}
                <div className="hidden lg:flex items-center space-x-6">
                  {navLinks.map((link, index) => (
                    <div
                      key={link.label}
                      className="relative py-2"
                      onMouseEnter={() => handleNavMouseEnter(index)}
                    >
                      <Link
                        href={link.href}
                        className={`group inline-flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors ${
                          link.isHighlight
                            ? "text-[#c5a880] hover:text-[#9e7d53]"
                            : hoveredNavIndex === index
                            ? "text-black dark:text-white"
                            : "text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        <span>{getNavLabel(link.label)}</span>
                        {link.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#121212] dark:bg-[#f4ece1] text-white dark:text-neutral-900">
                            {link.badge}
                          </span>
                        )}
                        {link.subCategoryGroups && link.subCategoryGroups.length > 0 && (
                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-200 text-neutral-400 ${
                              hoveredNavIndex === index ? "rotate-180 text-black dark:text-white" : ""
                            }`}
                          />
                        )}
                      </Link>

                      {/* Active indicator underline */}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#121212] dark:bg-[#c5a880] transition-all duration-300 ${
                          hoveredNavIndex === index ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Center: Brand Identity Logo */}
              <div className="flex flex-col items-center justify-center text-center">
                <Link href="/" className="group flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-semibold tracking-[0.22em] text-[#121212] dark:text-[#f4ece1] transition-transform duration-300 group-hover:scale-102">
                    LUXE
                  </span>
                  <span className="text-[8px] sm:text-[9px] tracking-[0.38em] text-[#c5a880] font-medium uppercase -mt-0.5">
                    Atelier
                  </span>
                </Link>
              </div>

              {/* Right Side: Action Icons (Search with Border, Language, Theme, Wishlist, Account, Cart) */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* 1. Search Trigger with prominent border */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Open search dialog"
                  className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full border border-[#eae5de] dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 hover:border-[#c5a880] dark:hover:border-[#c5a880] text-neutral-700 dark:text-neutral-300 text-xs font-medium transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  <Search size={15} className="text-[#c5a880]" />
                  <span className="hidden sm:inline text-neutral-500 dark:text-neutral-400">
                    {t("nav_search_short")}
                  </span>
                </button>

                {/* 2. Language Switcher (EN / Khmer) - Hidden on mobile, available in toggle menu */}
                <button
                  onClick={toggleLanguage}
                  title="Switch Language"
                  className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-full border border-[#eae5de] dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 hover:border-[#c5a880] text-neutral-700 dark:text-neutral-200 transition cursor-pointer"
                >
                  <Globe size={13} className="text-[#c5a880]" />
                  <span className="tracking-wide">{language === "en" ? "EN" : "ខ្មែរ"}</span>
                </button>

                {/* 3. Theme Toggle (Dark / Light) - Hidden on mobile, available in toggle menu */}
                <button
                  onClick={toggleTheme}
                  title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  className="hidden md:flex p-2 rounded-full border border-[#eae5de] dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 hover:border-[#c5a880] text-neutral-700 dark:text-neutral-200 transition cursor-pointer"
                  aria-label="Toggle dark mode"
                >
                  {theme === "dark" ? (
                    <Sun size={15} className="text-[#c5a880]" />
                  ) : (
                    <Moon size={15} className="text-neutral-700" />
                  )}
                </button>

                {/* 4. Account / Sign In */}
                <Link
                  href="/login"
                  aria-label="Sign In / Atelier Account"
                  className="hidden md:inline-flex p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition"
                >
                  <User size={18} />
                </Link>

                {/* 5. Wishlist Link with count badge - Hidden on mobile, featured in toggle menu */}
                <Link
                  href="/wishlist"
                  aria-label="Saved items wishlist"
                  className="hidden md:inline-flex relative p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition"
                >
                  <Heart size={18} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-[#c5a880] rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* 6. Shopping Bag Button with count badge */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Open shopping bag"
                  className="relative flex items-center gap-2 p-2 bg-[#121212] dark:bg-[#f4ece1] text-[#faf9f6] dark:text-[#111111] rounded-full sm:rounded-lg px-2.5 sm:px-3.5 py-1.5 hover:bg-neutral-800 dark:hover:bg-white transition cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  <span className="hidden sm:inline text-xs font-medium tracking-wide">
                    {t("nav_bag")} ({cartCount})
                  </span>
                  {/* Mobile count indicator */}
                  <span className="sm:hidden absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-black bg-[#c5a880] rounded-full">
                    {cartCount}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Hover Subcategory Mega Menu Dropdown */}
          {hoveredNavIndex !== null && navLinks[hoveredNavIndex]?.subCategoryGroups && (
            <div
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              }}
              onMouseLeave={handleNavMouseLeave}
              className="hidden lg:block absolute left-0 right-0 top-full bg-[#faf9f6]/98 dark:bg-[#141414]/98 backdrop-blur-md border-b border-[#eae5de] dark:border-neutral-800 shadow-2xl py-8 transition-all duration-200 z-50 animate-fadeIn"
            >
              <div className="max-w-7xl mx-auto px-8 grid grid-cols-12 gap-8 items-start">
                {/* Left columns: Subcategory Groups */}
                <div
                  className={`grid gap-8 ${
                    navLinks[hoveredNavIndex].subCategoryGroups?.length === 1
                      ? "col-span-8 grid-cols-1"
                      : "col-span-8 grid-cols-2"
                  }`}
                >
                  {navLinks[hoveredNavIndex].subCategoryGroups?.map((group) => (
                    <div key={group.title} className="space-y-3">
                      <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
                        {group.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {group.items.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              href={subItem.href}
                              onClick={() => setHoveredNavIndex(null)}
                              className="group flex items-center justify-between text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:translate-x-1 transition-all duration-200"
                            >
                              <span className="flex items-center gap-2">
                                {subItem.label}
                                {subItem.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#c5a880]/20 text-[#8c6b3e] dark:text-[#d4b88f] uppercase">
                                    {subItem.badge}
                                  </span>
                                )}
                              </span>
                              <ArrowRight
                                size={13}
                                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#c5a880]"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Right column: Featured Banner Card */}
                {navLinks[hoveredNavIndex].featuredBanner && (
                  <div className="col-span-4 pl-6 border-l border-[#eae5de] dark:border-neutral-800">
                    <Link
                      href={navLinks[hoveredNavIndex].featuredBanner!.href}
                      onClick={() => setHoveredNavIndex(null)}
                      className="group relative block aspect-[16/10] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Image
                        src={navLinks[hoveredNavIndex].featuredBanner!.image}
                        alt={navLinks[hoveredNavIndex].featuredBanner!.title}
                        fill
                        sizes="300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                        <span className="text-[9px] uppercase tracking-widest text-[#e4cbb0] font-medium block">
                          Featured Look
                        </span>
                        <strong className="text-sm font-semibold block mt-0.5">
                          {navLinks[hoveredNavIndex].featuredBanner!.title}
                        </strong>
                        <span className="text-[11px] text-neutral-300">
                          {navLinks[hoveredNavIndex].featuredBanner!.subtitle}
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Menu Drawer with Subcategories Accordion */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
        wishlistCount={wishlistCount}
      />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </>
  );
}