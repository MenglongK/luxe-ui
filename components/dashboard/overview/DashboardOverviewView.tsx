"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  DollarSign,
  Users,
  AlertTriangle,
  ArrowRight,
  Package,
  Layers,
  ArrowRightLeft,
  Clock,
  Store,
  ChevronRight,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { StatCard } from "@/components/dashboard/StatCard";
import { AreaChart, DonutChart } from "@/components/dashboard/SimpleChart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function DashboardOverviewView() {
  const {
    currentRole,
    orders,
    customers,
    staffList,
    stockItems,
    facilities,
    financialMetric,
    stockTransfers,
  } = useDashboard();

  // Active items
  const activeOrders = orders.filter((o) => !o.isDeleted);
  const activeCustomers = customers.filter((c) => !c.isDeleted);
  const activeStaff = staffList.filter((s) => !s.isDeleted);
  const activeStock = stockItems.filter((s) => !s.isDeleted);
  const activeTransfers = stockTransfers.filter((t) => !t.isDeleted);

  // Key metrics
  const totalOrdersCount = activeOrders.length;
  const totalRevenue = activeOrders
    .filter((o) => o.status === "completed" || o.status === "processing")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const totalUsersCount = activeCustomers.length + activeStaff.length;

  const lowStockItems = activeStock.filter(
    (i) => i.status === "low_stock" || i.status === "out_of_stock"
  );
  const outOfStockCount = lowStockItems.length;

  // Chart data
  const areaChartData = financialMetric.monthlyRevenue.map((m) => ({
    label: m.month,
    value: m.revenue,
    secondaryValue: m.profit,
  }));

  const categoryPalette = ["#c5a880", "#121212", "#6366f1", "#059669", "#d97706"];
  const donutSegments = financialMetric.categoryRevenue.map((c, idx) => ({
    label: c.category,
    value: c.amount,
    color: categoryPalette[idx % categoryPalette.length],
  }));

  return (
    <div className="space-y-6">
      {/* Title & Role */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            {currentRole === "admin"
              ? "Atelier Executive Dashboard"
              : currentRole === "staff"
              ? "Retail Floor & Order Desk"
              : "Logistics & Inventory Command"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {currentRole === "admin"
              ? "Operations & Performance Overview"
              : currentRole === "staff"
              ? "Daily Floor Orders & Counter Operations"
              : "Warehouse Stock & Transfer Command"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="gold" className="px-3 py-1 text-xs capitalize">
            Perspective: {currentRole.replace("-", " ")}
          </Badge>
          <span className="text-xs text-neutral-400">
            Last synced: Today, 15:00
          </span>
        </div>
      </div>

      {/* ========================================================
          1. ADMIN PERSPECTIVE
          ======================================================== */}
      {currentRole === "admin" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Orders"
              value={totalOrdersCount}
              change="+14.2%"
              trend="up"
              subtitle="All registered online & walk-in sales"
              icon={<ShoppingBag size={18} />}
            />
            <StatCard
              title="Total Revenue"
              value={formatCurrency(totalRevenue)}
              change="+22.8%"
              trend="up"
              subtitle="Completed & settled salon orders"
              icon={<DollarSign size={18} />}
              variant="gold"
            />
            <StatCard
              title="Total Users"
              value={totalUsersCount}
              change="+8.5%"
              trend="up"
              subtitle={`${activeCustomers.length} clients & ${activeStaff.length} staff`}
              icon={<Users size={18} />}
            />
            <StatCard
              title="Stock Alerts"
              value={outOfStockCount}
              trend={outOfStockCount > 0 ? "down" : "neutral"}
              subtitle={outOfStockCount > 0 ? "Items require urgent reorder" : "Stock health optimal"}
              icon={<AlertTriangle size={18} />}
              variant={outOfStockCount > 0 ? "alert" : "default"}
            />
          </div>

          {lowStockItems.length > 0 && (
            <div className="rounded-xl border border-amber-300/80 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 shrink-0">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Stock Replenishment Alert ({lowStockItems.length} items low or out of stock)
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {lowStockItems.map((i) => `${i.productName} (${i.currentStock} left at ${i.facilityName})`).slice(0, 2).join(", ")}
                    {lowStockItems.length > 2 ? ` and ${lowStockItems.length - 2} more` : ""}
                  </p>
                </div>
              </div>
              <Link href="/dashboard/stock">
                <Button size="sm" variant="gold">
                  Manage Stock Levels
                </Button>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-8">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Revenue & Profit Trajectory</CardTitle>
                  <CardDescription>
                    Gold line: Gross Revenue | Dashed blue line: Net Profit
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-[11px]">
                  FY 2026 Monthly
                </Badge>
              </CardHeader>
              <CardContent className="pt-2">
                <AreaChart data={areaChartData} height={230} />
              </CardContent>
            </Card>

            <Card className="lg:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Portfolio volume across tailoring & goods</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <DonutChart segments={donutSegments} size={150} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Customer Orders</CardTitle>
                <CardDescription>Latest orders across online boutique and flagship salons</CardDescription>
              </div>
              <Link href="/dashboard/orders">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All Orders <ArrowRight size={13} />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[11px] uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800">
                    <tr>
                      <th className="py-2.5 px-3">Order #</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Channel</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Payment</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                    {activeOrders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                        <td className="py-3 px-3 font-mono font-medium text-neutral-900 dark:text-neutral-100">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-neutral-900 dark:text-neutral-100">
                            {ord.customerName}
                          </div>
                          <div className="text-[10px] text-neutral-400">{ord.facilityName}</div>
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant="outline" className="text-[10px] uppercase">
                            {ord.orderType}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                          {formatCurrency(ord.totalAmount)}
                        </td>
                        <td className="py-3 px-3 text-neutral-500">{ord.paymentMethod}</td>
                        <td className="py-3 px-3">
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
                        </td>
                        <td className="py-3 px-3 text-right text-neutral-400">
                          {formatDate(ord.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* ========================================================
          2. STAFF PERSPECTIVE
          ======================================================== */}
      {currentRole === "staff" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Today's Orders"
              value={activeOrders.length}
              subtitle="All registered sales today"
              icon={<ShoppingBag size={18} />}
            />
            <StatCard
              title="Pending Online"
              value={activeOrders.filter((o) => o.orderType === "online" && o.status === "pending").length}
              subtitle="Requires packaging process"
              icon={<Clock size={18} />}
              variant="alert"
            />
            <StatCard
              title="Walk-in Served"
              value={activeOrders.filter((o) => o.orderType === "walk-in").length}
              subtitle="Clients serviced at boutique"
              icon={<Store size={18} />}
            />
            <StatCard
              title="Daily Counter Sales"
              value={formatCurrency(
                activeOrders
                  .filter((o) => o.orderType === "walk-in")
                  .reduce((sum, o) => sum + o.totalAmount, 0)
              )}
              subtitle="Total direct POS collections"
              icon={<DollarSign size={18} />}
              variant="gold"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Incoming Online Orders To Process</CardTitle>
                  <CardDescription>Accept, pack, or reject online purchases</CardDescription>
                </div>
                <Link href="/dashboard/orders">
                  <Button size="sm" variant="gold">
                    Go to Orders Hub
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeOrders
                    .filter((o) => o.orderType === "online")
                    .slice(0, 4)
                    .map((ord) => (
                      <div
                        key={ord.id}
                        className="flex items-center justify-between p-3.5 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-xs text-neutral-900 dark:text-neutral-100">
                              {ord.orderNumber}
                            </span>
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
                              className="text-[10px]"
                            >
                              {ord.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300">
                            {ord.customerName} • {ord.items.length} item(s) • {formatCurrency(ord.totalAmount)}
                          </p>
                        </div>
                        <Link href="/dashboard/orders">
                          <Button size="sm" variant="outline" className="text-xs">
                            Process Order
                          </Button>
                        </Link>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Staff Fast Actions</CardTitle>
                <CardDescription>Immediate floor assistance tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/orders" className="block">
                  <Button variant="gold" className="w-full justify-between">
                    <span>Create Walk-in POS Order</span>
                    <ArrowRight size={14} />
                  </Button>
                </Link>
                <Link href="/dashboard/coupons" className="block">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Look Up Active Coupons</span>
                    <ArrowRight size={14} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* ========================================================
          3. STOCK CONTROLLER PERSPECTIVE
          ======================================================== */}
      {currentRole === "stock-controller" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Tracked SKUs"
              value={activeStock.length}
              subtitle="Across central warehouse & salons"
              icon={<Package size={18} />}
            />
            <StatCard
              title="Stock Alerts"
              value={lowStockItems.length}
              trend="down"
              subtitle="Items below reorder minimum"
              icon={<AlertTriangle size={18} />}
              variant="alert"
            />
            <StatCard
              title="Active Transfers"
              value={activeTransfers.filter((t) => t.status === "in_transit" || t.status === "dispatched").length}
              subtitle="Vehicles currently en route"
              icon={<ArrowRightLeft size={18} />}
              variant="gold"
            />
            <StatCard
              title="Warehouses & Hubs"
              value={facilities.length}
              subtitle="Active storage facilities"
              icon={<Layers size={18} />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Critical Reorder Attention</CardTitle>
                  <CardDescription>Items with stock below threshold level</CardDescription>
                </div>
                <Link href="/dashboard/stock/imports">
                  <Button size="sm" variant="gold">
                    Create Import PO
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3.5 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-xs text-neutral-900 dark:text-neutral-100">
                            {item.sku}
                          </span>
                          <span className="font-medium text-xs text-neutral-800 dark:text-neutral-200">
                            {item.productName}
                          </span>
                          <Badge variant={item.currentStock === 0 ? "destructive" : "warning"} className="text-[10px]">
                            {item.currentStock === 0 ? "Out of Stock" : `${item.currentStock} remaining`}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          Location: {item.facilityName} • Minimum Threshold: {item.minStockAlert} units
                        </p>
                      </div>
                      <Link href="/dashboard/stock/transfers">
                        <Button size="sm" variant="outline" className="text-xs">
                          Transfer In
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Warehouse Operations</CardTitle>
                <CardDescription>Logistics fast controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/stock/imports" className="block">
                  <Button variant="gold" className="w-full justify-between">
                    <span>Manage Stock Imports (PO)</span>
                    <ArrowRight size={14} />
                  </Button>
                </Link>
                <Link href="/dashboard/stock/transfers" className="block">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Dispatch Inter-branch Transfer</span>
                    <ArrowRight size={14} />
                  </Button>
                </Link>
                <Link href="/dashboard/stock" className="block">
                  <Button variant="ghost" className="w-full justify-between">
                    <span>Full SKU Inventory Matrix</span>
                    <ChevronRight size={14} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
