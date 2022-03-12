import { createSlice } from "@reduxjs/toolkit";

//initialState of basket
const initialState = {
  items: [],
};

//basically we cannot directly push somthing to basket ,
//we need to dispatch even  like "Add to BAsket" in order to tel reducre to pus h object  (reducers)

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //ACTIONS
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]; //payload is the product pusheed in dispatch event
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      //if no index is found then it return -1
      if (index >= 0) {
        //item exists
        newBasket.splice(index, 1); //going to the index key is found above and removing by 1 ele
      } else {
        console.warn("No index found");
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

//calculating total  of items present in the basket
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
