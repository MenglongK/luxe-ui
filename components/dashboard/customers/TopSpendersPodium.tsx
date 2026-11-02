"use client";

import React from "react";
import { Crown } from "lucide-react";
import { Customer } from "@/types/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface TopSpendersPodiumProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
}

export function TopSpendersPodium({ customers, onSelectCustomer }: TopSpendersPodiumProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crown size={18} className="text-[#c5a880]" />
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            TOP Patrons by Lifetime Purchases
          </h3>
        </div>
        <span className="text-xs text-neutral-400">
          Exclusive Atelier Society Rankings
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {customers.map((cust, idx) => (
          <Card
            key={cust.id}
            className={`relative overflow-hidden transition-all hover:border-[#c5a880] cursor-pointer ${
              idx === 0
                ? "border-[#c5a880] bg-gradient-to-br from-amber-500/[0.08] to-transparent ring-1 ring-[#c5a880]/40"
                : ""
            }`}
            onClick={() => onSelectCustomer(cust)}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      idx === 0
                        ? "bg-[#c5a880] text-black"
                        : idx === 1
                        ? "bg-neutral-300 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200"
                        : "bg-amber-800 text-white"
                    }`}
                  >
                    #{idx + 1}
                  </span>
                  <Badge variant="gold" className="text-[10px] uppercase">
                    {cust.tier}
                  </Badge>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  {cust.ordersCount} orders
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-50 truncate">
                  {cust.name}
                </h4>
                <p className="text-xs text-neutral-400 truncate">{cust.email}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                    Lifetime Spend
                  </span>
                  <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                    {formatCurrency(cust.totalSpent)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                    Points
                  </span>
                  <span className="text-sm font-semibold text-[#c5a880]">
                    {cust.points} pts
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
