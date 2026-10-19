import { Metadata } from "next";
import AuthView from "@/components/auth/AuthView";

export const metadata: Metadata = {
  title: "Sign In | LUXE Atelier Society",
  description: "Sign in to your LUXE Atelier account to manage bespoke garments, orders, and curated wishlist.",
};

export default function LoginPage() {
  return <AuthView initialMode="signin" />;
}
