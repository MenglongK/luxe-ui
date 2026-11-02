"use client";

import React, { useState } from "react";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Shield,
  Layers,
  Wrench,
  Check,
  ChevronDown,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { useTheme } from "@/context/ThemeContext";
import { UserRole } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export function DashboardHeader({ onOpenMobile }: { onOpenMobile: () => void }) {
  const { currentRole, setCurrentRole, searchQuery, setSearchQuery } = useDashboard();
  const { theme, toggleTheme } = useTheme();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { id: UserRole; label: string; icon: typeof Shield; color: string }[] = [
    { id: "admin", label: "Administrator", icon: Shield, color: "text-[#c5a880]" },
    { id: "staff", label: "Store Staff & POS", icon: Layers, color: "text-blue-500" },
    { id: "stock-controller", label: "Stock Controller", icon: Wrench, color: "text-amber-500" },
  ];

  const activeRoleObj = roles.find((r) => r.id === currentRole) || roles[0];
  const ActiveIcon = activeRoleObj.icon;

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 dark:border-neutral-800/80 dark:bg-[#151515]/90">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
        >
          <Menu size={20} />
          <span className="sr-only">Toggle Sidebar</span>
        </button>

        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="search"
            placeholder="Search orders, customers, SKUs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#c5a880] border border-transparent focus:border-[#c5a880]"
          />
        </div>
      </div>

      {/* Right: Role Switcher & Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher Pill Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 transition-colors cursor-pointer"
          >
            <ActiveIcon size={14} className={activeRoleObj.color} />
            <span className="hidden sm:inline">Role:</span>
            <span className="font-semibold">{activeRoleObj.label}</span>
            <ChevronDown size={13} className="text-neutral-400 ml-0.5" />
          </button>

          {roleDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl dark:border-neutral-800 dark:bg-[#1a1a1a] z-50 animate-in fade-in zoom-in-95"
              onClick={() => setRoleDropdownOpen(false)}
            >
              <div className="px-3 py-2 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800 mb-1">
                Switch Perspective
              </div>
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = r.id === currentRole;
                return (
                  <button
                    key={r.id}
                    onClick={() => setCurrentRole(r.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer text-left",
                      isSelected
                        ? "bg-[#c5a880]/15 text-[#886737] dark:text-[#dfc6a3] font-semibold"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={r.color} />
                      <span>{r.label}</span>
                    </div>
                    {isSelected && <Check size={14} className="text-[#c5a880]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title="Toggle light/dark theme"
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* User Avatar & Status */}
        <div className="flex items-center gap-2 pl-2 border-l border-neutral-200 dark:border-neutral-800">
          <div className="w-8 h-8 rounded-full bg-[#121212] text-white dark:bg-[#c5a880] dark:text-black flex items-center justify-center text-xs font-semibold uppercase tracking-wider shadow-xs">
            {currentRole === "admin" ? "AD" : currentRole === "staff" ? "ST" : "SC"}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
              {currentRole === "admin" ? "Atelier Director" : currentRole === "staff" ? "Floor Specialist" : "Logistics Officer"}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium leading-tight">
              ● Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
