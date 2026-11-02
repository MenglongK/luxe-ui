"use client";

import React, { useState } from "react";
import { Coupon } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface CouponModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  couponToEdit?: Coupon | null;
  onSave: (data: Omit<Coupon, "id" | "usageCount" | "isDeleted">, id?: string) => void;
}

export function CouponModal({ open, onOpenChange, couponToEdit, onSave }: CouponModalProps) {
  const [code, setCode] = useState(couponToEdit?.code || "");
  const [description, setDescription] = useState(couponToEdit?.description || "");
  const [discountType, setDiscountType] = useState<Coupon["discountType"]>(
    couponToEdit?.discountType || "percentage"
  );
  const [discountValue, setDiscountValue] = useState(
    couponToEdit ? String(couponToEdit.discountValue) : "15"
  );
  const [minSpend, setMinSpend] = useState(
    couponToEdit ? String(couponToEdit.minSpend) : "300"
  );
  const [usageLimit, setUsageLimit] = useState(
    couponToEdit ? String(couponToEdit.usageLimit) : "500"
  );
  const [expiryDate, setExpiryDate] = useState(
    couponToEdit?.expiryDate || "2026-12-31"
  );
  const [status, setStatus] = useState<Coupon["status"]>(
    couponToEdit?.status || "active"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discountValue) return;

    onSave(
      {
        code: code.toUpperCase(),
        description,
        discountType,
        discountValue: Number(discountValue),
        minSpend: Number(minSpend),
        usageLimit: Number(usageLimit),
        startDate: couponToEdit ? couponToEdit.startDate : new Date().toISOString().split("T")[0],
        expiryDate,
        status,
      },
      couponToEdit ? couponToEdit.id : undefined
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-md">
      <DialogHeader>
        <DialogTitle>
          {couponToEdit ? "Edit Coupon Parameters" : "Create New Promotion Voucher"}
        </DialogTitle>
        <DialogDescription>
          Configure promo code, threshold conditions, and expiration date
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3 py-2">
        <Input
          label="Coupon Code *"
          required
          placeholder="e.g. WINTERLUXE20"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Input
          label="Description *"
          required
          placeholder="e.g. 20% discount on tailored outerwear"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Discount Type"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as Coupon["discountType"])}
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Currency ($)</option>
          </Select>

          <Input
            label="Value (% or $)"
            type="number"
            required
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Minimum Spend ($)"
            type="number"
            value={minSpend}
            onChange={(e) => setMinSpend(e.target.value)}
          />
          <Input
            label="Usage Limit"
            type="number"
            value={usageLimit}
            onChange={(e) => setUsageLimit(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Expiry Date"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />

          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Coupon["status"])}
          >
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="disabled">Disabled</option>
          </Select>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" size="sm">
            {couponToEdit ? "Save Changes" : "Create Coupon"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
