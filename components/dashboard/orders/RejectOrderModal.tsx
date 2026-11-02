"use client";

import React, { useState } from "react";
import { XCircle } from "lucide-react";
import { Order } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RejectOrderModalProps {
  order: Order | null;
  onClose: () => void;
  onConfirmReject: (orderId: string, reason: string) => void;
}

export function RejectOrderModal({ order, onClose, onConfirmReject }: RejectOrderModalProps) {
  const [reason, setReason] = useState("");

  if (!order) return null;

  const handleConfirm = () => {
    onConfirmReject(order.id, reason || "Product unavailable or customer cancellation");
    setReason("");
    onClose();
  };

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogHeader>
        <div className="flex items-center gap-2 text-rose-600">
          <XCircle size={20} />
          <div>
            <DialogTitle>Reject Online Order</DialogTitle>
            <DialogDescription>
              Provide an internal note / client notification reason for cancellation
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-3 py-3">
        <p className="text-xs text-neutral-600 dark:text-neutral-300">
          Order: <strong className="font-mono">{order.orderNumber}</strong> by {order.customerName}
        </p>
        <Input
          label="Rejection Reason"
          placeholder="e.g. Size tailored variant out of stock, customer requested refund"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <DialogFooter>
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" size="sm" onClick={handleConfirm}>
          Confirm Rejection
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
