"use client";

import React, { useState, useMemo } from "react";
import { Users, Award, Crown, Plus, Trash2, Eye, RotateCcw, Sparkles, Edit2 } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Customer } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TopSpendersPodium } from "./TopSpendersPodium";
import { CustomerModal } from "./CustomerModal";
import { CustomerDetailModal } from "./CustomerDetailModal";

export default function CustomersView() {
  const {
    customers,
    addCustomer,
    updateCustomer,
    softDeleteCustomer,
    permanentDeleteCustomer,
    restoreCustomer,
    orders,
    searchQuery,
  } = useDashboard();

  // Filters & State
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [showArchived, setShowArchived] = useState(false);

  // Dialogs
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      if (showArchived) {
        if (!cust.isDeleted) return false;
      } else {
        if (cust.isDeleted) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          cust.name.toLowerCase().includes(q) ||
          cust.email.toLowerCase().includes(q) ||
          cust.phone.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (tierFilter !== "all" && cust.tier !== tierFilter) return false;

      return true;
    });
  }, [customers, searchQuery, tierFilter, showArchived]);

  // TOP customers by lifetime spend
  const topSpenders = useMemo(() => {
    return [...customers]
      .filter((c) => !c.isDeleted)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 3);
  }, [customers]);

  // Stats calculation
  const activeCustomers = customers.filter((c) => !c.isDeleted);
  const totalLifetimeSpend = activeCustomers.reduce((acc, c) => acc + c.totalSpent, 0);
  const vipCount = activeCustomers.filter((c) => c.tier === "VIP Royal" || c.tier === "Gold Atelier").length;
  const avgSpend = activeCustomers.length > 0 ? Math.round(totalLifetimeSpend / activeCustomers.length) : 0;

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cust: Customer) => {
    setEditingCustomer(cust);
    setIsAddModalOpen(true);
  };

  const handleSaveCustomer = (data: Partial<Customer>, id?: string) => {
    if (id) {
      updateCustomer(id, data);
    } else {
      addCustomer({
        name: data.name || "Client",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        tier: data.tier || "Standard",
        totalSpent: 0,
        ordersCount: 0,
        points: 100,
        status: "active",
        lastOrderDate: new Date().toISOString().split("T")[0],
      });
    }
  };

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteCustomer(deleteTarget.id);
    } else {
      permanentDeleteCustomer(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Clientele & High Net Worth Patrons
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Customer Relations & VIP Atelier
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Monitor patron acquisition, high-spending client profiles, and bespoke tailoring preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportCsvButton
            data={customers.map((c) => ({
              Name: c.name,
              Email: c.email,
              Phone: c.phone,
              Tier: c.tier,
              TotalSpent: c.totalSpent,
              OrdersCount: c.ordersCount,
              Points: c.points,
              Joined: c.joinedDate,
              Status: c.status,
              Deleted: c.isDeleted ? "Yes" : "No",
            }))}
            filename="luxe-customers.csv"
          />

          <Button variant="gold" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus size={15} />
            <span>Register Client</span>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Clientele"
          value={activeCustomers.length}
          subtitle="Registered maison accounts"
          icon={<Users size={18} />}
        />
        <StatCard
          title="Total Lifetime Spend"
          value={formatCurrency(totalLifetimeSpend)}
          subtitle="Gross customer acquisitions"
          icon={<Award size={18} />}
          variant="gold"
        />
        <StatCard
          title="VIP Atelier Members"
          value={vipCount}
          subtitle="VIP Royal & Gold patrons"
          icon={<Crown size={18} />}
        />
        <StatCard
          title="Average Spend / Client"
          value={formatCurrency(avgSpend)}
          subtitle="Per customer historical spend"
          icon={<Sparkles size={18} />}
        />
      </div>

      {/* TOP Customers Podium */}
      <TopSpendersPodium customers={topSpenders} onSelectCustomer={setViewingCustomer} />

      {/* Customer Directory Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div>
            <CardTitle>Clientele Directory</CardTitle>
            <CardDescription>
              Browse complete client roster, order frequency, and loyalty tier
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="text-xs h-8 px-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              <option value="all">All Tiers</option>
              <option value="VIP Royal">VIP Royal</option>
              <option value="Gold Atelier">Gold Atelier</option>
              <option value="Silver">Silver</option>
              <option value="Standard">Standard</option>
            </select>

            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showArchived
                  ? "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 font-semibold"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {showArchived ? "Viewing Archived" : "Show Archived"}
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] uppercase tracking-wider text-neutral-400 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Lifetime Spend</th>
                  <th className="py-3 px-4">Orders</th>
                  <th className="py-3 px-4">Points</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-400">
                      No customer records found.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust) => (
                    <tr
                      key={cust.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-semibold text-neutral-700 dark:text-neutral-300">
                            {cust.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                              {cust.name}
                            </div>
                            <div className="text-[11px] text-neutral-400">{cust.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            cust.tier === "VIP Royal"
                              ? "gold"
                              : cust.tier === "Gold Atelier"
                              ? "warning"
                              : cust.tier === "Silver"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-[10px]"
                        >
                          {cust.tier}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                        {formatCurrency(cust.totalSpent)}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                        {cust.ordersCount} orders
                      </td>
                      <td className="py-3.5 px-4 text-[#c5a880] font-semibold">
                        {cust.points} pts
                      </td>
                      <td className="py-3.5 px-4 text-neutral-400">
                        {formatDate(cust.lastOrderDate)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingCustomer(cust)}
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                            title="View Customer Profile"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(cust)}
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                            title="Edit Customer"
                          >
                            <Edit2 size={15} />
                          </button>
                          {cust.isDeleted ? (
                            <button
                              onClick={() => restoreCustomer(cust.id)}
                              className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600"
                              title="Restore Client"
                            >
                              <RotateCcw size={15} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setDeleteTarget(cust)}
                              className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500"
                              title="Delete Client Options"
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
      <CustomerModal
        key={editingCustomer?.id || (isAddModalOpen ? "new" : "closed")}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        customerToEdit={editingCustomer}
        onSave={handleSaveCustomer}
      />

      <CustomerDetailModal
        customer={viewingCustomer}
        orders={orders}
        onClose={() => setViewingCustomer(null)}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Customer Profile"
        itemType="client"
        itemName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
