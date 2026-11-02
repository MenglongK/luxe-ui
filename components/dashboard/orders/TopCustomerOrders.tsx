"use client";

import React from "react";
import { Award } from "lucide-react";
import { Order } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface TopCustomerOrdersProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export function TopCustomerOrders({ orders, onSelectOrder }: TopCustomerOrdersProps) {
  return (
    <Card className="border-[#c5a880]/40 bg-gradient-to-r from-amber-500/[0.03] to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[#c5a880]/20 text-[#8c6d40] dark:text-[#dfc6a3]">
              <Award size={18} />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">Top Customer Orders by Value</CardTitle>
              <CardDescription className="text-xs">
                Highest single ticket transactions across all salons
              </CardDescription>
            </div>
          </div>
          <Badge variant="gold" className="text-[10px] uppercase">
            VIP Tier Purchases
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {orders.map((ord, idx) => (
            <div
              key={ord.id}
              onClick={() => onSelectOrder(ord)}
              className="p-3.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] hover:border-[#c5a880] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-mono font-medium text-neutral-600 dark:text-neutral-300">
                  #{idx + 1} {ord.orderNumber}
                </span>
                <Badge variant="outline" className="text-[9px] uppercase">
                  {ord.orderType}
                </Badge>
              </div>
              <h4 className="mt-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-[#c5a880] transition-colors">
                {ord.customerName}
              </h4>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                  {formatCurrency(ord.totalAmount)}
                </span>
                <span className="text-[11px] text-neutral-400">
                  {ord.items.length} item(s)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
