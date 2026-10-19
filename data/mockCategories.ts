import { ProductCategory } from "@/types/product";

/**
 * Curated fashion categories with high-resolution imagery and aesthetic counts
 */
export const categories: ProductCategory[] = [
  {
    id: "cat-1",
    name: "Modern Tailoring",
    slug: "tailoring",
    tagline: "Sharp silhouettes & structured elegance",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
    itemCount: 42,
    isFeatured: true,
  },
  {
    id: "cat-2",
    name: "Fine Knitwear",
    slug: "knitwear",
    tagline: "Pure cashmere & extra-fine merino wool",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85",
    itemCount: 38,
    isFeatured: true,
  },
  {
    id: "cat-3",
    name: "Outerwear & Coats",
    slug: "outerwear",
    tagline: "Timeless trench coats & sculpted wool",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    itemCount: 29,
    isFeatured: true,
  },
  {
    id: "cat-4",
    name: "Silk & Eveningwear",
    slug: "dresses",
    tagline: "Fluid drapery for effortless gala poise",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
    itemCount: 31,
    isFeatured: true,
  },
  {
    id: "cat-5",
    name: "Artisanal Footwear",
    slug: "footwear",
    tagline: "Italian calfskin boots & minimalist mules",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    itemCount: 24,
  },
  {
    id: "cat-6",
    name: "Curated Accessories",
    slug: "accessories",
    tagline: "Architectural bags & handcrafted jewelry",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
    itemCount: 50,
  },
];
