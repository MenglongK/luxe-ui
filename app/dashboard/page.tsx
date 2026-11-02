import { Metadata } from "next";
import DashboardOverviewView from "@/components/dashboard/overview/DashboardOverviewView";

export const metadata: Metadata = {
  title: "Dashboard Overview | LUXE Control Atelier",
  description: "Enterprise operational intelligence and real-time maison analytics",
};

export default function DashboardPage() {
  return <DashboardOverviewView />;
}
