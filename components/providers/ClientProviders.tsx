"use client";

import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { StoreProvider } from "@/store/StoreProvider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
