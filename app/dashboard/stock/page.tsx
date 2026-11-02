import { Metadata } from "next";
import StockView from "@/components/dashboard/stock/StockView";

export const metadata: Metadata = {
  title: "Stock Management & Depletion Alerts | LUXE Control Atelier",
  description: "Real-time balance across central warehouses and boutique salons with automated alerts",
};

export default function StockPage() {
  return <StockView />;
}
