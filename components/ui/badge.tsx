import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive" | "gold";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default:
      "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary:
      "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
    outline:
      "border border-neutral-300 text-neutral-800 dark:border-neutral-700 dark:text-neutral-300",
    success:
      "bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50",
    warning:
      "bg-amber-50 text-amber-700 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",
    destructive:
      "bg-rose-50 text-rose-700 border border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50",
    gold:
      "bg-[#c5a880]/15 text-[#8f744e] border border-[#c5a880]/40 dark:bg-[#c5a880]/20 dark:text-[#dfc6a3] dark:border-[#c5a880]/40 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
