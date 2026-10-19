import { CustomerTestimonial, InstagramPost, PressQuote, StorePerk } from "@/types/common";

/**
 * Value propositions highlighting luxury service & trust
 */
export const storePerks: StorePerk[] = [
  {
    id: "perk-1",
    title: "Complimentary Express Delivery",
    description: "On all global orders above $200. Shipped in signature luxury packaging.",
    iconName: "truck",
  },
  {
    id: "perk-2",
    title: "Artisanal Craftsmanship",
    description: "Ethically milled in Italy and Portugal using certified organic and regenerative fibers.",
    iconName: "sparkles",
  },
  {
    id: "perk-3",
    title: "30-Day Effortless Returns",
    description: "Pre-printed return courier labels included in every box for peace of mind.",
    iconName: "refresh",
  },
  {
    id: "perk-4",
    title: "Dedicated Styling Concierge",
    description: "Personal styling consultations, size recommendations, and wardrobe curation.",
    iconName: "shield",
  },
];

/**
 * Discerning client reviews
 */
export const customerTestimonials: CustomerTestimonial[] = [
  {
    id: "test-1",
    quote: "The wool blazer drape is absolute perfection. It feels like bespoke Savile Row tailoring at a fraction of the traditional couture house markup.",
    author: "Elena Rostova",
    location: "Zurich, Switzerland",
    rating: 5,
    productName: "The Double-Breasted Wool Blazer",
    verifiedBuyer: true,
  },
  {
    id: "test-2",
    quote: "Sublime quality. The cashmere turtleneck arrived in a museum-grade archival box with a cedar sachet. Luxe Atelier has completely redefined my capsule wardrobe.",
    author: "Julian Vance",
    location: "London, UK",
    rating: 5,
    productName: "Cashmere Turtleneck Sweater",
    verifiedBuyer: true,
  },
  {
    id: "test-3",
    quote: "The silk slip dress flows like water. Wore it to an architectural gala in Milan and received non-stop compliments all evening.",
    author: "Camille Dupont",
    location: "Paris, France",
    rating: 5,
    productName: "Bias-Cut Silk Slip Dress",
    verifiedBuyer: true,
  },
];

/**
 * Editorial press mentions
 */
export const pressQuotes: PressQuote[] = [
  {
    id: "press-1",
    publication: "VOGUE",
    quote: "“The quietly revolutionary brand bringing true Savile Row precision to modern minimalism.”",
  },
  {
    id: "press-2",
    publication: "ELLE",
    quote: "“Luxe Atelier creates the kind of investment pieces you will keep and treasure for decades.”",
  },
  {
    id: "press-3",
    publication: "GQ",
    quote: "“Sharp, architectural silhouettes that bridge daytime nonchalance with evening sophistication.”",
  },
  {
    id: "press-4",
    publication: "HARPER'S BAZAAR",
    quote: "“A masterclass in restraint, tactile materials, and sustainable modern luxury.”",
  },
];

/**
 * Instagram / Atelier Community Showcase
 */
export const instagramPosts: InstagramPost[] = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85",
    caption: "Quiet elegance in Copenhagen. #LuxeAtelier",
    handle: "@sophia.style",
    likes: 1420,
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=85",
    caption: "Silk moments during Golden Hour. #LuxeAtelier",
    handle: "@chloe_monet",
    likes: 2190,
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=85",
    caption: "The trench in Autumn rain. #LuxeAtelier",
    handle: "@atelier.diary",
    likes: 980,
  },
  {
    id: "ig-4",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85",
    caption: "Tailoring essentials for the week. #LuxeAtelier",
    handle: "@marcus.vogue",
    likes: 1840,
  },
];
