"use client";

import React from "react";
import { Mail, Phone, Building2, Calendar } from "lucide-react";
import { Staff } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

interface StaffDetailModalProps {
  staff: Staff | null;
  onClose: () => void;
}

export function StaffDetailModal({ staff, onClose }: StaffDetailModalProps) {
  if (!staff) return null;

  return (
    <Dialog open={!!staff} onOpenChange={onClose} className="max-w-md">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#121212] text-white dark:bg-[#c5a880] dark:text-black flex items-center justify-center font-bold text-lg">
            {staff.name.charAt(0)}
          </div>
          <div>
            <DialogTitle>{staff.name}</DialogTitle>
            <DialogDescription>{staff.role}</DialogDescription>
          </div>
          <Badge variant="gold" className="ml-auto text-[10px] capitalize">
            {staff.status.replace("_", " ")}
          </Badge>
        </div>
      </DialogHeader>

      <div className="space-y-3 py-2 text-xs">
        <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">
              Department
            </span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {staff.department}
            </span>
          </div>
          <div>
            <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">
              Monthly Compensation
            </span>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">
              {formatCurrency(staff.salary)}
            </span>
          </div>
        </div>

        <div className="space-y-2 p-3.5 rounded-lg border border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
            <Mail size={14} className="text-neutral-400" />
            <span>{staff.email}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
            <Phone size={14} className="text-neutral-400" />
            <span>{staff.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
            <Building2 size={14} className="text-neutral-400" />
            <span>{staff.facilityName}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
            <Calendar size={14} className="text-neutral-400" />
            <span>Assigned Shift: {staff.shiftName}</span>
          </div>
        </div>

        <div className="text-neutral-400 text-[11px]">
          Employment Onboarded Date: {formatDate(staff.joinedDate)}
        </div>
      </div>

      <DialogFooter>
        <Button variant="default" size="sm" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
