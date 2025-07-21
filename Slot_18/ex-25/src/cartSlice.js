const initialState = {
  items: [], // {product, quantity}
};

// Action Types
const ADD_TO_CART = 'cart/addToCart';
const UPDATE_QUANTITY = 'cart/updateQuantity';
const REMOVE_FROM_CART = 'cart/removeFromCart';

// Reducer
export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existing = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }
    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      };
    default:
      return state;
  }
}

// Action Creators
export const addToCart = (product, quantity = 1) => ({
  type: ADD_TO_CART,
  payload: { product, quantity },
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: { productId },
}); 