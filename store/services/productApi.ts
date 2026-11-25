import { baseApi } from "./baseApi";
import {
  ApiResponse,
  PageResponse,
  PageParams,
  ProductRequest,
  ProductResponse,
  ProductVariantResponse,
} from "@/types/api";

/**
 * PRODUCT RTK QUERY SERVICE
 * 
 * Maps directly to backend ProductController:
 * - Base Route: /api/v1/products (and /api/v1/product)
 * - Supported Methods: GET, POST, PUT/PATCH, DELETE
 */
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. GET ALL PRODUCTS (Paginated)
    getProducts: builder.query<
      ApiResponse<PageResponse<ProductResponse>>,
      PageParams | void
    >({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params: {
          page: params?.page ?? 0,
          size: params?.size ?? 10,
          sort: params?.sort ?? "id",
          direction: params?.direction ?? "DESC",
        },
      }),
      providesTags: (result) =>
        result?.payload?.content
          ? [
              ...result.payload.content.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    // 2. GET SINGLE PRODUCT BY ID
    getProductById: builder.query<ApiResponse<ProductResponse>, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    // 3. GET SINGLE PRODUCT BY UUID
    getProductByUuid: builder.query<ApiResponse<ProductResponse>, string>({
      query: (uuid) => ({
        url: `/products/uuid/${uuid}`,
        method: "GET",
      }),
      providesTags: (_result, _error, uuid) => [{ type: "Product", id: uuid }],
    }),

    // 4. GET PRODUCT VARIANTS BY PRODUCT ID
    getProductVariants: builder.query<
      ApiResponse<ProductVariantResponse[]>,
      number
    >({
      query: (productId) => ({
        url: `/products/${productId}/variants`,
        method: "GET",
      }),
    }),

    // 5. POST / CREATE NEW PRODUCT
    // TARGET TO CHANGE: Requires existing brandId and categoryId in your database.
    // If you receive a foreign key constraint error, make sure to insert Brand and Category first.
    createProduct: builder.mutation<
      ApiResponse<ProductResponse>,
      ProductRequest
    >({
      query: (productRequest) => ({
        url: "/products",
        method: "POST",
        body: productRequest,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // 6. PUT / PATCH / UPDATE PRODUCT
    updateProduct: builder.mutation<
      ApiResponse<ProductResponse>,
      { id: number; data: ProductRequest }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    // 7. DELETE PRODUCT (Soft Delete)
    deleteProduct: builder.mutation<ApiResponse<ProductResponse>, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    // 8. PERMANENT HARD DELETE PRODUCT
    permanentDeleteProduct: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `/products/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductByUuidQuery,
  useGetProductVariantsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  usePermanentDeleteProductMutation,
} = productApi;
