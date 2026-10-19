import { AnnouncementItem, FooterSection, NavLink, SocialLink } from "@/types/navigation";

/**
 * Top Announcement Bar items
 * Easily toggle or rotate offers for seasonal marketing campaigns
 */
export const announcements: AnnouncementItem[] = [
  {
    id: "ann-1",
    message: "Complimentary worldwide express shipping on orders over $200",
    highlight: "FREE SHIPPING",
    href: "/collections",
  },
  {
    id: "ann-2",
    message: "Discover the Autumn / Winter Editorial Drop — Limited Quantities",
    highlight: "NEW ARRIVALS",
    href: "/collections",
  },
  {
    id: "ann-3",
    message: "Enjoy 15% off your first atelier purchase with code",
    highlight: "LUXE15",
    href: "/#promotions",
  },
];

/**
 * Main Navbar links with rich sub-categories and featured banners
 * Rendered on hover for an elevated luxury shopping experience
 */
export const navLinks: NavLink[] = [
  {
    label: "New Arrivals",
    href: "/collections",
    badge: "NEW",
    subCategoryGroups: [
      {
        title: "The Latest Drops",
        items: [
          { label: "Autumn / Winter '26 Edit", href: "/collections", badge: "HOT" },
          { label: "Biella Wool Collection", href: "/collections" },
          { label: "Pure Cashmere Knitwear", href: "/collections" },
          { label: "Silk Eveningwear", href: "/collections" },
        ],
      },
      {
        title: "Curated Edits",
        items: [
          { label: "The Monochrome Capsule", href: "/collections" },
          { label: "Architectural Workwear", href: "/collections" },
          { label: "Minimalist Weekend", href: "/collections" },
        ],
      },
    ],
    featuredBanner: {
      title: "Autumn Capsule Drop",
      subtitle: "Sculptural forms crafted in Biella",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85",
      href: "/collections",
    },
  },
  {
    label: "Collections",
    href: "/collections",
    subCategoryGroups: [
      {
        title: "Wardrobe Categories",
        items: [
          { label: "Modern Tailoring & Blazers", href: "/collections" },
          { label: "Fine Knitwear & Cashmere", href: "/collections" },
          { label: "Coats & Trench Outerwear", href: "/collections" },
          { label: "Silk Dresses & Eveningwear", href: "/collections" },
          { label: "Artisanal Calfskin Footwear", href: "/collections" },
          { label: "Curated Handbags & Scarves", href: "/collections" },
        ],
      },
      {
        title: "Special Editions",
        items: [
          { label: "Regenerative Organic Series", href: "/collections" },
          { label: "Archival Savile Row Geometry", href: "/collections" },
          { label: "Zero-Waste Dye Atelier", href: "/collections" },
        ],
      },
    ],
    featuredBanner: {
      title: "Explore All Collections",
      subtitle: "Discover over 200+ atelier creations",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85",
      href: "/collections",
    },
  },
  {
    label: "Women",
    href: "/collections",
    subCategoryGroups: [
      {
        title: "Apparel",
        items: [
          { label: "Tailored Blazers", href: "/collections" },
          { label: "Cashmere Mocknecks", href: "/collections" },
          { label: "Pleated Wide-Leg Trousers", href: "/collections" },
          { label: "Bias-Cut Silk Slip Dresses", href: "/collections" },
          { label: "Belted Technical Trench", href: "/collections" },
        ],
      },
      {
        title: "Shoes & Objects",
        items: [
          { label: "Italian Leather Loafers", href: "/collections" },
          { label: "Pebbled Calfskin Tote", href: "/collections" },
          { label: "Minimalist Jewelry", href: "/collections" },
        ],
      },
    ],
    featuredBanner: {
      title: "The Feminine Cut",
      subtitle: "Fluid drape meets precision lines",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=85",
      href: "/collections",
    },
  },
  {
    label: "Men",
    href: "/collections",
    subCategoryGroups: [
      {
        title: "Tailoring & Tops",
        items: [
          { label: "Double-Breasted Wool Suits", href: "/collections" },
          { label: "Merino Wool Crewnecks", href: "/collections" },
          { label: "Structured Overcoats", href: "/collections" },
          { label: "Relaxed Fit Wool Trousers", href: "/collections" },
        ],
      },
      {
        title: "Leather Goods",
        items: [
          { label: "Goodyear-Welted Boots", href: "/collections" },
          { label: "Full-Grain Leather Cardholders", href: "/collections" },
          { label: "Hand-Rolled Silk Ties", href: "/collections" },
        ],
      },
    ],
    featuredBanner: {
      title: "Sartorial Architecture",
      subtitle: "Modern gentleman silhouettes",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=85",
      href: "/collections",
    },
  },
  {
    label: "About",
    href: "/about",
    subCategoryGroups: [
      {
        title: "The Atelier",
        items: [
          { label: "Our Story & Vision", href: "/about" },
          { label: "Sustainable Materials", href: "/about" },
          { label: "Biella Mills & Florence Ateliers", href: "/about" },
          { label: "Flagship Salons (Paris, Milan, NY)", href: "/about" },
        ],
      },
    ],
    featuredBanner: {
      title: "Behind The Craft",
      subtitle: "Read the story of slow luxury",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=85",
      href: "/about",
    },
  },
  {
    label: "Sale",
    href: "/#promotions",
    isHighlight: true,
    subCategoryGroups: [
      {
        title: "Privilege Offers",
        items: [
          { label: "Seasonal Promo (20% Off)", href: "/#promotions", badge: "LUXE20" },
          { label: "Archive Capsule Pieces", href: "/#promotions" },
          { label: "Last Chance Sizing", href: "/#promotions" },
        ],
      },
    ],
    featuredBanner: {
      title: "Privilege Courtesy",
      subtitle: "20% off with code LUXE20",
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=85",
      href: "/#promotions",
    },
  },
];

/**
 * Footer grouped navigation links
 */
export const footerSections: FooterSection[] = [
  {
    title: "Collection",
    links: [
      { label: "All Collections", href: "/collections" },
      { label: "Modern Tailoring", href: "/collections" },
      { label: "Fine Knitwear", href: "/collections" },
      { label: "Coats & Outerwear", href: "/collections" },
      { label: "Silk & Eveningwear", href: "/collections" },
      { label: "Artisanal Footwear", href: "/collections" },
    ],
  },
  {
    title: "Client Services",
    links: [
      { label: "Complimentary Shipping", href: "/about" },
      { label: "Returns & Exchanges", href: "/about" },
      { label: "Order Tracking", href: "/wishlist" },
      { label: "Personal Styling Concierge", href: "/about" },
      { label: "Care & Maintenance", href: "/about" },
      { label: "Size & Fit Guide", href: "/about" },
    ],
  },
  {
    title: "The Atelier",
    links: [
      { label: "Our Story & Vision", href: "/about" },
      { label: "Sustainable Materials", href: "/about" },
      { label: "Artisanal Factories", href: "/about" },
      { label: "Flagship Salons", href: "/about" },
      { label: "Careers at LUXE", href: "/about" },
    ],
  },
  {
    title: "Legal & Transparency",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Settings", href: "#" },
      { label: "Accessibility Statement", href: "#" },
    ],
  },
];

/**
 * Social channels
 */
export const socialLinks: SocialLink[] = [
  { platform: "Instagram", href: "https://instagram.com" },
  { platform: "Pinterest", href: "https://pinterest.com" },
  { platform: "TikTok", href: "https://tiktok.com" },
  { platform: "Twitter", href: "https://twitter.com" },
];
