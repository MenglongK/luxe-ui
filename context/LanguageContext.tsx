"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function applyLanguage(lang: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("luxe-lang") as Language | null;
    if (saved === "en" || saved === "km") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
      applyLanguage(saved);
    } else {
      applyLanguage("en");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    applyLanguage(lang);
    localStorage.setItem("luxe-lang", lang);
  };

  const toggleLanguage = () => {
    const next = language === "en" ? "km" : "en";
    setLanguage(next);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
