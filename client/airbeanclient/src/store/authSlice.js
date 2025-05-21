import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMe } from "../api/api";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  username: "",
  email: "",
  userID: null,
  isLoading: true,
  error: null,
};

export const authenticate = createAsyncThunk("auth/authenticateUser", async () => {
  return await getMe();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.username = "";
      state.email = "";
      state.userID = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      const payload = action.payload;

      state.isAuthenticated = true;
      state.isAdmin = payload.role === "admin";
      state.username = payload.username;
      state.email = payload.email;
      state.userID = payload.id;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.username = "";
      state.email = "";
      state.userID = "";
      state.isLoading = false;
      state.error = "Failed to authenicate user";
    });
    builder.addCase(authenticate.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
  },
});

export const { setIsAuthenticated, setIsAdmin, setUsername, setEmail, setUserID, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
