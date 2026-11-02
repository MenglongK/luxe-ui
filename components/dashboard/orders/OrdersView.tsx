"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Filter,
  Trash2,
  Eye,
  Store,
  Globe,
  RotateCcw,
  Calendar,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Order } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DeleteConfirmDialog } from "@/components/ui/delete-dialog";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { formatCurrency } from "@/lib/utils";
import { TopCustomerOrders } from "./TopCustomerOrders";
import { WalkInOrderModal } from "./WalkInOrderModal";
import { OrderDetailModal } from "./OrderDetailModal";
import { RejectOrderModal } from "./RejectOrderModal";

type TimeFilter = "day" | "week" | "month" | "year";

export default function OrdersView() {
  const {
    currentRole,
    orders,
    addOrder,
    updateOrderStatus,
    softDeleteOrder,
    permanentDeleteOrder,
    restoreOrder,
    stockItems,
    searchQuery,
  } = useDashboard();

  // Filters
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("month");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState<string>("all");

  // Dialog states
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [rejectingOrder, setRejectingOrder] = useState<Order | null>(null);
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          ord.orderNumber.toLowerCase().includes(q) ||
          ord.customerName.toLowerCase().includes(q) ||
          ord.items.some((i) => i.productName.toLowerCase().includes(q));
        if (!match) return false;
      }

      if (selectedTab === "archived") {
        return ord.isDeleted;
      }
      if (ord.isDeleted) return false;

      if (selectedTab === "online" && ord.orderType !== "online") return false;
      if (selectedTab === "walk-in" && ord.orderType !== "walk-in") return false;
      if (statusFilter !== "all" && ord.status !== statusFilter) return false;

      return true;
    });
  }, [orders, searchQuery, selectedTab, statusFilter]);

  // TOP Customer Orders
  const topCustomerOrders = useMemo(() => {
    return [...orders]
      .filter((o) => !o.isDeleted)
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 4);
  }, [orders]);

  const handleDeleteConfirm = (type: "soft" | "permanent") => {
    if (!deleteTarget) return;
    if (type === "soft") {
      softDeleteOrder(deleteTarget.id);
    } else {
      permanentDeleteOrder(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Order Orchestration & POS
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {currentRole === "staff" ? "Floor Sales & Order Processing" : "Atelier Order Management"}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Track customer acquisitions, process online delivery fulfillment, and record walk-in counter sales.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportCsvButton
            data={orders.map((o) => ({
              OrderNumber: o.orderNumber,
              Customer: o.customerName,
              Email: o.customerEmail,
              Type: o.orderType,
              Total: o.totalAmount,
              Payment: o.paymentMethod,
              Status: o.status,
              Facility: o.facilityName,
              Date: o.createdAt,
              Deleted: o.isDeleted ? "Yes" : "No",
            }))}
            filename="luxe-orders-report.csv"
          />

          <Button
            variant="gold"
            size="sm"
            onClick={() => setIsWalkInModalOpen(true)}
            className="gap-1.5"
          >
            <Plus size={15} />
            <span>New Walk-in Order</span>
          </Button>
        </div>
      </div>

      {/* TOP Customer Orders (Admin perspective) */}
      {currentRole === "admin" && (
        <TopCustomerOrders orders={topCustomerOrders} onSelectOrder={setViewingOrder} />
      )}

      {/* Time & Status Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-[#181818] border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center gap-2">
          <Calendar size={15} className="text-neutral-400" />
          <span className="text-xs font-medium text-neutral-500">Filter Range:</span>
          <div className="flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs">
            {(["day", "week", "month", "year"] as TimeFilter[]).map((period) => (
              <button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={`px-3 py-1 rounded-md capitalize font-medium transition-all ${
                  timeFilter === period
                    ? "bg-white dark:bg-[#121212] text-neutral-900 dark:text-neutral-50 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={14} className="text-neutral-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs h-8 px-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-200 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Tabbed View: All vs Online vs Walk-in vs Archived */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="online">
              <Globe size={13} className="mr-1.5" /> Online Orders
            </TabsTrigger>
            <TabsTrigger value="walk-in">
              <Store size={13} className="mr-1.5" /> Walk-in Orders
            </TabsTrigger>
            <TabsTrigger value="archived">
              <Trash2 size={13} className="mr-1.5" /> Archived
            </TabsTrigger>
          </TabsList>

          <span className="text-xs text-neutral-400">
            Showing {filteredOrders.length} order(s)
          </span>
        </div>

        <TabsContent value={selectedTab}>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[11px] uppercase tracking-wider text-neutral-400 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-neutral-400">
                        No orders found matching the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr
                        key={ord.id}
                        className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 dark:text-neutral-100">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {ord.customerName}
                          </div>
                          <div className="text-[11px] text-neutral-400">{ord.customerEmail}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={ord.orderType === "online" ? "secondary" : "gold"}
                            className="text-[10px] uppercase font-semibold"
                          >
                            {ord.orderType}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                          {formatCurrency(ord.totalAmount)}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                          {ord.paymentMethod}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={
                              ord.status === "completed"
                                ? "success"
                                : ord.status === "processing"
                                ? "gold"
                                : ord.status === "pending"
                                ? "warning"
                                : "destructive"
                            }
                            className="capitalize text-[10px]"
                          >
                            {ord.status}
                          </Badge>
                          {ord.rejectionReason && (
                            <p className="text-[10px] text-rose-500 mt-0.5 truncate max-w-[140px]" title={ord.rejectionReason}>
                              {ord.rejectionReason}
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-500 truncate max-w-[130px]">
                          {ord.facilityName}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {ord.orderType === "online" && ord.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="gold"
                                  onClick={() => updateOrderStatus(ord.id, "processing")}
                                  className="h-7 px-2 text-[11px]"
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => setRejectingOrder(ord)}
                                  className="h-7 px-2 text-[11px]"
                                >
                                  Reject
                                </Button>
                              </>
                            )}

                            {ord.orderType === "online" && ord.status === "processing" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateOrderStatus(ord.id, "completed")}
                                className="h-7 px-2 text-[11px] text-emerald-600 hover:text-emerald-700"
                              >
                                Mark Fulfilled
                              </Button>
                            )}

                            <button
                              onClick={() => setViewingOrder(ord)}
                              className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                              title="Inspect order details"
                            >
                              <Eye size={15} />
                            </button>

                            {ord.isDeleted ? (
                              <button
                                onClick={() => restoreOrder(ord.id)}
                                className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600"
                                title="Restore order"
                              >
                                <RotateCcw size={15} />
                              </button>
                            ) : (
                              <button
                                onClick={() => setDeleteTarget(ord)}
                                className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500"
                                title="Delete order options"
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
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <WalkInOrderModal
        open={isWalkInModalOpen}
        onOpenChange={setIsWalkInModalOpen}
        stockItems={stockItems}
        onCreateOrder={addOrder}
      />

      <OrderDetailModal order={viewingOrder} onClose={() => setViewingOrder(null)} />

      <RejectOrderModal
        order={rejectingOrder}
        onClose={() => setRejectingOrder(null)}
        onConfirmReject={(orderId, reason) => updateOrderStatus(orderId, "cancelled", reason)}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Order Record"
        itemType="order"
        itemName={deleteTarget?.orderNumber}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
