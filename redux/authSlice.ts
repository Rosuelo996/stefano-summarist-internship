import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isGuest: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isGuest = action.payload?.email === "guest@gmail.com";
    },
    clearUser: (state) => {
      state.user = null;
      state.isGuest = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer;
 