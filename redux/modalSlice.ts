import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalFlow = "default" | "payment";

type ModalState = {
  isOpen: boolean;
  flow: ModalFlow;
};

const initialState: ModalState = {
  isOpen: false,
  flow: "default",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: {
      reducer: (state, action: PayloadAction<ModalFlow>) => {
        state.isOpen = true;
        state.flow = action.payload;
      },
      prepare: (flow: ModalFlow = "default") => ({
        payload: flow,
      }),
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.flow = "default";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;