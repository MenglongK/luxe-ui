import { Metadata } from "next";
import OrdersView from "@/components/dashboard/orders/OrdersView";

export const metadata: Metadata = {
  title: "Orders & POS Desk | LUXE Control Atelier",
  description: "Manage client acquisitions, fulfill online deliveries, and process walk-in counter sales",
};

export default function OrdersPage() {
  return <OrdersView />;
}
