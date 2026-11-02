"use client";

import React, { useState } from "react";
import { Customer } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface CustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerToEdit?: Customer | null;
  onSave: (data: Partial<Customer>, id?: string) => void;
}

export function CustomerModal({ open, onOpenChange, customerToEdit, onSave }: CustomerModalProps) {
  const [name, setName] = useState(customerToEdit?.name || "");
  const [email, setEmail] = useState(customerToEdit?.email || "");
  const [phone, setPhone] = useState(customerToEdit?.phone || "");
  const [address, setAddress] = useState(customerToEdit?.address || "");
  const [tier, setTier] = useState<Customer["tier"]>(customerToEdit?.tier || "Standard");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onSave(
      {
        name,
        email,
        phone,
        address,
        tier,
      },
      customerToEdit ? customerToEdit.id : undefined
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-md">
      <DialogHeader>
        <DialogTitle>
          {customerToEdit ? "Edit Client Profile" : "Register New Clientele"}
        </DialogTitle>
        <DialogDescription>
          {customerToEdit
            ? "Update client address and atelier tier credentials"
            : "Create a new private client record for custom fitting & purchases"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3 py-2">
        <Input
          label="Full Name *"
          required
          placeholder="e.g. Lady Genevieve Vance"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email Address *"
          type="email"
          required
          placeholder="vance@atelier-club.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Phone Number"
          placeholder="+855 12 889 001"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label="Residence / Delivery Address"
          placeholder="Penthouse 48, The Peak, Phnom Penh"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Select
          label="Atelier Privilege Tier"
          value={tier}
          onChange={(e) => setTier(e.target.value as Customer["tier"])}
        >
          <option value="Standard">Standard Tier</option>
          <option value="Silver">Silver Society</option>
          <option value="Gold Atelier">Gold Atelier</option>
          <option value="VIP Royal">VIP Royal Salon</option>
        </Select>

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" size="sm">
            {customerToEdit ? "Save Changes" : "Create Profile"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
