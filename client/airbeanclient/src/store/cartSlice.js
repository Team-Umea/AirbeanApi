import { createSlice } from "@reduxjs/toolkit";

    const savedCart = localStorage.getItem("cartItems");
    const initialState = {
        items: savedCart ? JSON.parse(savedCart) : [],
        discount: {
            code: null,
            amount: 0,
        },
    }; 


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
        const product = action.payload;
        const existing = state.items.find((item) => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            state.items.push({ ...product, quantity: 1 });
        }
        saveToLocalStorage(state.items);
        },
        increaseQuantity: (state, action) => {
        const item = state.items.find((item) => item.id === action.payload);
        if (item) item.quantity += 1;
        saveToLocalStorage(state.items);
        },
        decreaseQuantity: (state, action) => {
        const item = state.items.find((item) => item.id === action.payload);
        if (item && item.quantity > 1) item.quantity -= 1;
        saveToLocalStorage(state.items);
        },
        clearCart: (state) => {
        state.items = [];
        localStorage.removeItem("cartItems");
        },
        applyDiscount: (state, action) => {
        state.discount = action.payload; 
    },
    },
});
const saveToLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
};

export const { addToCart, increaseQuantity, decreaseQuantity, clearCart, applyDiscount } = cartSlice.actions;

export default cartSlice.reducer;