"use client";

import React, { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { StockTransfer, Facility, StockItem } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface StockTransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facilities: Facility[];
  stockItems: StockItem[];
  onSave: (data: Omit<StockTransfer, "id" | "isDeleted">) => void;
}

export function StockTransferModal({
  open,
  onOpenChange,
  facilities,
  stockItems,
  onSave,
}: StockTransferModalProps) {
  const [sourceFacilityId, setSourceFacilityId] = useState(facilities[0]?.id || "fac-1");
  const [destFacilityId, setDestFacilityId] = useState(facilities[1]?.id || "fac-2");
  const [requestedBy, setRequestedBy] = useState("Logistics Officer");
  const [notes, setNotes] = useState("");
  const [transferItems, setTransferItems] = useState<StockTransfer["items"]>([]);

  const [selectedSku, setSelectedSku] = useState(stockItems[0]?.sku || "");
  const [transferQty, setTransferQty] = useState(10);

  const handleAddItem = () => {
    const itemRef = stockItems.find((s) => s.sku === selectedSku);
    const newItem = {
      sku: selectedSku,
      productName: itemRef?.productName || "Tailored Apparel",
      quantity: Number(transferQty),
    };
    setTransferItems((prev) => [...prev, newItem]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transferItems.length === 0 || sourceFacilityId === destFacilityId) return;

    const source = facilities.find((f) => f.id === sourceFacilityId);
    const dest = facilities.find((f) => f.id === destFacilityId);
    const totalItems = transferItems.reduce((sum, i) => sum + i.quantity, 0);

    onSave({
      transferCode: `TRF-2026-${Math.floor(100 + Math.random() * 900)}`,
      sourceFacilityId,
      sourceFacilityName: source?.name || "Central Logistics Hub",
      destFacilityId,
      destFacilityName: dest?.name || "Phnom Penh BKK1 Flagship",
      totalItems,
      status: "dispatched",
      transferDate: new Date().toISOString().split("T")[0],
      requestedBy,
      notes,
      items: transferItems,
    });

    setTransferItems([]);
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-lg">
      <DialogHeader>
        <div className="flex items-center gap-2">
          <ArrowRightLeft size={18} className="text-[#c5a880]" />
          <div>
            <DialogTitle>Initiate Inter-Facility Transfer</DialogTitle>
            <DialogDescription>
              Transfer inventory from warehouse to store or between boutique salons
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Source Location (From)"
            value={sourceFacilityId}
            onChange={(e) => setSourceFacilityId(e.target.value)}
          >
            {facilities.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </Select>

          <Select
            label="Destination Location (To)"
            value={destFacilityId}
            onChange={(e) => setDestFacilityId(e.target.value)}
          >
            {facilities.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </Select>
        </div>

        {sourceFacilityId === destFacilityId && (
          <p className="text-xs text-rose-500">
            Source and Destination facility cannot be the same.
          </p>
        )}

        {/* Add Items to transfer */}
        <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 space-y-3">
          <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            Select Garments to Relocate
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-7">
              <Select value={selectedSku} onChange={(e) => setSelectedSku(e.target.value)}>
                {stockItems.map((s) => (
                  <option key={s.sku} value={s.sku}>
                    {s.productName} ({s.sku})
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-span-3">
              <Input
                type="number"
                min="1"
                placeholder="Qty"
                value={transferQty}
                onChange={(e) => setTransferQty(Number(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <Button
                type="button"
                variant="secondary"
                className="w-full text-xs"
                onClick={handleAddItem}
              >
                Add
              </Button>
            </div>
          </div>

          {/* List of items */}
          {transferItems.length > 0 && (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
              {transferItems.map((item, idx) => (
                <div key={idx} className="py-1.5 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.productName}
                    </span>
                    <span className="text-neutral-400 ml-2 font-mono">
                      ({item.sku}) - {item.quantity} pcs
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTransferItems((prev) => prev.filter((_, i) => i !== idx))}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Requested By Officer"
            placeholder="e.g. Sophea Rattanak"
            value={requestedBy}
            onChange={(e) => setRequestedBy(e.target.value)}
          />
          <Input
            label="Logistics Waybill Notes"
            placeholder="e.g. Urgent weekend VIP collection"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gold"
            size="sm"
            disabled={transferItems.length === 0 || sourceFacilityId === destFacilityId}
          >
            Dispatch Transfer
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
