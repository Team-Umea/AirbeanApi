import axios from "axios";

export const API_URL = "http://localhost:3000";

export const login = async (data, role) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login?${role === "admin" ? "as=admin" : ""}`,
      data
    );

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);

    return response.data.data;
  } catch (err) {
    throw err;
  }
};
