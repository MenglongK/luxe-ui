"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./index";

/**
 * CLIENT REDUX STORE PROVIDER
 * Initializes the Redux store lazily using React state to adhere to React 19 & Next.js guidelines.
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
