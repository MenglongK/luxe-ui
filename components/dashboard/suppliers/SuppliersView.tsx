"use client";

import React, { useState, useMemo } from "react";
import {
  Truck,
  Plus,
  Star,
  Clock,
  DollarSign,
  Edit2,
  Trash2,
  RotateCcw,
  Eye,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Supplier } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { StatCard } from "@/components/dashboard/StatCard";
import { SupplierModal } from "./SupplierModal";
import { SupplierDetailModal } from "./SupplierDetailModal";

export default function SuppliersView() {
  const {
    suppliers,
    addSupplier,
    updateSupplier,
    softDeleteSupplier,
    permanentDeleteSupplier,
    restoreSupplier,
    searchQuery,
  } = useDashboard();

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showArchived, setShowArchived] = useState(false);

  // Dialogs
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [viewingSupplier, setViewingSupplier] = useState<Supplier | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Supplier | null>(null);

  // Filtered suppliers
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((sup) => {
      if (showArchived) {
        if (!sup.isDeleted) return false;
      } else {
        if (sup.isDeleted) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          sup.name.toLowerCase().includes(q) ||
          sup.code.toLowerCase().includes(q) ||
          sup.contactPerson.toLowerCase().includes(q) ||
          sup.category.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (categoryFilter !== "all" && sup.category !== categoryFilter) return false;

      return true;
    });
  }, [suppliers, searchQuery, categoryFilter, showArchived]);

  const activeSuppliers = suppliers.filter((s) => !s.isDeleted);
  const avgLeadTime =
    activeSuppliers.length > 0
      ? Math.round(
          activeSuppliers.reduce((sum, s) => sum + s.leadTimeDays, 0) / activeSuppliers.length
        )
      : 0;

  const handleOpenAdd = () => {
    setEditingSupplier(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (sup: Supplier) => {
    setEditingSupplier(sup);
    setIsAddModalOpen(true);
  };

  const handleSave = (data: Partial<Supplier>, id?: string) => {
    if (id) {
      updateSupplier(id, data);
    } else {
      addSupplier({
        name: data.name || "Supplier",
        code: data.code || `SUP-${Math.floor(10 + Math.random() * 90)}`,
        category: data.category || "Italian Wool",
        contactPerson: data.contactPerson || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        leadTimeDays: data.leadTimeDays || 21,
        paymentTerms: data.paymentTerms || "Net 30",
        rating: 5,
        status: "active",
      });
    }
  };

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteSupplier(deleteTarget.id);
    } else {
      permanentDeleteSupplier(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Global Artisans & Textile Mills
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Supplier Relations & Sourcing
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Maintain relationships with luxury mills, Italian tanneries, and custom packaging ateliers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportCsvButton
            data={suppliers.map((s) => ({
              Code: s.code,
              Name: s.name,
              Category: s.category,
              ContactPerson: s.contactPerson,
              Email: s.email,
              Phone: s.phone,
              LeadTimeDays: s.leadTimeDays,
              PaymentTerms: s.paymentTerms,
              Rating: s.rating,
              Status: s.status,
              Deleted: s.isDeleted ? "Yes" : "No",
            }))}
            filename="luxe-suppliers.csv"
          />

          <Button variant="gold" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus size={15} />
            <span>Onboard Supplier</span>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Suppliers"
          value={activeSuppliers.length}
          subtitle="Certified luxury houses"
          icon={<Truck size={18} />}
        />
        <StatCard
          title="Average Lead Time"
          value={`${avgLeadTime} Days`}
          subtitle="Mill order to warehouse arrival"
          icon={<Clock size={18} />}
          variant="gold"
        />
        <StatCard
          title="Quality Tier"
          value="4.8 / 5"
          subtitle="Artisan audit rating"
          icon={<Star size={18} />}
        />
        <StatCard
          title="Payment Terms"
          value="Net 30-60"
          subtitle="Preferred commercial credit"
          icon={<DollarSign size={18} />}
        />
      </div>

      {/* Supplier Directory Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div>
            <CardTitle>Artisan Partners & Mills</CardTitle>
            <CardDescription>
              Review lead times, payment covenants, and contact focal points
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs h-8 px-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              <option value="all">All Sourcing Categories</option>
              <option value="Italian Wool">Italian Wool</option>
              <option value="Mongolian Cashmere">Mongolian Cashmere</option>
              <option value="French Silk">French Silk</option>
              <option value="Leather Tanneries">Leather Tanneries</option>
              <option value="Packaging & Boxes">Packaging & Boxes</option>
            </select>

            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showArchived
                  ? "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 font-semibold"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {showArchived ? "Viewing Archived" : "Show Archived"}
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] uppercase tracking-wider text-neutral-400 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Supplier / Code</th>
                  <th className="py-3 px-4">Material Category</th>
                  <th className="py-3 px-4">Focal Person</th>
                  <th className="py-3 px-4">Lead Time</th>
                  <th className="py-3 px-4">Terms</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-400">
                      No suppliers found.
                    </td>
                  </tr>
                ) : (
                  filteredSuppliers.map((sup) => (
                    <tr
                      key={sup.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {sup.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono">{sup.code}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant="gold" className="text-[10px]">
                          {sup.category}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-neutral-800 dark:text-neutral-200">
                          {sup.contactPerson}
                        </div>
                        <div className="text-[11px] text-neutral-400">{sup.email}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-neutral-700 dark:text-neutral-300">
                        {sup.leadTimeDays} days
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                        {sup.paymentTerms}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-[#c5a880]">
                          <Star size={12} fill="currentColor" />
                          <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100">
                            {sup.rating}.0
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingSupplier(sup)}
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                            title="View Supplier Profile"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(sup)}
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                            title="Edit Supplier"
                          >
                            <Edit2 size={15} />
                          </button>
                          {sup.isDeleted ? (
                            <button
                              onClick={() => restoreSupplier(sup.id)}
                              className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600"
                              title="Restore Supplier"
                            >
                              <RotateCcw size={15} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setDeleteTarget(sup)}
                              className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500"
                              title="Delete Supplier Options"
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
      <SupplierModal
        key={editingSupplier?.id || (isAddModalOpen ? "new" : "closed")}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        supplierToEdit={editingSupplier}
        onSave={handleSave}
      />

      <SupplierDetailModal supplier={viewingSupplier} onClose={() => setViewingSupplier(null)} />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Supplier Profile"
        itemType="supplier"
        itemName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
