export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  author: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  fitFeedback?: "True to size" | "Runs slightly small" | "Runs slightly large";
  sizePurchased?: string;
  colorPurchased?: string;
}
