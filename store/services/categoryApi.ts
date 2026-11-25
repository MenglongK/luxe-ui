import { baseApi } from "./baseApi";
import {
  ApiResponse,
  PageResponse,
  PageParams,
  CategoryRequest,
  CategoryResponse,
} from "@/types/api";

/**
 * CATEGORY RTK QUERY SERVICE
 * 
 * Maps directly to backend CategoryController:
 * - Base Route: /api/v1/categories (and /api/v1/category)
 * - Supported Methods: GET, POST, PUT/PATCH, DELETE (soft & permanent)
 */
export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. GET ALL CATEGORIES (Paginated)
    getCategories: builder.query<
      ApiResponse<PageResponse<CategoryResponse>>,
      PageParams | void
    >({
      query: (params) => ({
        url: "/categories",
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
                type: "Category" as const,
                id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    // 2. GET SINGLE CATEGORY BY ID
    getCategoryById: builder.query<ApiResponse<CategoryResponse>, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Category", id }],
    }),

    // 3. POST / CREATE NEW CATEGORY
    // TARGET TO CHANGE: Request body must match CategoryRequest: { name, parentId, isActive }
    createCategory: builder.mutation<
      ApiResponse<CategoryResponse>,
      CategoryRequest
    >({
      query: (categoryRequest) => ({
        url: "/categories",
        method: "POST",
        body: categoryRequest,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    // 4. PUT / PATCH / UPDATE CATEGORY
    updateCategory: builder.mutation<
      ApiResponse<CategoryResponse>,
      { id: number; data: CategoryRequest }
    >({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),

    // 5. DELETE CATEGORY (Soft Delete)
    deleteCategory: builder.mutation<ApiResponse<CategoryResponse>, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),

    // 6. PERMANENT HARD DELETE CATEGORY
    permanentDeleteCategory: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `/categories/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  usePermanentDeleteCategoryMutation,
} = categoryApi;
