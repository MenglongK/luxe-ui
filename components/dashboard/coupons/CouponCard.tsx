"use client";

import React, { useState } from "react";
import { Copy, Check, Edit2, Trash2, RotateCcw } from "lucide-react";
import { Coupon } from "@/types/dashboard";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

interface CouponCardProps {
  coupon: Coupon;
  isAdmin: boolean;
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
  onRestore: (id: string) => void;
}

export function CouponCard({ coupon, isAdmin, onEdit, onDelete, onRestore }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="relative overflow-hidden border border-neutral-200/80 dark:border-neutral-800 transition-all hover:border-[#c5a880]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge
            variant={
              coupon.status === "active"
                ? "gold"
                : coupon.status === "expired"
                ? "secondary"
                : "destructive"
            }
            className="text-[10px] uppercase font-semibold"
          >
            {coupon.status}
          </Badge>

          {isAdmin && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(coupon)}
                className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                title="Edit Coupon"
              >
                <Edit2 size={14} />
              </button>
              {coupon.isDeleted ? (
                <button
                  onClick={() => onRestore(coupon.id)}
                  className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600"
                  title="Restore Coupon"
                >
                  <RotateCcw size={14} />
                </button>
              ) : (
                <button
                  onClick={() => onDelete(coupon)}
                  className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500"
                  title="Delete Coupon Options"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-lg font-bold tracking-wider text-neutral-900 dark:text-neutral-50">
            {coupon.code}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-200 transition cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-500" />
                <span className="text-emerald-600 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-xs">
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed min-h-[36px]">
          {coupon.description}
        </p>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-neutral-400">Discount Value:</span>
            <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              {coupon.discountType === "percentage"
                ? `${coupon.discountValue}% OFF`
                : `${formatCurrency(coupon.discountValue)} OFF`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Minimum Spend:</span>
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              {formatCurrency(coupon.minSpend)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Redemption Count:</span>
            <span className="font-mono text-neutral-700 dark:text-neutral-300">
              {coupon.usageCount} / {coupon.usageLimit}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Valid Until:</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {formatDate(coupon.expiryDate)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
