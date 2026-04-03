import { configureStore } from '@reduxjs/toolkit'
import modalReducer from "./modalSlice"
import authReducer from "./authSlice"
import playerReducer from "./playerSlice"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    player: playerReducer,
  },
})