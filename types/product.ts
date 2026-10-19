/**
 * Product & Catalog Type Definitions
 * 
 * Clean, extensible interfaces for clothing items, categories, and inventory.
 * Structured to be easily connected to backend APIs (REST or GraphQL) in the future.
 */

export type ProductBadge = 'NEW' | 'BESTSELLER' | 'SALE' | 'LIMITED' | 'EXCLUSIVE';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  compareAtPrice?: number; // Original price before discount
  rating: number;
  reviewCount: number;
  images: string[]; // Primary image at [0], hover image at [1]
  colors?: ProductColor[];
  sizes?: string[];
  badge?: ProductBadge;
  isNew?: boolean;
  isFeatured?: boolean;
  inStock?: boolean;
  description?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  image: string;
  itemCount: number;
  isFeatured?: boolean;
}
