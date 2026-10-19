"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Truck,
  Sparkles,
  ChevronRight,
  Tag,
  ArrowLeft,
  Building2,
  Wallet,
} from "lucide-react";
import { products } from "@/data";
import { useLanguage } from "@/context/LanguageContext";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export default function CheckoutPage() {
  const { t } = useLanguage();

  // Simulated active order items
  const [items] = useState<CheckoutItem[]>([
    {
      id: "item-1",
      name: products[0].name,
      price: products[0].price,
      image: products[0].images[0],
      size: "40R",
      color: "Charcoal Melange",
      quantity: 1,
    },
    {
      id: "item-2",
      name: products[1].name,
      price: products[1].price,
      image: products[1].images[0],
      size: "M",
      color: "Oatmeal Heather",
      quantity: 1,
    },
  ]);

  // Form states
  const [email, setEmail] = useState("collector@luxe-atelier.com");
  const [firstName, setFirstName] = useState("Menglong");
  const [lastName, setLastName] = useState("Keo");
  const [address, setAddress] = useState("No. 128, Preah Norodom Blvd");
  const [apartment, setApartment] = useState("Penthouse Suite 14B");
  const [city, setCity] = useState("Phnom Penh");
  const [country, setCountry] = useState("Cambodia");
  const [postalCode, setPostalCode] = useState("12000");
  const [phone, setPhone] = useState("+855 12 345 678");

  // Shipping & Payment selection
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express" | "concierge">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "aba" | "cod">("card");

  // Promo code
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>("LUXE20");
  const [promoError, setPromoError] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Subtotal calculation
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery fee
  const shippingFee = deliveryMethod === "standard" ? 0 : deliveryMethod === "express" ? 25 : 45;

  // Discount
  const discountRate = appliedPromo === "LUXE20" ? 0.2 : 0;
  const discountAmount = Math.round(subtotal * discountRate);

  // Grand total
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === "LUXE20") {
      setAppliedPromo("LUXE20");
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Use LUXE20 for 20% privilege.");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderId(`LUXE-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderPlaced(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#faf9f6] dark:bg-[#111111] py-16 px-4 transition-colors">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={36} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/15 text-[#9e7d53] dark:text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={12} />
            <span>Order Confirmed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white font-serif">
            {t("checkout_success_title")}
          </h1>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto leading-relaxed">
            {t("checkout_success_msg")}
          </p>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#eae5de] dark:border-neutral-800 text-left space-y-4 max-w-lg mx-auto shadow-xs">
            <div className="flex items-center justify-between border-b border-[#eae5de] dark:border-neutral-800 pb-3">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">{t("checkout_order_number")}</span>
              <strong className="text-sm font-mono text-neutral-900 dark:text-white font-bold">{orderId}</strong>
            </div>
            <div className="flex items-center justify-between border-b border-[#eae5de] dark:border-neutral-800 pb-3">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Total Billed</span>
              <strong className="text-sm text-neutral-900 dark:text-white">${grandTotal} USD</strong>
            </div>
            <div className="flex items-center justify-between border-b border-[#eae5de] dark:border-neutral-800 pb-3">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Recipient</span>
              <span className="text-xs text-neutral-800 dark:text-neutral-200">{firstName} {lastName}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#eae5de] dark:border-neutral-800 pb-3">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Destination</span>
              <span className="text-xs text-neutral-800 dark:text-neutral-200">{city}, {country}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Estimated Delivery</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">3–5 Business Days</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#121212] dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition"
            >
              <span>{t("checkout_continue_shopping")}</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:border-black dark:hover:border-white transition"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#111111] py-8 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Trust Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#eae5de] dark:border-neutral-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <Link href="/" className="hover:text-black dark:hover:text-white transition">{t("nav_home")}</Link>
              <ChevronRight size={12} />
              <Link href="/collections" className="hover:text-black dark:hover:text-white transition">{t("nav_collections")}</Link>
              <ChevronRight size={12} />
              <span className="text-neutral-900 dark:text-white font-medium">{t("checkout_title")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white font-serif">
              {t("checkout_title")}
            </h1>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-[#eae5de] dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs">
            <Lock size={12} className="text-[#c5a880]" />
            <span>256-Bit SSL Encrypted &amp; Guaranteed Authenticity</span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Checkout Forms */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
            
            {/* Express Checkout Strip */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#181818] border border-[#eae5de] dark:border-neutral-800 space-y-3 shadow-2xs">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block text-center">
                Express Atelier Checkout
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-lg bg-black text-white hover:bg-neutral-800 flex items-center justify-center gap-1.5 text-xs font-semibold transition"
                >
                  <span className="text-sm font-sans tracking-tight"> Pay</span>
                </button>
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-lg bg-[#004f71] text-white hover:bg-[#003d57] flex items-center justify-center gap-1.5 text-xs font-semibold transition"
                >
                  <Building2 size={14} />
                  <span>ABA PAY</span>
                </button>
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center gap-1 text-xs font-semibold transition col-span-2 sm:col-span-1"
                >
                  <Wallet size={14} />
                  <span>Google Pay</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center pt-2">
                <div className="border-t border-[#eae5de] dark:border-neutral-800 w-full" />
                <span className="bg-white dark:bg-[#181818] px-3 text-[11px] uppercase tracking-wider text-neutral-400 absolute">
                  or continue below
                </span>
              </div>
            </div>

            {/* 1. Contact Info */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181818] border border-[#eae5de] dark:border-neutral-800 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-white font-serif flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#121212] dark:bg-white text-white dark:text-black text-[10px] font-bold flex items-center justify-center">1</span>
                  <span>{t("checkout_contact")}</span>
                </h2>
                <span className="text-xs text-neutral-500">Sign in for member perks</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email Address or Mobile Phone
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                  placeholder="e.g. collector@atelier.com"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-neutral-300 text-[#121212] focus:ring-[#c5a880]"
                />
                <span className="text-xs text-neutral-600 dark:text-neutral-300">
                  Keep me updated with private salon invitations and seasonal preview drops
                </span>
              </label>
            </div>

            {/* 2. Shipping Address */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181818] border border-[#eae5de] dark:border-neutral-800 space-y-4 shadow-2xs">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white font-serif flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#121212] dark:bg-white text-white dark:text-black text-[10px] font-bold flex items-center justify-center">2</span>
                <span>{t("checkout_shipping_address")}</span>
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Country / Territory
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                  >
                    <option value="Cambodia">Cambodia (ព្រះរាជាណាចក្រកម្ពុជា)</option>
                    <option value="United States">United States</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Japan">Japan</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Apartment, suite, unit (optional)
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181818] border border-[#eae5de] dark:border-neutral-800 space-y-4 shadow-2xs">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white font-serif flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#121212] dark:bg-white text-white dark:text-black text-[10px] font-bold flex items-center justify-center">3</span>
                <span>{t("checkout_delivery_method")}</span>
              </h2>

              <div className="space-y-2.5">
                <label
                  onClick={() => setDeliveryMethod("standard")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    deliveryMethod === "standard"
                      ? "border-black dark:border-white bg-[#faf9f6] dark:bg-neutral-800/60 ring-1 ring-black dark:ring-white"
                      : "border-[#eae5de] dark:border-neutral-700 hover:border-[#c5a880]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "standard"}
                      onChange={() => setDeliveryMethod("standard")}
                      className="text-black"
                    />
                    <div>
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white block">
                        Standard Atelier Delivery (3–5 Business Days)
                      </span>
                      <span className="text-[11px] text-neutral-500">Tracked, signature upon request</span>
                    </div>
                  </div>
                  <strong className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Complimentary
                  </strong>
                </label>

                <label
                  onClick={() => setDeliveryMethod("express")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    deliveryMethod === "express"
                      ? "border-black dark:border-white bg-[#faf9f6] dark:bg-neutral-800/60 ring-1 ring-black dark:ring-white"
                      : "border-[#eae5de] dark:border-neutral-700 hover:border-[#c5a880]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "express"}
                      onChange={() => setDeliveryMethod("express")}
                      className="text-black"
                    />
                    <div>
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white block">
                        Express Air Courier (1–2 Business Days)
                      </span>
                      <span className="text-[11px] text-neutral-500">Priority international air clearance</span>
                    </div>
                  </div>
                  <strong className="text-xs font-semibold text-neutral-900 dark:text-white">$25.00</strong>
                </label>

                <label
                  onClick={() => setDeliveryMethod("concierge")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    deliveryMethod === "concierge"
                      ? "border-black dark:border-white bg-[#faf9f6] dark:bg-neutral-800/60 ring-1 ring-black dark:ring-white"
                      : "border-[#eae5de] dark:border-neutral-700 hover:border-[#c5a880]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "concierge"}
                      onChange={() => setDeliveryMethod("concierge")}
                      className="text-black"
                    />
                    <div>
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white block">
                        White-Glove Concierge Tailoring Delivery
                      </span>
                      <span className="text-[11px] text-neutral-500">Scheduled in-suite fitting &amp; garment care</span>
                    </div>
                  </div>
                  <strong className="text-xs font-semibold text-neutral-900 dark:text-white">$45.00</strong>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181818] border border-[#eae5de] dark:border-neutral-800 space-y-4 shadow-2xs">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white font-serif flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#121212] dark:bg-white text-white dark:text-black text-[10px] font-bold flex items-center justify-center">4</span>
                <span>{t("checkout_payment_method")}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-20 ${
                    paymentMethod === "card"
                      ? "border-black dark:border-white bg-[#faf9f6] dark:bg-neutral-800 ring-1 ring-black dark:ring-white"
                      : "border-[#eae5de] dark:border-neutral-700"
                  }`}
                >
                  <CreditCard size={18} className="text-[#c5a880]" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white block">Credit Card</span>
                    <span className="text-[10px] text-neutral-400">Visa, MC, Amex</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("aba")}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-20 ${
                    paymentMethod === "aba"
                      ? "border-black dark:border-white bg-[#faf9f6] dark:bg-neutral-800 ring-1 ring-black dark:ring-white"
                      : "border-[#eae5de] dark:border-neutral-700"
                  }`}
                >
                  <Building2 size={18} className="text-[#004f71]" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white block">ABA PAY / KHQR</span>
                    <span className="text-[10px] text-neutral-400">Scan &amp; Pay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-20 ${
                    paymentMethod === "cod"
                      ? "border-black dark:border-white bg-[#faf9f6] dark:bg-neutral-800 ring-1 ring-black dark:ring-white"
                      : "border-[#eae5de] dark:border-neutral-700"
                  }`}
                >
                  <Truck size={18} className="text-emerald-600" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white block">Cash on Delivery</span>
                    <span className="text-[10px] text-neutral-400">Inspect First</span>
                  </div>
                </button>
              </div>

              {/* Conditional Payment Details */}
              {paymentMethod === "card" && (
                <div className="space-y-3 pt-3 border-t border-[#eae5de] dark:border-neutral-800">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs font-mono text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs font-mono text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Security Code (CVC)
                      </label>
                      <input
                        type="text"
                        defaultValue="892"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs font-mono text-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "aba" && (
                <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-300 space-y-1">
                  <strong>KHQR Instant Payment Ready</strong>
                  <p className="text-[11px] leading-relaxed">
                    Upon clicking place order, your high-resolution KHQR code will be displayed for instant payment via ABA Mobile or any Bakong-compatible app.
                  </p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                  <strong>White-Glove Garment Inspection</strong>
                  <p className="text-[11px] leading-relaxed">
                    Pay securely in cash or mobile QR upon personal courier arrival and inspection of your garment.
                  </p>
                </div>
              )}
            </div>

            {/* Place Order CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#121212] dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
              >
                <Lock size={16} />
                <span>
                  {isSubmitting ? "Securing Your Garments..." : `${t("checkout_place_order")} • $${grandTotal} USD`}
                </span>
                <ArrowRight size={16} />
              </button>
              <p className="text-[11px] text-center text-neutral-400 mt-2">
                By placing your order, you agree to LUXE Atelier&apos;s Terms of Service and 30-Day Return Guarantee.
              </p>
            </div>

          </form>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181818] border border-[#eae5de] dark:border-neutral-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#eae5de] dark:border-neutral-800 pb-3">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white font-serif">
                  {t("checkout_order_summary")} ({items.length})
                </h3>
                <span className="text-xs text-[#c5a880] font-medium">Autumn Edit</span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-[#eae5de] dark:border-neutral-700">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {item.color} • Size {item.size}
                      </p>
                      <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-1 block">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-3 border-t border-[#eae5de] dark:border-neutral-800">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      placeholder={t("checkout_promo_code")}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition"
                  >
                    {t("checkout_apply")}
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={12} />
                      Code <strong>{appliedPromo}</strong> applied (-20%)
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="text-neutral-400 hover:text-neutral-700 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-500 mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#eae5de] dark:border-neutral-800 text-xs">
                <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
                  <span>{t("cart_subtotal")}</span>
                  <span className="font-medium text-neutral-900 dark:text-white">${subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Privilege Courtesy (LUXE20)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
                  <span>{t("cart_shipping")}</span>
                  <span>{shippingFee === 0 ? "Complimentary" : `$${shippingFee}`}</span>
                </div>

                <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
                  <span>Duties &amp; Luxury Import VAT</span>
                  <span className="text-neutral-500">Included</span>
                </div>

                <div className="pt-3 border-t border-[#eae5de] dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">{t("cart_total")}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-neutral-900 dark:text-white">
                      ${grandTotal}
                    </span>
                    <span className="block text-[10px] text-neutral-400 uppercase tracking-wider">USD</span>
                  </div>
                </div>
              </div>

              {/* Atelier White Glove Note */}
              <div className="p-3.5 rounded-xl bg-[#faf9f6] dark:bg-neutral-900 border border-[#eae5de] dark:border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  <ShieldCheck size={14} className="text-[#c5a880]" />
                  <span>Complimentary Luxury Atelier Packaging</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                  Includes signature embossed black linen box, breathable Italian garment dust bag, and cedar hanger.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
