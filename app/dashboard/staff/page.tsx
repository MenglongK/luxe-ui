import { Metadata } from "next";
import StaffView from "@/components/dashboard/staff/StaffView";

export const metadata: Metadata = {
  title: "Staff & Talent Roster | LUXE Control Atelier",
  description: "Manage boutique managers, cashiers, client advisors, and logistics officers",
};

export default function StaffPage() {
  return <StaffView />;
}
