"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Supplier } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SupplierDetailModalProps {
  supplier: Supplier | null;
  onClose: () => void;
}

export function SupplierDetailModal({ supplier, onClose }: SupplierDetailModalProps) {
  if (!supplier) return null;

  return (
    <Dialog open={!!supplier} onOpenChange={onClose} className="max-w-md">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#c5a880]/20 text-[#886737] dark:text-[#dfc6a3] flex items-center justify-center font-bold text-lg">
            {supplier.name.charAt(0)}
          </div>
          <div>
            <DialogTitle>{supplier.name}</DialogTitle>
            <DialogDescription className="font-mono">{supplier.code}</DialogDescription>
          </div>
          <Badge variant="gold" className="ml-auto text-[10px]">
            {supplier.category}
          </Badge>
        </div>
      </DialogHeader>

      <div className="space-y-3 py-2 text-xs">
        <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">
              Lead Time
            </span>
            <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              {supplier.leadTimeDays} Days
            </span>
          </div>
          <div>
            <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">
              Credit Terms
            </span>
            <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              {supplier.paymentTerms}
            </span>
          </div>
        </div>

        <div className="space-y-2 p-3.5 rounded-lg border border-neutral-100 dark:border-neutral-800">
          <div className="font-semibold text-neutral-800 dark:text-neutral-200">
            Supplier Point of Contact
          </div>
          <div className="text-neutral-700 dark:text-neutral-300 font-medium">
            {supplier.contactPerson}
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <Mail size={13} />
            <span>{supplier.email}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <Phone size={13} />
            <span>{supplier.phone}</span>
          </div>
          <div className="flex items-start gap-2 text-neutral-500">
            <MapPin size={13} className="shrink-0 mt-0.5" />
            <span>{supplier.address}</span>
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
