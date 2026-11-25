import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * BASE RTK QUERY API CONFIGURATION
 * 
 * TARGET TO CHANGE:
 * 1. Base URL is read from process.env.NEXT_PUBLIC_API_BASE_URL.
 *    If undefined, it defaults to "http://localhost:8080/api/v1".
 * 2. When Spring Security (OAuth2 / Keycloak) is enabled on the backend,
 *    uncomment the token attachment in `prepareHeaders`.
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // Set common headers
      headers.set("Accept", "application/json");

      // =========================================================================
      // TARGET TO CHANGE: Attach Bearer Authentication Token
      // When Keycloak or JWT authentication is implemented, extract token from
      // localStorage, session, or Redux auth slice here:
      //
      // const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      // =========================================================================

      return headers;
    },
  }),
  tagTypes: ["Category", "Brand", "Product", "Facility", "Supplier"],
  endpoints: () => ({}),
});
