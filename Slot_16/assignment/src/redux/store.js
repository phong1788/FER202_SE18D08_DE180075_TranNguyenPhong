import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;