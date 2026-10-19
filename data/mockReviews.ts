import { ProductReview } from "@/types/review";

export const mockReviews: ProductReview[] = [
  // Reviews for prod-1: The Double-Breasted Wool Blazer
  {
    id: "rev-1",
    productId: "prod-1",
    productName: "The Double-Breasted Wool Blazer",
    productSlug: "double-breasted-wool-blazer",
    author: "Genevieve Laurent",
    rating: 5,
    title: "Masterclass in modern tailoring",
    comment:
      "The drape on this blazer is extraordinary. The Biella wool feels substantial yet remarkably breathable. Wore it all week for meetings in Geneva and it never wrinkled. Absolute investment piece.",
    date: "October 12, 2026",
    verified: true,
    fitFeedback: "True to size",
    sizePurchased: "M",
    colorPurchased: "Charcoal Noir",
  },
  {
    id: "rev-2",
    productId: "prod-1",
    productName: "The Double-Breasted Wool Blazer",
    productSlug: "double-breasted-wool-blazer",
    author: "Marcus Sterling",
    rating: 5,
    title: "Comparable to Savile Row bespoke",
    comment:
      "The hand-finished lapel pick-stitching and the internal passport pocket reflect true artisanal care. It stands toe-to-toe with coats twice its price tag.",
    date: "September 28, 2026",
    verified: true,
    fitFeedback: "True to size",
    sizePurchased: "L",
    colorPurchased: "Oatmeal Melange",
  },
  {
    id: "rev-3",
    productId: "prod-1",
    productName: "The Double-Breasted Wool Blazer",
    productSlug: "double-breasted-wool-blazer",
    author: "Hannah Van Der Bilt",
    rating: 4,
    title: "Impeccable cut, slightly oversized in the shoulders",
    comment:
      "Very chic silhouette. Shoulders are slightly more architectural than standard RTW jackets, which gives that high-fashion editorial look I love.",
    date: "August 19, 2026",
    verified: true,
    fitFeedback: "True to size",
    sizePurchased: "S",
    colorPurchased: "Navy Blue",
  },

  // Reviews for prod-2: Cashmere Turtleneck Sweater
  {
    id: "rev-4",
    productId: "prod-2",
    productName: "Cashmere Turtleneck Sweater",
    productSlug: "cashmere-turtleneck-sweater",
    author: "Sebastian Cole",
    rating: 5,
    title: "The softest Mongolian knit I own",
    comment:
      "Featherlight yet warm. Doesn't pill even after 4 weeks of regular wear. The mockneck collar stays crisp and never sags.",
    date: "October 08, 2026",
    verified: true,
    fitFeedback: "True to size",
    sizePurchased: "M",
    colorPurchased: "Alabaster Cream",
  },
  {
    id: "rev-5",
    productId: "prod-2",
    productName: "Cashmere Turtleneck Sweater",
    productSlug: "cashmere-turtleneck-sweater",
    author: "Isabella Rossi",
    rating: 5,
    title: "Sublime packaging & luxury yarn",
    comment:
      "Arrived in an archival cloth box with a natural cedar block. The Alabaster shade is creamy and pairs seamlessly with tailored wool trousers.",
    date: "September 14, 2026",
    verified: true,
    fitFeedback: "True to size",
    sizePurchased: "S",
    colorPurchased: "Alabaster Cream",
  },

  // Reviews for prod-3: Belted Trench Coat in Technical Twill
  {
    id: "rev-6",
    productId: "prod-3",
    productName: "Belted Trench Coat in Technical Twill",
    productSlug: "belted-trench-coat-twill",
    author: "Claire Moreau",
    rating: 5,
    title: "Stormproof yet immensely elegant",
    comment:
      "Repelled heavy rain in Milan without looking like sporty outdoor gear. The waist cinch creates dramatic proportions.",
    date: "October 01, 2026",
    verified: true,
    fitFeedback: "True to size",
    sizePurchased: "S",
    colorPurchased: "Warm Khaki",
  },

  // Reviews for prod-4: Bias-Cut Mulberry Silk Slip Dress
  {
    id: "rev-7",
    productId: "prod-4",
    productName: "Bias-Cut Mulberry Silk Slip Dress",
    productSlug: "bias-cut-silk-slip-dress",
    author: "Aria Thorne",
    rating: 5,
    title: "Liquid silk elegance",
    comment:
      "Drapes around the hips like water. The 22-momme weight means it is not sheer at all. Received dozens of compliments at a charity gala in Manhattan.",
    date: "September 22, 2026",
    verified: true,
    fitFeedback: "True to size",
    sizePurchased: "M",
    colorPurchased: "Champagne Pearl",
  },

  // Reviews for prod-6: Architectural Calfskin Loafer
  {
    id: "rev-8",
    productId: "prod-6",
    productName: "Architectural Calfskin Loafer",
    productSlug: "architectural-calfskin-loafer",
    author: "Matteo Bianchi",
    rating: 5,
    title: "Tuscan leather craftsmanship",
    comment:
      "Takes 2 days to break in, then forms to your feet like bespoke footwear. The chisel toe adds an edgy, contemporary aesthetic to casual tailoring.",
    date: "September 05, 2026",
    verified: true,
    fitFeedback: "True to size",
    sizePurchased: "42",
    colorPurchased: "Polished Black",
  },
];
