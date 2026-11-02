"use client";

import React, { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Staff, Shift } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

interface AssignShiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffList: Staff[];
  shifts: Shift[];
  onAssign: (staffId: string, shiftId: string, shiftName: string) => void;
}

export function AssignShiftModal({
  open,
  onOpenChange,
  staffList,
  shifts,
  onAssign,
}: AssignShiftModalProps) {
  const activeStaff = staffList.filter((s) => !s.isDeleted);
  const activeShifts = shifts.filter((sh) => !sh.isDeleted);

  const [selectedStaffId, setSelectedStaffId] = useState(activeStaff[0]?.id || "");
  const [targetShiftId, setTargetShiftId] = useState(activeShifts[0]?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const staff = activeStaff.find((s) => s.id === selectedStaffId);
    const targetShift = activeShifts.find((sh) => sh.id === targetShiftId);
    if (!staff || !targetShift) return;

    onAssign(
      staff.id,
      targetShift.id,
      `${targetShift.name} (${targetShift.startTime} - ${targetShift.endTime})`
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-md">
      <DialogHeader>
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="text-[#c5a880]" size={20} />
          <div>
            <DialogTitle>Assign Shift to Staff</DialogTitle>
            <DialogDescription>
              Transfer an employee to a new operating roster schedule
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <Select
          label="Select Staff Member"
          value={selectedStaffId}
          onChange={(e) => setSelectedStaffId(e.target.value)}
        >
          {activeStaff.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.role}) - Current: {s.shiftName}
            </option>
          ))}
        </Select>

        <Select
          label="Select New Shift Schedule"
          value={targetShiftId}
          onChange={(e) => setTargetShiftId(e.target.value)}
        >
          {activeShifts.map((sh) => (
            <option key={sh.id} value={sh.id}>
              {sh.name} ({sh.startTime} - {sh.endTime}) • {sh.facilityName}
            </option>
          ))}
        </Select>

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" size="sm">
            Confirm Shift Change
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
