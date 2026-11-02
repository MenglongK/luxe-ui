"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Boxes,
  Plus,
  AlertTriangle,
  Building2,
  DollarSign,
  Edit2,
  Trash2,
  RotateCcw,
  ArrowRightLeft,
  PackagePlus,
  ShieldAlert,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { StockItem } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency } from "@/lib/utils";
import { StockModal } from "./StockModal";

export default function StockView() {
  const {
    stockItems,
    addStockItem,
    updateStockItem,
    softDeleteStockItem,
    permanentDeleteStockItem,
    restoreStockItem,
    facilities,
    searchQuery,
  } = useDashboard();

  // Filters
  const [facilityFilter, setFacilityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showArchived, setShowArchived] = useState(false);

  // Dialogs
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StockItem | null>(null);

  // Filtered Stock Items
  const filteredStock = useMemo(() => {
    return stockItems.filter((item) => {
      if (showArchived) {
        if (!item.isDeleted) return false;
      } else {
        if (item.isDeleted) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.productName.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (facilityFilter !== "all" && item.facilityId !== facilityFilter) return false;
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;

      return true;
    });
  }, [stockItems, searchQuery, facilityFilter, categoryFilter, statusFilter, showArchived]);

  const activeStock = stockItems.filter((i) => !i.isDeleted);
  const criticalItems = activeStock.filter(
    (i) => i.status === "low_stock" || i.status === "out_of_stock"
  );

  const totalUnits = activeStock.reduce((acc, i) => acc + i.currentStock, 0);
  const totalInventoryValuation = activeStock.reduce((acc, i) => acc + i.currentStock * i.sellingPrice, 0);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: StockItem) => {
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  const handleSaveStock = (data: Partial<StockItem>, id?: string) => {
    if (id) {
      updateStockItem(id, data);
    } else {
      addStockItem({
        sku: data.sku || "LX-SKU-001",
        productName: data.productName || "Tailored Item",
        category: data.category || "Tailoring",
        facilityId: data.facilityId || "fac-1",
        facilityName: data.facilityName || "Central Logistics Hub",
        facilityType: data.facilityType || "warehouse",
        currentStock: data.currentStock || 10,
        minStockAlert: data.minStockAlert || 5,
        maxCapacity: data.maxCapacity || 100,
        unitCost: data.unitCost || 100,
        sellingPrice: data.sellingPrice || 250,
        status: data.status || "in_stock",
      });
    }
  };

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteStockItem(deleteTarget.id);
    } else {
      permanentDeleteStockItem(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Omni-Channel Inventory & Hubs
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Stock Management & Warehouse Control
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time balance across central warehouses and boutique salons with automated depletion alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportCsvButton
            data={stockItems.map((s) => ({
              SKU: s.sku,
              Product: s.productName,
              Category: s.category,
              Facility: s.facilityName,
              FacilityType: s.facilityType,
              Stock: s.currentStock,
              MinAlert: s.minStockAlert,
              UnitCost: s.unitCost,
              SellingPrice: s.sellingPrice,
              Status: s.status,
              Deleted: s.isDeleted ? "Yes" : "No",
            }))}
            filename="luxe-stock-inventory.csv"
          />

          <Button variant="gold" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus size={15} />
            <span>Add Stock Item</span>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Stock Units"
          value={totalUnits}
          subtitle="Pieces across all locations"
          icon={<Boxes size={18} />}
        />
        <StatCard
          title="Retail Inventory Value"
          value={formatCurrency(totalInventoryValuation)}
          subtitle="Valuation at current price"
          icon={<DollarSign size={18} />}
          variant="gold"
        />
        <StatCard
          title="Stock Alerts"
          value={criticalItems.length}
          trend={criticalItems.length > 0 ? "down" : "neutral"}
          subtitle="Items needing immediate restock"
          icon={<AlertTriangle size={18} />}
          variant={criticalItems.length > 0 ? "alert" : "default"}
        />
        <StatCard
          title="Warehouses & Salons"
          value={facilities.length}
          subtitle="Active logistics nodes"
          icon={<Building2 size={18} />}
        />
      </div>

      {/* Critical Stock Alert Banner */}
      {criticalItems.length > 0 && (
        <Card className="border-amber-300 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
                <ShieldAlert size={20} />
                <CardTitle className="text-sm font-semibold">
                  Critical Depletion Alerts ({criticalItems.length} Items Require Action)
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard/stock/imports">
                  <Button size="sm" variant="gold" className="text-xs h-7 gap-1">
                    <PackagePlus size={13} />
                    <span>Import PO</span>
                  </Button>
                </Link>
                <Link href="/dashboard/stock/transfers">
                  <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                    <ArrowRightLeft size={13} />
                    <span>Transfer Stock</span>
                  </Button>
                </Link>
              </div>
            </div>
            <CardDescription className="text-xs">
              These items have fallen below safety thresholds or are completely depleted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {criticalItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-white dark:bg-[#181818] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold">{item.sku}</span>
                    <Badge variant={item.currentStock === 0 ? "destructive" : "warning"} className="text-[10px]">
                      {item.currentStock === 0 ? "OUT OF STOCK" : `Low: ${item.currentStock} left`}
                    </Badge>
                  </div>
                  <div className="font-medium text-xs text-neutral-900 dark:text-neutral-100 truncate">
                    {item.productName}
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>{item.facilityName}</span>
                    <span>Min Safety: {item.minStockAlert} units</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-[#181818] border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <Select
            value={facilityFilter}
            onChange={(e) => setFacilityFilter(e.target.value)}
            className="w-48 text-xs"
          >
            <option value="all">All Facilities</option>
            {facilities.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.type})
              </option>
            ))}
          </Select>

          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-40 text-xs"
          >
            <option value="all">All Categories</option>
            <option value="Tailoring">Tailoring</option>
            <option value="Knitwear">Knitwear</option>
            <option value="Outerwear">Outerwear</option>
            <option value="Footwear">Footwear</option>
            <option value="Leather Goods">Leather Goods</option>
            <option value="Accessories">Accessories</option>
          </Select>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-36 text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </Select>
        </div>

        <button
          onClick={() => setShowArchived(!showArchived)}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors shrink-0 ${
            showArchived
              ? "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 font-semibold"
              : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
          }`}
        >
          {showArchived ? "Viewing Archived SKUs" : "Show Archived"}
        </button>
      </div>

      {/* Stock Matrix Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] uppercase tracking-wider text-neutral-400 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800">
              <tr>
                <th className="py-3 px-4">SKU / Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Facility / Node</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Safety Min</th>
                <th className="py-3 px-4">Unit Cost</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4">Health Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {filteredStock.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-400">
                    No inventory records match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredStock.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                        {item.sku}
                      </div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[200px]">
                        {item.productName}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500">{item.category}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[150px]">
                        {item.facilityName}
                      </div>
                      <Badge variant="outline" className="text-[9px] uppercase">
                        {item.facilityType}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-neutral-100 font-mono text-sm">
                      {item.currentStock}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400 font-mono">
                      {item.minStockAlert}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-500">
                      {formatCurrency(item.unitCost)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-neutral-100">
                      {formatCurrency(item.sellingPrice)}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          item.status === "in_stock"
                            ? "success"
                            : item.status === "low_stock"
                            ? "warning"
                            : "destructive"
                        }
                        className="text-[10px] capitalize"
                      >
                        {item.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                          title="Edit Stock Item"
                        >
                          <Edit2 size={15} />
                        </button>
                        {item.isDeleted ? (
                          <button
                            onClick={() => restoreStockItem(item.id)}
                            className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600"
                            title="Restore Item"
                          >
                            <RotateCcw size={15} />
                          </button>
                        ) : (
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500"
                            title="Delete Stock Options"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Stock Modal */}
      <StockModal
        key={editingItem?.id || (isAddModalOpen ? "new" : "closed")}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        stockToEdit={editingItem}
        facilities={facilities}
        onSave={handleSaveStock}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Stock Item"
        itemType="inventory SKU"
        itemName={deleteTarget?.sku}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
