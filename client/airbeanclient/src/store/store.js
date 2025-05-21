import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import authenticateUser from "./middlewares/authMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authenticateUser),
});

export default store;
