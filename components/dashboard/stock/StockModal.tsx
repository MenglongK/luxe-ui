"use client";

import React, { useState } from "react";
import { StockItem, Facility } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface StockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stockToEdit?: StockItem | null;
  facilities: Facility[];
  onSave: (data: Partial<StockItem>, id?: string) => void;
}

export function StockModal({
  open,
  onOpenChange,
  stockToEdit,
  facilities,
  onSave,
}: StockModalProps) {
  const [sku, setSku] = useState(stockToEdit?.sku || "");
  const [productName, setProductName] = useState(stockToEdit?.productName || "");
  const [category, setCategory] = useState<StockItem["category"]>(
    stockToEdit?.category || "Tailoring"
  );
  const [facilityId, setFacilityId] = useState(
    stockToEdit?.facilityId || facilities[0]?.id || "fac-1"
  );
  const [currentStock, setCurrentStock] = useState(
    stockToEdit ? String(stockToEdit.currentStock) : "20"
  );
  const [minStockAlert, setMinStockAlert] = useState(
    stockToEdit ? String(stockToEdit.minStockAlert) : "10"
  );
  const [maxCapacity, setMaxCapacity] = useState(
    stockToEdit ? String(stockToEdit.maxCapacity) : "100"
  );
  const [unitCost, setUnitCost] = useState(
    stockToEdit ? String(stockToEdit.unitCost) : "200"
  );
  const [sellingPrice, setSellingPrice] = useState(
    stockToEdit ? String(stockToEdit.sellingPrice) : "500"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !sku) return;

    const facility = facilities.find((f) => f.id === facilityId);
    const curr = Number(currentStock);
    const minAlert = Number(minStockAlert);
    const status: StockItem["status"] =
      curr === 0 ? "out_of_stock" : curr <= minAlert ? "low_stock" : "in_stock";

    onSave(
      {
        sku,
        productName,
        category,
        facilityId,
        facilityName: facility?.name || "Central Logistics Hub",
        facilityType: facility?.type || "warehouse",
        currentStock: curr,
        minStockAlert: minAlert,
        maxCapacity: Number(maxCapacity),
        unitCost: Number(unitCost),
        sellingPrice: Number(sellingPrice),
        status,
      },
      stockToEdit ? stockToEdit.id : undefined
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-lg">
      <DialogHeader>
        <DialogTitle>
          {stockToEdit ? "Edit Stock Item" : "Register New Inventory SKU"}
        </DialogTitle>
        <DialogDescription>
          Update quantity, pricing, and storage location parameters
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3 py-2">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="SKU Identifier *"
            required
            placeholder="LX-BLZ-001"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <Input
            label="Product Name *"
            required
            placeholder="e.g. Double-Breasted Wool Blazer"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as StockItem["category"])}
          >
            <option value="Tailoring">Tailoring</option>
            <option value="Knitwear">Knitwear</option>
            <option value="Outerwear">Outerwear</option>
            <option value="Footwear">Footwear</option>
            <option value="Leather Goods">Leather Goods</option>
            <option value="Accessories">Accessories</option>
          </Select>

          <Select
            label="Storage Facility"
            value={facilityId}
            onChange={(e) => setFacilityId(e.target.value)}
          >
            {facilities.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.type})
              </option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Current Stock"
            type="number"
            placeholder="20"
            value={currentStock}
            onChange={(e) => setCurrentStock(e.target.value)}
          />
          <Input
            label="Min Alert Level"
            type="number"
            placeholder="10"
            value={minStockAlert}
            onChange={(e) => setMinStockAlert(e.target.value)}
          />
          <Input
            label="Max Capacity"
            type="number"
            placeholder="100"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Unit Cost ($)"
            type="number"
            placeholder="200"
            value={unitCost}
            onChange={(e) => setUnitCost(e.target.value)}
          />
          <Input
            label="Selling Price ($)"
            type="number"
            placeholder="500"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" size="sm">
            {stockToEdit ? "Save Changes" : "Create SKU"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
