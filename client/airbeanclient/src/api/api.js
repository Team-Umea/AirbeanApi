import axios from "axios";

export const API_URL = "http://localhost:3000";

export const login = async (data, role) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login?${role === "admin" ? "as=admin" : ""}`,
      data,
      { withCredentials: true }
    );

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data, { withCredentials: true });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const getMe = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products?limit=100`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
