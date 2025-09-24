import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelData: null as any,
  isLoading: false,
};

export const hotelDataSlice = createSlice({
  name: "hotelData",
  initialState,
  reducers: {
    setHotelData: (state, action) => {
      state.hotelData = action.payload;
    },
    setHotelDataLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearHotelData: (state) => {
      state.hotelData = null;
      state.isLoading = false;
    },
  },
});

export const { setHotelData, setHotelDataLoading, clearHotelData } =
  hotelDataSlice.actions;
export default hotelDataSlice.reducer;
