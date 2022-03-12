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
      //check for for the duplicate item if duplicate is added  inc the count else add the item directly to basket
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      //if index inc count else directly push
      if (index >= 0) {
        //remember redux is immutable so we cant just make change in ibj and have a dynamic efgfect on UI
        let newBasket = [...state.items];
        console.log("inside the store of duplicate");

        newBasket.forEach((item) => {
          if (item.id === action.payload.id) {
            item.count += 1;
          }
        });

        state.items = newBasket;
      } else {
        console.log("inside the store of unique");

        state.items = [...state.items, action.payload]; //payload is the product pusheed in dispatch event
      }
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
    decItemQuanitybyOne: (state, action) => {
      //if count of item is greater than 1 dec by one
      let newBasket = [...state.items];

      newBasket.forEach((item) => {
        if (item.id === action.payload.id) {
          item.count -= 1;
        }
      });

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket, decItemQuanitybyOne } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

//calculating total  of items present in the basket
export const selectTotal = (state) =>
  state.basket.items.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

//calculating the total no of items in the basket
export const selectTotalItems = (state) =>
  state.basket.items.reduce((total, item) => total + item.count, 0);

export default basketSlice.reducer;
