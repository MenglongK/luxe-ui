import { Metadata } from "next";
import StockTransfersView from "@/components/dashboard/stock-transfers/StockTransfersView";

export const metadata: Metadata = {
  title: "Stock Transfer Logistics | LUXE Control Atelier",
  description: "Inter-branch and warehouse stock relocation, transit waybills, and tracking",
};

export default function StockTransfersPage() {
  return <StockTransfersView />;
}
