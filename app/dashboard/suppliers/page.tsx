import { Metadata } from "next";
import SuppliersView from "@/components/dashboard/suppliers/SuppliersView";

export const metadata: Metadata = {
  title: "Supplier Relations & Sourcing | LUXE Control Atelier",
  description: "Maintain relationships with luxury mills, Italian tanneries, and custom packaging ateliers",
};

export default function SuppliersPage() {
  return <SuppliersView />;
}
