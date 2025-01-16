import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingData: {},
  diningLink: "", // Change this to an array of objects with 'name', 'price', and 'count'
};

export const addBooking = createSlice({
  name: "addBooking",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.bookingData = action.payload;
    },
    addDiningLink: (state, action) => {
      state.diningLink = action.payload;
    },
  },
});

export const { addData, addDiningLink } = addBooking.actions;
export default addBooking.reducer;
