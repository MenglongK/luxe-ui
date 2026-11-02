import type { Metadata } from "next";
import { DashboardProvider } from "@/context/DashboardContext";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "LUXE Control Atelier | Operations & Management",
  description: "Enterprise management dashboard for LUXE luxury fashion maison",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}
