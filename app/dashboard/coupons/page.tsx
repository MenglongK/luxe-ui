import { Metadata } from "next";
import CouponsView from "@/components/dashboard/coupons/CouponsView";

export const metadata: Metadata = {
  title: "Coupon Management | LUXE Control Atelier",
  description: "Manage promo codes and customer privilege vouchers",
};

export default function CouponsPage() {
  return <CouponsView />;
}
