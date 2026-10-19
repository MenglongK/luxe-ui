import { notFound } from "next/navigation";
import { products } from "@/data";
import ProductDetailView from "@/components/products/ProductDetailView";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | LUXE Atelier",
    };
  }

  return {
    title: `${product.name} | LUXE Atelier`,
    description: product.description || "Luxury minimalist clothing tailored with artisanal precision.",
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
