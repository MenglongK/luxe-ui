"use client";

import React, { useState } from "react";
import { Shift, Facility } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface ShiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shiftToEdit?: Shift | null;
  facilities: Facility[];
  onSave: (data: Partial<Shift>, id?: string) => void;
}

export function ShiftModal({
  open,
  onOpenChange,
  shiftToEdit,
  facilities,
  onSave,
}: ShiftModalProps) {
  const [shiftName, setShiftName] = useState(shiftToEdit?.name || "");
  const [startTime, setStartTime] = useState(shiftToEdit?.startTime || "08:00 AM");
  const [endTime, setEndTime] = useState(shiftToEdit?.endTime || "04:00 PM");
  const [facilityName, setFacilityName] = useState(
    shiftToEdit?.facilityName || facilities[0]?.name || "Phnom Penh BKK1 Flagship"
  );
  const [maxStaff, setMaxStaff] = useState(
    shiftToEdit ? String(shiftToEdit.maxStaff) : "10"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shiftName) return;

    onSave(
      {
        name: shiftName,
        startTime,
        endTime,
        facilityName,
        maxStaff: Number(maxStaff) || 10,
        daysOfWeek: shiftToEdit ? shiftToEdit.daysOfWeek : ["Mon", "Tue", "Wed", "Thu", "Fri"],
      },
      shiftToEdit ? shiftToEdit.id : undefined
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-md">
      <DialogHeader>
        <DialogTitle>{shiftToEdit ? "Edit Shift" : "Create New Shift Schedule"}</DialogTitle>
        <DialogDescription>
          Define operating timetable and floor staffing limits
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3 py-2">
        <Input
          label="Shift Title *"
          required
          placeholder="e.g. VIP Private Evening Salon"
          value={shiftName}
          onChange={(e) => setShiftName(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Start Time"
            placeholder="08:00 AM"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            label="End Time"
            placeholder="04:00 PM"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Location"
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
          >
            {facilities.map((f) => (
              <option key={f.id} value={f.name}>
                {f.name}
              </option>
            ))}
          </Select>

          <Input
            label="Max Staff Capacity"
            type="number"
            placeholder="10"
            value={maxStaff}
            onChange={(e) => setMaxStaff(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" size="sm">
            {shiftToEdit ? "Update Shift" : "Create Shift"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
