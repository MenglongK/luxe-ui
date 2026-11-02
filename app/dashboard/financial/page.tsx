import { Metadata } from "next";
import FinancialView from "@/components/dashboard/financial/FinancialView";

export const metadata: Metadata = {
  title: "Financial Ledger & Reports | LUXE Control Atelier",
  description: "Real-time balance sheets, EBITDA margins, store receipts, and CSV audit downloads",
};

export default function FinancialPage() {
  return <FinancialView />;
}
