"use client";

import React, { useState, useMemo } from "react";
import { UserCheck, Plus, Trash2, Eye, RotateCcw, Edit2, Shield, Briefcase, DollarSign } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Staff } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency } from "@/lib/utils";
import { StaffModal } from "./StaffModal";
import { StaffDetailModal } from "./StaffDetailModal";

export default function StaffView() {
  const {
    staffList,
    addStaff,
    updateStaff,
    softDeleteStaff,
    permanentDeleteStaff,
    restoreStaff,
    facilities,
    shifts,
    searchQuery,
  } = useDashboard();

  // Filters & State
  const [deptFilter, setDeptFilter] = useState("all");
  const [showArchived, setShowArchived] = useState(false);

  // Dialogs
  const [viewingStaff, setViewingStaff] = useState<Staff | null>(null);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Staff | null>(null);

  // Filtered staff
  const filteredStaff = useMemo(() => {
    return staffList.filter((s) => {
      if (showArchived) {
        if (!s.isDeleted) return false;
      } else {
        if (s.isDeleted) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          s.facilityName.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (deptFilter !== "all" && s.department !== deptFilter) return false;

      return true;
    });
  }, [staffList, searchQuery, deptFilter, showArchived]);

  const activeStaff = staffList.filter((s) => !s.isDeleted);
  const onDutyCount = activeStaff.filter((s) => s.status === "active").length;
  const managersCount = activeStaff.filter((s) => s.role === "Store Manager" || s.role === "Inventory Lead").length;
  const totalPayroll = activeStaff.reduce((sum, s) => sum + s.salary, 0);

  const handleOpenAdd = () => {
    setEditingStaff(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setIsAddModalOpen(true);
  };

  const handleSaveStaff = (data: Partial<Staff>, id?: string) => {
    if (id) {
      updateStaff(id, data);
    } else {
      addStaff({
        name: data.name || "Employee",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "Sales Associate",
        department: data.department || "Retail Operations",
        facilityId: data.facilityId || "fac-2",
        facilityName: data.facilityName || "Phnom Penh BKK1 Flagship",
        shiftId: data.shiftId || "shf-1",
        shiftName: data.shiftName || "Morning Atelier (08:00 - 16:00)",
        salary: data.salary || 1200,
        status: data.status || "active",
      });
    }
  };

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteStaff(deleteTarget.id);
    } else {
      permanentDeleteStaff(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Human Capital & Retail Staffing
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Staff Directory & Talent Management
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage boutique managers, cashiers, client advisors, and logistics officers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportCsvButton
            data={staffList.map((s) => ({
              Name: s.name,
              Email: s.email,
              Phone: s.phone,
              Role: s.role,
              Department: s.department,
              Facility: s.facilityName,
              Shift: s.shiftName,
              Salary: s.salary,
              Status: s.status,
              JoinedDate: s.joinedDate,
              Deleted: s.isDeleted ? "Yes" : "No",
            }))}
            filename="luxe-staff-roster.csv"
          />

          <Button variant="gold" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus size={15} />
            <span>Add Staff Member</span>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Staff"
          value={activeStaff.length}
          subtitle="Registered across all entities"
          icon={<UserCheck size={18} />}
        />
        <StatCard
          title="On-Duty Today"
          value={onDutyCount}
          subtitle="Active on floor & warehouse"
          icon={<Briefcase size={18} />}
          variant="gold"
        />
        <StatCard
          title="Floor Leaders"
          value={managersCount}
          subtitle="Store managers & logistics leads"
          icon={<Shield size={18} />}
        />
        <StatCard
          title="Monthly Payroll"
          value={formatCurrency(totalPayroll)}
          subtitle="Total regular compensation"
          icon={<DollarSign size={18} />}
        />
      </div>

      {/* Staff Directory Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div>
            <CardTitle>Staff Roster & Assignments</CardTitle>
            <CardDescription>
              Filter staff members by department, branch allocation, and shift status
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="text-xs h-8 px-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              <option value="all">All Departments</option>
              <option value="Retail Operations">Retail Operations</option>
              <option value="Inventory & Logistics">Inventory & Logistics</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Management">Management</option>
            </select>

            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showArchived
                  ? "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 font-semibold"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {showArchived ? "Viewing Archived Staff" : "Show Archived"}
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] uppercase tracking-wider text-neutral-400 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Role & Dept</th>
                  <th className="py-3 px-4">Assigned Facility</th>
                  <th className="py-3 px-4">Shift Assignment</th>
                  <th className="py-3 px-4">Salary</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-400">
                      No staff members match the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((staff) => (
                    <tr
                      key={staff.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {staff.name}
                        </div>
                        <div className="text-[11px] text-neutral-400">{staff.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-neutral-800 dark:text-neutral-200">
                          {staff.role}
                        </div>
                        <div className="text-[10px] text-neutral-400">{staff.department}</div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-300 truncate max-w-[150px]">
                        {staff.facilityName}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-500">
                        <span className="truncate max-w-[140px] block" title={staff.shiftName}>
                          {staff.shiftName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-neutral-100">
                        {formatCurrency(staff.salary)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            staff.status === "active"
                              ? "success"
                              : staff.status === "on_leave"
                              ? "warning"
                              : "secondary"
                          }
                          className="capitalize text-[10px]"
                        >
                          {staff.status.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingStaff(staff)}
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                            title="View Staff Profile"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(staff)}
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                            title="Edit Staff Member"
                          >
                            <Edit2 size={15} />
                          </button>
                          {staff.isDeleted ? (
                            <button
                              onClick={() => restoreStaff(staff.id)}
                              className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600"
                              title="Restore Employee"
                            >
                              <RotateCcw size={15} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setDeleteTarget(staff)}
                              className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500"
                              title="Delete Employee Options"
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
      <StaffModal
        key={editingStaff?.id || (isAddModalOpen ? "new" : "closed")}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        staffToEdit={editingStaff}
        facilities={facilities}
        shifts={shifts}
        onSave={handleSaveStaff}
      />

      <StaffDetailModal staff={viewingStaff} onClose={() => setViewingStaff(null)} />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Staff Member"
        itemType="staff member"
        itemName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
