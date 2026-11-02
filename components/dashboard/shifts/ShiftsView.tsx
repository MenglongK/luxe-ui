"use client";

import React, { useState, useMemo } from "react";
import {
  CalendarDays,
  Plus,
  Clock,
  Users,
  Edit2,
  Trash2,
  RotateCcw,
  UserCheck,
  ArrowRightLeft,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Shift } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { StatCard } from "@/components/dashboard/StatCard";
import { ShiftModal } from "./ShiftModal";
import { AssignShiftModal } from "./AssignShiftModal";

export default function ShiftsView() {
  const {
    shifts,
    addShift,
    updateShift,
    softDeleteShift,
    permanentDeleteShift,
    restoreShift,
    staffList,
    assignShiftToStaff,
    facilities,
    searchQuery,
  } = useDashboard();

  // Dialog states
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Shift | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [reassignModalOpen, setReassignModalOpen] = useState(false);

  // Calculate active shifts
  const filteredShifts = useMemo(() => {
    return shifts.filter((sh) => {
      if (showArchived) {
        if (!sh.isDeleted) return false;
      } else {
        if (sh.isDeleted) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          sh.name.toLowerCase().includes(q) ||
          sh.facilityName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [shifts, searchQuery, showArchived]);

  const activeStaff = staffList.filter((s) => !s.isDeleted);
  const activeShiftsCount = shifts.filter((s) => !s.isDeleted).length;

  const handleOpenAdd = () => {
    setEditingShift(null);
    setIsAddShiftOpen(true);
  };

  const handleOpenEdit = (sh: Shift) => {
    setEditingShift(sh);
    setIsAddShiftOpen(true);
  };

  const handleSaveShift = (data: Partial<Shift>, id?: string) => {
    if (id) {
      updateShift(id, data);
    } else {
      addShift({
        name: data.name || "Maison Shift",
        startTime: data.startTime || "08:00 AM",
        endTime: data.endTime || "04:00 PM",
        facilityName: data.facilityName || "Phnom Penh BKK1 Flagship",
        maxStaff: data.maxStaff || 10,
        daysOfWeek: data.daysOfWeek || ["Mon", "Tue", "Wed", "Thu", "Fri"],
      });
    }
  };

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteShift(deleteTarget.id);
    } else {
      permanentDeleteShift(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Workforce Scheduling & Hours
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Shift Management & Coverage
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Organize retail salon rosters, night audit logistics, and reassign shifts to active personnel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setReassignModalOpen(true)}
            className="gap-1.5"
          >
            <ArrowRightLeft size={14} />
            <span>Apply Shift to Staff</span>
          </Button>

          <Button variant="gold" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus size={15} />
            <span>Create Shift</span>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Shifts"
          value={activeShiftsCount}
          subtitle="Operating schedules defined"
          icon={<CalendarDays size={18} />}
        />
        <StatCard
          title="Total Scheduled Staff"
          value={activeStaff.length}
          subtitle="Employees across all branches"
          icon={<Users size={18} />}
          variant="gold"
        />
        <StatCard
          title="Morning Coverage"
          value={staffList.filter((s) => s.shiftName.includes("Morning")).length}
          subtitle="Staff on morning duties"
          icon={<Clock size={18} />}
        />
        <StatCard
          title="Evening Coverage"
          value={staffList.filter((s) => s.shiftName.includes("Evening")).length}
          subtitle="Staff on salon evening duty"
          icon={<UserCheck size={18} />}
        />
      </div>

      {/* Shifts Grid Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Configured Maison Shifts
          </h3>
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
              showArchived
                ? "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 font-semibold"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
            }`}
          >
            {showArchived ? "Viewing Archived" : "Show Archived"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredShifts.map((sh) => {
            const assignedStaffList = activeStaff.filter((s) => s.shiftId === sh.id);
            const count = assignedStaffList.length;
            const percent = Math.min(Math.round((count / sh.maxStaff) * 100), 100);

            return (
              <Card key={sh.id} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base font-bold">{sh.name}</CardTitle>
                      <CardDescription className="text-xs flex items-center gap-2 mt-1">
                        <Clock size={13} className="text-[#c5a880]" />
                        <span>
                          {sh.startTime} - {sh.endTime}
                        </span>
                        <span>•</span>
                        <span>{sh.facilityName}</span>
                      </CardDescription>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(sh)}
                        className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                        title="Edit Shift"
                      >
                        <Edit2 size={15} />
                      </button>
                      {sh.isDeleted ? (
                        <button
                          onClick={() => restoreShift(sh.id)}
                          className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600"
                          title="Restore Shift"
                        >
                          <RotateCcw size={15} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setDeleteTarget(sh)}
                          className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500"
                          title="Delete Shift Options"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {sh.daysOfWeek.map((day) => (
                      <span
                        key={day}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Staff Assigned</span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {count} / {sh.maxStaff} members ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-[#c5a880] rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                      Active Personnel on this Shift
                    </span>
                    {assignedStaffList.length === 0 ? (
                      <p className="text-xs text-neutral-400 italic">No staff members assigned yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {assignedStaffList.map((stf) => (
                          <span
                            key={stf.id}
                            className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {stf.name} ({stf.role})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <ShiftModal
        key={editingShift?.id || (isAddShiftOpen ? "new" : "closed")}
        open={isAddShiftOpen}
        onOpenChange={setIsAddShiftOpen}
        shiftToEdit={editingShift}
        facilities={facilities}
        onSave={handleSaveShift}
      />

      <AssignShiftModal
        open={reassignModalOpen}
        onOpenChange={setReassignModalOpen}
        staffList={staffList}
        shifts={shifts}
        onAssign={assignShiftToStaff}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Shift Schedule"
        itemType="shift"
        itemName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
