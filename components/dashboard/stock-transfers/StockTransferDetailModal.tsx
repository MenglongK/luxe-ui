"use client";

import React from "react";
import { StockTransfer } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface StockTransferDetailModalProps {
  transfer: StockTransfer | null;
  onClose: () => void;
}

export function StockTransferDetailModal({ transfer, onClose }: StockTransferDetailModalProps) {
  if (!transfer) return null;

  return (
    <Dialog open={!!transfer} onOpenChange={onClose} className="max-w-md">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="font-mono">{transfer.transferCode}</DialogTitle>
            <DialogDescription>
              Dispatched on {formatDate(transfer.transferDate)}
            </DialogDescription>
          </div>
          <Badge variant="gold" className="text-[10px] capitalize">
            {transfer.status.replace("_", " ")}
          </Badge>
        </div>
      </DialogHeader>

      <div className="space-y-3 py-2 text-xs">
        <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800 space-y-1">
          <div>
            <span className="text-neutral-400">Origin:</span>{" "}
            <strong>{transfer.sourceFacilityName}</strong>
          </div>
          <div>
            <span className="text-neutral-400">Destination:</span>{" "}
            <strong>{transfer.destFacilityName}</strong>
          </div>
          <div>
            <span className="text-neutral-400">Officer:</span> {transfer.requestedBy}
          </div>
          {transfer.notes && (
            <div className="text-neutral-600 dark:text-neutral-300 italic pt-1">
              &quot;{transfer.notes}&quot;
            </div>
          )}
        </div>

        <div className="space-y-2">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            Waybill Manifest Items
          </span>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {transfer.items.map((it, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">
                    {it.productName}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">{it.sku}</div>
                </div>
                <div className="font-bold">{it.quantity} pcs</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-between font-bold text-sm text-neutral-900 dark:text-neutral-100 border-t border-neutral-100 dark:border-neutral-800">
          <span>Total Shipment Pieces:</span>
          <span>{transfer.totalItems} units</span>
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
