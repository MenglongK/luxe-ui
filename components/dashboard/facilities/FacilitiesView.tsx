"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Plus,
  Warehouse,
  Store,
  MapPin,
  Phone,
  User,
  Edit2,
  Trash2,
  RotateCcw,
  HardDrive,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Facility } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { StatCard } from "@/components/dashboard/StatCard";
import { FacilityModal } from "./FacilityModal";

export default function FacilitiesView() {
  const {
    facilities,
    addFacility,
    updateFacility,
    softDeleteFacility,
    permanentDeleteFacility,
    restoreFacility,
    searchQuery,
  } = useDashboard();

  // Dialogs
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Facility | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");

  // Filtered facilities
  const filteredFacilities = useMemo(() => {
    return facilities.filter((f) => {
      if (showArchived) {
        if (!f.isDeleted) return false;
      } else {
        if (f.isDeleted) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          f.name.toLowerCase().includes(q) ||
          f.city.toLowerCase().includes(q) ||
          f.managerName.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (typeFilter !== "all" && f.type !== typeFilter) return false;

      return true;
    });
  }, [facilities, searchQuery, typeFilter, showArchived]);

  // Metrics
  const activeFacilities = facilities.filter((f) => !f.isDeleted);
  const warehouses = activeFacilities.filter((f) => f.type === "warehouse");
  const boutiques = activeFacilities.filter((f) => f.type === "branch");
  const totalCap = activeFacilities.reduce((sum, f) => sum + f.totalCapacity, 0);
  const usedCap = activeFacilities.reduce((sum, f) => sum + f.usedCapacity, 0);
  const utilPercent = totalCap > 0 ? Math.round((usedCap / totalCap) * 100) : 0;

  const handleOpenAdd = () => {
    setEditingFacility(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (f: Facility) => {
    setEditingFacility(f);
    setIsAddModalOpen(true);
  };

  const handleSave = (data: Partial<Facility>, id?: string) => {
    if (id) {
      updateFacility(id, data);
    } else {
      addFacility({
        name: data.name || "Boutique",
        type: data.type || "branch",
        address: data.address || "",
        city: data.city || "Phnom Penh",
        contactPhone: data.contactPhone || "",
        managerName: data.managerName || "",
        totalCapacity: data.totalCapacity || 10000,
        usedCapacity: 0,
        status: "active",
      });
    }
  };

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteFacility(deleteTarget.id);
    } else {
      permanentDeleteFacility(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Real Estate & Infrastructure
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Facility & Salon Network
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage flagship boutiques, private styling salons, and central bonded distribution hubs.
          </p>
        </div>

        <Button variant="gold" size="sm" onClick={handleOpenAdd} className="gap-1.5">
          <Plus size={15} />
          <span>Add New Facility</span>
        </Button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Properties"
          value={activeFacilities.length}
          subtitle="Operating locations"
          icon={<Building2 size={18} />}
        />
        <StatCard
          title="Retail Boutiques"
          value={boutiques.length}
          subtitle="Customer facing salons"
          icon={<Store size={18} />}
          variant="gold"
        />
        <StatCard
          title="Distribution Hubs"
          value={warehouses.length}
          subtitle="Central logistics storage"
          icon={<Warehouse size={18} />}
        />
        <StatCard
          title="Capacity Utilization"
          value={`${utilPercent}%`}
          subtitle={`${usedCap.toLocaleString()} / ${totalCap.toLocaleString()} units`}
          icon={<HardDrive size={18} />}
        />
      </div>

      {/* Facilities Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs h-8 px-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              <option value="all">All Facility Types</option>
              <option value="warehouse">Warehouses</option>
              <option value="branch">Retail Boutiques</option>
            </select>
          </div>

          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              showArchived
                ? "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 font-semibold"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
            }`}
          >
            {showArchived ? "Viewing Archived Facilities" : "Show Archived"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFacilities.map((f) => {
            const usagePercent =
              f.totalCapacity > 0 ? Math.round((f.usedCapacity / f.totalCapacity) * 100) : 0;

            return (
              <Card key={f.id} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {f.type === "warehouse" ? (
                          <Warehouse size={16} className="text-[#c5a880]" />
                        ) : (
                          <Store size={16} className="text-[#c5a880]" />
                        )}
                        <CardTitle className="text-base font-bold">{f.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-[9px] uppercase font-semibold">
                        {f.type} • {f.city}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(f)}
                        className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                        title="Edit Facility"
                      >
                        <Edit2 size={15} />
                      </button>
                      {f.isDeleted ? (
                        <button
                          onClick={() => restoreFacility(f.id)}
                          className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600"
                          title="Restore Facility"
                        >
                          <RotateCcw size={15} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setDeleteTarget(f)}
                          className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500"
                          title="Delete Facility Options"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3.5 text-xs">
                  <div className="space-y-1 text-neutral-600 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-neutral-400 shrink-0" />
                      <span className="truncate">{f.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-neutral-400 shrink-0" />
                      <span>{f.contactPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-neutral-400 shrink-0" />
                      <span>Director / Manager: <strong>{f.managerName}</strong></span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Storage Volume</span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {f.usedCapacity.toLocaleString()} / {f.totalCapacity.toLocaleString()} units ({usagePercent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-[#c5a880] rounded-full transition-all duration-300"
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <FacilityModal
        key={editingFacility?.id || (isAddModalOpen ? "new" : "closed")}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        facilityToEdit={editingFacility}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Facility Node"
        itemType="facility"
        itemName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
