import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import { productReducer, cartReducer } from './Reducers';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store; 