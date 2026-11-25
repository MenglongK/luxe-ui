import { baseApi } from "./baseApi";
import {
  ApiResponse,
  PageResponse,
  PageParams,
  FacilityRequest,
  FacilityResponse,
} from "@/types/api";

/**
 * FACILITY RTK QUERY SERVICE
 * 
 * Maps directly to backend FacilityController:
 * - Base Route: /api/v1/facilities (and /api/v1/facility)
 * - Supported Methods: GET, POST, PUT/PATCH, DELETE (soft & permanent)
 */
export const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. GET ALL FACILITIES (Paginated)
    getFacilities: builder.query<
      ApiResponse<PageResponse<FacilityResponse>>,
      PageParams | void
    >({
      query: (params) => ({
        url: "/facilities",
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
                type: "Facility" as const,
                id,
              })),
              { type: "Facility", id: "LIST" },
            ]
          : [{ type: "Facility", id: "LIST" }],
    }),

    // 2. GET SINGLE FACILITY BY ID
    getFacilityById: builder.query<ApiResponse<FacilityResponse>, number>({
      query: (id) => ({
        url: `/facilities/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Facility", id }],
    }),

    // 3. POST / CREATE NEW FACILITY
    // TARGET TO CHANGE: Request body must match FacilityRequest: { code, name, type, address, isActive }
    createFacility: builder.mutation<
      ApiResponse<FacilityResponse>,
      FacilityRequest
    >({
      query: (facilityRequest) => ({
        url: "/facilities",
        method: "POST",
        body: facilityRequest,
      }),
      invalidatesTags: [{ type: "Facility", id: "LIST" }],
    }),

    // 4. PUT / PATCH / UPDATE FACILITY
    updateFacility: builder.mutation<
      ApiResponse<FacilityResponse>,
      { id: number; data: FacilityRequest }
    >({
      query: ({ id, data }) => ({
        url: `/facilities/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Facility", id },
        { type: "Facility", id: "LIST" },
      ],
    }),

    // 5. DELETE FACILITY (Soft Delete)
    deleteFacility: builder.mutation<ApiResponse<FacilityResponse>, number>({
      query: (id) => ({
        url: `/facilities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Facility", id },
        { type: "Facility", id: "LIST" },
      ],
    }),

    // 6. PERMANENT HARD DELETE FACILITY
    permanentDeleteFacility: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `/facilities/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Facility", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFacilitiesQuery,
  useGetFacilityByIdQuery,
  useCreateFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
  usePermanentDeleteFacilityMutation,
} = facilityApi;
