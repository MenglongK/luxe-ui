import { Metadata } from "next";
import AuthView from "@/components/auth/AuthView";

export const metadata: Metadata = {
  title: "Create Atelier Account | LUXE Atelier Society",
  description: "Join the LUXE Atelier Society. Enjoy 15% privilege on your inaugural garment and private salon previews.",
};

export default function RegisterPage() {
  return <AuthView initialMode="register" />;
}
