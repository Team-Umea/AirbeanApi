import Product from "../models/ProductModel.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();

    res.status(200).json({ products, success: true });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.getById(productId);

    res.status(200).json({ product, success: true });
  } catch (err) {
    next(err);
  }
};
