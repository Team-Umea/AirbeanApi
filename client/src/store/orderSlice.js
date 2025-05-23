import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/orders",
        orderData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(
          "Tyvärr, en eller fler av dina produkter finns inte i lager."
        );
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrderByProfileId = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderHistory = createAsyncThunk(
  "order/fetchOrderHistory",
  async (profileId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/orders/with-items/profile`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching order history:", error);
      return rejectWithValue(error.response?.data || "Ett fel inträffade");
    }
  }
);

export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/orders/${orderId}/confirm`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(
          "Tyvärr, en eller flera produkter i din varukorg har inte tillräckligt med lager."
        );
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.orders = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchOrderHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(confirmOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(confirmOrder.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
