import { ADD_PRODUCT, ADD_TO_CART } from './Actions';

const initialProductState = [];

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

const initialCartState = [];

export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    default:
      return state;
  }
}; 