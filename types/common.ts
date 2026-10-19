/**
 * Common Storefront Types
 * 
 * Reusable interfaces for store value propositions, testimonials,
 * promotional banners, and editorial collections.
 */

export interface StorePerk {
  id: string;
  title: string;
  description: string;
  iconName: 'truck' | 'sparkles' | 'refresh' | 'shield';
}

export interface CustomerTestimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  productName: string;
  verifiedBuyer: boolean;
}

export interface PressQuote {
  id: string;
  publication: string;
  quote: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  handle: string;
  likes: number;
}
