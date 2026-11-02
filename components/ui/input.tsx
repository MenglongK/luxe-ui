import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "flex h-9.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-[#c5a880] focus:outline-none focus:ring-1 focus:ring-[#c5a880] disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-[11px] text-rose-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
