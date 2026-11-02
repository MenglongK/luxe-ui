import { Metadata } from "next";
import ShiftsView from "@/components/dashboard/shifts/ShiftsView";

export const metadata: Metadata = {
  title: "Shift Scheduling & Coverage | LUXE Control Atelier",
  description: "Organize retail salon rosters, night audit logistics, and apply shifts to personnel",
};

export default function ShiftsPage() {
  return <ShiftsView />;
}
