import axios from "axios";

export const API_URL = "http://localhost:3000";

export const login = async (data, role) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.post(
      `${API_URL}/auth/login?${role === "admin" ? "as=admin" : ""}`,
      data
    );

    return response.data.data;
  } catch (err) {
    throw err;
  }
};
