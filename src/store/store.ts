import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";

const store = configureStore({
  reducer: {
    authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
