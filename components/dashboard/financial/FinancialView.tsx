"use client";

import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Receipt,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, BarChart, DonutChart } from "@/components/dashboard/SimpleChart";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function FinancialView() {
  const { financialMetric } = useDashboard();
  const [filterCategory, setFilterCategory] = useState("all");

  const transactions = financialMetric.recentTransactions.filter((tx) => {
    if (filterCategory !== "all" && tx.type !== filterCategory) return false;
    return true;
  });

  const areaData = financialMetric.monthlyRevenue.map((m) => ({
    label: m.month,
    value: m.revenue,
    secondaryValue: m.profit,
  }));

  const barData = financialMetric.monthlyRevenue.map((m) => ({
    label: m.month,
    value: m.expenses,
  }));

  const palette = ["#c5a880", "#121212", "#6366f1", "#059669", "#d97706"];
  const donutSegments = financialMetric.categoryRevenue.map((c, i) => ({
    label: c.category,
    value: c.amount,
    color: palette[i % palette.length],
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
            Treasury & Accounting Audit
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Financial Performance & Reports
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time balance sheets, EBITDA margins, store receipts, and CSV audit downloads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportCsvButton
            data={financialMetric.recentTransactions.map((tx) => ({
              TransactionID: tx.id,
              Date: tx.date,
              Description: tx.description,
              Flow: tx.type.toUpperCase(),
              Category: tx.category,
              Amount: tx.amount,
              Status: tx.status,
            }))}
            filename="luxe-financial-audit-report.csv"
            label="Download Report as CSV"
            variant="gold"
          />
        </div>
      </div>

      {/* Top Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Gross Revenue"
          value={formatCurrency(financialMetric.grossRevenue)}
          change="+18.4%"
          trend="up"
          subtitle="Annualized gross top-line"
          icon={<DollarSign size={18} />}
          variant="gold"
        />
        <StatCard
          title="Net Operating Profit"
          value={formatCurrency(financialMetric.netProfit)}
          change="+12.1%"
          trend="up"
          subtitle="Net profit after COGS & OpEx"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          title="Profit Margin"
          value={`${financialMetric.profitMarginPercent}%`}
          change="+2.4%"
          trend="up"
          subtitle="High-luxury operating margin"
          icon={<Percent size={18} />}
        />
        <StatCard
          title="Operating Expenses"
          value={formatCurrency(financialMetric.operationalCosts)}
          subtitle="Payroll, leases & logistics"
          icon={<Receipt size={18} />}
        />
      </div>

      {/* Financial Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Revenue & Net Profit Trend</CardTitle>
              <CardDescription>
                Gross top-line (Solid Gold) vs Net Operating Profit (Dashed Blue)
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-[10px]">
              Trailing 6 Months
            </Badge>
          </CardHeader>
          <CardContent className="pt-2">
            <AreaChart data={areaData} height={230} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Sales contribution by product line</CardDescription>
          </CardHeader>
          <CardContent className="pt-3">
            <DonutChart segments={donutSegments} size={150} />
          </CardContent>
        </Card>
      </div>

      {/* Monthly Expense Run-rate Bar Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Monthly Operating Expense Run-rate</CardTitle>
          <CardDescription>
            Facility rent, staff compensation, bonded customs clearance, and raw goods imports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart data={barData} height={160} barColor="#737373" />
        </CardContent>
      </Card>

      {/* Transaction Ledger Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>Recent General Ledger Entries</CardTitle>
            <CardDescription>
              Detailed debit and credit ledger transactions with audit timestamps
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-neutral-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-xs h-8 px-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              <option value="all">All Flows (Debit & Credit)</option>
              <option value="income">Income Only (Collections)</option>
              <option value="expense">Expense Only (Disbursements)</option>
            </select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] uppercase tracking-wider text-neutral-400 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 dark:text-neutral-100">
                      {tx.id}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500">{formatDate(tx.date)}</td>
                    <td className="py-3.5 px-4 font-medium text-neutral-800 dark:text-neutral-200">
                      {tx.description}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500">{tx.category}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 font-semibold">
                        {tx.type === "income" ? (
                          <span className="flex items-center gap-0.5 text-emerald-600">
                            <ArrowUpRight size={13} /> Credit
                          </span>
                        ) : (
                          <span className="flex items-center gap-0.5 text-rose-600">
                            <ArrowDownRight size={13} /> Debit
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-sm">
                      <span
                        className={
                          tx.type === "income"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-neutral-900 dark:text-neutral-100"
                        }
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Badge variant="success" className="text-[10px] capitalize">
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
