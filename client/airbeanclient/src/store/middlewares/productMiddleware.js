import { fetchProducts } from "../productSlice";

const getProducts = (store) => (next) => (action) => {
  if (action.type === "PRODUCTS") {
    store.dispatch(fetchProducts());
  }

  return next(action);
};

export default getProducts;
