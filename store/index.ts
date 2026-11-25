import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./services/baseApi";

// Ensure all injected endpoints are registered
import "./services/categoryApi";
import "./services/brandApi";
import "./services/productApi";
import "./services/facilityApi";

/**
 * REDUX STORE FACTORY
 * Creates a unique store instance per client/SSR request (Next.js App Router recommendation)
 */
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      // TARGET TO CHANGE: Add feature slices here as your application grows:
      // auth: authReducer,
      // cart: cartReducer,
      // ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Allow RTK Query non-serialized actions if needed
          warnAfter: 128,
        },
      }).concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

  // Enable refetchOnFocus and refetchOnReconnect behaviors
  setupListeners(store.dispatch);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Re-export services & hooks for convenience
export * from "./services/baseApi";
export * from "./services/categoryApi";
export * from "./services/brandApi";
export * from "./services/productApi";
export * from "./services/facilityApi";
export * from "./hooks";
