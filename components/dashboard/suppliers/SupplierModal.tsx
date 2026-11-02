"use client";

import React, { useState } from "react";
import { Supplier } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface SupplierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplierToEdit?: Supplier | null;
  onSave: (data: Partial<Supplier>, id?: string) => void;
}

export function SupplierModal({
  open,
  onOpenChange,
  supplierToEdit,
  onSave,
}: SupplierModalProps) {
  const [name, setName] = useState(supplierToEdit?.name || "");
  const [code, setCode] = useState(supplierToEdit?.code || "");
  const [category, setCategory] = useState<Supplier["category"]>(
    supplierToEdit?.category || "Italian Wool"
  );
  const [contactPerson, setContactPerson] = useState(supplierToEdit?.contactPerson || "");
  const [email, setEmail] = useState(supplierToEdit?.email || "");
  const [phone, setPhone] = useState(supplierToEdit?.phone || "");
  const [address, setAddress] = useState(supplierToEdit?.address || "");
  const [leadTimeDays, setLeadTimeDays] = useState(
    supplierToEdit ? String(supplierToEdit.leadTimeDays) : "21"
  );
  const [paymentTerms, setPaymentTerms] = useState<Supplier["paymentTerms"]>(
    supplierToEdit?.paymentTerms || "Net 30"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onSave(
      {
        name,
        code: code || `SUP-${Math.floor(10 + Math.random() * 90)}`,
        category,
        contactPerson,
        email,
        phone,
        address,
        leadTimeDays: Number(leadTimeDays) || 21,
        paymentTerms,
      },
      supplierToEdit ? supplierToEdit.id : undefined
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-lg">
      <DialogHeader>
        <DialogTitle>
          {supplierToEdit ? "Edit Supplier Details" : "Onboard New Supplier"}
        </DialogTitle>
        <DialogDescription>
          Register lead times, commercial terms, and dispatch contacts
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3 py-2">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Supplier / Mill Name *"
            required
            placeholder="e.g. Lanificio Loro Piana"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Supplier Code"
            placeholder="SUP-LP-01"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Sourcing Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Supplier["category"])}
          >
            <option value="Italian Wool">Italian Wool</option>
            <option value="Mongolian Cashmere">Mongolian Cashmere</option>
            <option value="French Silk">French Silk</option>
            <option value="Leather Tanneries">Leather Tanneries</option>
            <option value="Packaging & Boxes">Packaging & Boxes</option>
          </Select>

          <Input
            label="Primary Contact Representative"
            placeholder="Matteo Casagrande"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Contact Email *"
            type="email"
            required
            placeholder="contact@mill.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Direct Telephone"
            placeholder="+39 015 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Input
          label="Mill Headquarter Address"
          placeholder="Corso Rolandi 10, Quarona, Italy"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Standard Lead Time (Days)"
            type="number"
            placeholder="21"
            value={leadTimeDays}
            onChange={(e) => setLeadTimeDays(e.target.value)}
          />
          <Select
            label="Payment Terms"
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value as Supplier["paymentTerms"])}
          >
            <option value="Net 30">Net 30 Days</option>
            <option value="Net 60">Net 60 Days</option>
            <option value="Letter of Credit">Letter of Credit</option>
            <option value="Immediate">Immediate Settlement</option>
          </Select>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" size="sm">
            {supplierToEdit ? "Save Changes" : "Confirm Onboarding"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
