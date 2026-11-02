"use client";

import React from "react";
import { Order } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose} className="max-w-lg">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="font-mono">{order.orderNumber}</DialogTitle>
            <DialogDescription>
              Placed on {formatDate(order.createdAt)}
            </DialogDescription>
          </div>
          <Badge variant="gold" className="uppercase text-[10px]">
            {order.orderType}
          </Badge>
        </div>
      </DialogHeader>

      <div className="space-y-4 py-2 text-xs">
        {/* Customer Details */}
        <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800 space-y-1">
          <div className="font-semibold text-neutral-900 dark:text-neutral-100">
            {order.customerName}
          </div>
          <div className="text-neutral-500">{order.customerEmail}</div>
          {order.customerPhone && (
            <div className="text-neutral-500">{order.customerPhone}</div>
          )}
          <div className="text-neutral-400 text-[11px] pt-1">
            Fulfillment Location: {order.facilityName}
          </div>
        </div>

        {/* Itemized breakdown */}
        <div className="space-y-2">
          <div className="font-semibold text-neutral-800 dark:text-neutral-200">
            Itemized Summary
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {order.items.map((item) => (
              <div key={item.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">
                    {item.productName}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">{item.sku}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(item.totalPrice)}</div>
                  <div className="text-[11px] text-neutral-400">
                    {item.quantity} x {formatCurrency(item.unitPrice)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Payment details */}
        <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 flex items-center justify-between">
          <div>
            <span className="text-neutral-500 block">Payment Method:</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {order.paymentMethod}
            </span>
          </div>
          <div className="text-right">
            <span className="text-neutral-500 block">Grand Total:</span>
            <span className="text-base font-bold text-neutral-900 dark:text-neutral-50">
              {formatCurrency(order.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="default" size="sm" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
