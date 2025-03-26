import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { foodBagApi } from "./services/foodBagApi";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
  reducer: {
    [foodBagApi.reducerPath]: foodBagApi.reducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(foodBagApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
