import { baseApi } from "./baseApi";
import {
  ApiResponse,
  PageResponse,
  PageParams,
  BrandRequest,
  BrandResponse,
} from "@/types/api";

/**
 * BRAND RTK QUERY SERVICE
 * 
 * Maps directly to backend BrandController:
 * - Base Route: /api/v1/brands (and /api/v1/brand)
 * - Supported Methods: GET, POST, PUT/PATCH, DELETE (soft & permanent)
 */
export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. GET ALL BRANDS (Paginated)
    getBrands: builder.query<
      ApiResponse<PageResponse<BrandResponse>>,
      PageParams | void
    >({
      query: (params) => ({
        url: "/brands",
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
                type: "Brand" as const,
                id,
              })),
              { type: "Brand", id: "LIST" },
            ]
          : [{ type: "Brand", id: "LIST" }],
    }),

    // 2. GET SINGLE BRAND BY ID
    getBrandById: builder.query<ApiResponse<BrandResponse>, number>({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Brand", id }],
    }),

    // 3. POST / CREATE NEW BRAND
    // TARGET TO CHANGE: Request body must match BrandRequest: { name, logoUrl, isActive }
    createBrand: builder.mutation<ApiResponse<BrandResponse>, BrandRequest>({
      query: (brandRequest) => ({
        url: "/brands",
        method: "POST",
        body: brandRequest,
      }),
      invalidatesTags: [{ type: "Brand", id: "LIST" }],
    }),

    // 4. PUT / PATCH / UPDATE BRAND
    updateBrand: builder.mutation<
      ApiResponse<BrandResponse>,
      { id: number; data: BrandRequest }
    >({
      query: ({ id, data }) => ({
        url: `/brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Brand", id },
        { type: "Brand", id: "LIST" },
      ],
    }),

    // 5. DELETE BRAND (Soft Delete)
    deleteBrand: builder.mutation<ApiResponse<BrandResponse>, number>({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Brand", id },
        { type: "Brand", id: "LIST" },
      ],
    }),

    // 6. PERMANENT HARD DELETE BRAND
    permanentDeleteBrand: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `/brands/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Brand", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  usePermanentDeleteBrandMutation,
} = brandApi;
