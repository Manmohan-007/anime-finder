import { configureStore } from "@reduxjs/toolkit";
import animeDataReducer from "../Slices/home/animeDataSlice";

export const store = configureStore({
  reducer: {
    animeData: animeDataReducer,
  },
});
