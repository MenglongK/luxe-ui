"use client";

import React, { useState, useMemo } from "react";
import {
  PackagePlus,
  Plus,
  DollarSign,
  Eye,
  Trash2,
  RotateCcw,
  Clock,
  Layers,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { StockImport } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StockImportModal } from "./StockImportModal";
import { StockImportDetailModal } from "./StockImportDetailModal";

export default function StockImportsView() {
  const {
    stockImports,
    addStockImport,
    updateStockImport,
    softDeleteStockImport,
    permanentDeleteStockImport,
    restoreStockImport,
    suppliers,
    facilities,
    stockItems,
    searchQuery,
  } = useDashboard();

  // Dialogs
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingImport, setViewingImport] = useState<StockImport | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StockImport | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  // Filtered imports
  const filteredImports = useMemo(() => {
    return stockImports.filter((imp) => {
      if (showArchived) {
        if (!imp.isDeleted) return false;
      } else {
        if (imp.isDeleted) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          imp.poNumber.toLowerCase().includes(q) ||
          imp.supplierName.toLowerCase().includes(q) ||
          imp.destinationFacilityName.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [stockImports, searchQuery, showArchived]);

  const activeImports = stockImports.filter((i) => !i.isDeleted);
  const totalValuation = activeImports.reduce((sum, i) => sum + i.totalCost, 0);
  const totalInboundItems = activeImports.reduce((sum, i) => sum + i.totalItems, 0);

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteStockImport(deleteTarget.id);
    } else {
      permanentDeleteStockImport(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Inbound Logistics & Customs Clearance
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Stock Import POs & Receiving
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage purchase orders received from international fabric mills, inspect crates, and restock warehouse inventories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportCsvButton
            data={stockImports.map((i) => ({
              PO: i.poNumber,
              Supplier: i.supplierName,
              Destination: i.destinationFacilityName,
              Items: i.totalItems,
              Cost: i.totalCost,
              Date: i.importDate,
              Status: i.status,
              Deleted: i.isDeleted ? "Yes" : "No",
            }))}
            filename="luxe-stock-imports.csv"
          />

          <Button
            variant="gold"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="gap-1.5"
          >
            <Plus size={15} />
            <span>Create Import PO</span>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Imports Logged"
          value={activeImports.length}
          subtitle="Purchase shipments recorded"
          icon={<PackagePlus size={18} />}
        />
        <StatCard
          title="Inbound Garment Units"
          value={totalInboundItems}
          subtitle="Raw rolls & tailored pieces"
          icon={<Layers size={18} />}
          variant="gold"
        />
        <StatCard
          title="Import Valuation"
          value={formatCurrency(totalValuation)}
          subtitle="Declared customs CIF cost"
          icon={<DollarSign size={18} />}
        />
        <StatCard
          title="Under Quality Inspection"
          value={activeImports.filter((i) => i.status === "inspecting").length}
          subtitle="Pending warehouse verification"
          icon={<Clock size={18} />}
        />
      </div>

      {/* Imports Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div>
            <CardTitle>Inbound Purchase Orders</CardTitle>
            <CardDescription>
              Track shipments from global mills and update receiving inspection status
            </CardDescription>
          </div>

          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              showArchived
                ? "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 font-semibold"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
            }`}
          >
            {showArchived ? "Viewing Archived POs" : "Show Archived"}
          </button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] uppercase tracking-wider text-neutral-400 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800">
                <tr>
                  <th className="py-3 px-4">PO Number</th>
                  <th className="py-3 px-4">Supplier</th>
                  <th className="py-3 px-4">Destination Hub</th>
                  <th className="py-3 px-4">Pieces</th>
                  <th className="py-3 px-4">Total Cost</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Receiving Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {filteredImports.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-neutral-400">
                      No stock import POs found.
                    </td>
                  </tr>
                ) : (
                  filteredImports.map((imp) => (
                    <tr
                      key={imp.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 dark:text-neutral-100">
                        {imp.poNumber}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-neutral-800 dark:text-neutral-200">
                        {imp.supplierName}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-300">
                        {imp.destinationFacilityName}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold">
                        {imp.totalItems} units
                      </td>
                      <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-neutral-100">
                        {formatCurrency(imp.totalCost)}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-400">{formatDate(imp.importDate)}</td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            imp.status === "received"
                              ? "success"
                              : imp.status === "inspecting"
                              ? "gold"
                              : imp.status === "pending"
                              ? "warning"
                              : "destructive"
                          }
                          className="capitalize text-[10px]"
                        >
                          {imp.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {imp.status === "inspecting" && (
                            <Button
                              size="sm"
                              variant="gold"
                              onClick={() => updateStockImport(imp.id, { status: "received" })}
                              className="h-7 px-2 text-[10px]"
                            >
                              Verify & Stock
                            </Button>
                          )}
                          <button
                            onClick={() => setViewingImport(imp)}
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                            title="Inspect Manifest"
                          >
                            <Eye size={15} />
                          </button>
                          {imp.isDeleted ? (
                            <button
                              onClick={() => restoreStockImport(imp.id)}
                              className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600"
                              title="Restore Record"
                            >
                              <RotateCcw size={15} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setDeleteTarget(imp)}
                              className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500"
                              title="Delete Record Options"
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
        </CardContent>
      </Card>

      {/* Modals */}
      <StockImportModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        suppliers={suppliers}
        facilities={facilities}
        stockItems={stockItems}
        onSave={addStockImport}
      />

      <StockImportDetailModal item={viewingImport} onClose={() => setViewingImport(null)} />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Import PO Record"
        itemType="import PO"
        itemName={deleteTarget?.poNumber}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
