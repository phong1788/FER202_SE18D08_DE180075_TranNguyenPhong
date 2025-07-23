import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk để fetch sản phẩm từ API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/products.json');
      if (!response.ok) throw new Error('Không thể tải danh sách sản phẩm');
      const data = await response.json();
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để thêm sản phẩm mới
export const addProductAsync = createAsyncThunk(
  'products/addProductAsync',
  async (productData, { rejectWithValue }) => {
    try {
      // Validation
      if (!productData.name || !productData.description || !productData.price || !productData.currentPrice) {
        throw new Error('Vui lòng điền đầy đủ thông tin sản phẩm');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Tạo sản phẩm mới với ID unique
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        image: productData.image || 'default-laptop.png',
        // Đảm bảo giá được format đúng
        price: productData.price.toString(),
        currentPrice: productData.currentPrice.toString(),
      };

      return newProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để cập nhật sản phẩm
export const updateProductAsync = createAsyncThunk(
  'products/updateProductAsync',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      // Validation
      if (!productData.name || !productData.description || !productData.price || !productData.currentPrice) {
        throw new Error('Vui lòng điền đầy đủ thông tin sản phẩm');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedProduct = {
        ...productData,
        id,
        // Đảm bảo giá được format đúng
        price: productData.price.toString(),
        currentPrice: productData.currentPrice.toString(),
      };

      return updatedProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để xóa sản phẩm
export const deleteProductAsync = createAsyncThunk(
  'products/deleteProductAsync',
  async (productId, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedProduct: null,
    operationLoading: false, // Loading cho add/update/delete operations
  },
  reducers: {
    // Synchronous actions
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now().toString(),
        image: action.payload.image || 'default-laptop.png',
      };
      state.items.push(newProduct);
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      // Clear selected product if it's being deleted
      if (state.selectedProduct && state.selectedProduct.id === action.payload) {
        state.selectedProduct = null;
      }
    },
    updateProduct: (state, action) => {
      const idx = state.items.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
        // Update selected product if it's being updated
        if (state.selectedProduct && state.selectedProduct.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      }
    },
    // Set selected product for detail view
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    // Clear selected product
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    // Clear error messages
    clearError: (state) => {
      state.error = null;
    },
    // Clear all data (useful for logout or reset)
    clearProducts: (state) => {
      state.items = [];
      state.selectedProduct = null;
      state.error = null;
      state.loading = false;
      state.operationLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch products cases
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add product async cases
      .addCase(addProductAsync.pending, state => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })

      // Update product async cases
      .addCase(updateProductAsync.pending, state => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.operationLoading = false;
        const idx = state.items.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
        // Update selected product if it's being updated
        if (state.selectedProduct && state.selectedProduct.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })

      // Delete product async cases
      .addCase(deleteProductAsync.pending, state => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.items = state.items.filter(p => p.id !== action.payload);
        // Clear selected product if it's being deleted
        if (state.selectedProduct && state.selectedProduct.id === action.payload) {
          state.selectedProduct = null;
        }
        state.error = null;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { 
  addProduct, 
  deleteProduct, 
  updateProduct,
  setSelectedProduct,
  clearSelectedProduct,
  clearError,
  clearProducts
} = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectOperationLoading = (state) => state.products.operationLoading;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;

// Advanced selectors
export const selectProductById = (state, productId) => 
  state.products.items.find(product => product.id === productId);

export const selectProductsByBrand = (state, brand) =>
  state.products.items.filter(product => 
    product.name.toLowerCase().includes(brand.toLowerCase())
  );

export const selectProductsCount = (state) => state.products.items.length;

export const selectProductsInPriceRange = (state, minPrice, maxPrice) =>
  state.products.items.filter(product => {
    const price = parseFloat(product.currentPrice.replace(/\./g, ''));
    return price >= minPrice && price <= maxPrice;
  });

// Utility selectors
export const selectCheapestProduct = (state) => {
  const products = state.products.items;
  if (products.length === 0) return null;
  
  return products.reduce((cheapest, current) => {
    const cheapestPrice = parseFloat(cheapest.currentPrice.replace(/\./g, ''));
    const currentPrice = parseFloat(current.currentPrice.replace(/\./g, ''));
    return currentPrice < cheapestPrice ? current : cheapest;
  });
};

export const selectMostExpensiveProduct = (state) => {
  const products = state.products.items;
  if (products.length === 0) return null;
  
  return products.reduce((expensive, current) => {
    const expensivePrice = parseFloat(expensive.currentPrice.replace(/\./g, ''));
    const currentPrice = parseFloat(current.currentPrice.replace(/\./g, ''));
    return currentPrice > expensivePrice ? current : expensive;
  });
};

export const selectAveragePrice = (state) => {
  const products = state.products.items;
  if (products.length === 0) return 0;
  
  const totalPrice = products.reduce((sum, product) => {
    return sum + parseFloat(product.currentPrice.replace(/\./g, ''));
  }, 0);
  
  return Math.round(totalPrice / products.length);
};

export default productsSlice.reducer;