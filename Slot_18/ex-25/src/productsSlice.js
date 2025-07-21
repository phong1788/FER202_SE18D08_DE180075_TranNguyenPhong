const initialState = {
  items: [
    {
      id: '123456',
      name: 'Example Product',
      price: 9.99,
      description: 'This is an example product.',
      catalogs: ['catalog1', 'catalog2'],
    },
  ],
  loading: false,
  error: null,
};

// Action Types
const ADD_PRODUCT = 'products/addProduct';
const FETCH_PRODUCTS_START = 'products/fetchStart';
const FETCH_PRODUCTS_SUCCESS = 'products/fetchSuccess';
const FETCH_PRODUCTS_FAILURE = 'products/fetchFailure';

// Reducer
export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, items: [...state.items, action.payload] };
    case FETCH_PRODUCTS_START:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Action Creators
export const addProduct = (product) => ({ type: ADD_PRODUCT, payload: product });

// Thunk for async fetch
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_START });
  try {
    // Simulate API call
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve(initialState.items), 1000)
    );
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}; 