"use client";

import React, { useState } from "react";
import { Facility } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface FacilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facilityToEdit?: Facility | null;
  onSave: (data: Partial<Facility>, id?: string) => void;
}

export function FacilityModal({
  open,
  onOpenChange,
  facilityToEdit,
  onSave,
}: FacilityModalProps) {
  const [name, setName] = useState(facilityToEdit?.name || "");
  const [type, setType] = useState<Facility["type"]>(facilityToEdit?.type || "branch");
  const [address, setAddress] = useState(facilityToEdit?.address || "");
  const [city, setCity] = useState(facilityToEdit?.city || "Phnom Penh");
  const [contactPhone, setContactPhone] = useState(facilityToEdit?.contactPhone || "");
  const [managerName, setManagerName] = useState(facilityToEdit?.managerName || "");
  const [totalCapacity, setTotalCapacity] = useState(
    facilityToEdit ? String(facilityToEdit.totalCapacity) : "10000"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;

    onSave(
      {
        name,
        type,
        address,
        city,
        contactPhone,
        managerName,
        totalCapacity: Number(totalCapacity) || 10000,
      },
      facilityToEdit ? facilityToEdit.id : undefined
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-md">
      <DialogHeader>
        <DialogTitle>
          {facilityToEdit ? "Edit Facility" : "Add New Facility Node"}
        </DialogTitle>
        <DialogDescription>
          Configure address, physical capacity, and appointed manager
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3 py-2">
        <Input
          label="Facility Name *"
          required
          placeholder="e.g. Phnom Penh BKK1 Flagship"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Facility Type"
            value={type}
            onChange={(e) => setType(e.target.value as Facility["type"])}
          >
            <option value="branch">Retail Boutique (Branch)</option>
            <option value="warehouse">Central Logistics Warehouse</option>
          </Select>

          <Input
            label="City"
            placeholder="Phnom Penh"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <Input
          label="Street Address *"
          required
          placeholder="No. 12 Street 302, BKK1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Contact Phone"
            placeholder="+855 23 000 000"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
          <Input
            label="General Manager"
            placeholder="Manager Name"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
          />
        </div>

        <Input
          label="Total Storage Capacity (Units)"
          type="number"
          placeholder="10000"
          value={totalCapacity}
          onChange={(e) => setTotalCapacity(e.target.value)}
        />

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" size="sm">
            {facilityToEdit ? "Save Updates" : "Create Facility"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
