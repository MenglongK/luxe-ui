"use client";

import React, { useState } from "react";
import { StockImport, Supplier, Facility, StockItem } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

interface StockImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suppliers: Supplier[];
  facilities: Facility[];
  stockItems: StockItem[];
  onSave: (data: Omit<StockImport, "id" | "isDeleted">) => void;
}

export function StockImportModal({
  open,
  onOpenChange,
  suppliers,
  facilities,
  stockItems,
  onSave,
}: StockImportModalProps) {
  const [poNumber, setPoNumber] = useState("PO-2026-0099");
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || "sup-1");
  const [facilityId, setFacilityId] = useState(facilities[0]?.id || "fac-1");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<StockImport["items"]>([]);

  const [itemSku, setItemSku] = useState(stockItems[0]?.sku || "");
  const [itemQty, setItemQty] = useState(50);
  const [itemCost, setItemCost] = useState(200);

  const handleAddLineItem = () => {
    const stockRef = stockItems.find((s) => s.sku === itemSku);
    const newItem = {
      sku: itemSku,
      productName: stockRef?.productName || "Tailored Luxury Item",
      quantity: Number(itemQty),
      unitCost: Number(itemCost),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const supplier = suppliers.find((s) => s.id === supplierId);
    const facility = facilities.find((f) => f.id === facilityId);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalCost = items.reduce((sum, i) => sum + i.quantity * i.unitCost, 0);

    onSave({
      poNumber,
      supplierId,
      supplierName: supplier?.name || "Lanificio Loro Piana",
      destinationFacilityId: facilityId,
      destinationFacilityName: facility?.name || "Central Logistics Hub",
      totalItems,
      totalCost,
      status: "inspecting",
      importDate: new Date().toISOString().split("T")[0],
      notes,
      items,
    });

    setItems([]);
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-lg">
      <DialogHeader>
        <DialogTitle>Issue New Inbound Stock PO</DialogTitle>
        <DialogDescription>
          Register purchase orders arriving from partner mills and suppliers
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="PO Identifier *"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
          />
          <Select
            label="Supplier / Mill"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
          >
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </div>

        <Select
          label="Destination Storage Node"
          value={facilityId}
          onChange={(e) => setFacilityId(e.target.value)}
        >
          {facilities.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name} ({f.type})
            </option>
          ))}
        </Select>

        <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 space-y-3">
          <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            Add Products into PO
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-5">
              <Select value={itemSku} onChange={(e) => setItemSku(e.target.value)}>
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
                placeholder="Qty"
                value={itemQty}
                onChange={(e) => setItemQty(Number(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Cost"
                value={itemCost}
                onChange={(e) => setItemCost(Number(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <Button
                type="button"
                variant="secondary"
                className="w-full text-xs"
                onClick={handleAddLineItem}
              >
                Add
              </Button>
            </div>
          </div>

          {items.length > 0 && (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
              {items.map((item, idx) => (
                <div key={idx} className="py-1.5 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.productName}
                    </span>
                    <span className="text-neutral-400 ml-2">
                      {item.quantity} units @ {formatCurrency(item.unitCost)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Input
          label="Inspector / Shipment Notes"
          placeholder="e.g. Superfine grade inspection upon customs delivery"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

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
            disabled={items.length === 0}
          >
            Record Inbound PO
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
