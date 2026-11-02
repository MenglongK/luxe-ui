import { Metadata } from "next";
import CustomersView from "@/components/dashboard/customers/CustomersView";

export const metadata: Metadata = {
  title: "Clientele & VIP Relations | LUXE Control Atelier",
  description: "Monitor patron acquisition, high-spending client profiles, and bespoke tailoring preferences",
};

export default function CustomersPage() {
  return <CustomersView />;
}
