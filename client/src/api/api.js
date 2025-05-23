import axios from "axios";

export const API_URL = "http://localhost:3000";

export const login = async (data) => {
  const { username, password, role } = data;

  try {
    const response = await axios.post(
      `${API_URL}/auth/login${role === "admin" ? "?as=admin" : ""}`,
      { username, password },
      { withCredentials: true }
    );

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    return await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
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

export const getProducts = async (searchQuery) => {
  try {
    const baseQuery = `${API_URL}/api/products?limit=100`;

    const query = `${baseQuery}${searchQuery ? `&search=${searchQuery}` : ""}`;

    const response = await axios.get(query, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const addProduct = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/products`, data, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (data) => {
  const productData = {
    productName: data.productName,
    productInfo: data.productInfo,
    cost: data.cost,
    stockQuantity: data.stockQuantity,
  };

  try {
    const response = await axios.put(`${API_URL}/api/products/${data.productId}`, productData, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const updateProductStockQuantity = async (data) => {
  const productData = {
    stockQuantity: data.stockQuantity,
  };

  try {
    const response = await axios.patch(`${API_URL}/api/products/${data.productId}`, productData, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async ({ productId }) => {
  try {
    const response = await axios.delete(`${API_URL}/api/products/${productId}`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const getProductOverview = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products/overview`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};
