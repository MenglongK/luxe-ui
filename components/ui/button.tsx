import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "gold";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-lg text-sm";

    const variants: Record<string, string> = {
      default:
        "bg-[#121212] text-white hover:bg-neutral-800 dark:bg-white dark:text-[#121212] dark:hover:bg-neutral-200 shadow-sm",
      secondary:
        "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
      outline:
        "border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800",
      ghost:
        "bg-transparent text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 shadow-sm",
      gold:
        "bg-[#c5a880] text-[#121212] hover:bg-[#b3956e] font-semibold shadow-sm tracking-wide",
    };

    const sizes: Record<string, string> = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-xs sm:text-sm gap-2",
      lg: "h-11 px-6 text-sm sm:text-base gap-2.5",
      icon: "h-9 w-9 p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
