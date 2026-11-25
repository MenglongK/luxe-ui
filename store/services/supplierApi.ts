import { baseApi } from "./baseApi";
import {
  ApiResponse,
  PageResponse,
  PageParams,
  SupplierCategory,
  SupplierStatus,
  SupplierRequest,
  SupplierUpdateRequest,
  SupplierResponse,
} from "@/types/api";

export interface SupplierFilterParams extends PageParams {
  category?: SupplierCategory;
  status?: SupplierStatus;
  search?: string;
}

/**
 * SUPPLIER RTK QUERY SERVICE
 * 
 * Maps directly to backend SupplierController:
 * - Base Route: /api/v1/suppliers (and /api/v1/supplier)
 * - Supported Methods: GET, POST, PUT/PATCH, DELETE (soft & permanent)
 */
export const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. GET ALL SUPPLIERS (Paginated + Filtered)
    getSuppliers: builder.query<
      ApiResponse<PageResponse<SupplierResponse>>,
      SupplierFilterParams | void
    >({
      query: (params) => ({
        url: "/suppliers",
        method: "GET",
        params: {
          category: params?.category,
          status: params?.status,
          search: params?.search,
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
                type: "Supplier" as const,
                id,
              })),
              { type: "Supplier", id: "LIST" },
            ]
          : [{ type: "Supplier", id: "LIST" }],
    }),

    // 2. GET SINGLE SUPPLIER BY ID
    getSupplierById: builder.query<ApiResponse<SupplierResponse>, number>({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Supplier", id }],
    }),

    // 3. GET SINGLE SUPPLIER BY CODE
    getSupplierByCode: builder.query<ApiResponse<SupplierResponse>, string>({
      query: (code) => ({
        url: `/suppliers/code/${code}`,
        method: "GET",
      }),
      providesTags: (_result, _error, code) => [{ type: "Supplier", id: code }],
    }),

    // 4. POST / CREATE NEW SUPPLIER
    createSupplier: builder.mutation<ApiResponse<SupplierResponse>, SupplierRequest>({
      query: (supplierRequest) => ({
        url: "/suppliers",
        method: "POST",
        body: supplierRequest,
      }),
      invalidatesTags: [{ type: "Supplier", id: "LIST" }],
    }),

    // 5. PATCH / UPDATE SUPPLIER
    updateSupplier: builder.mutation<
      ApiResponse<SupplierResponse>,
      { id: number; data: SupplierUpdateRequest }
    >({
      query: ({ id, data }) => ({
        url: `/suppliers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Supplier", id },
        { type: "Supplier", id: "LIST" },
      ],
    }),

    // 6. DELETE / SOFT DELETE SUPPLIER
    softDeleteSupplier: builder.mutation<ApiResponse<SupplierResponse>, number>({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Supplier", id },
        { type: "Supplier", id: "LIST" },
      ],
    }),

    // 7. DELETE / PERMANENT DELETE SUPPLIER
    permanentDeleteSupplier: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `/suppliers/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Supplier", id },
        { type: "Supplier", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useGetSupplierByCodeQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useSoftDeleteSupplierMutation,
  usePermanentDeleteSupplierMutation,
} = supplierApi;
