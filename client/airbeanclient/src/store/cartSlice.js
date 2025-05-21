import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) =>{
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1});
            }
        },
        increaseQuantity: (state, action) =>{
            const item = state.items.find((item) => item.id === action.payload);
            if(item) item.quantity += 1;
        },

        decreaseQuantity: (state, action) => {
        const item = state.items.find((item) => item.id === action.payload);
        if (item && item.quantity > 1) item.quantity -= 1;
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;