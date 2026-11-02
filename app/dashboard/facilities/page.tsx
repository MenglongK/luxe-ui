import { Metadata } from "next";
import FacilitiesView from "@/components/dashboard/facilities/FacilitiesView";

export const metadata: Metadata = {
  title: "Facility & Salon Network | LUXE Control Atelier",
  description: "Manage retail boutiques, styling salons, and central bonded warehouses",
};

export default function FacilitiesPage() {
  return <FacilitiesView />;
}
