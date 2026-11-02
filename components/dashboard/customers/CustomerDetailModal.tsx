"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Customer, Order } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

interface CustomerDetailModalProps {
  customer: Customer | null;
  orders: Order[];
  onClose: () => void;
}

export function CustomerDetailModal({ customer, orders, onClose }: CustomerDetailModalProps) {
  if (!customer) return null;

  const customerOrders = orders.filter((o) => o.customerName === customer.name && !o.isDeleted);

  return (
    <Dialog open={!!customer} onOpenChange={onClose} className="max-w-lg">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#121212] text-white dark:bg-[#c5a880] dark:text-black flex items-center justify-center font-bold text-lg">
            {customer.name.charAt(0)}
          </div>
          <div>
            <DialogTitle>{customer.name}</DialogTitle>
            <DialogDescription>
              Joined {formatDate(customer.joinedDate)}
            </DialogDescription>
          </div>
          <Badge variant="gold" className="ml-auto text-[10px]">
            {customer.tier}
          </Badge>
        </div>
      </DialogHeader>

      <div className="space-y-4 py-2 text-xs">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800 text-center">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
              Lifetime Spend
            </span>
            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
              {formatCurrency(customer.totalSpent)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
              Orders
            </span>
            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
              {customer.ordersCount}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
              Atelier Points
            </span>
            <span className="text-sm font-bold text-[#c5a880]">
              {customer.points}
            </span>
          </div>
        </div>

        {/* Contact & Address */}
        <div className="space-y-2 p-3.5 rounded-lg border border-neutral-100 dark:border-neutral-800">
          <div className="font-semibold text-neutral-800 dark:text-neutral-200">
            Contact & Delivery Info
          </div>
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
            <Mail size={14} className="text-neutral-400 shrink-0" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
            <Phone size={14} className="text-neutral-400 shrink-0" />
            <span>{customer.phone}</span>
          </div>
          {customer.address && (
            <div className="flex items-start gap-2 text-neutral-600 dark:text-neutral-300">
              <MapPin size={14} className="text-neutral-400 shrink-0 mt-0.5" />
              <span>{customer.address}</span>
            </div>
          )}
        </div>

        {/* Recent Orders by this customer */}
        <div className="space-y-2">
          <div className="font-semibold text-neutral-800 dark:text-neutral-200">
            Recent Maison Orders
          </div>
          {customerOrders.length === 0 ? (
            <p className="text-neutral-400 italic">No past orders found.</p>
          ) : (
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {customerOrders.map((ord) => (
                <div key={ord.id} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-medium">{ord.orderNumber}</span>
                    <span className="text-neutral-400 ml-2">{formatDate(ord.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {formatCurrency(ord.totalAmount)}
                    </span>
                    <Badge variant="outline" className="text-[9px] uppercase">
                      {ord.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
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
