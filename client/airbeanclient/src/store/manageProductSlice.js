import { createSlice } from "@reduxjs/toolkit";

const PRODUCT_KEY = "manage_product_key";

const initialState = {
  product: JSON.parse(sessionStorage.getItem(PRODUCT_KEY) || "null") || null,
  isLoading: false,
  error: null,
};

const manageProductSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const product = action.payload;
      state.product = product;
      sessionStorage.setItem(PRODUCT_KEY, JSON.stringify(product));
    },
  },
});

export const { setProduct } = manageProductSlice.actions;

export default manageProductSlice.reducer;
