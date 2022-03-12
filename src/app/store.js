import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
//redux
//GLOBAL STORE SETUP
export const store = configureStore({
  reducer: {
    //SLICES which contain the info like oninon has many slices like user , basket anything
    basket: basketReducer,
  },
});
