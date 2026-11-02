"use client";

import React, { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, children, className }: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog container */}
      <div
        className={cn(
          "relative z-50 w-full max-w-lg rounded-xl border border-neutral-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 dark:border-neutral-800 dark:bg-[#181818] dark:text-neutral-100 max-h-[90vh] overflow-y-auto",
          className
        )}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-md p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition-colors"
        >
          <X size={18} />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col space-y-1.5 pb-4 border-b border-neutral-100 dark:border-neutral-800", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50", className)}>{children}</h2>;
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", className)}>{children}</p>;
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-6", className)}>
      {children}
    </div>
  );
}
