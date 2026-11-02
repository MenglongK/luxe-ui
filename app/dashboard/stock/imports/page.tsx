import { Metadata } from "next";
import StockImportsView from "@/components/dashboard/stock-imports/StockImportsView";

export const metadata: Metadata = {
  title: "Inbound Stock Imports (PO) | LUXE Control Atelier",
  description: "Manage purchase orders, mill shipments, and receiving inspection workflows",
};

export default function StockImportsPage() {
  return <StockImportsView />;
}
