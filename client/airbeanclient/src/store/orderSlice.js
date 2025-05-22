import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
        const response = await axios.post('/orders', orderData); 
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getOrderByProfileId = createAsyncThunk(
    'order/getOrderById',
    async (orderId, { rejectWithValue }) => {
        try {
        const response = await axios.get(`/orders/${orderId}`); 
        return response.data; 
        } catch (error) {
        return rejectWithValue(error.response.data); 
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        resetOrder: (state) => {
            state.order = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.order = action.payload; 
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; 
        });
    },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;