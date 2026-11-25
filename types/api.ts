/**
 * API Contract Types for LUXE API
 * Strictly aligned with Spring Boot backend: ApiResponse<T> and domain DTOs.
 */

// Generic API response matching co.istad.corefeature.common.response.ApiResponse<T>
export interface ApiResponse<T> {
  status: number;
  message: string;
  payload: T;
  timestamp?: string;
}

// Spring Data Page interface matching org.springframework.data.domain.Page<T>
export interface PageResponse<T> {
  content: T[];
  pageable?: {
    pageNumber: number;
    pageSize: number;
    sort?: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
  };
  totalPages: number;
  totalElements: number;
  last?: boolean;
  size: number;
  number: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
}

// Query parameters for paginated endpoints
export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
  direction?: "ASC" | "DESC";
}

// ============================================================================
// CATEGORY TYPES (co.istad.corefeature.category)
// ============================================================================
export interface CategoryRequest {
  name: string;
  parentId?: number | null;
  isActive?: boolean;
}

export interface CategoryResponse {
  id: number;
  name: string;
  parentId?: number | null;
  subCategories?: CategoryResponse[];
  isActive: boolean;
}

// ============================================================================
// BRAND TYPES (co.istad.corefeature.brand)
// ============================================================================
export interface BrandRequest {
  name: string;
  logoUrl: string;
  isActive?: boolean;
}

export interface BrandResponse {
  id: number;
  name: string;
  logoUrl: string;
  isActive: boolean;
}

// ============================================================================
// PRODUCT TYPES (co.istad.corefeature.product)
// ============================================================================
export type Gender = "MEN" | "WOMEN" | "CHILDREN";
export type DiscountType = "NONE" | "PERCENTAGE" | "FIXED_AMOUNT";

export interface ProductRequest {
  name: string;
  descriptions?: string;
  gender: Gender;
  discountType?: DiscountType;
  isActive?: boolean;
  skuCode?: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
  brandId: number;
  categoryId: number;
  currencyId?: number | null;
  supplierId?: number | null;
}

export interface ProductResponse {
  id: number;
  productId: string; // UUID
  name: string;
  descriptions?: string;
  gender: Gender;
  discountType?: DiscountType;
  isActive: boolean;
  skuCode?: string;
  qrCodeHash?: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
  brandId: number;
  categoryId: number;
  currencyId?: number | null;
  supplierId?: number | null;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface ProductVariantRequest {
  skuId?: string;
  skuCode: string;
  size?: string;
  color?: string;
  price: number;
  stockQuantity: number;
  productId: number;
  isActive?: boolean;
}

export interface ProductVariantResponse {
  id: number;
  skuId: string;
  skuCode: string;
  size?: string;
  color?: string;
  price: number;
  stockQuantity: number;
  productId: number;
  isActive: boolean;
}

// ============================================================================
// FACILITY TYPES (co.istad.corefeature.facility)
// ============================================================================
export type FacilityType = "WAREHOUSE" | "BRANCH";

export interface AddressRequest {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface AddressResponse {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface FacilityRequest {
  code: string;
  name: string;
  type: FacilityType;
  address: AddressRequest;
  isActive?: boolean;
}

export interface FacilityResponse {
  id: number;
  code: string;
  name: string;
  type: FacilityType;
  address: AddressResponse;
  isActive: boolean;
}

// =============================================================================
// SUPPLIER TYPES (Luxury Mills & Tanneries)
// =============================================================================
export type SupplierCategory =
  | "Italian Wool"
  | "Mongolian Cashmere"
  | "French Silk"
  | "Leather Tanneries"
  | "Packaging & Boxes";

export type PaymentTerms =
  | "Net 30"
  | "Net 60"
  | "Immediate"
  | "Letter of Credit";

export type SupplierStatus = "active" | "review" | "inactive";

export interface SupplierRequest {
  code: string;
  name: string;
  category: SupplierCategory;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  rating?: number;
  leadTimeDays?: number;
  paymentTerms?: PaymentTerms;
  status?: SupplierStatus;
}

export interface SupplierUpdateRequest {
  name?: string;
  category?: SupplierCategory;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  rating?: number;
  leadTimeDays?: number;
  paymentTerms?: PaymentTerms;
  status?: SupplierStatus;
  isActive?: boolean;
}

export interface SupplierResponse {
  id: number;
  code: string;
  name: string;
  category: SupplierCategory;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  leadTimeDays: number;
  paymentTerms: PaymentTerms;
  status: SupplierStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
