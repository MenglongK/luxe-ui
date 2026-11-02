"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowRightLeft,
  Plus,
  Truck,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Eye,
  Boxes,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { StockTransfer } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatDate } from "@/lib/utils";
import { StockTransferModal } from "./StockTransferModal";
import { StockTransferDetailModal } from "./StockTransferDetailModal";

export default function StockTransfersView() {
  const {
    stockTransfers,
    addStockTransfer,
    updateStockTransferStatus,
    softDeleteStockTransfer,
    permanentDeleteStockTransfer,
    restoreStockTransfer,
    facilities,
    stockItems,
    searchQuery,
  } = useDashboard();

  // Dialogs
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingTransfer, setViewingTransfer] = useState<StockTransfer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StockTransfer | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  // Filtered transfers
  const filteredTransfers = useMemo(() => {
    return stockTransfers.filter((trf) => {
      if (showArchived) {
        if (!trf.isDeleted) return false;
      } else {
        if (trf.isDeleted) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          trf.transferCode.toLowerCase().includes(q) ||
          trf.sourceFacilityName.toLowerCase().includes(q) ||
          trf.destFacilityName.toLowerCase().includes(q) ||
          trf.requestedBy.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [stockTransfers, searchQuery, showArchived]);

  const activeTransfers = stockTransfers.filter((t) => !t.isDeleted);
  const inTransitCount = activeTransfers.filter(
    (t) => t.status === "in_transit" || t.status === "dispatched"
  ).length;
  const completedCount = activeTransfers.filter((t) => t.status === "completed").length;

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteStockTransfer(deleteTarget.id);
    } else {
      permanentDeleteStockTransfer(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Inter-Branch Logistics & Relocation
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Stock Transfer Logistics
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Dispatch urgent replenishments between warehouses and boutique salons with tracking covenants.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportCsvButton
            data={stockTransfers.map((t) => ({
              Code: t.transferCode,
              Source: t.sourceFacilityName,
              Destination: t.destFacilityName,
              TotalItems: t.totalItems,
              Date: t.transferDate,
              Status: t.status,
              RequestedBy: t.requestedBy,
              Deleted: t.isDeleted ? "Yes" : "No",
            }))}
            filename="luxe-stock-transfers.csv"
          />

          <Button
            variant="gold"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="gap-1.5"
          >
            <Plus size={15} />
            <span>Initiate Transfer</span>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Transfers"
          value={activeTransfers.length}
          subtitle="All recorded inter-site dispatches"
          icon={<ArrowRightLeft size={18} />}
        />
        <StatCard
          title="En Route / In Transit"
          value={inTransitCount}
          subtitle="Vehicles moving between nodes"
          icon={<Truck size={18} />}
          variant="gold"
        />
        <StatCard
          title="Successfully Received"
          value={completedCount}
          subtitle="Fulfilled & balanced stock"
          icon={<CheckCircle2 size={18} />}
        />
        <StatCard
          title="Dispatch Readiness"
          value="100%"
          subtitle="All fleets active"
          icon={<Boxes size={18} />}
        />
      </div>

      {/* Transfers Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div>
            <CardTitle>Transfer History & Active Waybills</CardTitle>
            <CardDescription>
              Review all historical and active stock moves across warehouses and retail salons
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
            {showArchived ? "Viewing Archived Transfers" : "Show Archived"}
          </button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] uppercase tracking-wider text-neutral-400 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Transfer Code</th>
                  <th className="py-3 px-4">Origin Node</th>
                  <th className="py-3 px-4">Destination Salon</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Dispatched Date</th>
                  <th className="py-3 px-4">Requested By</th>
                  <th className="py-3 px-4">Transit Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {filteredTransfers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-neutral-400">
                      No stock transfer records found.
                    </td>
                  </tr>
                ) : (
                  filteredTransfers.map((trf) => (
                    <tr
                      key={trf.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 dark:text-neutral-100">
                        {trf.transferCode}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-neutral-800 dark:text-neutral-200">
                        {trf.sourceFacilityName}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-neutral-800 dark:text-neutral-200">
                        {trf.destFacilityName}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold">
                        {trf.totalItems} pcs
                      </td>
                      <td className="py-3.5 px-4 text-neutral-500">
                        {formatDate(trf.transferDate)}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                        {trf.requestedBy}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            trf.status === "completed"
                              ? "success"
                              : trf.status === "in_transit"
                              ? "gold"
                              : trf.status === "dispatched"
                              ? "warning"
                              : "secondary"
                          }
                          className="capitalize text-[10px]"
                        >
                          {trf.status.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {trf.status === "dispatched" && (
                            <Button
                              size="sm"
                              variant="gold"
                              onClick={() => updateStockTransferStatus(trf.id, "in_transit")}
                              className="h-7 px-2 text-[10px]"
                            >
                              Dispatch Van
                            </Button>
                          )}
                          {trf.status === "in_transit" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStockTransferStatus(trf.id, "completed")}
                              className="h-7 px-2 text-[10px] text-emerald-600"
                            >
                              Confirm Received
                            </Button>
                          )}
                          <button
                            onClick={() => setViewingTransfer(trf)}
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                            title="View Waybill Items"
                          >
                            <Eye size={15} />
                          </button>
                          {trf.isDeleted ? (
                            <button
                              onClick={() => restoreStockTransfer(trf.id)}
                              className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600"
                              title="Restore Record"
                            >
                              <RotateCcw size={15} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setDeleteTarget(trf)}
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
      <StockTransferModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        facilities={facilities}
        stockItems={stockItems}
        onSave={addStockTransfer}
      />

      <StockTransferDetailModal transfer={viewingTransfer} onClose={() => setViewingTransfer(null)} />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Stock Transfer Record"
        itemType="transfer waybill"
        itemName={deleteTarget?.transferCode}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
