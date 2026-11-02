"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const currentTab = value !== undefined ? value : internalValue;

  const handleTabChange = (val: string) => {
    if (value === undefined) {
      setInternalValue(val);
    }
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab: currentTab, setActiveTab: handleTabChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-500 dark:bg-neutral-800/80 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      type="button"
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        isActive
          ? "bg-white text-neutral-900 shadow-xs font-semibold dark:bg-[#1a1a1a] dark:text-[#f4ece1]"
          : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.activeTab !== value) return null;

  return (
    <div className={cn("mt-4 focus-visible:outline-none animate-in fade-in-50 duration-200", className)}>
      {children}
    </div>
  );
}
