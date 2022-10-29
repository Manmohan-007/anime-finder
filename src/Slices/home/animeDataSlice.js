import { createSlice } from "@reduxjs/toolkit";

const initialState = { rawData: {}, filteredData: {}, searchList: [] };

export const AnimeDataSlice = createSlice({
  name: "animeList",
  initialState,
  reducers: {
    setDataToStore: (state, action) => {
      state.rawData = { ...state.rawData, ...action.payload };
    },
    setFilteredDataToStore: (state, action) => {
      let { opnType, data } = action.payload;
      if (opnType === "filter") {
        state.filteredData = data;
        return;
      }
      state.filteredData = { ...state.filteredData, ...data };
    },
    setSearchListToStore: (state, action) => {
      state.searchList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataToStore, setFilteredDataToStore, setSearchListToStore } =
  AnimeDataSlice.actions;

export default AnimeDataSlice.reducer;
