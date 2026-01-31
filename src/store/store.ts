import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
