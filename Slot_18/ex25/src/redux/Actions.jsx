// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

// Async Action (Thunk)
export const loadProducts = () => {
  return (dispatch) => {
    // simulate API
    setTimeout(() => {
      const products = [
        {
          id: '123456',
          name: 'Example Product',
          price: 9.99,
          description: 'This is an example product.',
          catalogs: ['catalog1', 'catalog2'],
        },
      ];
      products.forEach(product => {
        dispatch({ type: ADD_PRODUCT, payload: product });
      });
    }, 500);
  };
};

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
}); 