import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fontSize: 16,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setFontSize } = playerSlice.actions;
export default playerSlice.reducer;