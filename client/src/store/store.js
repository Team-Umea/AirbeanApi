import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import authenticateUser from "./middlewares/authMiddleware";
import getProducts from "./middlewares/productMiddleware";
import cartReducer from "../store/cartSlice";
import manageProductReducer from "./manageProductSlice";
import orderReducer from '../store/orderSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  manageProduct: manageProductReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticateUser, getProducts),
});

export default store;
