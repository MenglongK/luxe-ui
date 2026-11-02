import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  icon?: ReactNode;
  variant?: "default" | "gold" | "alert";
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  subtitle,
  icon,
  variant = "default",
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-200 border",
        variant === "gold" &&
          "border-[#c5a880]/50 bg-gradient-to-br from-amber-500/[0.04] via-transparent to-transparent dark:border-[#c5a880]/30",
        variant === "alert" &&
          "border-rose-300 bg-rose-50/20 dark:border-rose-900/50 dark:bg-rose-950/10",
        className
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.14em]">
            {title}
          </p>
          {icon && (
            <div
              className={cn(
                "p-2 rounded-lg text-neutral-700 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200",
                variant === "gold" && "text-[#977443] bg-[#c5a880]/20 dark:text-[#e4cbb0]",
                variant === "alert" && "text-rose-600 bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300"
              )}
            >
              {icon}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 tabular-nums">
            {value}
          </h4>
          {change && (
            <div
              className={cn(
                "flex items-center text-xs font-medium gap-0.5",
                trend === "up" && "text-emerald-600 dark:text-emerald-400",
                trend === "down" && "text-rose-600 dark:text-rose-400",
                trend === "neutral" && "text-neutral-500"
              )}
            >
              {trend === "up" && <TrendingUp size={13} />}
              {trend === "down" && <TrendingDown size={13} />}
              <span>{change}</span>
            </div>
          )}
        </div>

        {subtitle && (
          <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500 leading-tight">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
