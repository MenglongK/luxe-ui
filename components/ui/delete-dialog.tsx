"use client";

import React, { useState } from "react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./dialog";
import { Button } from "./button";
import { Archive, Trash2, AlertTriangle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  itemName?: string;
  itemType?: string;
  onConfirm: (type: "soft" | "permanent") => void;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  title = "Choose Deletion Method",
  itemName,
  itemType = "item",
  onConfirm,
}: DeleteConfirmDialogProps) {
  const [deleteMode, setDeleteMode] = useState<"soft" | "permanent">("soft");

  const handleProceed = () => {
    onConfirm(deleteMode);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-md">
      <DialogHeader>
        <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400">
          <div className="p-2 rounded-full bg-rose-50 dark:bg-rose-950/50">
            <AlertTriangle size={20} />
          </div>
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Action requested on {itemType}{" "}
              {itemName && <strong className="text-neutral-900 dark:text-neutral-100">&quot;{itemName}&quot;</strong>}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-3 py-3">
        <p className="text-xs text-neutral-600 dark:text-neutral-300">
          Please select which deletion method you wish to apply:
        </p>

        {/* Option 1: Soft Delete */}
        <label
          onClick={() => setDeleteMode("soft")}
          className={cn(
            "flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all",
            deleteMode === "soft"
              ? "border-[#c5a880] bg-[#c5a880]/10 dark:border-[#c5a880] dark:bg-[#c5a880]/15 ring-1 ring-[#c5a880]"
              : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900"
          )}
        >
          <input
            type="radio"
            name="delete-type"
            checked={deleteMode === "soft"}
            onChange={() => setDeleteMode("soft")}
            className="mt-1 text-[#c5a880] focus:ring-[#c5a880]"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
              <Archive size={15} className="text-[#c5a880]" />
              <span>Soft Delete (Archive / Deactivate)</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 ml-auto">
                Recommended
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Marks record as inactive/archived. Preserves historical orders, financial audit reports, and can be restored anytime.
            </p>
          </div>
        </label>

        {/* Option 2: Permanent Delete */}
        <label
          onClick={() => setDeleteMode("permanent")}
          className={cn(
            "flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all",
            deleteMode === "permanent"
              ? "border-rose-500 bg-rose-50/70 dark:border-rose-600 dark:bg-rose-950/30 ring-1 ring-rose-500"
              : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900"
          )}
        >
          <input
            type="radio"
            name="delete-type"
            checked={deleteMode === "permanent"}
            onChange={() => setDeleteMode("permanent")}
            className="mt-1 text-rose-600 focus:ring-rose-500"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-xs sm:text-sm text-rose-700 dark:text-rose-400">
              <Trash2 size={15} className="text-rose-600" />
              <span>Permanent Delete (Hard Purge)</span>
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 ml-auto">
                <ShieldAlert size={11} /> Irreversible
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Completely purges this record from the database. Cannot be undone or restored.
            </p>
          </div>
        </label>
      </div>

      <DialogFooter>
        <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          variant={deleteMode === "permanent" ? "destructive" : "gold"}
          size="sm"
          onClick={handleProceed}
        >
          {deleteMode === "permanent" ? "Confirm Hard Delete" : "Confirm Soft Delete"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
