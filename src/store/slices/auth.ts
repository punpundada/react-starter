import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface authState {
  user?: Record<string, unknown> | null;
}
const initialState: authState = {
  user: null,
} satisfies authState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.user = action.payload;
    },
  },
});

export const selectAuthState = (state: RootState) => state.authReducer;


export const selectUser = createSelector(
  [selectAuthState],
  (authState) => authState.user
);

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
