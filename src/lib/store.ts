import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import addToOrderReducer from "./features/addToOrderSlice";
import addBookingReducer from "./features/bookingInfoSlice";
import popupReducer from "./features/popupSlice";
import hotelDataReducer from "./features/hotelDataSlice";

const store = () => {
  return configureStore({
    reducer: {
      searchTerm: searchReducer,
      addToOrderData: addToOrderReducer,
      addBooking: addBookingReducer,
      popup: popupReducer,
      hotelData: hotelDataReducer,
      // firebaseManagementData: firebaseManagementDataReducer,
      //     // firestoreMultipleData: firestoreMultipleDataReducer,
      //     // firebaseData: firebaseDataReducer,
      //     // listData: listReducer,
      //     // activeFooterItem: activeFooterItemReducer,
      //     // botToOrderData: botToOrderReducer,
      //     // botChat: botChatReducer,
      //     // afterOrderData: afterOrderReducer,
      //     // adminRestaurantInfo: adminRestaurantInfoReducer,
    },
  });
};
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
