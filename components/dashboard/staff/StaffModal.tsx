"use client";

import React, { useState } from "react";
import { Staff, Facility, Shift } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface StaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffToEdit?: Staff | null;
  facilities: Facility[];
  shifts: Shift[];
  onSave: (data: Partial<Staff>, id?: string) => void;
}

export function StaffModal({
  open,
  onOpenChange,
  staffToEdit,
  facilities,
  shifts,
  onSave,
}: StaffModalProps) {
  const [name, setName] = useState(staffToEdit?.name || "");
  const [email, setEmail] = useState(staffToEdit?.email || "");
  const [phone, setPhone] = useState(staffToEdit?.phone || "");
  const [role, setRole] = useState<Staff["role"]>(staffToEdit?.role || "Sales Associate");
  const [dept, setDept] = useState<Staff["department"]>(staffToEdit?.department || "Retail Operations");
  const [facilityId, setFacilityId] = useState(
    staffToEdit?.facilityId || facilities[0]?.id || "fac-2"
  );
  const [shiftId, setShiftId] = useState(
    staffToEdit?.shiftId || shifts[0]?.id || "shf-1"
  );
  const [salary, setSalary] = useState(
    staffToEdit ? String(staffToEdit.salary) : "1200"
  );
  const [status, setStatus] = useState<Staff["status"]>(staffToEdit?.status || "active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const chosenFacility = facilities.find((f) => f.id === facilityId);
    const chosenShift = shifts.find((sh) => sh.id === shiftId);

    onSave(
      {
        name,
        email,
        phone,
        role,
        department: dept,
        facilityId,
        facilityName: chosenFacility?.name || "Phnom Penh BKK1 Flagship",
        shiftId,
        shiftName: chosenShift?.name || "Morning Atelier (08:00 - 16:00)",
        salary: Number(salary) || 1200,
        status,
      },
      staffToEdit ? staffToEdit.id : undefined
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-lg">
      <DialogHeader>
        <DialogTitle>
          {staffToEdit ? "Edit Staff Details" : "Register New Staff Member"}
        </DialogTitle>
        <DialogDescription>
          {staffToEdit
            ? "Update role, compensation, and facility deployment"
            : "Onboard a new employee to the LUXE maison team"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name *"
            required
            placeholder="e.g. Sophea Rattanak"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Corporate Email *"
            type="email"
            required
            placeholder="s.rattanak@luxe-fashion.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Phone Number"
            placeholder="+855 12 000 000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="Monthly Salary ($)"
            type="number"
            placeholder="1200"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Operational Role"
            value={role}
            onChange={(e) => setRole(e.target.value as Staff["role"])}
          >
            <option value="Store Manager">Store Manager</option>
            <option value="Sales Associate">Sales Associate</option>
            <option value="Stock Specialist">Stock Specialist</option>
            <option value="Cashier">Cashier</option>
            <option value="Inventory Lead">Inventory Lead</option>
          </Select>

          <Select
            label="Department"
            value={dept}
            onChange={(e) => setDept(e.target.value as Staff["department"])}
          >
            <option value="Retail Operations">Retail Operations</option>
            <option value="Inventory & Logistics">Inventory & Logistics</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Management">Management</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Branch / Warehouse"
            value={facilityId}
            onChange={(e) => setFacilityId(e.target.value)}
          >
            {facilities.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.type})
              </option>
            ))}
          </Select>

          <Select
            label="Assigned Shift"
            value={shiftId}
            onChange={(e) => setShiftId(e.target.value)}
          >
            {shifts.map((sh) => (
              <option key={sh.id} value={sh.id}>
                {sh.name} ({sh.startTime} - {sh.endTime})
              </option>
            ))}
          </Select>
        </div>

        <Select
          label="Employment Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Staff["status"])}
        >
          <option value="active">Active Duty</option>
          <option value="on_leave">On Leave</option>
          <option value="inactive">Inactive</option>
        </Select>

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" size="sm">
            {staffToEdit ? "Save Updates" : "Create Record"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
