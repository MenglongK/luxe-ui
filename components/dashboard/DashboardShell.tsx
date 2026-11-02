"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { X } from "lucide-react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#111111] text-neutral-900 dark:text-neutral-100 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <DashboardSidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white dark:bg-[#151515] shadow-2xl z-50">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute right-3 top-3 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <X size={18} />
            </button>
            <DashboardSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onOpenMobile={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
