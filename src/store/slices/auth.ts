import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserType } from "@/type/auth/auth";
import { toast } from "react-toastify";

interface authState {
  user: UserType | null;
}
const initialState: authState = {
  user: null,
} satisfies authState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    signout: (state) => {
      state.user = null;
    },
    changeRole: (s, a: PayloadAction<string>) => {
      const found = s.user?.roles.find(
        (x) => x.trim().toLowerCase() === a.payload.trim().toLowerCase(),
      );
      if (found && s.user) {
        s.user.selectedRole = a.payload;
      } else {
        toast.error(`User does not have ${a.payload} role`);
      }
    },
  },
});

export const selectAuthState = (state: RootState) => state.authReducer;

export const selectUser = createSelector(
  [selectAuthState],
  (authState) => authState.user,
);

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
