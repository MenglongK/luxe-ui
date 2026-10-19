import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ClientProviders from "@/components/providers/ClientProviders";

export const metadata: Metadata = {
  title: "LUXE | Luxury Minimalist Fashion & Contemporary Apparel",
  description: "Curated modern wardrobe essentials, tailoring, and sustainable luxury fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("luxe-theme");var p=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&p)){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}var l=localStorage.getItem("luxe-lang");if(l==="km"){document.documentElement.lang="km";}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf9f6] text-[#121212] dark:bg-[#111111] dark:text-[#f4ece1] selection:bg-[#121212] selection:text-white dark:selection:bg-[#c5a880] dark:selection:text-black transition-colors duration-200">
        <ClientProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
