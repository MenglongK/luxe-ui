"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  UserCheck,
  CalendarDays,
  Boxes,
  Building2,
  Truck,
  TrendingUp,
  Ticket,
  ArrowRightLeft,
  PackagePlus,
  Store,
  ChevronRight,
  Shield,
  Layers,
  Wrench,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  adminOnly?: boolean;
}

export function DashboardSidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { currentRole, orders, stockItems } = useDashboard();

  // Low stock badge calculation
  const lowStockCount = stockItems.filter(
    (i) => !i.isDeleted && (i.status === "low_stock" || i.status === "out_of_stock")
  ).length;

  // Pending orders badge calculation
  const pendingOrdersCount = orders.filter(
    (o) => !o.isDeleted && o.status === "pending"
  ).length;

  const adminNavItems: NavItem[] = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? String(pendingOrdersCount) : undefined,
    },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
    { label: "Staff Directory", href: "/dashboard/staff", icon: UserCheck },
    { label: "Shift Schedule", href: "/dashboard/shifts", icon: CalendarDays },
    {
      label: "Stock & Alerts",
      href: "/dashboard/stock",
      icon: Boxes,
      badge: lowStockCount > 0 ? `${lowStockCount} alert` : undefined,
    },
    { label: "Facilities", href: "/dashboard/facilities", icon: Building2 },
    { label: "Suppliers", href: "/dashboard/suppliers", icon: Truck },
    { label: "Financial & Reports", href: "/dashboard/financial", icon: TrendingUp },
    { label: "Coupons", href: "/dashboard/coupons", icon: Ticket },
  ];

  const staffNavItems: NavItem[] = [
    { label: "Staff Overview", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "Online & Walk-in Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : undefined,
    },
    { label: "Coupon Lookup", href: "/dashboard/coupons", icon: Ticket },
  ];

  const stockControllerNavItems: NavItem[] = [
    { label: "Stock Overview", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "Stock Inventory",
      href: "/dashboard/stock",
      icon: Boxes,
      badge: lowStockCount > 0 ? `${lowStockCount} alert` : undefined,
    },
    { label: "Import Stock (PO)", href: "/dashboard/stock/imports", icon: PackagePlus },
    { label: "Transfer Stock", href: "/dashboard/stock/transfers", icon: ArrowRightLeft },
  ];

  const navItems =
    currentRole === "admin"
      ? adminNavItems
      : currentRole === "staff"
      ? staffNavItems
      : stockControllerNavItems;

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-[#151515] border-r border-neutral-200/80 dark:border-neutral-800/80 flex flex-col h-full min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-neutral-200/70 dark:border-neutral-800/80 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <span className="text-xl tracking-[0.2em] font-semibold text-neutral-900 dark:text-neutral-50 uppercase">
            LUXE
          </span>
          <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#c5a880]/20 text-[#8e6e44] dark:text-[#dfc6a3] border border-[#c5a880]/30">
            Control
          </span>
        </Link>
      </div>

      {/* Role Pill Banner */}
      <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900/40 border-b border-neutral-100 dark:border-neutral-800/50">
        <div className="flex items-center gap-2">
          {currentRole === "admin" && <Shield size={14} className="text-[#c5a880]" />}
          {currentRole === "staff" && <Layers size={14} className="text-blue-500" />}
          {currentRole === "stock-controller" && <Wrench size={14} className="text-amber-500" />}
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium">
              Active Workspace
            </span>
            <span className="text-xs font-semibold capitalize text-neutral-800 dark:text-neutral-200">
              {currentRole === "stock-controller" ? "Stock Controller" : `${currentRole} Portal`}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all duration-150",
                isActive
                  ? "bg-[#121212] text-white dark:bg-[#c5a880] dark:text-[#121212] shadow-xs"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  size={16}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-[#c5a880] dark:text-[#121212]"
                      : "text-neutral-400 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200"
                  )}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                    isActive
                      ? "bg-white/20 text-white dark:bg-black/20 dark:text-black"
                      : "bg-[#c5a880]/20 text-[#876535] dark:text-[#dfc6a3]"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Storefront return link & footer */}
      <div className="p-3 border-t border-neutral-200/70 dark:border-neutral-800/80">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Store size={15} />
            <span>Customer Storefront</span>
          </div>
          <ChevronRight size={14} />
        </Link>
      </div>
    </aside>
  );
}
