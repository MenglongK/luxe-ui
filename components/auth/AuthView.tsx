"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Award,
  Crown,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AuthViewProps {
  initialMode?: "signin" | "register";
}

export default function AuthView({ initialMode = "signin" }: AuthViewProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"signin" | "register">(initialMode);

  // Form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [joinClub, setJoinClub] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // State feedback
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot password modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  // Google Login Handler
  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);

    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsGoogleLoading(false);
      const googleUser = {
        name: "Menglong Keo",
        email: "menglong.keo@gmail.com",
      };
      setAuthSuccess(`Signed in with Google as ${googleUser.name} (${googleUser.email})`);
    }, 1200);
  };

  // Email/Password Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === "register") {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match. Please verify.");
        return;
      }
      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        return;
      }
      if (!agreeTerms) {
        setErrorMessage("Please agree to the Terms of Service to continue.");
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === "signin") {
        setAuthSuccess(t("auth_success_signin"));
      } else {
        setAuthSuccess(t("auth_success_register"));
      }
    }, 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setIsForgotModalOpen(false);
        setForgotEmail("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 sm:py-16 px-4 bg-[#faf9f6] dark:bg-[#111111] transition-colors">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden bg-white dark:bg-[#181818] border border-[#eae5de] dark:border-neutral-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: High-Fashion Atelier Editorial Visual (Desktop) */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-10 bg-neutral-900 text-white overflow-hidden">
          {/* Background Editorial Imagery */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90"
              alt="LUXE Atelier Society Membership"
              fill
              priority
              className="object-cover brightness-[0.6] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Top Brand Marker */}
          <div className="relative z-10 space-y-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-[0.25em] text-white">LUXE</span>
              <span className="block text-[8px] tracking-[0.4em] text-[#c5a880] font-medium uppercase -mt-1">
                Atelier
              </span>
            </Link>
          </div>

          {/* Bottom Editorial Content & Perks */}
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e4cbb0] text-xs font-semibold uppercase tracking-wider">
              <Crown size={12} className="text-[#c5a880]" />
              <span>The Atelier Society</span>
            </div>

            <div>
              <blockquote className="text-lg font-light text-neutral-100 font-serif leading-snug">
                “True elegance is not about standing out, but about being unforgettable.”
              </blockquote>
              <span className="text-xs text-neutral-400 mt-1 block tracking-wider uppercase">
                Autumn / Winter Editorial
              </span>
            </div>

            {/* Exclusive Perks Strip */}
            <div className="space-y-3 pt-4 border-t border-white/20 text-xs">
              <div className="flex items-center gap-2.5 text-neutral-200">
                <Sparkles size={14} className="text-[#c5a880] shrink-0" />
                <span>15% Welcome Courtesy on your inaugural garment</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-200">
                <ShieldCheck size={14} className="text-[#c5a880] shrink-0" />
                <span>Private salon invitations in Paris, Milan &amp; New York</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-200">
                <Award size={14} className="text-[#c5a880] shrink-0" />
                <span>Complimentary bespoke tailoring consultation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Card (Sign In / Register) */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
          <div>
            
            {/* Top Switcher Tabs (Sign In / Register) */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#eae5de] dark:border-neutral-800">
              <div className="flex items-center gap-2 p-1 rounded-xl bg-[#faf9f6] dark:bg-neutral-900 border border-[#eae5de] dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setErrorMessage(null);
                    setAuthSuccess(null);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    mode === "signin"
                      ? "bg-[#121212] dark:bg-white text-white dark:text-black shadow-xs"
                      : "text-neutral-500 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {t("auth_signin")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setErrorMessage(null);
                    setAuthSuccess(null);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    mode === "register"
                      ? "bg-[#121212] dark:bg-white text-white dark:text-black shadow-xs"
                      : "text-neutral-500 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {t("auth_register")}
                </button>
              </div>

              <Link
                href="/"
                className="text-xs text-neutral-400 hover:text-black dark:hover:text-white transition"
              >
                Back to Boutique
              </Link>
            </div>

            {/* Header Titles */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white font-serif">
                {mode === "signin" ? t("auth_welcome_back") : t("auth_join_society")}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                {mode === "signin"
                  ? "Access your personal curated wardrobe, bespoke orders, and wishlist."
                  : "Create an Atelier profile to receive private access and 15% off."}
              </p>
            </div>

            {/* Success Banner */}
            {authSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>{authSuccess}</span>
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                {errorMessage}
              </div>
            )}

            {/* GOOGLE LOGIN / REGISTER BUTTON */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full py-3 px-4 rounded-xl border border-[#eae5de] dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center justify-center gap-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {/* Official Google 4-Color SVG Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.14C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.14z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.27 6.59l4.01 3.14c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>

                <span>
                  {isGoogleLoading
                    ? "Authenticating with Google..."
                    : mode === "signin"
                    ? t("auth_google_btn")
                    : t("auth_google_signup")}
                </span>
              </button>

              {/* Subtle Divider */}
              <div className="relative flex items-center justify-center pt-2">
                <div className="border-t border-[#eae5de] dark:border-neutral-800 w-full" />
                <span className="bg-white dark:bg-[#181818] px-3 text-[11px] uppercase tracking-wider text-neutral-400 absolute">
                  {t("auth_or_divider")}
                </span>
              </div>
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              
              {/* Full name (Register mode only) */}
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {t("auth_full_name")}
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-3 text-neutral-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Menglong Keo"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t("auth_email")}
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="collector@luxe-atelier.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {t("auth_password")}
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-[11px] text-[#c5a880] hover:text-[#9e7d53] transition"
                    >
                      {t("auth_forgot_password")}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Register mode only) */}
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {t("auth_confirm_password")}
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-3 text-neutral-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880] transition font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Checkboxes */}
              {mode === "signin" ? (
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-neutral-300 text-black focus:ring-[#c5a880]"
                  />
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">
                    {t("auth_remember_me")}
                  </span>
                </label>
              ) : (
                <div className="space-y-2.5 pt-1">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={joinClub}
                      onChange={(e) => setJoinClub(e.target.checked)}
                      className="rounded border-neutral-300 text-black focus:ring-[#c5a880] mt-0.5"
                    />
                    <span className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                      {t("auth_vip_perk")}
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="rounded border-neutral-300 text-black focus:ring-[#c5a880] mt-0.5"
                    />
                    <span className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                      {t("auth_terms_agree")}
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#121212] dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>
                    {isLoading
                      ? "Verifying Atelier Credentials..."
                      : mode === "signin"
                      ? t("auth_signin")
                      : t("auth_register")}
                  </span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </form>

            {/* Bottom Switch Mode Link */}
            <div className="mt-8 pt-6 border-t border-[#eae5de] dark:border-neutral-800 text-center text-xs text-neutral-500">
              {mode === "signin" ? (
                <p>
                  {t("auth_dont_have_account")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setErrorMessage(null);
                      setAuthSuccess(null);
                    }}
                    className="font-semibold text-neutral-900 dark:text-white underline hover:text-[#c5a880] transition cursor-pointer"
                  >
                    {t("auth_register")}
                  </button>
                </p>
              ) : (
                <p>
                  {t("auth_already_have_account")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setErrorMessage(null);
                      setAuthSuccess(null);
                    }}
                    className="font-semibold text-neutral-900 dark:text-white underline hover:text-[#c5a880] transition cursor-pointer"
                  >
                    {t("auth_signin")}
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border border-[#eae5de] dark:border-neutral-800 shadow-2xl relative">
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black dark:hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white font-serif mb-1">
              Reset Atelier Credentials
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Enter your registered email address and we will dispatch secure instructions to reset your password.
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Password reset dispatch sent to your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your registered email..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#eae5de] dark:border-neutral-700 bg-[#faf9f6] dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#c5a880]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#121212] dark:bg-white text-white dark:text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
