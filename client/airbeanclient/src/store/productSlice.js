import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../api/api";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  return await getProducts();
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const payload = action.payload;

      state.products = payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products = [];
      state.isLoading = false;
      state.error = "Failed to fetch products";
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
