"use client";

import React, { useState, useMemo } from "react";
import { Ticket, Plus, Percent, Calendar, Sparkles } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Coupon } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { StatCard } from "@/components/dashboard/StatCard";
import { CouponCard } from "./CouponCard";
import { CouponModal } from "./CouponModal";

export default function CouponsView() {
  const {
    currentRole,
    coupons,
    addCoupon,
    updateCoupon,
    softDeleteCoupon,
    permanentDeleteCoupon,
    restoreCoupon,
    searchQuery,
  } = useDashboard();

  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  // Filtered coupons
  const filteredCoupons = useMemo(() => {
    return coupons.filter((cp) => {
      if (showArchived) {
        if (!cp.isDeleted) return false;
      } else {
        if (cp.isDeleted) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          cp.code.toLowerCase().includes(q) ||
          cp.description.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [coupons, searchQuery, showArchived]);

  // Metrics
  const activeCoupons = coupons.filter((c) => !c.isDeleted);
  const totalRedemptions = activeCoupons.reduce((sum, c) => sum + c.usageCount, 0);

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cp: Coupon) => {
    setEditingCoupon(cp);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<Coupon, "id" | "usageCount" | "isDeleted">, id?: string) => {
    if (id) {
      updateCoupon(id, data);
    } else {
      addCoupon(data);
    }
  };

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteCoupon(deleteTarget.id);
    } else {
      permanentDeleteCoupon(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  const isAdmin = currentRole === "admin";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Marketing & VIP Privilege Codes
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {isAdmin ? "Privilege Coupon Management" : "Active Boutique Coupons"}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {isAdmin
              ? "Design promotional codes, seasonal preview discounts, and VIP voucher campaigns."
              : "Look up verified coupon codes to apply for clients at the checkout desk."}
          </p>
        </div>

        {isAdmin && (
          <Button variant="gold" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus size={15} />
            <span>Generate New Coupon</span>
          </Button>
        )}
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Coupons"
          value={activeCoupons.filter((c) => c.status === "active").length}
          subtitle="Redeemable right now"
          icon={<Ticket size={18} />}
        />
        <StatCard
          title="Total Redemptions"
          value={totalRedemptions}
          subtitle="Customer voucher uses"
          icon={<Sparkles size={18} />}
          variant="gold"
        />
        <StatCard
          title="Top Discount"
          value="20% OFF"
          subtitle="Maximum single promotion"
          icon={<Percent size={18} />}
        />
        <StatCard
          title="Privilege Access"
          value={isAdmin ? "Full CRUD" : "Staff Read-Only"}
          subtitle={isAdmin ? "Administrator master role" : "Floor staff lookup only"}
          icon={<Calendar size={18} />}
        />
      </div>

      {/* Coupons Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Available Maison Vouchers
          </h3>

          {isAdmin && (
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showArchived
                  ? "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 font-semibold"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {showArchived ? "Viewing Archived Coupons" : "Show Archived"}
            </button>
          )}
        </div>

        {filteredCoupons.length === 0 ? (
          <div className="p-12 text-center text-xs text-neutral-400 bg-white dark:bg-[#181818] rounded-xl border border-neutral-200 dark:border-neutral-800">
            No coupon vouchers found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCoupons.map((cp) => (
              <CouponCard
                key={cp.id}
                coupon={cp}
                isAdmin={isAdmin}
                onEdit={handleOpenEdit}
                onDelete={setDeleteTarget}
                onRestore={restoreCoupon}
              />
            ))}
          </div>
        )}
      </div>

      {/* Coupon Add/Edit Modal */}
      {isAdmin && (
        <CouponModal
          key={editingCoupon?.id || "new"}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          couponToEdit={editingCoupon}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation (Soft vs Permanent) */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Coupon Voucher"
        itemType="coupon"
        itemName={deleteTarget?.code}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
